-- Update existing "Cold Outreach — 12 Month" steps 6–55 with fixed template copy.
-- Safe to re-run. New installs should use install/refresh from admin UI instead.

DO $upd$
DECLARE
  seq_id UUID;
  r RECORD;
BEGIN
  SELECT id INTO seq_id FROM public.em_sequences WHERE name = 'Cold Outreach — 12 Month' LIMIT 1;
  IF seq_id IS NULL THEN
    RETURN;
  END IF;

  -- Step 6–7 (phase 1 tail)
  UPDATE public.em_sequence_steps SET
    step_type = 'template', ai_generated = false, ai_angle = NULL, ai_instructions = NULL,
    subject_template = 'Free 15 min, {{name}}?',
    body_template = E'No pitch here — just a slot if you want it: [calendly link]\nIf automation for {{company}} isn''t a priority right now, no worries, I''ll stop pinging.'
  WHERE sequence_id = seq_id AND step_order = 6 AND branch_lane = 'main';

  UPDATE public.em_sequence_steps SET
    step_type = 'template', ai_generated = false, ai_angle = NULL, ai_instructions = NULL,
    subject_template = 'Saw you opened this — one question',
    body_template = E'No pressure, just curious if this is something {{company}} is actively looking at, or just filed for later.'
  WHERE sequence_id = seq_id AND step_order = 7 AND branch_lane = 'main';

  -- Weekly steps: force template mode (copy lives in app refresh for full 48 variants)
  UPDATE public.em_sequence_steps SET
    ai_generated = false, ai_angle = NULL, ai_instructions = NULL,
    step_type = CASE WHEN step_type = 'case_study' THEN 'case_study' ELSE 'template' END
  WHERE sequence_id = seq_id AND step_order BETWEEN 8 AND 55 AND branch_lane = 'main';

  DELETE FROM public.em_ai_draft_cache
  WHERE step_id IN (
    SELECT id FROM public.em_sequence_steps
    WHERE sequence_id = seq_id AND step_order BETWEEN 6 AND 55
  );
END $upd$;
