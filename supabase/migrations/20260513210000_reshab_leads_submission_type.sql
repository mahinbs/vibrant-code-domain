-- Distinguish full high-intent form vs quick “strategy call” modal on the same table.
ALTER TABLE public.reshab_leads
  ADD COLUMN IF NOT EXISTS submission_type TEXT NOT NULL DEFAULT 'high_intent';

COMMENT ON COLUMN public.reshab_leads.submission_type IS
  'high_intent: full multi-step form. strategy_call: quick name / WhatsApp / email from industry landing band.';

CREATE INDEX IF NOT EXISTS idx_reshab_leads_submission_type ON public.reshab_leads (submission_type);
