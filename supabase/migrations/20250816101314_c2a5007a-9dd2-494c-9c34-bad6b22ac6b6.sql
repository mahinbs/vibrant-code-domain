
-- Add dedicated array column for Instagram/social-proof videos
ALTER TABLE public.webinar_events
ADD COLUMN IF NOT EXISTS social_proof_videos text[] DEFAULT '{}'::text[];
