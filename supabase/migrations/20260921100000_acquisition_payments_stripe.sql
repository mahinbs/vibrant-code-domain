-- Stripe international checkout alongside Razorpay (India).
ALTER TABLE public.acquisition_payments
  ADD COLUMN IF NOT EXISTS provider TEXT NOT NULL DEFAULT 'razorpay';

ALTER TABLE public.acquisition_payments
  DROP CONSTRAINT IF EXISTS acquisition_payments_provider_check;

ALTER TABLE public.acquisition_payments
  ADD CONSTRAINT acquisition_payments_provider_check
  CHECK (provider IN ('razorpay', 'stripe'));

ALTER TABLE public.acquisition_payments
  ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT;

ALTER TABLE public.acquisition_payments
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;

ALTER TABLE public.acquisition_payments
  ADD COLUMN IF NOT EXISTS amount_usd INTEGER;

CREATE UNIQUE INDEX IF NOT EXISTS idx_acquisition_payments_stripe_session
  ON public.acquisition_payments (stripe_checkout_session_id)
  WHERE stripe_checkout_session_id IS NOT NULL;
