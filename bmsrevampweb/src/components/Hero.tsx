import { useEffect, useState } from "react";
import { primaryCta, whatsappHref } from "../data/site";
import { trustBadges } from "../data/stats";
import { FintechIsometricBuild } from "./FintechIsometricBuild";
import { ArrowRightIcon, StarIcon, WhatsAppIcon } from "./icons";
import { TrustedTicker } from "./TrustedTicker";

export function Hero() {
  const typingWords = [
    "Fintech Platforms",
    "Healthcare Solutions",
    "AI Operations",
    "SaaS Products",
    "Mobile Apps",
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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
  }, [typedText, isDeleting, wordIndex, typingWords]);

  return (
    <div id="top" className="w-full flex items-center justify-center pt-2">
      <div
        className="relative flex-1 min-w-0 h-[820px] max-w-[min(1920px,96vw)] rounded-[20px] border border-white/15 overflow-hidden flex flex-col justify-center gap-[60px] px-[100px] pt-[120px] pb-[150px] will-change-transform max-md:h-auto max-md:px-5 max-md:py-24 max-md:gap-10"
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


        {/* Content */}
        <div className="relative z-[5] grid w-full grid-cols-[minmax(0,1fr)_420px] items-center gap-8 max-xl:grid-cols-1">
          <div className="flex flex-col gap-[28px]">
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-1.5 bg-black/60 border border-white/15 rounded-full py-2.5 px-3.5 backdrop-blur-[5px] shadow-[0_10px_20px_rgba(0,0,0,0.2)] w-fit">
                <span className="bg-purple rounded-full py-1 px-1.5 text-[8px] font-bold tracking-[0.05em] uppercase">
                  NEW
                </span>
                <span className="text-sm font-medium -tracking-[0.1px] leading-[1.4] text-white/90">
                  Fintech & Healthcare specialists — HIPAA · PCI-DSS · ISO ready
                </span>
              </div>

              <h1 className="font-sans font-medium text-[72px] -tracking-[0.05em] leading-[0.98em] text-white max-w-[860px] max-md:text-[40px]">
                <span className="text-gradient">We build next-gen</span>
                <br />
                <span className="text-white">{typedText}</span>
                <span className="ml-1 inline-block h-[0.92em] w-[2px] translate-y-1 bg-white/85 align-baseline animate-pulse" />
              </h1>

              <p className="text-xl font-normal -tracking-[0.01em] leading-[1.4em] text-white/70 max-w-[760px] max-md:text-base">
                Custom web, mobile, SaaS, and AI — with a deep bench in{" "}
                <span className="text-white font-medium">regulated industries</span>.
                Fintech teams trust us to ship compliant, scalable infrastructure.
                Healthcare teams trust us to build HIPAA-ready products. 500+ teams
                across 56+ cities.
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

          <div className="w-full max-w-[420px] justify-self-end max-xl:justify-self-center">
            <FintechIsometricBuild />
          </div>
        </div>

        <TrustedTicker />
      </div>
    </div>
  );
}
