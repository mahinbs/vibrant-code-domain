
-- Add a 'deleted_at' column for soft deletes
ALTER TABLE public.customer_inquiries ADD COLUMN deleted_at TIMESTAMPTZ;

-- Create a table to store the audit trail for inquiries
CREATE TABLE public.inquiry_audit_trails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES public.customer_inquiries(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create a function to automatically log changes to the audit trail
CREATE OR REPLACE FUNCTION public.log_inquiry_changes()
RETURNS TRIGGER AS $$
DECLARE
  audit_action TEXT;
BEGIN
  IF (TG_OP = 'INSERT') THEN
    audit_action := 'created';
    INSERT INTO public.inquiry_audit_trails (inquiry_id, action, details)
    VALUES (NEW.id, audit_action, jsonb_strip_nulls(row_to_json(NEW)::jsonb));
    RETURN NEW;

  ELSIF (TG_OP = 'UPDATE') THEN
    IF OLD.deleted_at IS NULL AND NEW.deleted_at IS NOT NULL THEN
      audit_action := 'deleted';
    ELSIF OLD.deleted_at IS NOT NULL AND NEW.deleted_at IS NULL THEN
      audit_action := 'restored';
    ELSE
      audit_action := 'updated';
    END IF;

    INSERT INTO public.inquiry_audit_trails (inquiry_id, action, details)
    VALUES (NEW.id, audit_action, jsonb_build_object('old', jsonb_strip_nulls(row_to_json(OLD)::jsonb), 'new', jsonb_strip_nulls(row_to_json(NEW)::jsonb)));
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to execute the log function after inserts or updates
CREATE TRIGGER inquiry_audit_trigger
AFTER INSERT OR UPDATE ON public.customer_inquiries
FOR EACH ROW EXECUTE FUNCTION public.log_inquiry_changes();
