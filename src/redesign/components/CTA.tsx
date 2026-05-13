import { site, whatsappHref } from "../data/site";
import { LeadForm, type LeadFormProps } from "./LeadForm";
import { OrbIcon, WhatsAppIcon } from "./icons";

type CTAProps = {
  /** Defaults to `contact-form` so Nav / in-page anchors match industry landings and the homepage redesign. */
  id?: string;
  leadFormProps?: Partial<LeadFormProps>;
};

export function CTA({ id = "contact-form", leadFormProps }: CTAProps) {
  const formProps: LeadFormProps = {
    sourcePage: "homepage",
    vertical: "none",
    ...(leadFormProps ?? {}),
  };

  return (
    <section
      id={id}
      className="w-full p-10 flex items-center justify-center max-md:px-5 max-md:pt-16"
    >
      <div
        className="relative overflow-hidden flex-1 max-w-[1920px] border border-white/15 rounded-[16px] py-[80px] px-[80px] flex flex-col items-center gap-10 max-md:p-8"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, var(--color-dark-purple) 0%, #000 75%)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-[1] bg-repeat bg-[length:400px_auto] opacity-70"
          style={{ backgroundImage: "url(/textures/stars.svg)" }}
        />

        <div className="relative z-[2] flex flex-col items-center gap-5 text-center max-w-[640px]">
          <div
            className="size-[88px] rounded-[24px] border border-white/15 flex items-center justify-center"
            style={{
              background:
                "radial-gradient(126% 86% at 84.8% 0%, #555 0%, #000 100%)",
              boxShadow:
                "inset 0 0 6px rgba(255,255,255,0.2), inset 0 0 15px rgba(255,255,255,0.1), 0 20px 25px rgba(0,0,0,0.4)",
            }}
          >
            <OrbIcon />
          </div>

          <h2 className="text-[56px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-[36px]">
            Tell us about your project.
            <br />
            <span className="text-white/65">Proposal in 24 hours.</span>
          </h2>
          <p className="text-lg text-white/65 max-w-[460px] max-md:text-base">
            Free consultation. No hidden costs. Limited slots open this month.
          </p>
        </div>

        <div className="relative z-[2] w-full flex flex-col items-center gap-5">
          <LeadForm {...formProps} />

          <div className="flex items-center gap-4 text-sm text-white/55">
            <span className="h-px w-12 bg-white/15" />
            or
            <span className="h-px w-12 bg-white/15" />
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-black/40 border border-white/15 text-sm font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white"
            >
              <WhatsAppIcon className="size-4 fill-white" />
              WhatsApp us
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-black/40 border border-white/15 text-sm font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
