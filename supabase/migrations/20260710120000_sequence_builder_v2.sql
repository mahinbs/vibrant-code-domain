-- Sequence Builder V2: flexible steps, AI angles, case studies, draft cache

-- ---------------------------------------------------------------------------
-- Extend em_sequences
-- ---------------------------------------------------------------------------

ALTER TABLE public.em_sequences
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS vertical TEXT,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS cloned_from_id UUID REFERENCES public.em_sequences(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS settings JSONB NOT NULL DEFAULT '{}'::jsonb;

-- ---------------------------------------------------------------------------
-- Extend em_sequence_steps
-- ---------------------------------------------------------------------------

ALTER TABLE public.em_sequence_steps
  ADD COLUMN IF NOT EXISTS step_type TEXT NOT NULL DEFAULT 'template',
  ADD COLUMN IF NOT EXISTS ai_angle TEXT,
  ADD COLUMN IF NOT EXISTS ai_instructions TEXT,
  ADD COLUMN IF NOT EXISTS case_study_slug TEXT,
  ADD COLUMN IF NOT EXISTS case_study_url TEXT,
  ADD COLUMN IF NOT EXISTS case_study_mode TEXT NOT NULL DEFAULT 'fixed',
  ADD COLUMN IF NOT EXISTS intro_template TEXT,
  ADD COLUMN IF NOT EXISTS delay_hours INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.em_sequence_steps DROP CONSTRAINT IF EXISTS em_sequence_steps_step_type_check;
ALTER TABLE public.em_sequence_steps ADD CONSTRAINT em_sequence_steps_step_type_check
  CHECK (step_type IN ('template', 'ai_draft', 'case_study', 'hybrid'));

ALTER TABLE public.em_sequence_steps DROP CONSTRAINT IF EXISTS em_sequence_steps_ai_angle_check;
ALTER TABLE public.em_sequence_steps ADD CONSTRAINT em_sequence_steps_ai_angle_check
  CHECK (ai_angle IS NULL OR ai_angle IN (
    'opener', 'niche_followup', 'breakup', 'case_study_tease', 'custom'
  ));

ALTER TABLE public.em_sequence_steps DROP CONSTRAINT IF EXISTS em_sequence_steps_case_study_mode_check;
ALTER TABLE public.em_sequence_steps ADD CONSTRAINT em_sequence_steps_case_study_mode_check
  CHECK (case_study_mode IN ('fixed', 'auto_industry'));

-- Backfill inbound steps
UPDATE public.em_sequence_steps ss
SET step_type = 'template'
FROM public.em_sequences s
WHERE ss.sequence_id = s.id
  AND s.pipeline = 'inbound'
  AND ss.ai_generated = false;

-- Backfill cold AI steps
UPDATE public.em_sequence_steps ss
SET
  step_type = 'ai_draft',
  ai_angle = CASE ss.step_order
    WHEN 1 THEN 'opener'
    WHEN 2 THEN 'niche_followup'
    ELSE 'breakup'
  END
FROM public.em_sequences s
WHERE ss.sequence_id = s.id
  AND s.pipeline = 'cold'
  AND ss.ai_generated = true;

-- Sync ai_generated from step_type
UPDATE public.em_sequence_steps
SET ai_generated = (step_type = 'ai_draft' OR step_type = 'hybrid')
WHERE step_type IS NOT NULL;

-- ---------------------------------------------------------------------------
-- AI draft cache
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.em_ai_draft_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.em_leads(id) ON DELETE CASCADE,
  step_id UUID NOT NULL REFERENCES public.em_sequence_steps(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES public.em_sequence_enrollments(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (lead_id, step_id, enrollment_id)
);

CREATE INDEX IF NOT EXISTS idx_em_ai_draft_cache_lookup
  ON public.em_ai_draft_cache (lead_id, step_id, enrollment_id);

-- ---------------------------------------------------------------------------
-- Template library
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.em_sequence_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.em_sequence_templates (name, subject, body, tags) VALUES
  (
    'Breakup v1',
    'Last note, {{name}}',
    E'Hi {{name}},\n\nI know inboxes get busy — this is my last note. If automation ever becomes a priority at {{company}}, happy to help.\n\nBest,\nReshab',
    ARRAY['breakup', 'cold']
  ),
  (
    'Case study intro',
    'Quick case study for {{company}}',
    E'Hi {{name}},\n\nThought this might resonate — we helped a similar team with {{case_study_title}}:\n\n{{case_study_hook}}\n\n{{case_study_url}}\n\nWorth a quick look?\n\nReshab',
    ARRAY['case_study', 'cold']
  )
ON CONFLICT DO NOTHING;

-- Extend step conditions for advanced branching
ALTER TABLE public.em_sequence_steps DROP CONSTRAINT IF EXISTS em_sequence_steps_condition_check;
ALTER TABLE public.em_sequence_steps ADD CONSTRAINT em_sequence_steps_condition_check
  CHECK (condition IN ('no_reply', 'always', 'no_meeting', 'no_open', 'opened_not_replied'));

-- ---------------------------------------------------------------------------
-- Enrollment lookup index
-- ---------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_em_sequence_enrollments_lead_status
  ON public.em_sequence_enrollments (lead_id, status);

-- ---------------------------------------------------------------------------
-- Seed: Cold — Automation audit (example 4-step sequence)
-- ---------------------------------------------------------------------------

INSERT INTO public.em_sequences (id, name, pipeline, is_default, description, vertical, is_active)
VALUES (
  'a0000000-0000-4000-8000-000000000003',
  'Cold — Automation audit',
  'cold',
  false,
  'AI opener → case study → niche follow-up → template breakup',
  'general',
  true
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.em_sequence_steps (
  sequence_id, step_order, delay_days, delay_hours, subject_template, body_template,
  ai_generated, condition, step_type, ai_angle, case_study_mode, intro_template
)
SELECT
  'a0000000-0000-4000-8000-000000000003'::uuid,
  v.step_order,
  v.delay_days,
  0,
  v.subject_template,
  v.body_template,
  v.ai_generated,
  v.condition,
  v.step_type,
  v.ai_angle,
  v.case_study_mode,
  v.intro_template
FROM (VALUES
  (1, 0, '', '', true, 'always', 'ai_draft', 'opener', 'fixed', NULL),
  (2, 3, 'Case study for {{company}}', '', false, 'no_reply', 'case_study', NULL, 'auto_industry',
   E'Hi {{name}},\n\nThought this might resonate:\n\n{{case_study_title}} — {{case_study_hook}}\n\n{{case_study_url}}\n\nReshab'),
  (3, 6, '', '', true, 'no_reply', 'ai_draft', 'niche_followup', 'fixed', NULL),
  (4, 10, 'Last note, {{name}}',
   E'Hi {{name}},\n\nLast note from me — happy to close the loop if timing isn''t right.\n\nBest,\nReshab',
   false, 'no_reply', 'template', NULL, 'fixed', NULL)
) AS v(step_order, delay_days, subject_template, body_template, ai_generated, condition,
       step_type, ai_angle, case_study_mode, intro_template)
WHERE NOT EXISTS (
  SELECT 1 FROM public.em_sequence_steps ss
  WHERE ss.sequence_id = 'a0000000-0000-4000-8000-000000000003'::uuid
);

-- ---------------------------------------------------------------------------
-- RLS for new tables
-- ---------------------------------------------------------------------------

ALTER TABLE public.em_ai_draft_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.em_sequence_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated full access" ON public.em_ai_draft_cache;
CREATE POLICY "Authenticated full access" ON public.em_ai_draft_cache
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated full access" ON public.em_sequence_templates;
CREATE POLICY "Authenticated full access" ON public.em_sequence_templates
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
