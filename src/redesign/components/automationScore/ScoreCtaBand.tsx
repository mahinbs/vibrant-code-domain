import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { ArrowRightIcon } from "../icons";

/**
 * Thin conversion band placed right after the Cost of Inaction section:
 * the live loss counter manufactures the "what's MY number?" itch, this
 * band answers it with the score quiz.
 */
export function ScoreCtaBand({
  href,
  onNavigate,
  badge = "Free · 60 seconds · No call needed",
  headline = (
    <>
      Those numbers are averages.{" "}
      <span className="impact-highlight">Yours are specific.</span>
    </>
  ),
  subheadline = "Answer 4 quick questions and get a personalized report: hours lost, what it costs you monthly, and exactly what we\u2019d automate first.",
  ctaLabel = "Get my automation score",
}: {
  href: string;
  onNavigate?: () => void;
  badge?: string;
  headline?: React.ReactNode;
  subheadline?: string;
  ctaLabel?: string;
}) {
  return (
    <section
      aria-label="Get your automation score"
      className="w-full px-5 py-10 md:px-10 md:py-14"
    >
      <div className="relative mx-auto flex w-full flex-col items-center gap-6 overflow-hidden rounded-[18px] border border-purple/30 bg-[linear-gradient(140deg,rgba(22,36,74,0.6)_0%,rgba(8,14,32,0.9)_55%,rgba(0,0,0,0.92)_100%)] px-6 py-10 text-center md:px-12 md:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 z-0 size-[320px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(108,148,255,0.4),transparent_70%)] blur-[60px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 z-0 size-[280px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(72,118,255,0.3),transparent_70%)] blur-[60px]"
        />
        <div className="relative z-[1] flex flex-col items-center gap-3">
          <span className="rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70 backdrop-blur-[5px]">
            {badge}
          </span>
          <h2 className="max-w-[640px] text-[28px] font-medium leading-[1.08] -tracking-[0.03em] text-white md:text-[40px]">
            {headline}
          </h2>
          <p className="max-w-[520px] text-[15px] leading-[1.5] text-white/65 md:text-[16px]">
            {subheadline}
          </p>
        </div>
        <span className="btn-glow-ring z-[1] max-sm:w-full sm:inline-flex">
          <Link
            to={href}
            onClick={onNavigate}
            className="btn-gloss relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-7 py-[16px] text-[14px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)] sm:text-[15px]"
          >
            <span className="relative z-[2]">{ctaLabel}</span>
            <ArrowRightIcon className="relative z-[2] size-[14px] shrink-0 text-white" />
          </Link>
        </span>
      </div>
    </section>
  );
}
