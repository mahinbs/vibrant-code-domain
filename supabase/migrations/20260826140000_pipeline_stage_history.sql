-- Log of when each lead entered each stage.
ALTER TABLE public.pipeline_leads
  ADD COLUMN IF NOT EXISTS stage_history JSONB NOT NULL DEFAULT '[]'::jsonb;
-- Seed history with the current stage + its entry time.
UPDATE public.pipeline_leads
SET stage_history = jsonb_build_array(jsonb_build_object('stage', pipeline_stage, 'at', stage_at))
WHERE stage_history = '[]'::jsonb;
