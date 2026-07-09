-- BoostMySites Email Marketing (em_* tables)

-- ---------------------------------------------------------------------------
-- Infrastructure
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.em_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT NOT NULL UNIQUE,
  resend_domain_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'verified', 'failed')),
  dns_records JSONB NOT NULL DEFAULT '[]'::jsonb,
  verified_at TIMESTAMPTZ,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  warmup_started_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.em_sending_identities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain_id UUID NOT NULL REFERENCES public.em_domains(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL DEFAULT 'Boostmysites',
  daily_cap INTEGER NOT NULL DEFAULT 20,
  sent_today INTEGER NOT NULL DEFAULT 0,
  sent_today_reset_at DATE NOT NULL DEFAULT CURRENT_DATE,
  warmup_status TEXT NOT NULL DEFAULT 'warming'
    CHECK (warmup_status IN ('warming', 'active', 'paused')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_sent_at TIMESTAMPTZ,
  rotation_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_em_sending_identities_active
  ON public.em_sending_identities (is_active, rotation_order);

CREATE TABLE IF NOT EXISTS public.em_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.em_settings (key, value) VALUES
  ('global_daily_cap', '40'::jsonb),
  ('per_sender_daily_cap', '20'::jsonb),
  ('warmup_enabled', 'true'::jsonb),
  ('warmup_schedule', '[10, 20, 30, 40]'::jsonb),
  ('reply_to_email', '"replies@boostmysites.com"'::jsonb),
  ('default_from_name', '"Reshab @ Boostmysites"'::jsonb),
  ('site_origin', '"https://boostmysites.com"'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Companies & leads
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.em_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT,
  industry TEXT,
  country TEXT,
  source TEXT NOT NULL DEFAULT 'manual'
    CHECK (source IN ('manual', 'csv_import', 'ai_discovered', 'scraper')),
  research_summary TEXT,
  pain_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'sourced'
    CHECK (status IN ('sourced', 'researched', 'contacted', 'replied', 'qualified', 'dead')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_em_companies_domain ON public.em_companies (domain);

CREATE TABLE IF NOT EXISTS public.em_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  company TEXT,
  role TEXT,
  phone TEXT,
  source TEXT NOT NULL DEFAULT 'manual'
    CHECK (source IN ('inbound_form', 'csv_import', 'ai_discovered', 'manual')),
  pipeline TEXT NOT NULL DEFAULT 'inbound'
    CHECK (pipeline IN ('inbound', 'cold', 'blast_only')),
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN (
      'new', 'researched', 'contacted', 'opened', 'replied',
      'qualified', 'unsubscribed', 'bounced', 'dead'
    )),
  reshab_lead_id UUID REFERENCES public.reshab_leads(id) ON DELETE SET NULL,
  company_id UUID REFERENCES public.em_companies(id) ON DELETE SET NULL,
  research_summary TEXT,
  pain_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_em_leads_email_lower
  ON public.em_leads (lower(email));
CREATE INDEX IF NOT EXISTS idx_em_leads_pipeline_status
  ON public.em_leads (pipeline, status);
CREATE INDEX IF NOT EXISTS idx_em_leads_reshab_lead_id
  ON public.em_leads (reshab_lead_id);

-- ---------------------------------------------------------------------------
-- Campaigns & sequences
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.em_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  pipeline TEXT NOT NULL
    CHECK (pipeline IN ('cold', 'inbound')),
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.em_sequence_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id UUID NOT NULL REFERENCES public.em_sequences(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  delay_days INTEGER NOT NULL DEFAULT 0,
  subject_template TEXT NOT NULL DEFAULT '',
  body_template TEXT NOT NULL DEFAULT '',
  ai_generated BOOLEAN NOT NULL DEFAULT false,
  condition TEXT NOT NULL DEFAULT 'no_reply'
    CHECK (condition IN ('no_reply', 'always', 'no_meeting')),
  UNIQUE (sequence_id, step_order)
);

CREATE TABLE IF NOT EXISTS public.em_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL
    CHECK (type IN ('cold', 'followup', 'blast', 'inbound_nurture')),
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'active', 'paused', 'completed', 'sending')),
  created_by TEXT NOT NULL DEFAULT 'human'
    CHECK (created_by IN ('ai', 'human')),
  sequence_id UUID REFERENCES public.em_sequences(id) ON DELETE SET NULL,
  segment_filter JSONB NOT NULL DEFAULT '{}'::jsonb,
  subject TEXT,
  body_html TEXT,
  body_text TEXT,
  stats JSONB NOT NULL DEFAULT '{"sent":0,"opened":0,"clicked":0,"replied":0,"bounced":0}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.em_sequence_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.em_leads(id) ON DELETE CASCADE,
  sequence_id UUID NOT NULL REFERENCES public.em_sequences(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.em_campaigns(id) ON DELETE SET NULL,
  current_step INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'paused', 'completed', 'stopped')),
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  next_send_at TIMESTAMPTZ,
  stopped_reason TEXT
    CHECK (stopped_reason IS NULL OR stopped_reason IN (
      'replied', 'bounced', 'unsubscribed', 'manual', 'completed'
    )),
  UNIQUE (lead_id, sequence_id)
);

