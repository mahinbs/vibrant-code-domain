-- Multi-touch abandonment reminders for founder partnership drafts
ALTER TABLE public.founder_application_drafts
  ADD COLUMN IF NOT EXISTS reminder_count INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_reminder_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_reminder_tier TEXT,
  ADD COLUMN IF NOT EXISTS ego_email_sent_at TIMESTAMPTZ;

COMMENT ON COLUMN public.founder_application_drafts.reminder_count IS
  'Number of recovery emails sent (R1–R4 ladder).';
COMMENT ON COLUMN public.founder_application_drafts.last_reminder_tier IS
  'Last tier sent: r1, r2, r3, r4_ego.';

CREATE INDEX IF NOT EXISTS idx_founder_drafts_reminder_ladder
  ON public.founder_application_drafts (status, reminder_count, updated_at)
  WHERE status = 'in_progress';
