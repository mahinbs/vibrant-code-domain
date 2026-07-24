-- Meeting scheduling on pipeline leads. Run once in Supabase.
ALTER TABLE public.pipeline_leads
  ADD COLUMN IF NOT EXISTS meeting_at TEXT;
ALTER TABLE public.pipeline_leads
  ADD COLUMN IF NOT EXISTS meeting_notes TEXT;
ALTER TABLE public.pipeline_leads
  ADD COLUMN IF NOT EXISTS meeting_owner TEXT;
