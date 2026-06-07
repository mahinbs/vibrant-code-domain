import { useEffect, useState } from "react";
import { primaryCta, whatsappHref } from "../data/site";
import { trustBadges } from "../data/stats";
import { LazyVideo } from "./LazyVideo";
import { ArrowRightIcon, StarIcon, WhatsAppIcon } from "./icons";
import { TrustedTicker } from "./TrustedTicker";

export function Hero() {
  const typingWords = [
    "busywork",
    "follow-ups",
    "data entry",
    "reporting",
    "grunt work",
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState(typingWords[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [enableSecondaryAnimations, setEnableSecondaryAnimations] = useState(false);

  useEffect(() => {
    const enable = () => setEnableSecondaryAnimations(true);
    if ("requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback(enable, { timeout: 1500 });
    } else {
      window.setTimeout(enable, 900);
    }
  }, []);

  useEffect(() => {
    if (!enableSecondaryAnimations) return;
    const currentWord = typingWords[wordIndex];
    const isWordComplete = typedText === currentWord;
    const isWordCleared = typedText === "";

    const speed = isDeleting ? 45 : 90;
    const pause = isWordComplete ? 1200 : 0;

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && !isWordComplete) {
        setTypedText(currentWord.slice(0, typedText.length + 1));
        return;
      }

      if (!isDeleting && isWordComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && !isWordCleared) {
        setTypedText(currentWord.slice(0, typedText.length - 1));
        return;
      }

      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % typingWords.length);
    }, speed + pause);

    return () => window.clearTimeout(timeoutId);
  }, [typedText, isDeleting, wordIndex, typingWords, enableSecondaryAnimations]);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="w-full flex items-center justify-center pt-2"
    >
      <div
        className="relative flex-1 min-w-0 h-auto xl:h-[820px] max-w-[1920px] mx-auto rounded-[20px] border border-white/15 overflow-hidden flex flex-col justify-center gap-[60px] px-[100px] pt-[120px] pb-[150px] will-change-transform max-xl:pb-16 max-md:px-5 max-md:pt-24 max-md:pb-12 max-md:gap-8"
        style={{
          background:
            "radial-gradient(108% 100% at 100% 100.6%, var(--color-purple) 12.8%, rgb(8,16,40) 69.1%, #000 98.2%)",
        }}
      >
        {/* Vignette */}
        <div
          aria-hidden
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.67) 64.5%, #000 100%)",
          }}
        />
        {enableSecondaryAnimations ? (
          <>
            {/* Stars */}
            <div
              aria-hidden
              className="absolute inset-0 z-[1] pointer-events-none opacity-80 bg-repeat bg-[length:400px_auto] bg-left-top"
              style={{ backgroundImage: "url(/textures/stars.svg)" }}
            />
            {/* Pattern overlay */}
            <div
              aria-hidden
              className="absolute inset-0 z-[3] pointer-events-none opacity-60 mix-blend-overlay bg-repeat bg-[length:67px_auto] bg-left-top"
              style={{ backgroundImage: "url(/textures/grid.svg)" }}
            />

            {/* Ambient orbs */}
            <div
              aria-hidden
              className="absolute right-[-180px] top-[-120px] z-[4] pointer-events-none size-[680px] rounded-full opacity-30 max-md:hidden animate-float1"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(96,142,255,0.42), rgba(72,118,255,0.22) 45%, rgba(0,0,0,0) 75%)",
                filter: "blur(20px)",
              }}
            />
            <div
              aria-hidden
              className="absolute right-[40px] bottom-[60px] z-[4] pointer-events-none size-[380px] rounded-full opacity-25 max-md:hidden"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(84,130,255,0.34), rgba(22,36,74,0.28) 50%, rgba(0,0,0,0) 80%)",
                filter: "blur(30px)",
              }}
            />
          </>
        ) : (
          <div
            aria-hidden
            className="absolute right-[-120px] top-[-80px] z-[2] pointer-events-none size-[420px] rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(closest-side, rgba(96,142,255,0.28), rgba(72,118,255,0.14) 45%, rgba(0,0,0,0) 80%)",
              filter: "blur(16px)",
            }}
          />
        )}


        {/* Content */}
        <div className="relative z-[5] grid w-full grid-cols-[minmax(0,1fr)_420px] items-center gap-8 max-xl:grid-cols-1">
          <div className="flex flex-col gap-[28px]">
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-1.5 bg-black/60 border border-white/15 rounded-full py-2.5 px-3.5 backdrop-blur-[5px] shadow-[0_10px_20px_rgba(0,0,0,0.2)] w-fit">
                <span className="bg-purple rounded-full py-1 px-1.5 text-[8px] font-bold tracking-[0.05em] uppercase">
                  NEW
                </span>
                <span className="text-sm font-medium -tracking-[0.1px] leading-[1.4] text-white/90">
                  AI & Workflow Automation for Growing Businesses
                </span>
              </div>

              <h1
                id="hero-heading"
                className="font-sans font-medium text-[72px] -tracking-[0.05em] leading-[0.98em] text-white max-w-[860px] max-md:text-[40px]"
              >
                <span className="text-gradient">We automate the</span>
                <br />
                <span className="text-white">{typedText}</span>
                <span className={`ml-1 inline-block h-[0.92em] w-[2px] translate-y-1 bg-white/85 align-baseline ${enableSecondaryAnimations ? "animate-pulse" : ""}`} />
              </h1>

              <p className="text-xl font-normal -tracking-[0.01em] leading-[1.4em] text-white/70 max-w-[760px] max-md:text-base">
                Every day your team spends time copying data, chasing follow-ups, and
                answering the same questions. We build the{" "}
                <span className="text-white font-medium">automations that do all of it</span>{" "}
                — quietly, accurately, 24/7 — so your people can finally do the work you
                actually hired them for.
              </p>
            </div>

            {/* Dual CTA */}
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={primaryCta.href}
                className="btn-gloss relative overflow-hidden inline-flex items-center gap-2 px-5 py-[15px] rounded-[10px] bg-purple/70 border border-white/20 text-sm font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]"
              >
                <span className="relative z-[2]">{primaryCta.label}</span>
                <ArrowRightIcon className="relative z-[2] size-[14px] text-white" />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-5 py-[15px] rounded-[10px] bg-black/40 border border-white/15 backdrop-blur-[5px] text-sm font-medium text-white/90 transition-colors hover:bg-black/60 hover:text-white"
              >
                <WhatsAppIcon className="size-[16px] fill-white" />
                WhatsApp us
              </a>
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-x-8 gap-y-4 flex-wrap pt-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-[#ffd166]">
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
                <span className="text-sm font-medium text-white">
                  {trustBadges[0].value}
                </span>
                <span className="text-sm text-white/60">{trustBadges[0].label}</span>
              </div>
              <div className="h-4 w-px bg-white/15 max-sm:hidden" />
              <div className="text-sm">
                <span className="font-medium text-white">{trustBadges[1].value}</span>
                <span className="text-white/60"> {trustBadges[1].label}</span>
              </div>
              <div className="h-4 w-px bg-white/15 max-sm:hidden" />
              <div className="text-sm">
                <span className="font-medium text-white">{trustBadges[2].value}</span>
                <span className="text-white/60"> {trustBadges[2].label}</span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[440px] justify-self-end max-xl:justify-self-center">
            <div
              className="relative overflow-hidden rounded-[18px] border border-white/15 p-2"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.5) 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,.08), 0 24px 60px rgba(0,0,0,0.5)",
              }}
            >
              <div className="overflow-hidden rounded-[12px] border border-white/10">
                <LazyVideo
                  src="/videos/mockup-4.mp4"
                  poster="/videos/mockup-4.jpg"
                  className="aspect-video w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {enableSecondaryAnimations ? <TrustedTicker /> : null}
      </div>
    </section>
  );
}
