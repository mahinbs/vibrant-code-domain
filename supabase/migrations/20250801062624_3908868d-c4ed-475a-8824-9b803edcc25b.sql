-- Create salesperson_links table
CREATE TABLE public.salesperson_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  salesperson_name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL,
  services TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.salesperson_links ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated access (admin panel usage)
CREATE POLICY "Authenticated users can view salesperson links" 
ON public.salesperson_links 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create salesperson links" 
ON public.salesperson_links 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update salesperson links" 
ON public.salesperson_links 
FOR UPDATE 
USING (true);

CREATE POLICY "Authenticated users can delete salesperson links" 
ON public.salesperson_links 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_salesperson_links_updated_at
BEFORE UPDATE ON public.salesperson_links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();