CREATE INDEX IF NOT EXISTS idx_em_sequence_enrollments_due
  ON public.em_sequence_enrollments (status, next_send_at)
  WHERE status = 'active';

-- ---------------------------------------------------------------------------
-- Sends, messages, events
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.em_email_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.em_leads(id) ON DELETE SET NULL,
  campaign_id UUID REFERENCES public.em_campaigns(id) ON DELETE SET NULL,
  enrollment_id UUID REFERENCES public.em_sequence_enrollments(id) ON DELETE SET NULL,
  step_id UUID REFERENCES public.em_sequence_steps(id) ON DELETE SET NULL,
  sending_identity_id UUID REFERENCES public.em_sending_identities(id) ON DELETE SET NULL,
  resend_message_id TEXT,
  subject TEXT NOT NULL,
  to_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued', 'sent', 'failed', 'cancelled')),
  error_message TEXT,
  queued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  sent_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_em_email_sends_status ON public.em_email_sends (status);
CREATE INDEX IF NOT EXISTS idx_em_email_sends_resend_id ON public.em_email_sends (resend_message_id);
CREATE INDEX IF NOT EXISTS idx_em_email_sends_lead ON public.em_email_sends (lead_id);

CREATE TABLE IF NOT EXISTS public.em_email_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.em_leads(id) ON DELETE SET NULL,
  send_id UUID REFERENCES public.em_email_sends(id) ON DELETE SET NULL,
  direction TEXT NOT NULL CHECK (direction IN ('outbound', 'inbound')),
  from_email TEXT NOT NULL,
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT '',
  body_html TEXT,
  body_text TEXT,
  sending_identity_id UUID REFERENCES public.em_sending_identities(id) ON DELETE SET NULL,
  resend_message_id TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  sent_at TIMESTAMPTZ,
  received_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_em_email_messages_lead ON public.em_email_messages (lead_id, created_at);
CREATE INDEX IF NOT EXISTS idx_em_email_messages_inbound_unread
  ON public.em_email_messages (is_read, direction)
  WHERE direction = 'inbound' AND is_read = false;

