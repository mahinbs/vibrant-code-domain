
-- Check if RLS is enabled on customer_inquiries table and add policy for anonymous inserts
-- This allows anyone to submit contact forms without authentication

-- Create policy to allow anonymous inserts into customer_inquiries
CREATE POLICY "Allow anonymous form submissions" 
ON public.customer_inquiries 
FOR INSERT 
WITH CHECK (true);

-- Also allow anonymous users to select their own submissions (optional, for confirmation)
CREATE POLICY "Allow anonymous to view submissions" 
ON public.customer_inquiries 
FOR SELECT 
USING (true);
