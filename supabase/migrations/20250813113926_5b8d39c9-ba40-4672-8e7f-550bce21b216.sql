-- Fix security issue: Enable RLS on customer_inquiries table
ALTER TABLE public.customer_inquiries ENABLE ROW LEVEL SECURITY;