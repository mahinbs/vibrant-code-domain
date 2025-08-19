
-- Allow public, read-only viewing of trial leads so the admin panel can fetch data
-- Note: trial_leads already has INSERT for anonymous users and SELECT for authenticated.
-- This policy adds SELECT for anonymous (public) clients too.
create policy "Public can view trial leads"
  on public.trial_leads
  for select
  using (true);
