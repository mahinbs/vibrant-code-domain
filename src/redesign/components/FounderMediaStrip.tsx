import { founder } from "../data/founder";
import { founderMediaStripCopy } from "../data/businessAutomationContent";
import { FounderVideoEmbed } from "./FounderVideoEmbed";

/** Compact horizontal band — profile | quote | Entrepreneur cover | Forbes video in one row. */
export function FounderMediaStrip() {
  return (
    <div
      className="w-full max-w-[1920px] px-5 py-4 md:px-10 md:py-6"
      aria-label="Founder media features"
    >
      <div className="overflow-hidden rounded-[12px] border border-white/[0.06] bg-[#0a0a0c]">
        {/* Mobile: profile + quote row, then press proof row */}
        <div className="flex flex-col gap-3 p-4 lg:hidden">
          <div className="flex items-start gap-3">
            <img
              src={founderMediaStripCopy.portraitSrc}
              alt={founderMediaStripCopy.portraitAlt}
              loading="lazy"
              decoding="async"
              className="size-16 shrink-0 rounded-full object-cover object-[center_20%] ring-2 ring-white/15"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold tracking-tight text-white">
                {founder.firstName} {founder.lastName}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-white/60">
                {founder.role}, {founder.company}
              </p>
              <blockquote className="mt-2 border-l-2 border-purple/80 pl-3">
                {founderMediaStripCopy.quoteLines.map((line, i) => {
                  const lines = founderMediaStripCopy.quoteLines;
                  const prefix = i === 0 ? "\u201C" : "";
                  const suffix = i === lines.length - 1 ? "\u201D" : "";
                  return (
                    <p
                      key={line}
                      className="text-[14px] font-medium leading-snug text-white/88 [&+&]:mt-2"
                    >
                      {prefix}
                      {line}
                      {suffix}
                    </p>
                  );
                })}
              </blockquote>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-3">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-purple">
                {founderMediaStripCopy.magazinePublication}
              </p>
              <p className="text-[10px] text-white/50">
                {founderMediaStripCopy.magazineFeatureLabel} · {founderMediaStripCopy.magazineYear}
              </p>
              <img
                src={founderMediaStripCopy.magazineCoverSrc}
                alt={founderMediaStripCopy.magazineCoverAlt}
                loading="lazy"
                decoding="async"
                className="h-[110px] w-auto max-w-[80px] rounded-[6px] object-cover object-top shadow-[0_8px_24px_rgba(0,0,0,0.4)] ring-1 ring-white/10"
              />
            </div>

            <div id="founder-media-video" className="flex scroll-mt-24 flex-col gap-1.5">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-purple">
                  {founderMediaStripCopy.forbesInterviewLabel}
                </p>
                <p className="text-[10px] text-white/50">
                  {founder.firstName} {founder.lastName}
                </p>
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/[0.08] bg-[#111318]">
                <FounderVideoEmbed />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: single horizontal row */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(150px,auto)_minmax(0,1fr)_auto_minmax(260px,340px)] lg:items-center">
          <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left lg:border-r lg:border-white/[0.06] lg:px-7 lg:py-7">
            <img
              src={founderMediaStripCopy.portraitSrc}
              alt={founderMediaStripCopy.portraitAlt}
              loading="lazy"
              decoding="async"
              className="size-[88px] rounded-full object-cover object-[center_20%] ring-2 ring-white/15 md:size-28"
            />
            <div>
              <p className="text-base font-semibold tracking-tight text-white md:text-xl">
                {founder.firstName} {founder.lastName}
              </p>
              <p className="mt-1 text-[12px] leading-snug text-white/60 md:text-[14px]">
                {founder.role}, {founder.company}
              </p>
            </div>
          </div>

          <div className="flex items-center lg:border-r lg:border-white/[0.06] lg:px-7 lg:py-7">
            <blockquote className="border-l-2 border-purple/80 pl-6">
              {founderMediaStripCopy.quoteLines.map((line, i) => {
                const lines = founderMediaStripCopy.quoteLines;
                const prefix = i === 0 ? "\u201C" : "";
                const suffix = i === lines.length - 1 ? "\u201D" : "";
                return (
                  <p
                    key={line}
                    className="text-[16px] font-medium leading-snug text-white/90 md:text-[19px] md:leading-relaxed lg:text-[21px] [&+&]:mt-3"
                  >
                    {prefix}
                    {line}
                    {suffix}
                  </p>
                );
              })}
            </blockquote>
          </div>

          <div className="flex flex-col items-center gap-2.5 lg:border-r lg:border-white/[0.06] lg:px-7 lg:py-7">
            <div className="w-full text-center lg:text-left">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-purple">
                {founderMediaStripCopy.magazinePublication}
              </p>
              <p className="mt-1 text-[13px] text-white/50">
                {founderMediaStripCopy.magazineFeatureLabel} · {founderMediaStripCopy.magazineYear}
              </p>
            </div>
            <img
              src={founderMediaStripCopy.magazineCoverSrc}
              alt={founderMediaStripCopy.magazineCoverAlt}
              loading="lazy"
              decoding="async"
              className="h-[140px] w-auto max-w-[104px] rounded-[8px] object-cover object-top shadow-[0_12px_32px_rgba(0,0,0,0.45)] ring-1 ring-white/10 md:h-[168px] md:max-w-[126px]"
            />
            <p className="max-w-[140px] text-center text-[12px] leading-snug text-white/45 lg:text-left">
              {founderMediaStripCopy.magazineStoryTitle}
            </p>
          </div>

          <div className="flex scroll-mt-24 flex-col justify-center gap-3 lg:px-7 lg:py-7">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-purple">
                {founderMediaStripCopy.forbesInterviewLabel}
              </p>
              <p className="mt-1 text-[13px] text-white/50">
                {founder.firstName} {founder.lastName}
              </p>
            </div>
            <div className="relative aspect-video w-full min-h-0 overflow-hidden rounded-lg border border-white/[0.08] bg-[#111318] lg:max-w-[320px]">
              <FounderVideoEmbed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
