-- High-intent redesign leads (homepage + industry landings + services modal)
CREATE TABLE IF NOT EXISTS public.reshab_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source_page TEXT NOT NULL DEFAULT 'homepage',
  lead_score INTEGER NOT NULL DEFAULT 0,
  lead_tier TEXT NOT NULL DEFAULT 'low',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_reshab_leads_created_at ON public.reshab_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reshab_leads_lead_tier ON public.reshab_leads (lead_tier);
CREATE INDEX IF NOT EXISTS idx_reshab_leads_source_page ON public.reshab_leads (source_page);

ALTER TABLE public.reshab_leads ENABLE ROW LEVEL SECURITY;

-- Match public form + admin list pattern used elsewhere (browser anon key)
CREATE POLICY "Allow anonymous reshab lead submissions"
  ON public.reshab_leads
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous to view reshab leads"
  ON public.reshab_leads
  FOR SELECT
  USING (true);
