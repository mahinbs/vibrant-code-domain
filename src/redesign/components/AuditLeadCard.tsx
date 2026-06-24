import type { ReactNode } from "react";
import { site, whatsappHref } from "../data/site";
import { LeadForm, type LeadFormProps } from "./LeadForm";
import { OrbIcon, WhatsAppIcon } from "./icons";

export type AuditLeadCardProps = {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  leadFormProps?: Partial<LeadFormProps>;
  whatsappHref?: string;
  /** Tighter layout for modal — hides contact footer row. */
  variant?: "section" | "modal";
};

export function AuditLeadCard({
  eyebrow = "Free AI Audit",
  title = "What's holding your business back?",
  subtitle = "Book a free 30-minute AI Audit. We'll identify 3 things your team does manually that can be automated this month.",
  leadFormProps,
  whatsappHref: whatsappHrefProp,
  variant = "section",
}: AuditLeadCardProps) {
  const waHref = whatsappHrefProp ?? whatsappHref;
  const isModal = variant === "modal";
  const formProps: LeadFormProps = {
    sourcePage: "homepage",
    vertical: "none",
    ...(leadFormProps ?? {}),
  };

  return (
    <div
      className={[
        "relative flex w-full flex-col items-center overflow-hidden border border-white/15",
        isModal
          ? "gap-6 rounded-[14px] bg-transparent p-0"
          : "max-w-[1920px] flex-1 gap-10 rounded-[16px] py-[80px] px-[80px] max-md:p-8",
      ].join(" ")}
      style={
        isModal
          ? undefined
          : {
              background:
                "radial-gradient(60% 100% at 50% 0%, var(--color-dark-purple) 0%, #000 75%)",
            }
      }
    >
      {!isModal ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-[length:400px_auto] bg-repeat opacity-70"
          style={{ backgroundImage: "url(/textures/stars.svg)" }}
        />
      ) : null}

      <div
        className={[
          "relative z-[2] flex flex-col items-center gap-5 text-center",
          isModal ? "max-w-full" : "max-w-[640px]",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center justify-center rounded-[24px] border border-white/15",
            isModal ? "size-[72px] rounded-[20px]" : "size-[88px]",
          ].join(" ")}
          style={{
            background: "radial-gradient(126% 86% at 84.8% 0%, #555 0%, #000 100%)",
            boxShadow:
              "inset 0 0 6px rgba(255,255,255,0.2), inset 0 0 15px rgba(255,255,255,0.1), 0 20px 25px rgba(0,0,0,0.4)",
          }}
        >
          <OrbIcon />
        </div>

        {eyebrow ? (
          <p className="inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-purple">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={[
            "font-medium -tracking-[0.04em] leading-[1.05em] text-white",
            isModal ? "text-[28px] max-md:text-[26px]" : "text-[56px] max-md:text-[36px]",
          ].join(" ")}
        >
          {title}
        </h2>
        <p
          className={[
            "text-white/65",
            isModal ? "max-w-full text-[15px] leading-relaxed" : "max-w-[460px] text-lg max-md:text-base",
          ].join(" ")}
        >
          {subtitle}
        </p>
      </div>

      <div className="relative z-[2] flex w-full flex-col items-center gap-5">
        <LeadForm {...formProps} />

        {!isModal ? (
          <>
            <div className="flex items-center gap-4 text-sm text-white/55">
              <span className="h-px w-12 bg-white/15" />
              or
              <span className="h-px w-12 bg-white/15" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-black/40 px-4 py-2.5 text-sm font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white"
              >
                <WhatsAppIcon className="size-4 fill-white" />
                WhatsApp us
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-black/40 px-4 py-2.5 text-sm font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white"
              >
                {site.email}
              </a>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
