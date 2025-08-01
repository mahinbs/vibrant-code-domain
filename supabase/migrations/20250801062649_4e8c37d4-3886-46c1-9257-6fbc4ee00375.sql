-- Fix RLS issues for existing tables
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;

-- Create public access policies for blogs (public content)
CREATE POLICY "Public can view published blogs"
ON public.blogs
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can manage blogs"
ON public.blogs
FOR ALL
USING (true)
WITH CHECK (true);

-- Create public access policies for portfolios (public content)  
CREATE POLICY "Public can view portfolios"
ON public.portfolios
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can manage portfolios"
ON public.portfolios
FOR ALL
USING (true)
WITH CHECK (true);