CREATE TABLE IF NOT EXISTS public.em_email_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  send_id UUID REFERENCES public.em_email_sends(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.em_leads(id) ON DELETE SET NULL,
  message_id UUID REFERENCES public.em_email_messages(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL
    CHECK (event_type IN (
      'sent', 'delivered', 'opened', 'clicked', 'bounced',
      'complained', 'replied', 'unsubscribed'
    )),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_em_email_events_send ON public.em_email_events (send_id);
CREATE INDEX IF NOT EXISTS idx_em_email_events_lead ON public.em_email_events (lead_id, occurred_at);

-- ---------------------------------------------------------------------------
-- Compliance & meetings
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.em_unsubscribes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  lead_id UUID REFERENCES public.em_leads(id) ON DELETE SET NULL,
  source_campaign_id UUID REFERENCES public.em_campaigns(id) ON DELETE SET NULL,
  unsubscribed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_em_unsubscribes_email ON public.em_unsubscribes (lower(email));

CREATE TABLE IF NOT EXISTS public.em_meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.em_leads(id) ON DELETE CASCADE,
  source TEXT NOT NULL DEFAULT 'strategy_call'
    CHECK (source IN ('strategy_call', 'audit')),
  cal_event_id TEXT,
  booked_at TIMESTAMPTZ,
  meeting_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'booked'
    CHECK (status IN ('booked', 'reminded', 'held', 'no_show', 'cancelled')),
  reminder_sent_at JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- IMAP sync cursor for reply detection
CREATE TABLE IF NOT EXISTS public.em_imap_state (
  id TEXT PRIMARY KEY DEFAULT 'default',
  last_uid INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.em_imap_state (id, last_uid) VALUES ('default', 0)
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Default sequences
-- ---------------------------------------------------------------------------

INSERT INTO public.em_sequences (id, name, pipeline, is_default) VALUES
  ('a0000000-0000-4000-8000-000000000001', 'Inbound Nurture', 'inbound', true),
  ('a0000000-0000-4000-8000-000000000002', 'Cold Outreach', 'cold', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.em_sequence_steps (sequence_id, step_order, delay_days, subject_template, body_template, ai_generated, condition)
SELECT s.id, v.step_order, v.delay_days, v.subject_template, v.body_template, v.ai_generated, v.condition
FROM public.em_sequences s
CROSS JOIN (VALUES
  (1, 0, 'Thanks for reaching out, {{name}}', E'Hi {{name}},\n\nThanks for your interest in Boostmysites. We received your request and will be in touch shortly.\n\nBest,\nReshab', false, 'always'),
  (2, 2, 'Still interested in an automation audit?', E'Hi {{name}},\n\nWanted to follow up on your automation audit request. Would you like to book a quick call?\n\nBest,\nReshab', false, 'no_meeting')
) AS v(step_order, delay_days, subject_template, body_template, ai_generated, condition)
WHERE s.pipeline = 'inbound' AND s.is_default = true
  AND NOT EXISTS (SELECT 1 FROM public.em_sequence_steps ss WHERE ss.sequence_id = s.id);

INSERT INTO public.em_sequence_steps (sequence_id, step_order, delay_days, subject_template, body_template, ai_generated, condition)
SELECT s.id, v.step_order, v.delay_days, v.subject_template, v.body_template, v.ai_generated, v.condition
FROM public.em_sequences s
CROSS JOIN (VALUES
  (1, 0, '', '', true, 'always'),
  (2, 4, '', '', true, 'no_reply'),
  (3, 7, '', '', true, 'no_reply')
) AS v(step_order, delay_days, subject_template, body_template, ai_generated, condition)
WHERE s.pipeline = 'cold' AND s.is_default = true
  AND NOT EXISTS (SELECT 1 FROM public.em_sequence_steps ss WHERE ss.sequence_id = s.id AND ss.step_order = 1);

-- ---------------------------------------------------------------------------
-- Bridge: reshab_leads → em_leads
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.em_sync_reshab_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_sequence_id UUID;
  v_lead_id UUID;
BEGIN
  SELECT id INTO v_lead_id FROM public.em_leads WHERE lower(email) = lower(NEW.email);

  IF v_lead_id IS NULL THEN
    INSERT INTO public.em_leads (
      email, name, company, phone, source, pipeline, status, reshab_lead_id, metadata
    ) VALUES (
      lower(trim(NEW.email)),
      NEW.name,
      NEW.company,
      NEW.phone,
      'inbound_form',
      'inbound',
      'new',
      NEW.id,
      jsonb_build_object(
        'source_page', NEW.source_page,
        'submission_type', COALESCE(NEW.submission_type, 'high_intent'),
        'lead_score', NEW.lead_score,
        'lead_tier', NEW.lead_tier,
        'payload', NEW.payload
      )
    )
    RETURNING id INTO v_lead_id;
  ELSE
    UPDATE public.em_leads SET
      name = COALESCE(NEW.name, name),
      company = COALESCE(NEW.company, company),
      phone = COALESCE(NEW.phone, phone),
      reshab_lead_id = COALESCE(reshab_lead_id, NEW.id),
      metadata = metadata || jsonb_build_object(
        'source_page', NEW.source_page,
        'submission_type', COALESCE(NEW.submission_type, 'high_intent'),
        'lead_score', NEW.lead_score,
        'lead_tier', NEW.lead_tier,
        'payload', NEW.payload
      ),
      updated_at = now()
    WHERE id = v_lead_id;
  END IF;

  SELECT id INTO v_sequence_id
  FROM public.em_sequences
  WHERE pipeline = 'inbound' AND is_default = true
  LIMIT 1;

  IF v_sequence_id IS NOT NULL THEN
    INSERT INTO public.em_sequence_enrollments (lead_id, sequence_id, current_step, status, next_send_at)
    VALUES (v_lead_id, v_sequence_id, 0, 'active', now())
    ON CONFLICT (lead_id, sequence_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_em_sync_reshab_lead ON public.reshab_leads;
CREATE TRIGGER trg_em_sync_reshab_lead
  AFTER INSERT ON public.reshab_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.em_sync_reshab_lead();

-- Reset sent_today counters daily
CREATE OR REPLACE FUNCTION public.em_reset_sender_daily_counts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.em_sending_identities
  SET sent_today = 0, sent_today_reset_at = CURRENT_DATE
  WHERE sent_today_reset_at < CURRENT_DATE;
END;
$$;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

ALTER TABLE public.em_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_sending_identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_sequence_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_sequence_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_email_sends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_email_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_email_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_unsubscribes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_imap_state ENABLE ROW LEVEL SECURITY;

-- Authenticated admins: full access on em_* tables
DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'em_domains', 'em_sending_identities', 'em_settings', 'em_companies', 'em_leads',
    'em_sequences', 'em_sequence_steps', 'em_campaigns', 'em_sequence_enrollments',
    'em_email_sends', 'em_email_messages', 'em_email_events', 'em_unsubscribes',
    'em_meetings', 'em_imap_state'
  ]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Authenticated full access" ON public.%I', t);
    EXECUTE format(
      'CREATE POLICY "Authenticated full access" ON public.%I FOR ALL TO authenticated USING (true) WITH CHECK (true)',
      t
    );
  END LOOP;
END $$;

COMMENT ON TABLE public.em_leads IS 'Email marketing leads — bridged from reshab_leads for inbound';
