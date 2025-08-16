-- Move Instagram URLs from social_proof_logos to social_proof_videos and clean up arrays
UPDATE webinar_events 
SET 
  social_proof_videos = COALESCE(
    (
      SELECT array_agg(url)
      FROM unnest(COALESCE(social_proof_logos, '{}'::text[])) AS url
      WHERE url ILIKE '%instagram.com%'
    ),
    '{}'::text[]
  ),
  social_proof_logos = COALESCE(
    (
      SELECT array_agg(url) 
      FROM unnest(COALESCE(social_proof_logos, '{}'::text[])) AS url
      WHERE url NOT ILIKE '%instagram.com%'
    ),
    '{}'::text[]
  )
WHERE 
  social_proof_logos IS NOT NULL 
  AND EXISTS (
    SELECT 1 
    FROM unnest(social_proof_logos) AS url 
    WHERE url ILIKE '%instagram.com%'
  );

-- Ensure all arrays are non-null
UPDATE webinar_events 
SET 
  social_proof_logos = COALESCE(social_proof_logos, '{}'::text[]),
  social_proof_videos = COALESCE(social_proof_videos, '{}'::text[]),
  target_audience = COALESCE(target_audience, '{}'::text[]),
  recognitions = COALESCE(recognitions, '{}'::text[])
WHERE 
  social_proof_logos IS NULL 
  OR social_proof_videos IS NULL 
  OR target_audience IS NULL 
  OR recognitions IS NULL;