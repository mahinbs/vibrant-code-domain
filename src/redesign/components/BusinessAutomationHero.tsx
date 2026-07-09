import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { businessAutomationCta, whatsappHref } from "../data/site";
import { trustBadges } from "../data/stats";
import { heroRotatingItems } from "../data/businessAutomationContent";
import { LazyVideo } from "./LazyVideo";
import { ArrowRightIcon, StarIcon, WhatsAppIcon } from "./icons";
import { TrustedTicker } from "./TrustedTicker";

function HeroVideo() {
  return (
    <div className="flex w-full min-w-0 xl:py-2">
      <div
        className="relative flex w-full flex-col overflow-hidden rounded-[18px] border border-white/15 p-2 xl:min-h-[380px] xl:flex-1"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.5) 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,.08), 0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div className="min-h-0 flex-1 overflow-hidden rounded-[12px] border border-white/10">
          <LazyVideo
            src="/videos/mockup-4.mp4"
            poster="/videos/mockup-4.jpg"
            className="aspect-video size-full min-h-[220px] object-cover sm:min-h-[280px] xl:aspect-auto xl:min-h-[360px]"
          />
        </div>
      </div>
    </div>
  );
}

export type BusinessAutomationHeroContent = {
  badgeTag?: string;
  badgeLabel?: string;
  headline?: ReactNode;
  /** Static subcopy — disables the rotating hero items when set. */
  subcopy?: ReactNode;
  /** Secondary CTA when score CTA is the purple primary (e.g. watch videos). */
  primaryCta?: { label: string; href: string };
  /** Tertiary link before WhatsApp (default landing only). */
  exploreCta?: { label: string; href: string };
  showTrustedTicker?: boolean;
};

