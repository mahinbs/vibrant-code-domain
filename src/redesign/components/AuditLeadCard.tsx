import type { ReactNode } from "react";
import { site, whatsappHref } from "../data/site";
import { LeadForm, type LeadFormProps } from "./LeadForm";
import { OrbIcon, WhatsAppIcon } from "./icons";

const CTA_SHELL_BG =
  "radial-gradient(60% 100% at 50% 0%, var(--color-dark-purple) 0%, #000 75%)";

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
    density: isModal ? "compact" : "default",
    ...(leadFormProps ?? {}),
  };

  return (
    <div
      className={[
        "relative flex w-full flex-col items-center overflow-hidden",
        isModal
          ? "min-h-0 flex-1 gap-3"
          : "max-w-[1920px] flex-1 gap-10 rounded-[16px] border border-white/15 py-[80px] px-[80px] max-md:p-8",
      ].join(" ")}
      style={isModal ? undefined : { background: CTA_SHELL_BG }}
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
          "relative z-[2] flex shrink-0 flex-col items-center text-center",
          isModal ? "max-w-full gap-2" : "max-w-[640px] gap-5",
        ].join(" ")}
      >
        <div
          className={[
            "flex shrink-0 items-center justify-center rounded-[20px] border border-white/15",
            isModal ? "size-[52px] rounded-[16px]" : "size-[88px] rounded-[24px]",
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
          <p className="inline-flex shrink-0 items-center rounded-full border border-white/15 bg-black/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-purple sm:px-3 sm:py-1 sm:text-[11px]">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={[
            "font-medium -tracking-[0.04em] leading-[1.08] text-white",
            isModal ? "text-[20px] sm:text-[22px]" : "text-[56px] max-md:text-[36px]",
          ].join(" ")}
        >
          {title}
        </h2>
        {!isModal ? (
          <p className="max-w-[460px] text-lg text-white/65 max-md:text-base">{subtitle}</p>
        ) : (
          <p className="max-w-[28ch] text-[12px] leading-snug text-white/60 sm:max-w-[34ch] sm:text-[13px]">
            {subtitle}
          </p>
        )}
      </div>

      <div className="relative z-[2] flex w-full min-h-0 flex-1 flex-col items-center">
        <LeadForm {...formProps} />

        {!isModal ? (
          <>
            <div className="mt-5 flex items-center gap-4 text-sm text-white/55">
              <span className="h-px w-12 bg-white/15" />
              or
              <span className="h-px w-12 bg-white/15" />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
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
