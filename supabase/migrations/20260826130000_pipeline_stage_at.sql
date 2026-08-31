-- Track when each lead entered its current stage (stuck-too-long alerts).
ALTER TABLE public.pipeline_leads
  ADD COLUMN IF NOT EXISTS stage_at TIMESTAMPTZ NOT NULL DEFAULT now();
-- Backfill: best guess = last update time (or created).
UPDATE public.pipeline_leads SET stage_at = COALESCE(updated_at, created_at, now());
