-- Allow Digital Business Transformation checkout alongside acquisition plans.
ALTER TABLE public.acquisition_payments
  DROP CONSTRAINT IF EXISTS acquisition_payments_plan_id_check;

ALTER TABLE public.acquisition_payments
  ADD CONSTRAINT acquisition_payments_plan_id_check
  CHECK (plan_id IN ('monthly', 'yearly', 'digital'));
