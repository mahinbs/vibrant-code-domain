import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { founder } from "../data/founder";
import { WORK_PRIMARY_GLOSS_CTA_H10, WORK_PRIMARY_GLOSS_CTA_INNER } from "@/components/work/primitives/ctaStyles";
import { FounderVideoEmbed } from "./FounderVideoEmbed";
import { HighlightText } from "../lib/highlightImpactText";

const SECTION_PAGE_X = "px-6 md:px-10";
const SECTION_CONTENT = "mx-auto w-full max-w-full";

const sectionWashStyle: CSSProperties = {
  background:
    "radial-gradient(50% 40% at 50% 30%, rgba(22, 36, 74, 0.7) 0%, rgba(0,0,0,0) 100%)",
};

export type FounderLeadershipStripProps = {
  eyebrow: string;
  title: string;
  intro: string;
  pullQuote: string;
  /** Standalone section vs embedded under flagship work (adds top border). */
  variant?: "standalone" | "embedded";
  /** Show Forbes interview video in a right column (standalone layout only). */
  showForbesVideo?: boolean;
  showCta?: boolean;
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaHref?: string;
  className?: string;
};

export function FounderLeadershipStrip({
  eyebrow,
  title,
  intro,
  pullQuote,
  variant = "standalone",
  showForbesVideo = false,
  showCta = false,
  ctaLabel,
  onCtaClick,
  ctaHref,
  className = "",
}: FounderLeadershipStripProps) {
  const copyAndQuote = (
    <>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">{eyebrow}</p>
      <h2 className="mt-3 max-w-[42rem] text-[clamp(1.35rem,3vw,1.95rem)] font-medium leading-snug tracking-tight text-white">
        <HighlightText text={title} />
      </h2>
      <p className="mt-3 max-w-2xl text-[14.5px] leading-[1.55] text-white/45 md:text-[15px]">{intro}</p>

      <ul className="mt-8 md:mt-10" role="list">
        <li className="flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
          <div className="shrink-0">
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-br from-white/[0.12] to-transparent opacity-80"
              />
              <img
                src={founder.imageSrc}
                alt={founder.imageAlt}
                loading="lazy"
                decoding="async"
                className="relative h-20 w-20 rounded-full object-cover object-[center_15%] ring-1 ring-white/20 sm:h-[5.5rem] sm:w-[5.5rem] md:h-24 md:w-24"
              />
              <span className="absolute -bottom-1 left-1/2 z-[2] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-black/70 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-white/90">
                {founder.badge}
              </span>
            </div>
          </div>
          <div className="min-w-0 flex-1 border-l border-purple/45 pl-5 md:pl-6">
            <p className="text-[16px] leading-[1.55] text-white/90 md:text-[17px] md:leading-[1.62]">
              &ldquo;{pullQuote}&rdquo;
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
              {founder.firstName} {founder.lastName}
              <span className="text-white/35"> · </span>
              {founder.role}, {founder.company}
            </p>
          </div>
        </li>
      </ul>
    </>
  );

  const forbesVideoPanel = showForbesVideo ? (
    <div className="flex flex-col gap-3 lg:sticky lg:top-28">
      <div className="relative aspect-video w-full min-h-[180px] overflow-hidden rounded-xl border border-white/10 bg-[#111318] shadow-[0_20px_50px_-24px_rgba(60,100,255,0.55)]">
        <FounderVideoEmbed />
      </div>
      <p className="font-mono text-[12px] leading-snug tracking-[0.02em] text-white/55 md:text-[13px]">
        Watch our founder&apos;s interview with Forbes
      </p>
    </div>
  ) : null;

  const ctaBlock =
    showCta && (ctaHref || onCtaClick) ? (
      <div className="mt-8 flex w-full justify-center md:mt-10">
        {ctaHref ? (
          <Link to={ctaHref} className={WORK_PRIMARY_GLOSS_CTA_H10}>
            <span className={WORK_PRIMARY_GLOSS_CTA_INNER}>{ctaLabel}</span>
          </Link>
        ) : (
          <button type="button" onClick={onCtaClick} className={WORK_PRIMARY_GLOSS_CTA_H10}>
            <span className={WORK_PRIMARY_GLOSS_CTA_INNER}>{ctaLabel}</span>
          </button>
        )}
      </div>
    ) : null;

  const body =
    showForbesVideo && variant === "standalone" ? (
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
        <div>
          {copyAndQuote}
          {ctaBlock}
        </div>
        {forbesVideoPanel}
      </div>
    ) : (
      <>
        {copyAndQuote}
        {ctaBlock}
      </>
    );

  if (variant === "embedded") {
    return (
      <div className={`mt-8 border-t border-white/[0.08] pt-8 md:mt-10 md:pt-10 ${className}`}>{body}</div>
    );
  }

  return (
    <section
      className={`mt-6 w-full pt-5 pb-10 md:pt-5 md:pb-12 ${SECTION_PAGE_X} ${className}`}
      style={sectionWashStyle}
      aria-label="Founder leadership"
    >
      <div className={SECTION_CONTENT}>{body}</div>
    </section>
  );
}

/** Default pull quote for regulated vertical flagship blocks. */
export const FOUNDER_STRIP_REGULATED_QUOTE =
  "We work with teams building systems where reliability matters. If you are operating in regulated or high-throughput environments, we would be happy to understand what you are building.";