export function BusinessAutomationHero({
  whatsappHref: whatsappHrefProp,
  onPrimaryCtaClick,
  scoreCtaHref,
  onScoreCtaNavigate,
  content,
}: {
  whatsappHref?: string;
  onPrimaryCtaClick?: () => void;
  /** When set, "Get my automation score" links to the dedicated score page. */
  scoreCtaHref?: string;
  onScoreCtaNavigate?: () => void;
  content?: BusinessAutomationHeroContent;
} = {}) {
  const waHref = whatsappHrefProp ?? whatsappHref;
  const useRotatingSubcopy = !content?.subcopy;
  const primaryCta = content?.primaryCta ?? {
    label: businessAutomationCta.label,
    href: businessAutomationCta.href,
  };
  const exploreCta = content?.exploreCta ?? {
    label: "See what we automate ↓",
    href: "#what-we-automate",
  };
  const showExploreCta = !scoreCtaHref && Boolean(exploreCta.href);
  const showTicker = content?.showTrustedTicker !== false;
  const [autoIndex, setAutoIndex] = useState(0);
  const [fade, setFade] = useState(true);
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
    if (!useRotatingSubcopy) return;
    const iv = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setAutoIndex((i) => (i + 1) % heroRotatingItems.length);
        setFade(true);
      }, 280);
    }, 2400);
    return () => clearInterval(iv);
  }, [useRotatingSubcopy]);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="flex w-full items-center justify-center pt-2 max-md:pt-0"
    >
      <div
        className="relative mx-auto flex h-auto min-w-0 max-w-[1920px] flex-1 flex-col justify-center gap-[60px] overflow-hidden rounded-[20px] border border-white/15 px-[100px] pb-[150px] pt-[120px] will-change-transform max-xl:pb-16 max-md:gap-8 max-md:px-5 max-md:pb-28 max-md:pt-10 xl:h-[820px]"
        style={{
          background:
            "radial-gradient(108% 100% at 100% 100.6%, var(--color-purple) 12.8%, rgb(8,16,40) 69.1%, #000 98.2%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.67) 64.5%, #000 100%)",
          }}
        />
        {enableSecondaryAnimations ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1] bg-left-top bg-repeat opacity-80 bg-[length:400px_auto]"
              style={{ backgroundImage: "url(/textures/stars.svg)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[3] bg-left-top bg-repeat opacity-60 mix-blend-overlay bg-[length:67px_auto]"
              style={{ backgroundImage: "url(/textures/grid.svg)" }}
            />
            <div
              aria-hidden
              className="animate-float1 pointer-events-none absolute right-[-180px] top-[-120px] z-[4] size-[680px] rounded-full opacity-30 max-md:hidden"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(96,142,255,0.42), rgba(72,118,255,0.22) 45%, rgba(0,0,0,0) 75%)",
                filter: "blur(20px)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[60px] right-[40px] z-[4] size-[380px] rounded-full opacity-25 max-md:hidden"
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
            className="pointer-events-none absolute right-[-120px] top-[-80px] z-[2] size-[420px] rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(closest-side, rgba(96,142,255,0.28), rgba(72,118,255,0.14) 45%, rgba(0,0,0,0) 80%)",
              filter: "blur(16px)",
            }}
          />
        )}

        <div className="relative z-[5] grid w-full grid-cols-1 items-center gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(500px,52%)] xl:items-stretch xl:gap-10">
          {/* Copy: badge, headline, subcopy */}
          <div className="flex flex-col gap-5 max-xl:order-1 xl:col-start-1 xl:row-start-1">
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3.5 py-2.5 shadow-[0_10px_20px_rgba(0,0,0,0.2)] backdrop-blur-[5px]">
              <span className="rounded-full bg-purple px-1.5 py-1 text-[8px] font-bold uppercase tracking-[0.05em]">
                {content?.badgeTag ?? "NEW"}
              </span>
              <span className="text-sm font-medium -tracking-[0.1px] leading-[1.4] text-white/90">
                {content?.badgeLabel ?? "AI Automation for Modern Businesses"}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="max-w-[860px] font-sans text-[40px] font-medium leading-[0.98em] -tracking-[0.05em] text-white md:text-[64px]"
            >
              {content?.headline ?? (
                <>
                  Businesses that don&apos;t
                  <br />
                  <span className="impact-highlight">automate</span>
                  <br />
                  <span className="text-white/65">don&apos;t just fall behind.</span>
                  <br />
                  They <span className="impact-highlight">disappear</span>.
                </>
              )}
            </h1>

            <p className="max-w-[760px] text-xl font-normal -tracking-[0.01em] leading-[1.4em] text-white/70 max-md:text-base">
              {content?.subcopy ?? (
                <>
                  Right now your competitor is automating their{" "}
                  <span
                    className="impact-highlight inline-block min-w-[10ch] font-medium transition-opacity duration-300"
                    style={{ opacity: fade ? 1 : 0 }}
                  >
                    {heroRotatingItems[autoIndex]}
                  </span>
                  .
                  <br />
                  We&apos;ll help you do the same in 30 days.
                </>
              )}
            </p>
          </div>

          {/* Video: order 2 on mobile, right column on desktop */}
          <div className="max-xl:order-2 xl:col-start-2 xl:row-span-2">
            <HeroVideo />
          </div>

          {/* CTAs + stats: order 3 on mobile, left column bottom on desktop */}
          <div className="flex flex-col gap-[28px] max-xl:order-3 xl:col-start-1 xl:row-start-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-3 max-xl:grid max-xl:grid-cols-2 max-xl:gap-3 xl:flex xl:flex-row xl:flex-wrap xl:items-center">
                {scoreCtaHref ? (
                  <span className="btn-glow-ring max-xl:col-span-2 max-xl:w-full xl:inline-flex">
                    <Link
                      to={scoreCtaHref}
                      onClick={onScoreCtaNavigate}
                      className="btn-gloss relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-4 py-[15px] text-center text-[13px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)] sm:text-sm xl:px-5"
                    >
                      <span className="relative z-[2]">Get my free automation score</span>
                      <ArrowRightIcon className="relative z-[2] size-[14px] shrink-0 text-white" />
                    </Link>
                  </span>
                ) : null}
                {onPrimaryCtaClick ? (
                  <button
                    type="button"
                    onClick={onPrimaryCtaClick}
                    className={
                      scoreCtaHref
                        ? "inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/15 bg-black/40 px-4 py-[15px] text-center text-[13px] font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white max-xl:w-full sm:text-sm xl:px-5"
                        : "btn-gloss relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-4 py-[15px] text-center text-[13px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)] max-xl:w-full sm:text-sm xl:inline-flex xl:px-5"
                    }
                  >
                    <span className="relative z-[2]">{primaryCta.label}</span>
                    {!scoreCtaHref ? (
                      <ArrowRightIcon className="relative z-[2] size-[14px] shrink-0 text-white" />
                    ) : null}
                  </button>
                ) : (
                  <a
                    href={primaryCta.href}
                    className={
                      scoreCtaHref
                        ? "inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/15 bg-black/40 px-4 py-[15px] text-center text-[13px] font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white max-xl:w-full sm:text-sm xl:px-5"
                        : "btn-gloss relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-4 py-[15px] text-center text-[13px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)] max-xl:w-full sm:text-sm xl:inline-flex xl:px-5"
                    }
                  >
                    <span className="relative z-[2]">{primaryCta.label}</span>
                    {!scoreCtaHref ? (
                      <ArrowRightIcon className="relative z-[2] size-[14px] shrink-0 text-white" />
                    ) : null}
                  </a>
                )}
                {showExploreCta ? (
                  <a
                    href={exploreCta.href}
                    className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/15 bg-black/40 px-4 py-[15px] text-center text-[13px] font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white max-xl:w-full sm:text-sm xl:px-5"
                  >
                    {exploreCta.label}
                  </a>
                ) : null}
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener"
                  className={
                    scoreCtaHref
                      ? "inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/15 bg-black/40 px-5 py-[15px] text-sm font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white max-xl:w-full xl:col-span-1"
                      : "inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/15 bg-black/40 px-5 py-[15px] text-sm font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white max-xl:col-span-2 max-xl:w-full xl:col-span-1"
                  }
                >
                  <WhatsAppIcon className="size-[16px] fill-white" />
                  WhatsApp us
                </a>
              </div>
              {scoreCtaHref ? (
                <p className="text-[12px] text-white/50">
                  The score takes 60 seconds · personalized report · no call needed
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-[#ffd166]">
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
                <span className="text-sm font-medium text-white">{trustBadges[0].value}</span>
                <span className="text-sm text-white/60">{trustBadges[0].label}</span>
              </div>
              <div className="h-4 w-px bg-white/15 max-sm:hidden" />
              <div className="text-sm">
                <span className="font-medium text-white">200+</span>
                <span className="text-white/60"> businesses automated</span>
              </div>
              <div className="h-4 w-px bg-white/15 max-sm:hidden" />
              <div className="text-sm">
                <span className="font-medium text-white">30 days</span>
                <span className="text-white/60"> average deployment</span>
              </div>
            </div>
          </div>
        </div>

        {enableSecondaryAnimations && showTicker ? <TrustedTicker /> : null}
      </div>
    </section>
  );
}
