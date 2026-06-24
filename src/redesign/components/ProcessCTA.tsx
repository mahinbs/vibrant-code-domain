import { processCtaCopy } from "../data/businessAutomationContent";
import { ArrowRightIcon } from "./icons";

const FORM_ANCHOR_ID = "contact-form";

export function ProcessCTA({ className = "" }: { className?: string }) {
  function scrollToForm() {
    document.getElementById(FORM_ANCHOR_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={["relative z-[1] mx-auto w-full max-w-[1200px]", className].join(" ")}>
      <div className="flex flex-col items-center gap-3 rounded-[12px] border border-white/[0.06] bg-white/[0.02] px-4 py-5 text-center md:px-8 md:py-6">
        <div className="max-w-[640px] space-y-1">
          <p className="text-lg font-medium text-white md:text-xl">
            <span className="impact-highlight">Three steps</span>. Thirty days.{" "}
            <span className="impact-highlight">Real results</span>.
          </p>
          <p className="text-[15px] text-white/65 md:text-base">{processCtaCopy.line2}</p>
        </div>
        <button
          type="button"
          onClick={scrollToForm}
          className="btn-gloss relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3.5 text-sm font-semibold text-white sm:w-auto md:px-6 md:text-[15px]"
        >
          {processCtaCopy.buttonLabel}
          <ArrowRightIcon className="size-4 shrink-0 text-white" />
        </button>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
          {processCtaCopy.trustLine}
        </p>
      </div>
    </div>
  );
}
