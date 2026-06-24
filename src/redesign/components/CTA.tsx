import type { ReactNode } from "react";
import { AuditLeadCard } from "./AuditLeadCard";
import type { LeadFormProps } from "./LeadForm";

type CTAProps = {
  /** Defaults to `contact-form` so Nav / in-page anchors match industry landings and the homepage redesign. */
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  leadFormProps?: Partial<LeadFormProps>;
  whatsappHref?: string;
};

export function CTA({
  id = "contact-form",
  eyebrow,
  title,
  subtitle,
  leadFormProps,
  whatsappHref: whatsappHrefProp,
}: CTAProps) {
  return (
    <section
      id={id}
      className="flex w-full items-center justify-center p-10 max-md:px-5 max-md:pt-16"
    >
      <AuditLeadCard
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        leadFormProps={leadFormProps}
        whatsappHref={whatsappHrefProp}
        variant="section"
      />
    </section>
  );
}
