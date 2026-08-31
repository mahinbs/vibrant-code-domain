-- Staged pipeline: lead → pre_call (3 follow-ups) → call → meeting → post_meeting (7 follow-ups) → sale, + lost.
-- Run once in the Supabase SQL editor (project khxkorrvylcscyqfklxi).
ALTER TABLE public.pipeline_leads
  ADD COLUMN IF NOT EXISTS pipeline_stage TEXT NOT NULL DEFAULT 'lead';

-- Backfill existing leads from what we already know:
-- explicit win → sale; past meeting → post_meeting; upcoming meeting → meeting;
-- has follow-ups → pre_call; else stays 'lead'.
UPDATE public.pipeline_leads SET pipeline_stage = CASE
  WHEN current_stage ~* 'won|closed[ -]?win' OR status ~* 'won|closed[ -]?win' THEN 'sale'
  WHEN current_stage ~* 'lost|dead|dropped' OR status ~* 'lost|dead|dropped' THEN 'lost'
  WHEN meeting_at ~ '^\d{4}-\d{2}-\d{2}'
       AND (meeting_at)::timestamptz < now() THEN 'post_meeting'
  WHEN meeting_at IS NOT NULL AND meeting_at <> '' THEN 'meeting'
  WHEN jsonb_array_length(COALESCE(followups, '[]'::jsonb)) > 0 THEN 'pre_call'
  ELSE 'lead'
END
WHERE pipeline_stage = 'lead';
