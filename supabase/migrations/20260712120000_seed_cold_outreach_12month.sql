-- Seed "Cold Outreach — 12 Month" template (idempotent).
-- Same structure as installColdOutreach12MonthTemplate() in the app.

DO $seed$
DECLARE
  seq_id UUID;
  step_order INT;
  theme_idx INT;
  subj TEXT;
  body TEXT;
  stype TEXT;
  aangle TEXT;
  ainstr TEXT;
  cmode TEXT;
  agen BOOLEAN;
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.em_sequences WHERE name = 'Cold Outreach — 12 Month'
  ) THEN
    RETURN;
  END IF;

  INSERT INTO public.em_sequences (name, pipeline, description, vertical, is_default, is_active)
  VALUES (
    'Cold Outreach — 12 Month',
    'cold',
    '12-month cold nurture: intensive first 30 days with open/not-open branches, then weekly touches (weeks 5–52). Stops on reply. ~55 emails — trim weekly phase if domain reputation is new.',
    'automation',
    false,
    true
  )
  RETURNING id INTO seq_id;

  -- Phase 1
  INSERT INTO public.em_sequence_steps (
    sequence_id, step_order, branch_lane, branch_after_step_order,
    delay_days, delay_hours, condition, step_type, ai_angle, ai_instructions,
    subject_template, body_template, case_study_mode, ai_generated
  ) VALUES
  (seq_id, 1, 'main', NULL, 0, 0, 'always', 'ai_draft', 'opener', NULL,
   'Quick idea for {{company}}', '', 'fixed', true),
  (seq_id, 2, 'opened', 1, 3, 0, 'opened_not_replied', 'case_study', NULL, NULL,
   'Saw you opened — case study for {{company}}', '', 'auto_industry', false),
  (seq_id, 2, 'not_opened', 1, 3, 0, 'no_open', 'template', NULL, NULL,
   'Re: quick question',
   E'Hi {{name}},\n\nBumping this in case it got buried — still happy to share how teams like {{company}} automate follow-up.\n\nWorth a look?',
   'fixed', false),
  (seq_id, 3, 'main', NULL, 5, 0, 'no_reply', 'ai_draft', 'niche_followup', NULL,
   'Automation audit for {{company}}', '', 'fixed', true),
  (seq_id, 4, 'opened', 3, 3, 0, 'opened_not_replied', 'template', NULL, NULL,
   'Worth 15 min, {{name}}?',
   E'Hi {{name}},\n\nNoticed you read my last note — if timing works, I can walk through a quick automation audit for {{company}}.\n\nReply with a time?',
   'fixed', false),
  (seq_id, 4, 'not_opened', 3, 3, 0, 'no_open', 'template', NULL, NULL,
   'Different angle — ops at {{company}}',
   E'Hi {{name}},\n\nTrying a different angle: most teams we talk to lose hours on manual lead follow-up. We fix that with light automation.\n\nOpen to a 10-min call?',
   'fixed', false),
  (seq_id, 5, 'main', NULL, 7, 0, 'no_reply', 'ai_draft', 'breakup', NULL,
   'Should I close your file?', '', 'fixed', true),
  (seq_id, 6, 'main', NULL, 7, 0, 'no_meeting', 'template', NULL, NULL,
   'Book a call — {{company}} automation',
   E'Hi {{name}},\n\nIf you''d like to explore automation for {{company}}, grab a slot here: [your Calendly link]\n\nNo pressure if timing isn''t right.',
   'fixed', false),
  (seq_id, 7, 'main', NULL, 3, 0, 'clicked', 'template', NULL, NULL,
   'Saw you clicked — chat this week?',
   E'Hi {{name}},\n\nLooks like you checked out our link — happy to answer questions or walk through a quick audit for {{company}}.\n\nWhat does your week look like?',
   'fixed', false);

  -- Phase 2: weekly steps 8–55 (weeks 5–52), 7-day delay, no_reply
  FOR step_order IN 8..55 LOOP
    theme_idx := (step_order - 8) % 8;
    stype := 'template';
    aangle := NULL;
    ainstr := NULL;
    cmode := 'fixed';
    agen := false;
    subj := 'Following up — {{company}}';
    body := '';

    CASE theme_idx
      WHEN 0 THEN
        stype := 'case_study'; cmode := 'auto_industry';
        subj := 'How {{company}} peers automated ops';
      WHEN 1 THEN
        stype := 'ai_draft'; aangle := 'custom'; agen := true;
        ainstr := 'Share one timely industry trend and tie it to automation ROI for their company.';
        subj := 'Quick thought for {{company}}';
      WHEN 2 THEN
        subj := 'Still manual on {{company}}''s follow-up?';
        body := E'Hi {{name}},\n\nCurious — is lead follow-up still mostly manual at {{company}}? We help teams automate that without adding headcount.\n\nWorth a quick chat?';
      WHEN 3 THEN
        stype := 'case_study'; cmode := 'auto_industry';
        subj := 'Another win in your space';
      WHEN 4 THEN
        stype := 'ai_draft'; aangle := 'case_study_tease'; agen := true;
        ainstr := 'Tease a free automation audit and one concrete workflow they could automate.';
        subj := 'Free automation audit for {{company}}?';
      WHEN 5 THEN
        subj := 'Teams like yours save 10+ hrs/week';
        body := E'Hi {{name}},\n\nWe recently helped a similar team cut manual ops by double digits hours per week. Happy to share how if useful.\n\n— BoostMySites';
      WHEN 6 THEN
        stype := 'ai_draft'; aangle := 'niche_followup'; agen := true;
        subj := 'Re: {{company}}';
      WHEN 7 THEN
        subj := '15 min this week?';
        body := E'Hi {{name}},\n\nIf automation is still on your radar, I can walk you through a 15-min audit for {{company}}. Reply with a time or grab a slot on our calendar.\n\nBest,';
      ELSE NULL;
    END CASE;

    INSERT INTO public.em_sequence_steps (
      sequence_id, step_order, branch_lane, delay_days, delay_hours,
      condition, step_type, ai_angle, ai_instructions,
      subject_template, body_template, case_study_mode, ai_generated
    ) VALUES (
      seq_id, step_order, 'main', 7, 0, 'no_reply',
      stype, aangle, ainstr, subj, body, cmode, agen
    );
  END LOOP;
END $seed$;
