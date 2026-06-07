-- Lock down reading leads to authenticated admins (Supabase Auth).
-- Public INSERT stays open so the website lead forms keep working for anon visitors.
--
-- NOTE: this grants SELECT to ANY authenticated user, so public sign-ups must be
-- DISABLED in Supabase (Authentication -> Providers -> Email -> "Allow new users
-- to sign up" = off) and admin users created manually in the dashboard.

-- Remove the old "anyone can read" policy.
DROP POLICY IF EXISTS "Allow anonymous to view reshab leads" ON public.reshab_leads;

-- Authenticated admins can read all leads.
DROP POLICY IF EXISTS "Authenticated can view reshab leads" ON public.reshab_leads;
CREATE POLICY "Authenticated can view reshab leads"
  ON public.reshab_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Keep public (anon) INSERT for website form submissions.
DROP POLICY IF EXISTS "Allow anonymous reshab lead submissions" ON public.reshab_leads;
CREATE POLICY "Allow anonymous reshab lead submissions"
  ON public.reshab_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
