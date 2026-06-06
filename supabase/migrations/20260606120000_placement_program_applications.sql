-- Placement program applications from /placement-programs landing page
CREATE TABLE IF NOT EXISTS public.placement_program_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  program TEXT NOT NULL,
  background TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_placement_program_applications_created_at
  ON public.placement_program_applications (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_placement_program_applications_program
  ON public.placement_program_applications (program);

CREATE INDEX IF NOT EXISTS idx_placement_program_applications_status
  ON public.placement_program_applications (status);

ALTER TABLE public.placement_program_applications ENABLE ROW LEVEL SECURITY;

-- Public form submissions (anon key from the website)
CREATE POLICY "Allow anonymous placement program applications"
  ON public.placement_program_applications
  FOR INSERT
  WITH CHECK (true);

-- Admin panel reads via browser client (matches reshab_leads / trial_leads pattern)
CREATE POLICY "Allow viewing placement program applications"
  ON public.placement_program_applications
  FOR SELECT
  USING (true);

CREATE TRIGGER update_placement_program_applications_updated_at
  BEFORE UPDATE ON public.placement_program_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
