import type { CSSProperties } from "react";
import { founder } from "../data/founder";
import { founderMediaStripCopy } from "../data/businessAutomationContent";
import { FounderVideoEmbed } from "./FounderVideoEmbed";

const GRID_OVERLAY: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(120,145,220,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(120,145,220,.10) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

const CARD_GLOSS: CSSProperties = {
  background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.55) 100%)",
};

/** Founder feature band — portrait + big quote in a gradient panel, press proof as framed cards. */
export function FounderMediaStrip() {
  const lines = founderMediaStripCopy.quoteLines;

  return (
    <div
      className="w-full max-w-[1920px] px-5 py-6 md:px-10 md:py-8"
      aria-label="Founder media features"
    >
      <div
        className="relative overflow-hidden rounded-[20px] border border-white/15"
        style={{
          background:
            "radial-gradient(70% 120% at 15% 0%, var(--color-dark-purple) 0%, rgb(6,10,26) 55%, #000 100%)",
        }}
      >
        {/* Texture + glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-30" style={GRID_OVERLAY} />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 z-0 size-[420px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(closest-side, rgba(96,142,255,0.4), rgba(0,0,0,0) 75%)",
            filter: "blur(24px)",
          }}
        />

        <div className="relative z-[1] grid gap-8 p-6 md:p-10 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center xl:gap-12">
          {/* Portrait + quote */}
          <div className="flex min-w-0 flex-col gap-6 md:flex-row md:items-start md:gap-8">
            <div className="flex shrink-0 flex-col items-center gap-3 text-center md:w-[150px]">
              <div className="rounded-full bg-gradient-to-b from-[#4b78ff]/60 to-transparent p-[3px]">
                <img
                  src={founderMediaStripCopy.portraitSrc}
                  alt={founderMediaStripCopy.portraitAlt}
                  loading="lazy"
                  decoding="async"
                  className="size-24 rounded-full object-cover object-[center_20%] ring-2 ring-black/60 md:size-28"
                />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight text-white">
                  {founder.firstName} {founder.lastName}
                </p>
                <p className="mt-1 text-[13px] leading-snug text-white/60">
                  {founder.role}, {founder.company}
                </p>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-2 inline-flex w-fit items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-purple backdrop-blur-[5px]">
                From the founder
              </p>
              <span
                aria-hidden
                className="block text-[56px] font-bold leading-[0.7] text-gradient md:text-[68px]"
              >
                &ldquo;
              </span>
              <blockquote>
                {lines.map((line, i) => {
                  const isLast = i === lines.length - 1;
                  return (
                    <p
                      key={line}
                      className={[
                        "text-[17px] font-medium leading-relaxed md:text-[20px] xl:text-[22px] [&+&]:mt-3",
                        isLast ? "text-gradient" : "text-white/90",
                      ].join(" ")}
                    >
                      {line}
                      {isLast ? "”" : ""}
                    </p>
                  );
                })}
              </blockquote>
            </div>
          </div>

          {/* Press proof cards */}
          <div className="flex flex-wrap items-stretch gap-4 xl:flex-nowrap">
            {/* Entrepreneur cover card */}
            <div
              className="flex w-[180px] flex-col items-center gap-3 rounded-[14px] border border-white/12 p-4 max-sm:flex-1"
              style={CARD_GLOSS}
            >
              <p className="inline-flex items-center rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-purple">
                {founderMediaStripCopy.magazinePublication} · {founderMediaStripCopy.magazineYear}
              </p>
              <img
                src={founderMediaStripCopy.magazineCoverSrc}
                alt={founderMediaStripCopy.magazineCoverAlt}
                loading="lazy"
                decoding="async"
                className="h-[150px] w-auto rounded-[8px] object-cover object-top shadow-[0_16px_36px_rgba(0,0,0,0.55)] ring-1 ring-white/15 transition-transform duration-300 hover:scale-[1.04]"
              />
              <p className="text-center text-[12px] leading-snug text-white/55">
                {founderMediaStripCopy.magazineStoryTitle}
              </p>
            </div>

            {/* Forbes video card */}
            <div
              id="founder-media-video"
              className="flex w-[340px] scroll-mt-24 flex-col justify-between gap-3 rounded-[14px] border border-white/12 p-4 max-sm:w-full"
              style={CARD_GLOSS}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-purple">
                  <span className="size-1.5 rounded-full bg-[#ff4d4d]" />
                  {founderMediaStripCopy.forbesInterviewLabel}
                </p>
                <p className="text-[12px] text-white/50">
                  {founder.firstName} {founder.lastName}
                </p>
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-[10px] border border-white/10 bg-[#111318] shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
                <FounderVideoEmbed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
