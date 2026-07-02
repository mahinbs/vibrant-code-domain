import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../icons";

type ScoreTeaserPromptProps = {
  visible: boolean;
  href: string;
  onDismiss: () => void;
  onNavigate?: () => void;
};

/**
 * Small one-shot prompt (exit intent / scroll depth) nudging visitors toward
 * the dedicated automation score page.
 */
export function ScoreTeaserPrompt({
  visible,
  href,
  onDismiss,
  onNavigate,
}: ScoreTeaserPromptProps) {
  return (
    <div
      role="dialog"
      aria-label="Automation score prompt"
      aria-hidden={!visible}
      className={[
        "fixed z-[120] transition-all duration-300",
        "max-md:inset-x-3 max-md:bottom-[calc(env(safe-area-inset-bottom)+5.25rem)]",
        "md:bottom-6 md:right-6 md:w-[340px]",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
    >
      <div
        className="relative rounded-[14px] border border-white/15 p-4 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.8)]"
        style={{
          background:
            "radial-gradient(140% 120% at 100% 120%, var(--color-purple) 0%, rgb(10,14,32) 55%, #000 90%)",
        }}
      >
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="absolute right-2.5 top-2.5 flex size-7 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        <p className="pr-8 text-[15px] font-semibold leading-snug text-white">
          Before you go, how much is manual work costing you?
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">
          Answer 4 quick questions and get your automation score with a
          personalized savings report. Takes 60 seconds.
        </p>
        <Link
          to={href}
          onClick={onNavigate}
          className="btn-gloss relative mt-3.5 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.18)]"
        >
          <span className="relative z-[2]">Get my automation score</span>
          <ArrowRightIcon className="relative z-[2] size-3.5 shrink-0 text-white" />
        </Link>
      </div>
    </div>
  );
}
