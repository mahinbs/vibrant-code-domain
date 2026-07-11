-- Full cold-outreach copy lives in the app (weeklyCycleCopy.ts + coldOutreach12MonthTemplate.ts).
-- Run "Refresh 12-month copy" in Admin → Email marketing → Sequences to push all
-- subject/body fields into the DB. Steps you manually save are left alone (copy_locked).

DO $upd$
DECLARE
  seq_id UUID;
BEGIN
  SELECT id INTO seq_id FROM public.em_sequences WHERE name = 'Cold Outreach — 12 Month' LIMIT 1;
  IF seq_id IS NULL THEN
    RETURN;
  END IF;

  -- Clear AI flags on steps 1–55 so nothing waits on Gemini for default copy
  UPDATE public.em_sequence_steps SET
    ai_generated = false,
    ai_angle = NULL,
    ai_instructions = NULL,
    step_type = CASE WHEN step_type = 'case_study' THEN 'case_study' ELSE 'template' END
  WHERE sequence_id = seq_id
    AND step_order BETWEEN 1 AND 55
    AND COALESCE((metadata->>'copy_locked')::boolean, false) = false;

  DELETE FROM public.em_ai_draft_cache
  WHERE step_id IN (
    SELECT id FROM public.em_sequence_steps
    WHERE sequence_id = seq_id AND step_order BETWEEN 1 AND 55
      AND COALESCE((metadata->>'copy_locked')::boolean, false) = false
  );
END $upd$;
