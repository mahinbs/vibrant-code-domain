import { useState } from "react";
import type { CSSProperties } from "react";
import { HighlightText } from "../lib/highlightImpactText";
import { StrategyCallLeadModal } from "./StrategyCallLeadModal";

const SECTION_PAGE_X = "px-6 md:px-10";
const SECTION_CONTENT = "mx-auto w-full max-w-full";

const sectionWashStyle: CSSProperties = {
  background:
    "radial-gradient(50% 40% at 50% 30%, var(--color-dark-purple) 0%, rgba(0,0,0,0) 100%)",
};

const FOUNDER_PHOTO_SRC = "/images/reshab-founder.png";

export const DEFAULT_BOOK_CALL_HEADLINE =
  "Get a {{straight answer}} on your build, from our CEO";
export const DEFAULT_BOOK_CALL_SUBHEADLINE =
  "Share your idea in a short form. Walk away with clarity on {{product scope}}, {{technical fit}}, and a delivery plan you can act on, not a sales script.";

export type BookCallWithFounderBandProps = {
  id?: string;
  sourcePage: string;
  variant?: "card" | "thin";
  tightSpacing?: boolean;
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  photoSrc?: string;
  photoAlt?: string;
  badgeLabel?: string;
  /** Small uppercase label above the headline. */
  eyebrowLabel?: string;
};

