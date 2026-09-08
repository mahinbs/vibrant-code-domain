-- Acquisition checkout payments (Razorpay).
CREATE TABLE IF NOT EXISTS public.acquisition_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  plan_id TEXT NOT NULL CHECK (plan_id IN ('monthly', 'yearly')),
  status TEXT NOT NULL DEFAULT 'created'
    CHECK (status IN ('created', 'pending', 'paid', 'failed')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  gstin TEXT,
  base_inr INTEGER NOT NULL,
  gst_inr INTEGER NOT NULL,
  total_inr INTEGER NOT NULL,
  amount_paise INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  webhook_event_id TEXT,
  notes JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_acquisition_payments_email
  ON public.acquisition_payments (email);
CREATE INDEX IF NOT EXISTS idx_acquisition_payments_status
  ON public.acquisition_payments (status);
CREATE INDEX IF NOT EXISTS idx_acquisition_payments_order
  ON public.acquisition_payments (razorpay_order_id);

ALTER TABLE public.acquisition_payments ENABLE ROW LEVEL SECURITY;

-- No public read/write; edge functions use the service role.
CREATE POLICY "Service role manages acquisition payments"
  ON public.acquisition_payments
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
