-- Partial founder partnership applications for resume + abandonment recovery.
CREATE TABLE IF NOT EXISTS public.founder_application_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resume_token TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  source_page TEXT NOT NULL DEFAULT 'founder-partnership',
  current_step TEXT NOT NULL DEFAULT 'identity',
  payload JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'in_progress',
  recovery_sent_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_founder_drafts_email ON public.founder_application_drafts (email);
CREATE INDEX IF NOT EXISTS idx_founder_drafts_status_updated ON public.founder_application_drafts (status, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_founder_drafts_recovery ON public.founder_application_drafts (status, recovery_sent_at)
  WHERE status = 'in_progress';

COMMENT ON TABLE public.founder_application_drafts IS
  'In-progress founder partnership applications; resume_token in URL for recovery.';

ALTER TABLE public.founder_application_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous founder draft upsert"
  ON public.founder_application_drafts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous founder draft update"
  ON public.founder_application_drafts
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous founder draft select"
  ON public.founder_application_drafts
  FOR SELECT
  USING (true);

-- Document founder_partnership submission type on reshab_leads (column is free text).
COMMENT ON COLUMN public.reshab_leads.submission_type IS
  'high_intent: full multi-step form. strategy_call: quick modal. founder_partnership: immersive founder application.';