export function BookCallWithFounderBand({
  id,
  sourcePage,
  variant = "card",
  tightSpacing,
  headline = DEFAULT_BOOK_CALL_HEADLINE,
  subheadline = DEFAULT_BOOK_CALL_SUBHEADLINE,
  ctaLabel = "Book my strategy call",
  photoSrc = FOUNDER_PHOTO_SRC,
  photoAlt = "Reshab, CEO Boostmysites",
  badgeLabel = "Reshab · CEO Boostmysites",
  eyebrowLabel = "1:1 with the Chief Executive Officer",
}: BookCallWithFounderBandProps) {
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);

  if (variant === "thin") {
    return (
      <section
        id={id}
        className="w-full max-w-[1920px] overflow-visible px-5 pb-5 pt-14 md:px-10 md:pb-6 md:pt-16"
        style={sectionWashStyle}
        aria-label="Book a call with the chief executive officer"
      >
        <div className="w-full">
          <div className="relative min-h-[200px] overflow-visible rounded-[14px] border border-white/[0.06] bg-[linear-gradient(140deg,rgba(22,36,74,0.55)_0%,rgba(8,14,32,0.88)_55%,rgba(0,0,0,0.92)_100%)] md:min-h-[220px]">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 bottom-0 z-0 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(108,148,255,0.35),transparent_70%)] blur-[50px]"
            />
            <div className="relative z-[1] flex flex-col gap-6 px-5 md:flex-row md:items-stretch md:gap-8 md:px-8 lg:gap-12 lg:px-12">
              <div className="relative mx-auto h-[200px] w-full max-w-[260px] shrink-0 md:mx-0 md:h-auto md:w-[min(280px,26%)]">
                <img
                  src={photoSrc}
                  alt={photoAlt}
                  loading="lazy"
                  decoding="async"
                  className="absolute bottom-0 left-1/2 z-[1] h-[260px] w-auto max-w-full -translate-x-1/2 object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] md:left-4 md:h-[320px] md:translate-x-0 lg:h-[340px]"
                />
                <span className="absolute bottom-3 left-1/2 z-[2] inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/80 backdrop-blur-[6px] md:left-6 md:translate-x-0">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[rgba(108,148,255,0.95)] shadow-[0_0_8px_rgba(108,148,255,0.7)]"
                  />
                  {badgeLabel}
                </span>
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center px-1 py-2 md:px-2 md:py-8 lg:py-9">
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
                  {eyebrowLabel}
                </span>
                <h2 className="mt-2 text-[22px] font-medium leading-[1.15] -tracking-[0.02em] text-white md:text-[26px] lg:text-[28px]">
                  <HighlightText text={headline} />
                </h2>
                <p className="mt-3 text-[15px] leading-[1.55] text-white/72 md:text-[16px] lg:max-w-[62ch]">
                  <HighlightText text={subheadline} />
                </p>
              </div>

              <div className="flex shrink-0 items-center justify-center gap-4 px-1 py-2 md:px-4 md:py-8 lg:py-9">
                <button
                  type="button"
                  onClick={() => setStrategyModalOpen(true)}
                  className="btn-gloss relative whitespace-nowrap rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-sm font-medium text-white md:px-6 md:py-3.5 md:text-[15px]"
                >
                  {ctaLabel}
                </button>
                <div className="hidden items-stretch gap-4 sm:flex">
                  <span className="w-px shrink-0 self-stretch bg-white/15" aria-hidden />
                  <ul className="flex flex-col justify-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
                    <li>Free</li>
                    <li>30 minutes</li>
                    <li>No sales pitch</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="pb-5 text-center text-[10px] uppercase tracking-[0.16em] text-white/45 sm:hidden">
              Free · 30 minutes · No sales pitch
            </p>
          </div>
        </div>
        <StrategyCallLeadModal
          open={strategyModalOpen}
          onOpenChange={setStrategyModalOpen}
          sourcePage={sourcePage}
        />
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`mt-4 w-full ${tightSpacing ? "pt-5 pb-10 md:pt-5 md:pb-14" : "py-10 md:py-14"} ${SECTION_PAGE_X}`}
      style={sectionWashStyle}
      aria-label="Book a call with the chief executive officer"
    >
      <div className={SECTION_CONTENT}>
        <div className="relative overflow-hidden rounded-[18px] border border-white/12 bg-[linear-gradient(140deg,rgba(22,36,74,0.65)_0%,rgba(8,14,32,0.92)_55%,rgba(0,0,0,0.94)_100%)] shadow-[0_24px_60px_-30px_rgba(60,100,255,0.45)]">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/2 z-0 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(108,148,255,0.45),rgba(60,80,200,0.18)_42%,transparent_70%)] blur-[60px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 z-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(150,120,255,0.32),transparent_70%)] blur-[70px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]"
          />

          <div className="relative z-[2] grid grid-cols-1 items-stretch gap-8 p-6 md:grid-cols-[minmax(280px,360px)_1fr] md:gap-12 md:p-10">
            <div className="relative order-2 flex items-end justify-center md:order-none md:items-stretch md:justify-start">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-4 bottom-0 top-6 rounded-[16px] bg-[linear-gradient(180deg,rgba(88,132,255,0.18)_0%,rgba(40,60,160,0.28)_55%,rgba(8,14,32,0.55)_100%)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(140,170,255,0.55),rgba(60,90,210,0.18)_45%,transparent_75%)] blur-[18px]"
              />
              <img
                src={photoSrc}
                alt={photoAlt}
                loading="lazy"
                decoding="async"
                className="relative z-[1] mx-auto h-auto max-h-[420px] w-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)] md:max-h-[480px]"
              />
              <span className="absolute bottom-2 left-2 z-[2] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80 backdrop-blur-[6px]">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-[rgba(108,148,255,0.95)] shadow-[0_0_8px_rgba(108,148,255,0.7)]"
                />
                {badgeLabel}
              </span>
            </div>

            <div className="order-1 flex flex-col justify-center md:order-none">
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
                {eyebrowLabel}
              </span>
              <h2 className="mt-3 max-w-[640px] text-[28px] font-medium leading-[1.12] -tracking-[0.02em] text-white md:text-[36px]">
                <HighlightText text={headline} />
              </h2>
              <p className="mt-4 max-w-[560px] text-[15px] leading-[1.55] text-white/72 md:text-[16px]">
                <HighlightText text={subheadline} />
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStrategyModalOpen(true)}
                  className="btn-gloss relative overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-sm font-medium text-white"
                >
                  {ctaLabel}
                </button>
                <p className="text-[12px] uppercase tracking-[0.16em] text-white/45">
                  Free · 30 min · No sales pitch
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StrategyCallLeadModal
        open={strategyModalOpen}
        onOpenChange={setStrategyModalOpen}
        sourcePage={sourcePage}
      />
    </section>
  );
}
