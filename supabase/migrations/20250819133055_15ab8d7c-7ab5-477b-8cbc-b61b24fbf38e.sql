-- Create a public bucket for demo videos
insert into storage.buckets (id, name, public)
values ('demo-videos', 'demo-videos', true)
on conflict (id) do nothing;

-- Allow public read access to files in this bucket
create policy "Public read access to demo-videos"
  on storage.objects
  for select
  using (bucket_id = 'demo-videos');