-- Create coupons table to track coupon generation and usage
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  is_used BOOLEAN NOT NULL DEFAULT false,
  discount_amount INTEGER NOT NULL DEFAULT 100, -- in cents, $1 = 100 cents
  discount_type TEXT NOT NULL DEFAULT 'fixed', -- 'fixed' or 'percentage'
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to view their own coupons by email
CREATE POLICY "select_own_coupon_by_email" ON public.coupons
FOR SELECT
USING (true); -- Allow reading for validation purposes

-- Create policy for edge functions to insert and update coupons
CREATE POLICY "insert_coupon" ON public.coupons
FOR INSERT
WITH CHECK (true);

CREATE POLICY "update_coupon" ON public.coupons
FOR UPDATE
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_coupon_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_coupons_updated_at
BEFORE UPDATE ON public.coupons
FOR EACH ROW
EXECUTE FUNCTION public.update_coupon_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_coupons_email ON public.coupons(email);
CREATE INDEX idx_coupons_code ON public.coupons(code);
CREATE INDEX idx_coupons_expires_at ON public.coupons(expires_at);