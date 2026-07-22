-- Responsiveness rating for pipeline leads (hot / warm / cold / useless).
-- Run once in the Supabase SQL editor.
ALTER TABLE public.pipeline_leads
  ADD COLUMN IF NOT EXISTS responsiveness TEXT;
