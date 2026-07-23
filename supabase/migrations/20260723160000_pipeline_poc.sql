-- Point of contact (team member owning the lead). Run once in Supabase.
ALTER TABLE public.pipeline_leads
  ADD COLUMN IF NOT EXISTS poc TEXT;
