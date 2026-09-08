-- Abandon tracking + GST invoice fields for acquisition checkout.
ALTER TABLE public.acquisition_payments
  ADD COLUMN IF NOT EXISTS abandon_email_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS abandon_email_count INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS invoice_number TEXT,
  ADD COLUMN IF NOT EXISTS invoice_sent_at TIMESTAMPTZ;

CREATE UNIQUE INDEX IF NOT EXISTS idx_acquisition_payments_invoice_number
  ON public.acquisition_payments (invoice_number)
  WHERE invoice_number IS NOT NULL;

-- Shared counter for BMS/{FY}/{####} invoice numbers (FY starts April).
CREATE TABLE IF NOT EXISTS public.acquisition_invoice_counters (
  fy TEXT PRIMARY KEY,
  last_seq INTEGER NOT NULL DEFAULT 0
);

CREATE OR REPLACE FUNCTION public.next_acquisition_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  y INTEGER := EXTRACT(YEAR FROM now())::INTEGER;
  m INTEGER := EXTRACT(MONTH FROM now())::INTEGER;
  start_y INTEGER;
  fy TEXT;
  seq INTEGER;
BEGIN
  start_y := CASE WHEN m >= 4 THEN y ELSE y - 1 END;
  fy := right(start_y::TEXT, 2) || '-' || right((start_y + 1)::TEXT, 2);

  INSERT INTO public.acquisition_invoice_counters (fy, last_seq)
  VALUES (fy, 1)
  ON CONFLICT (fy) DO UPDATE
    SET last_seq = public.acquisition_invoice_counters.last_seq + 1
  RETURNING last_seq INTO seq;

  RETURN 'BMS/' || fy || '/' || lpad(seq::TEXT, 4, '0');
END;
$$;

REVOKE ALL ON FUNCTION public.next_acquisition_invoice_number() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.next_acquisition_invoice_number() TO service_role;

ALTER TABLE public.acquisition_invoice_counters ENABLE ROW LEVEL SECURITY;
