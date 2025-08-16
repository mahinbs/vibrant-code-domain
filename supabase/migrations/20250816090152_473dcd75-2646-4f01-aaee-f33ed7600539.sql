-- Add new fields to webinar_events table for enhanced landing page control
ALTER TABLE public.webinar_events 
ADD COLUMN hero_headline text,
ADD COLUMN hero_subtitle text,
ADD COLUMN show_scarcity boolean DEFAULT true,
ADD COLUMN sticky_cta_enabled boolean DEFAULT true,
ADD COLUMN cta_text text DEFAULT 'Reserve My Spot Now',
ADD COLUMN cta_bg_color text DEFAULT '#22c55e',
ADD COLUMN target_audience text[] DEFAULT '{}',
ADD COLUMN social_proof_logos text[] DEFAULT '{}',
ADD COLUMN recognitions text[] DEFAULT '{"Forbes", "Entrepreneur Magazine", "Times of India Award"}',
ADD COLUMN testimonials jsonb DEFAULT '[]',
ADD COLUMN show_social_proof boolean DEFAULT true,
ADD COLUMN privacy_note text DEFAULT 'We never spam or share your info.',
ADD COLUMN show_agenda_collapsible boolean DEFAULT true;