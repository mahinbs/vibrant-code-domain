-- Public bucket for portfolio project images (uploads via Edge Function + service role)
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

create policy "Public read for portfolio-images"
on storage.objects
for select
using (bucket_id = 'portfolio-images');

create policy "Service role can modify portfolio-images"
on storage.objects
for all
using (auth.role() = 'service_role' and bucket_id = 'portfolio-images')
with check (auth.role() = 'service_role' and bucket_id = 'portfolio-images');
