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
  /** Popup: tighter layout, omits orb / subtitle / alt contact row. */
  inDialog?: boolean;
};

export function AuditLeadCard({
  eyebrow = "Free AI Audit",
  title = "What's holding your business back?",
  subtitle = "Book a free 30-minute AI Audit. We'll identify 3 things your team does manually that can be automated this month.",
  leadFormProps,
  whatsappHref: whatsappHrefProp,
  inDialog = false,
}: AuditLeadCardProps) {
  const waHref = whatsappHrefProp ?? whatsappHref;
  const formProps: LeadFormProps = {
    sourcePage: "homepage",
    vertical: "none",
    hideStepHeadline: inDialog,
    ...(leadFormProps ?? {}),
  };

  return (
    <div
      className={[
        "relative flex w-full flex-col items-center overflow-hidden rounded-[16px] border border-white/15 bg-black",
        inDialog
          ? "gap-4 px-5 py-5 pr-11"
          : "gap-10 py-[80px] px-[80px] max-md:gap-10 max-md:p-8",
      ].join(" ")}
      style={{
        backgroundColor: "#000",
        backgroundImage: `${CTA_SHELL_BG}`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[length:400px_auto] bg-repeat opacity-40"
        style={{ backgroundImage: "url(/textures/stars.svg)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[0] bg-black"
      />

      <div
        className={[
          "relative z-[2] flex w-full flex-col items-center text-center",
          inDialog ? "max-w-full gap-2.5" : "max-w-[640px] gap-5",
        ].join(" ")}
      >
        {!inDialog ? (
          <div
            className="flex size-[88px] items-center justify-center rounded-[24px] border border-white/15"
            style={{
              background: "radial-gradient(126% 86% at 84.8% 0%, #555 0%, #000 100%)",
              boxShadow:
                "inset 0 0 6px rgba(255,255,255,0.2), inset 0 0 15px rgba(255,255,255,0.1), 0 20px 25px rgba(0,0,0,0.4)",
            }}
          >
            <OrbIcon />
          </div>
        ) : null}

        {eyebrow ? (
          <p className="inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-purple">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={[
            "font-medium -tracking-[0.04em] text-white",
            inDialog
              ? "text-[22px] leading-[1.15]"
              : "text-[56px] leading-[1.05em] max-md:text-[36px]",
          ].join(" ")}
        >
          {title}
        </h2>
        {!inDialog ? (
          <p className="max-w-[460px] text-lg text-white/65 max-md:text-base">{subtitle}</p>
        ) : null}
      </div>

      <div className={["relative z-[2] flex w-full flex-col items-center", inDialog ? "gap-3" : "gap-5"].join(" ")}>
        <LeadForm {...formProps} />

        {!inDialog ? (
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
