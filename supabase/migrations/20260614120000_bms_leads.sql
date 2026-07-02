-- Separate leads table for Boostmysites-owned pages (homepage, personal-automation,
-- free-ai-automation-course). Kept apart from `reshab_leads`, which the
-- /business-automation team owns, so the two teams' data never mix.

CREATE TABLE IF NOT EXISTS public.bms_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source_page TEXT NOT NULL DEFAULT 'homepage',
  submission_type TEXT NOT NULL DEFAULT 'high_intent',
  lead_score INTEGER NOT NULL DEFAULT 0,
  lead_tier TEXT NOT NULL DEFAULT 'low',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_bms_leads_created_at ON public.bms_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bms_leads_source_page ON public.bms_leads (source_page);

ALTER TABLE public.bms_leads ENABLE ROW LEVEL SECURITY;

-- Public website forms (anon key) can submit leads.
CREATE POLICY "Allow anonymous bms lead submissions"
  ON public.bms_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admin dashboard can read them.
CREATE POLICY "Allow reading bms leads"
  ON public.bms_leads
  FOR SELECT
  TO anon, authenticated
  USING (true);
