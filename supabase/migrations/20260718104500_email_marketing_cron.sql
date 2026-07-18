-- Schedule email marketing edge functions via pg_cron + pg_net.
-- Root cause of stalled sequences: functions were deployed, but NOTHING called
-- em-process-sequences on a timer (Dashboard schedules were never created, and
-- pg_cron was not enabled). Enrollments sat with next_send_at in the past.

CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;

GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- Idempotent: drop prior jobs with these names if they exist
DO $drop$
DECLARE
  jid BIGINT;
BEGIN
  FOR jid IN
    SELECT jobid FROM cron.job
    WHERE jobname IN ('em-process-sequences-hourly', 'em-send-queue-15m')
  LOOP
    PERFORM cron.unschedule(jid);
  END LOOP;
EXCEPTION
  WHEN undefined_table THEN
    NULL; -- cron.job missing until extension is fully available
END $drop$;

-- Advance due enrollments (queue next step) — hourly
SELECT cron.schedule(
  'em-process-sequences-hourly',
  '0 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://upxsbhsamorhvnfebvor.supabase.co/functions/v1/em-process-sequences',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);

-- Flush queued sends — every 15 minutes
SELECT cron.schedule(
  'em-send-queue-15m',
  '*/15 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://upxsbhsamorhvnfebvor.supabase.co/functions/v1/em-send-queue',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
