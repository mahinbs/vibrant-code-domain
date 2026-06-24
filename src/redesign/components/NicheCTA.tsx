import type { BusinessAutomationNiche } from "../data/businessAutomationNiches";
import { ArrowRightIcon } from "./icons";

const TRUST_SIGNALS = [
  "Free 30-min call",
  "Custom to your workflow",
  "Live in 30 days",
] as const;

type NicheCTAProps = {
  niche: BusinessAutomationNiche;
  ctaHref?: string;
};

export function NicheCTA({ niche, ctaHref = "#contact-form" }: NicheCTAProps) {
  function handleBookAudit() {
    const target = document.getElementById(ctaHref.replace(/^#/, ""));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      className="mt-6 flex flex-col gap-4 rounded-[12px] border border-white/[0.06] bg-white/[0.02] px-4 py-4 md:mt-8 md:flex-row md:items-center md:justify-between md:gap-6 md:px-6 md:py-5"
      aria-label={`Deploy autopilot for ${niche.label}`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
        <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-purple/25 bg-purple/10 px-3 py-1">
          <span className="size-1.5 shrink-0 rounded-full bg-purple shadow-[0_0_8px_rgba(108,148,255,0.6)]" aria-hidden />
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-purple">
            {niche.label}
          </span>
        </div>
        <h3 className="text-[18px] font-medium leading-snug -tracking-[0.02em] text-white md:text-xl">
          Your {niche.label} autopilot is ready to deploy.
        </h3>
      </div>

      <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="button"
          onClick={handleBookAudit}
          className="btn-gloss inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-white/20 bg-purple/70 px-5 py-2.5 text-sm font-semibold text-white md:px-6 md:py-3"
        >
          Book My Free Audit
          <ArrowRightIcon className="size-4 shrink-0 text-white" />
        </button>
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/40 sm:max-w-[11rem] sm:text-left">
          {TRUST_SIGNALS.join(" · ")}
        </p>
      </div>
    </div>
  );
}
