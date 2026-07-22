-- Attachments for the Sales Pipeline dashboard: follow-up PDFs, images, chat
-- screenshots. Adds a JSONB column on pipeline_leads and a public storage
-- bucket with anon-manageable policies (dashboard is behind an app login).
-- Run once in the Supabase SQL editor.

-- 1) Columns: free-text description + attachment metadata
--    [{name, path, url, type, size, uploaded_at}]
ALTER TABLE public.pipeline_leads
  ADD COLUMN IF NOT EXISTS description TEXT;

ALTER TABLE public.pipeline_leads
  ADD COLUMN IF NOT EXISTS attachments JSONB NOT NULL DEFAULT '[]'::jsonb;

-- 2) Public storage bucket for the files
INSERT INTO storage.buckets (id, name, public)
VALUES ('pipeline-files', 'pipeline-files', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 3) Storage policies scoped to this bucket
DROP POLICY IF EXISTS "pipeline files read"   ON storage.objects;
DROP POLICY IF EXISTS "pipeline files insert" ON storage.objects;
DROP POLICY IF EXISTS "pipeline files delete" ON storage.objects;

CREATE POLICY "pipeline files read"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'pipeline-files');

CREATE POLICY "pipeline files insert"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'pipeline-files');

CREATE POLICY "pipeline files delete"
  ON storage.objects FOR DELETE TO anon, authenticated
  USING (bucket_id = 'pipeline-files');
