import { useEffect, useState } from "react";
import { liveLossBandCopy, liveLossRates } from "../data/businessAutomationContent";
import { HighlightText } from "../lib/highlightImpactText";
import { ArrowRightIcon } from "./icons";

type LiveLossCTAProps = {
  ctaHref?: string;
};

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

function secondsSinceStartOfHour(now: Date): number {
  return now.getMinutes() * 60 + now.getSeconds() + now.getMilliseconds() / 1000;
}

function secondsSinceStartOfMonth(now: Date): number {
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  return (now.getTime() - monthStart.getTime()) / 1000;
}

function secondsSinceStartOfYear(now: Date): number {
  const yearStart = new Date(now.getFullYear(), 0, 1);
  return (now.getTime() - yearStart.getTime()) / 1000;
}

function computeLiveAmounts(elapsedSec: number, now: Date) {
  const rate = liveLossRates.ratePerSec;
  return {
    /** Loss ticking up since the visitor landed on this page. */
    page: elapsedSec * rate,
    /** Loss since the top of the current clock hour (local time). */
    hour: secondsSinceStartOfHour(now) * rate,
    /** Loss since the 1st of the current calendar month. */
    monthly: secondsSinceStartOfMonth(now) * rate,
    /** Loss since Jan 1 of the current calendar year. */
    yearly: secondsSinceStartOfYear(now) * rate,
  };
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

export function LiveLossCTA({ ctaHref = "#contact-form" }: LiveLossCTAProps) {
  const [elapsedSec, setElapsedSec] = useState(0);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const pageStart = Date.now();
    const tick = () => {
      setNow(new Date());
      setElapsedSec((Date.now() - pageStart) / 1000);
    };
    tick();
    const iv = window.setInterval(tick, 200);
    return () => window.clearInterval(iv);
  }, []);

  const amounts = computeLiveAmounts(elapsedSec, now);
  const timerLabel = formatElapsed(elapsedSec);

  return (
    <div className="relative z-[1] mx-auto mt-10 w-full max-w-[1200px] md:mt-12">
      <p className="mb-3 text-left text-lg font-medium text-white max-md:text-center md:text-xl">
        <HighlightText text={liveLossBandCopy.headline} />
      </p>

      <ul
        className="grid grid-cols-2 divide-x divide-y divide-white/[0.06] overflow-hidden rounded-[12px] border border-white/[0.06] bg-white/[0.02] max-md:grid md:flex md:divide-y-0"
        aria-label="Manual process loss rates"
        aria-live="polite"
      >
        <BandCell
          live
          accent
          value={`₹${formatInr(amounts.page)}`}
          label={`${timerLabel} on this page · lost so far`}
        />
        <BandCell value={`₹${formatInr(amounts.hour)}`} label="this hour · live" />
        <BandCell value={`₹${formatInr(amounts.monthly)}`} label="this month · live" />
        <BandCell value={`₹${formatInr(amounts.yearly)}`} label="this year · live" />
      </ul>

      <div className="mt-4 flex flex-col items-center gap-2 text-center">
        <a
          href={ctaHref}
          className="btn-gloss relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3.5 text-sm font-semibold text-white sm:w-auto md:px-6 md:text-[15px]"
        >
          Stop the Clock — Book My Free Audit
          <ArrowRightIcon className="size-4 shrink-0 text-white" />
        </a>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
          Free audit · 30 minutes · No sales pitch
        </p>
      </div>
    </div>
  );
}
