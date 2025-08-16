-- Create a public bucket for webinar media recognition logos
insert into storage.buckets (id, name, public)
values ('webinar-logos', 'webinar-logos', true)
on conflict (id) do nothing;

-- Public read access for webinar-logos
create policy "Public read for webinar-logos"
on storage.objects
for select
using (bucket_id = 'webinar-logos');

-- Service role-only write access for webinar-logos (secure uploads via Edge Function)
create policy "Service role can modify webinar-logos"
on storage.objects
for all
using (auth.role() = 'service_role' and bucket_id = 'webinar-logos')
with check (auth.role() = 'service_role' and bucket_id = 'webinar-logos');