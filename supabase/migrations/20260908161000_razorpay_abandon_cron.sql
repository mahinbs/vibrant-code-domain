-- Cron: cart-abandon emails for unpaid acquisition checkouts (every 15 min).
-- Target project: khxkorrvylcscyqfklxi (boostmysites.com site).

CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;

GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

DO $drop$
DECLARE
  jid BIGINT;
BEGIN
  FOR jid IN
    SELECT jobid FROM cron.job
    WHERE jobname IN ('razorpay-abandon-cron-15m')
  LOOP
    PERFORM cron.unschedule(jid);
  END LOOP;
EXCEPTION
  WHEN undefined_table THEN
    NULL;
END $drop$;

SELECT cron.schedule(
  'razorpay-abandon-cron-15m',
  '*/15 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://khxkorrvylcscyqfklxi.supabase.co/functions/v1/razorpay-abandon-cron',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
