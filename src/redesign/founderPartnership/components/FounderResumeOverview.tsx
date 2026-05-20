import type { FounderDraftSummary } from "../founderDraftSummary";

type Props = {
  summary: FounderDraftSummary;
  lastSavedLabel: string;
  onContinue: () => void;
  onStartOver: () => void;
  restarting?: boolean;
};

export function FounderResumeOverview({
  summary,
  lastSavedLabel,
  onContinue,
  onStartOver,
  restarting = false,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-[16px] border border-white/12 bg-[linear-gradient(160deg,rgba(22,36,74,0.55)_0%,rgba(8,14,32,0.95)_100%)] p-6 shadow-[0_24px_60px_-20px_rgba(60,100,255,0.35)]"
        role="dialog"
        aria-labelledby="founder-resume-title"
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Welcome back</p>
        <h2 id="founder-resume-title" className="mt-2 text-[22px] font-medium text-white md:text-[26px]">
          Hi, {summary.firstName}!
        </h2>
        <p className="mt-2 text-[13px] text-white/55">
          You&apos;re about {summary.progressPercent}% through your application. Last saved {lastSavedLabel}.
        </p>

        <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-white/40">Where you left off</p>
        <p className="mt-1 text-[14px] leading-snug text-white/75">{summary.currentStepLabel}</p>

        {summary.chips.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {summary.chips.map((c) => (
              <li
                key={`${c.label}-${c.value}`}
                className="flex justify-between gap-3 rounded-[10px] border border-white/10 bg-black/30 px-3 py-2 text-[12px]"
              >
                <span className="text-white/45">{c.label}</span>
                <span className="max-w-[60%] truncate text-right text-white/85">{c.value}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={onContinue}
            className="btn-gloss w-full rounded-[10px] border border-white/20 bg-purple/70 px-4 py-3 text-[14px] font-medium text-white"
          >
            Continue application
          </button>
          <button
            type="button"
            onClick={onStartOver}
            disabled={restarting}
            className="w-full rounded-[10px] border border-white/15 bg-transparent px-4 py-2.5 text-[13px] text-white/55 transition-colors hover:border-white/25 hover:text-white/80 disabled:opacity-50"
          >
            {restarting ? "Starting over…" : "Start over from the beginning"}
          </button>
        </div>
      </div>
    </div>
  );
}
