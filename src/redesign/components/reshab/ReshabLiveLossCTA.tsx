import { useEffect, useState } from "react";
import { liveLossRates } from "../../data/reshabBusinessAutomationContent";

function formatInr(amount: number): string {
  return Math.floor(amount).toLocaleString("en-IN");
}

function formatElapsed(seconds: number): string {
  const sec = Math.floor(seconds);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function BandCell({
  value,
  label,
  live = false,
  accent = false,
}: {
  value: string;
  label: string;
  live?: boolean;
  accent?: boolean;
}) {
  return (
    <li className="flex min-w-0 flex-col items-center justify-center gap-1.5 px-2 py-3 text-center md:min-w-0 md:flex-1 md:px-4 md:py-3.5">
      <div className="flex items-center gap-1.5">
        {live ? (
          <span className="relative flex size-1.5 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-red-400" />
          </span>
        ) : null}
        <span
          className={[
            "tabular-nums text-lg font-semibold leading-none -tracking-[0.02em] md:text-xl",
            accent ? "text-red-400" : "text-white",
          ].join(" ")}
        >
          {value}
        </span>
      </div>
      <span className="max-w-[11rem] font-mono text-[8px] uppercase leading-snug tracking-[0.12em] text-white/40 max-md:max-w-[9.5rem] md:text-[9px] md:tracking-[0.14em]">
        {label}
      </span>
    </li>
  );
}

export function ReshabLiveLossCTA() {
  const [elapsedSec, setElapsedSec] = useState(0);

  useEffect(() => {
    const pageStart = Date.now();
    const tick = () => setElapsedSec((Date.now() - pageStart) / 1000);
    tick();
    const iv = window.setInterval(tick, 200);
    return () => window.clearInterval(iv);
  }, []);

  const rate = liveLossRates.ratePerSec;
  const pageLoss = elapsedSec * rate;
  const perHour = liveLossRates.annualInr / (365 * 24);
  const perMonth = liveLossRates.annualInr / 12;
  const timerLabel = formatElapsed(elapsedSec);

  return (
    <div className="relative z-[1] mt-10 w-full md:mt-12">
      <p className="mb-3 text-left text-lg font-medium text-white max-md:text-center md:text-xl">
        Your business might be <span className="loss-highlight-red">losing more</span>
      </p>

      <ul
        className="grid grid-cols-2 divide-x divide-y divide-white/[0.06] overflow-hidden rounded-[12px] border border-white/[0.06] bg-white/[0.02] max-md:grid md:flex md:divide-y-0"
        aria-label="Manual process loss rates"
        aria-live="polite"
      >
        <BandCell
          live
          accent
          value={`₹${formatInr(pageLoss)}`}
          label={`lost in the ${timerLabel} you've been here`}
        />
        <BandCell value={`₹${formatInr(perHour)}`} label="lost every hour" />
        <BandCell value={`₹${formatInr(perMonth)}`} label="lost every month" />
        <BandCell value={`₹${formatInr(liveLossRates.annualInr)}`} label="lost every year" />
      </ul>

      <p className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
        Based on a typical {liveLossRates.teamSizeLabel} running manual processes
      </p>
    </div>
  );
}
