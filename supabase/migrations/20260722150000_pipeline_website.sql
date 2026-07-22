-- Company website for pipeline leads. Run once in the Supabase SQL editor.
ALTER TABLE public.pipeline_leads
  ADD COLUMN IF NOT EXISTS website TEXT;
