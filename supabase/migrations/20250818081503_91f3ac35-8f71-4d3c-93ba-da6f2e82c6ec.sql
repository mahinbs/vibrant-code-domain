-- Create trial_leads table for AI Freelancing $1 trial landing page
CREATE TABLE IF NOT EXISTS public.trial_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  source TEXT DEFAULT 'ai_freelancing_trial',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.trial_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to submit trial leads
CREATE POLICY "Allow anonymous trial lead submissions"
ON public.trial_leads
FOR INSERT
TO public
WITH CHECK (true);

-- Only authenticated users can view trial leads
CREATE POLICY "Authenticated users can view trial leads"
ON public.trial_leads
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can update trial leads
CREATE POLICY "Authenticated users can update trial leads"
ON public.trial_leads
FOR UPDATE
TO authenticated
USING (true);

-- Add trigger for updated_at column
CREATE TRIGGER update_trial_leads_updated_at
  BEFORE UPDATE ON public.trial_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();