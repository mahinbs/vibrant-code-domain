-- Native AI Automation Discovery questionnaire responses (/questionnaire).
-- Run once in the Supabase SQL editor.
CREATE TABLE IF NOT EXISTS public.questionnaire_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  company TEXT,
  website TEXT,
  industry TEXT,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_questionnaire_created_at ON public.questionnaire_responses (created_at DESC);

ALTER TABLE public.questionnaire_responses ENABLE ROW LEVEL SECURITY;

-- Public form can submit; admins can read.
CREATE POLICY "questionnaire insert" ON public.questionnaire_responses FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "questionnaire read"   ON public.questionnaire_responses FOR SELECT TO anon, authenticated USING (true);
