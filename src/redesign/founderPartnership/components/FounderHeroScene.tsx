import { useEffect, useState } from "react";
import { FOUNDER_HERO_REQUIREMENTS } from "../founderApplicationConfig";
import {
  FOUNDER_HERO_TYPEWRITER_KEY,
  FounderTypewriter,
  hasHeroTypewriterPlayed,
} from "./FounderTypewriter";
import { FounderStaggerGroup, FounderStaggerItem } from "./FounderSceneMotion";

const CTA_COOLDOWN_MS = 2000;

type Props = {
  eyebrow: string;
  headline: string;
  subheadline?: string;
  onSceneReady: () => void;
};

export function FounderHeroScene({ eyebrow, headline, subheadline, onSceneReady }: Props) {
  const [headlineReady, setHeadlineReady] = useState(hasHeroTypewriterPlayed);

  useEffect(() => {
    if (!headlineReady) return;
    const t = window.setTimeout(() => onSceneReady(), CTA_COOLDOWN_MS);
    return () => window.clearTimeout(t);
  }, [headlineReady, onSceneReady]);

  return (
    <div className="founder-hero-scene flex w-full flex-1 flex-col items-center text-center max-md:min-h-0 md:flex-initial">
      <FounderStaggerGroup className="flex w-full flex-1 flex-col items-center max-md:min-h-0">
        <FounderStaggerItem className="w-full shrink-0">
          <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/50 md:mb-3 md:text-[11px]">
            {eyebrow}
          </p>
          <div className="founder-hero-block mx-auto inline-flex w-full max-w-full flex-col items-stretch text-center">
            <h1 className="founder-headline-gradient text-[clamp(1.65rem,6.5vw,2rem)] font-medium leading-[1.08] tracking-[-0.03em] md:text-[48px]">
              {headlineReady ? (
                headline
              ) : (
                <FounderTypewriter
                  text={headline}
                  playOnceKey={FOUNDER_HERO_TYPEWRITER_KEY}
                  onComplete={() => setHeadlineReady(true)}
                />
              )}
            </h1>
          </div>
        </FounderStaggerItem>

        {headlineReady ? (
          <FounderStaggerItem className="mt-4 flex w-full flex-1 flex-col justify-end gap-4 max-md:min-h-0 max-md:gap-5 md:mt-4 md:flex-initial md:justify-start">
            {subheadline ? (
              <p className="text-[13px] leading-relaxed text-white/65 md:text-[16px]">{subheadline}</p>
            ) : null}
            <div className="founder-hero-requirements w-full text-left max-md:flex max-md:flex-1 max-md:flex-col max-md:justify-center">
              <p className="text-[12px] leading-relaxed text-white/55 md:text-[12px]">
                {FOUNDER_HERO_REQUIREMENTS.intro}
              </p>
              <ul className="mt-2 space-y-1.5 max-md:space-y-2">
                {FOUNDER_HERO_REQUIREMENTS.reasons.map((reason) => (
                  <li
                    key={reason}
                    className="flex gap-2 text-[11px] leading-relaxed text-white/50 max-md:text-[12px]"
                  >
                    <span
                      className="mt-[0.4rem] size-1 shrink-0 rounded-full bg-white/35"
                      aria-hidden
                    />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 border-t border-white/8 pt-2 text-[11px] text-white/40 max-md:mt-3 max-md:pt-2.5">
                {FOUNDER_HERO_REQUIREMENTS.applicationTime}
              </p>
            </div>
          </FounderStaggerItem>
        ) : null}
      </FounderStaggerGroup>
    </div>
  );
}
