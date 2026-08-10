-- Follow-up proof log (up to 30 per lead): array of { n, note, by, at, file }.
-- Run once in the Supabase SQL editor.
ALTER TABLE public.pipeline_leads
  ADD COLUMN IF NOT EXISTS followups JSONB NOT NULL DEFAULT '[]'::jsonb;
