-- Enable RLS on inquiry_audit_trails table that was missed
ALTER TABLE public.inquiry_audit_trails ENABLE ROW LEVEL SECURITY;

-- Create policies for inquiry_audit_trails (admin access only)
CREATE POLICY "Authenticated users can view audit trails"
ON public.inquiry_audit_trails
FOR SELECT
USING (true);

CREATE POLICY "System can create audit trails"
ON public.inquiry_audit_trails
FOR INSERT
WITH CHECK (true);

-- Update existing functions to have proper search_path
CREATE OR REPLACE FUNCTION public.log_inquiry_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
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
$function$;

-- Update the other function as well
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;