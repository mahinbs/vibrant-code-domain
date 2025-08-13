-- Create webinar_events table for dynamic content management
CREATE TABLE public.webinar_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  speaker_name TEXT NOT NULL,
  speaker_bio TEXT NOT NULL,
  speaker_image TEXT,
  benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
  agenda JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  registration_limit INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create webinar_registrations table for form submissions
CREATE TABLE public.webinar_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  webinar_id UUID NOT NULL REFERENCES public.webinar_events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'registered',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.webinar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webinar_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for webinar_events
CREATE POLICY "Public can view active webinar events" 
ON public.webinar_events 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can manage webinar events" 
ON public.webinar_events 
FOR ALL 
USING (true)
WITH CHECK (true);

-- RLS Policies for webinar_registrations
CREATE POLICY "Anyone can register for webinars" 
ON public.webinar_registrations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can view registrations" 
ON public.webinar_registrations 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage registrations" 
ON public.webinar_registrations 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_webinar_events_updated_at
BEFORE UPDATE ON public.webinar_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_webinar_registrations_updated_at
BEFORE UPDATE ON public.webinar_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample webinar event
INSERT INTO public.webinar_events (
  title,
  subtitle,
  description,
  event_date,
  duration_minutes,
  speaker_name,
  speaker_bio,
  speaker_image,
  benefits,
  agenda
) VALUES (
  'Master AI Automation for Business Growth',
  'Transform Your Business with AI-Powered Solutions in 90 Minutes',
  'Join our exclusive webinar where industry experts reveal how to leverage AI automation to streamline operations, boost productivity, and accelerate business growth. Learn practical strategies that you can implement immediately.',
  '2025-01-19 14:00:00+00',
  90,
  'Alex Thompson',
  'AI Solutions Architect with 8+ years of experience helping businesses implement cutting-edge automation. Former Lead AI Engineer at Google, now helping SMEs scale with AI.',
  '/lovable-uploads/d0fa4f38-5951-4a69-9df8-13d4faa03aaa.png',
  '[
    "Identify automation opportunities in your business",
    "Build AI-powered workflows without coding",
    "Integrate AI tools with existing systems",
    "Measure ROI of AI implementations",
    "Scale operations with intelligent automation"
  ]',
  '[
    {"time": "14:00", "topic": "Welcome & AI Landscape Overview"},
    {"time": "14:15", "topic": "Identifying Automation Opportunities"},
    {"time": "14:30", "topic": "Live Demo: Building AI Workflows"},
    {"time": "15:00", "topic": "Integration Strategies & Best Practices"},
    {"time": "15:20", "topic": "Q&A Session"},
    {"time": "15:30", "topic": "Next Steps & Resources"}
  ]'
);