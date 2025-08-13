-- Update the webinar event date to this upcoming Sunday
UPDATE webinar_events 
SET event_date = '2025-08-17 14:00:00+00'::timestamptz,
    updated_at = now()
WHERE is_active = true;