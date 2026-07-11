-- Sequence branch lanes + extended conditions + enrollment skip tracking

ALTER TABLE public.em_sequence_enrollments
  ADD COLUMN IF NOT EXISTS last_skip_reason TEXT,
  ADD COLUMN IF NOT EXISTS last_skip_step_order INT;

ALTER TABLE public.em_sequence_steps
  ADD COLUMN IF NOT EXISTS branch_lane TEXT NOT NULL DEFAULT 'main',
  ADD COLUMN IF NOT EXISTS branch_after_step_order INT NULL;

ALTER TABLE public.em_sequence_steps DROP CONSTRAINT IF EXISTS em_sequence_steps_sequence_id_step_order_key;
ALTER TABLE public.em_sequence_steps DROP CONSTRAINT IF EXISTS em_sequence_steps_lane_unique;
ALTER TABLE public.em_sequence_steps
  ADD CONSTRAINT em_sequence_steps_lane_unique
  UNIQUE (sequence_id, step_order, branch_lane);

ALTER TABLE public.em_sequence_steps DROP CONSTRAINT IF EXISTS em_sequence_steps_condition_check;
ALTER TABLE public.em_sequence_steps ADD CONSTRAINT em_sequence_steps_condition_check
  CHECK (condition IN (
    'no_reply', 'always', 'no_meeting', 'no_open', 'opened_not_replied', 'opened', 'clicked'
  ));

ALTER TABLE public.em_sequence_steps DROP CONSTRAINT IF EXISTS em_sequence_steps_branch_lane_check;
ALTER TABLE public.em_sequence_steps ADD CONSTRAINT em_sequence_steps_branch_lane_check
  CHECK (branch_lane IN ('main', 'opened', 'not_opened'));
