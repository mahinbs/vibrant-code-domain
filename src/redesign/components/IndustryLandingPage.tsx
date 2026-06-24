import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { SiteBackground } from "./SiteBackground";
import { workCaseStudyUrl } from "../lib/mainSiteWorkUrl";
import { CTA } from "./CTA";
import { BookCallWithFounderBand } from "./BookCallWithFounderBand";
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { WORK_PRIMARY_GLOSS_CTA_H10, WORK_PRIMARY_GLOSS_CTA_INNER } from "@/components/work/primitives/ctaStyles";
import { filterPortfolioByVertical, normalizeBackendPortfolio } from "../lib/backendPortfolio";
import { founder } from "../data/founder";
import { stats as siteStats } from "../data/stats";
import { whatsappHref } from "../data/site";
import { SectionDivider } from "./SectionDivider";
import { TechCompanyHeroBanner } from "./TechCompanyHeroBanner";
import { FounderServicesSection } from "./FounderServicesSection";
import {
  FounderLeadershipStrip,
  FOUNDER_STRIP_REGULATED_QUOTE,
} from "./FounderLeadershipStrip";
import { HighlightText } from "../lib/highlightImpactText";

const INDUSTRY_WORK_MAX_STACK = 6;

/** Match hero card horizontal inset (`p-6 md:p-10`) so stacked sections share the same rhythm. */
const SECTION_PAGE_X = "px-6 md:px-10";

/** Same usable width as hero inner content: full width inside section + main padding (no 1120px cap). */
const SECTION_CONTENT = "mx-auto w-full max-w-full";

/** Same dark-purple radial bloom homepage Services/Process/CTA bands use, so cards
 *  read as glassy panels floating on a wash instead of slabs of black.
 *  Center alpha toned down ~30% vs full `var(--color-dark-purple)` so bands read lighter. */
const sectionWashStyle: CSSProperties = {
  background:
    "radial-gradient(50% 40% at 50% 30%, rgba(22, 36, 74, 0.7) 0%, rgba(0,0,0,0) 100%)",
};

/** Wider soft edges than `TrustedTicker` — static label is longer, marquee strip is narrower. */
const capabilityMarqueeMaskStyle: CSSProperties = {
  maskImage: "linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)",
};

const heroPanelBackgroundStyle: CSSProperties = {
  background:
    "radial-gradient(108% 100% at 100% 100.6%, var(--color-purple) 12.8%, rgb(8,16,40) 69.1%, rgba(0,0,0,0.595) 100%)",
};

/** Purple gradient hero card — stars, grid, glow blobs (banner + copy blocks). */
function HeroPanelShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`relative w-full overflow-hidden rounded-[20px] border border-white/15 p-6 md:p-10 ${className}`}
      style={heroPanelBackgroundStyle}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.469) 64.5%, rgba(0,0,0,0.7) 100%)",
        }}
      />
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
      <div className="relative z-[5] flex flex-col gap-6">{children}</div>
    </section>
  );
}

type SectionCard = {
  title: string;
  body: string;
};

function defaultExpertiseSectionHeading(vertical?: "fintech" | "healthcare"): string {
  if (vertical === "healthcare") {
    return "Infrastructure Across Care and Clinical Systems";
  }
  if (vertical === "fintech") {
    return "Infrastructure Across Financial Systems";
  }
  return "Infrastructure we ship";
}

function defaultExpertiseSectionSubheading(vertical?: "fintech" | "healthcare"): string {
  if (vertical === "healthcare") {
    return "HIPAA-aware delivery, interoperability, and reliability—from telehealth to clinical data platforms.";
  }
  if (vertical === "fintech") {
    return "From payments and lending to risk and treasury—systems engineered for regulated, real-time operations.";
  }
  return "Product and platform engineering for teams that cannot afford fragile software.";
}

/** Split a comma-separated capability body into short, capitalized chip tokens.
 *  Drops trailing "and", periods, and the redundant " systems" tail on the last entry. */
function deriveCapabilityChips(body: string): string[] {
  return body
    .replace(/\.$/, "")
    .split(/\s*,\s*/)
    .map((raw) => raw.replace(/^and\s+/i, "").replace(/\s+systems$/i, "").trim())
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1));
}

const PROCESS_TESTIMONIAL_AVATAR_SRC = "/images/testimonial-regulated-payments.webp";

/** Founder call-to-action band — after “How it works” on industry landings. */
function buildTogetherCtaLabel(portfolioVertical?: "fintech" | "healthcare") {
  if (portfolioVertical === "fintech") return "Let's build your fintech business together";
  if (portfolioVertical === "healthcare") return "Let's build your healthcare product together";
  return "Let's build your product together";
}

/** Horizontal testimonial band (avatar + quote) — matches fintech landing spec; image is a simple swap via `public/images/testimonial-regulated-payments.webp`. */
function ProcessTestimonialBand() {
  return (
    <section
      className={`process-testimonial mt-4 w-full py-8 md:py-10 ${SECTION_PAGE_X}`}
      style={sectionWashStyle}
      aria-label="Client testimonial"
    >
      <div className={SECTION_CONTENT}>
        <figure className="process-testimonial__card relative isolate w-full">
          <div className="relative z-[2] flex flex-row items-stretch gap-0 py-2 md:py-3">
            <div className="process-testimonial__avatar flex shrink-0 items-center justify-center">
              <div className="process-testimonial__avatar-face relative h-[76px] w-[76px] overflow-hidden rounded-full border border-white/[0.2] bg-[linear-gradient(155deg,rgba(88,132,230,0.45),rgba(18,24,44,0.95))] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] sm:h-[84px] sm:w-[84px] md:h-[92px] md:w-[92px]">
                <img
                  src={PROCESS_TESTIMONIAL_AVATAR_SRC}
                  alt=""
                  className="h-full w-full object-cover object-[center_15%]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div
              className="process-testimonial__accent pointer-events-none mx-5 w-px shrink-0 self-stretch min-h-[5rem] md:mx-8"
              aria-hidden
            />
            <blockquote className="process-testimonial__body flex min-w-0 flex-1 flex-col justify-center border-0 py-1 pl-0">
              <p className="process-testimonial__quote text-[17px] font-medium leading-snug tracking-[-0.015em] text-white/[0.94] md:text-[18px]">
                “The team understood regulated infrastructure constraints faster than most vendors we evaluated.”
              </p>
              <footer className="process-testimonial__role mt-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11.5px]">
                Head of Engineering, regulated payments
              </footer>
            </blockquote>
          </div>
        </figure>
      </div>
    </section>
  );
}

function ExpertisePrimaryViz({ variant }: { variant?: "fintech" | "healthcare" }) {
  const gid = useId().replace(/:/g, "");
  const chips =
    variant === "healthcare"
      ? ["Encounter p99", "FHIR routes", "Audit trail", "PHI checks", "Interlink sync"]
      : ["Settlement p99", "Route health", "Active rails", "Risk checks", "Recon sync"];

  const tickerRows: { label: string; value: string }[] =
    variant === "healthcare"
      ? [
          { label: "encounter.p99", value: "184ms" },
          { label: "fhir.routes", value: "12 active" },
          { label: "phi.checks", value: "OK · 1.4k/min" },
          { label: "interlink.sync", value: "lag 0.6s" },
        ]
      : [
          { label: "auth.success", value: "99.982%" },
          { label: "route.latency_p99", value: "142ms" },
          { label: "rail.health", value: "4 / 4 OK" },
          { label: "recon.lag", value: "1.2s" },
        ];

  if (variant === "healthcare") {
    const nodes: { left: string; top: string }[] = [
      { left: "10%", top: "62%" },
      { left: "26%", top: "36%" },
      { left: "48%", top: "52%" },
      { left: "68%", top: "30%" },
      { left: "84%", top: "58%" },
    ];
    const barHeights = [0.2, 0.32, 0.24, 0.36, 0.22, 0.3, 0.28, 0.34];

    return (
      <div className="expertise-primary-viz relative z-[4] flex min-h-[200px] flex-1 flex-col gap-3 lg:min-h-[240px]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[55%] z-[1] h-[min(130%,440px)] w-[min(130%,440px)] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="expertise-primary-radar h-full w-full rounded-full" />
        </div>

        <div className="relative z-[3] flex flex-wrap items-center gap-1.5">
          <span
            aria-hidden
            className="expertise-primary-livedot mr-0.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(108,148,255,0.95)] shadow-[0_0_8px_rgba(108,148,255,0.6)]"
          />
          {chips.map((label) => (
            <span
              key={label}
              className="rounded border border-white/[0.14] bg-black/25 px-1.5 py-0.5 font-mono text-[10px] leading-tight tracking-[0.04em] text-white/[0.7]"
            >
              {label}
            </span>
          ))}
        </div>

        <div
          aria-hidden
          className="relative z-[3] mt-1 flex flex-col rounded-md border border-white/[0.07] bg-black/25 px-3 py-2 font-mono text-[11px] leading-[1.6] text-white/80 backdrop-blur-[2px]"
        >
          {tickerRows.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between gap-3 ${
                i < tickerRows.length - 1 ? "border-b border-white/[0.06]" : ""
              }`}
            >
              <span className="truncate text-white/[0.5]">{row.label}</span>
              <span className="flex items-center gap-1 text-white/[0.92]">
                <span className="tabular-nums">{row.value}</span>
                <span
                  className="expertise-primary-cursor inline-block w-[5px] text-[rgba(108,148,255,0.85)]"
                  style={{ animationDelay: `${i * 0.22}s` }}
                >
                  ▍
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="relative z-[2] mt-1 min-h-[64px] flex-1 lg:min-h-[72px]">
          <svg
            aria-hidden
            className="absolute inset-x-0 top-0 h-full w-full opacity-[0.85]"
            viewBox="0 0 440 88"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              className="expertise-primary-flow-path"
              d="M 16 52 Q 108 18, 210 46 T 392 40"
              fill="none"
              stroke="rgba(178,198,255,0.45)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              className="expertise-primary-flow-path expertise-primary-flow-path--b"
              d="M 32 70 Q 128 84, 232 56 T 404 64"
              fill="none"
              stroke="rgba(178,198,255,0.32)"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          </svg>
          {nodes.map((pos, i) => (
            <span
              key={i}
              aria-hidden
              className="expertise-primary-node pointer-events-none absolute h-[4px] w-[4px] rounded-full bg-[rgba(108,148,255,0.85)] shadow-[0_0_10px_rgba(108,148,255,0.45)]"
              style={{ left: pos.left, top: pos.top, animationDelay: `${i * 1.1}s` }}
            />
          ))}
        </div>

        <div
          aria-hidden
          className="relative z-[3] mt-auto flex h-6 max-w-[240px] items-end gap-px opacity-[0.7] lg:h-7 lg:max-w-[280px]"
        >
          {barHeights.map((h, i) => (
            <div
              key={i}
              className="expertise-primary-microbar flex-1 rounded-t-[1px] bg-gradient-to-t from-white/[0.12] to-[rgba(108,148,255,0.45)]"
              style={{ height: `${Math.round(h * 100)}%`, animationDelay: `${i * 0.32}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  const sparkFillId = `expertise-ft-spark-fill-${gid}`;
  const sparkGlowId = `expertise-ft-spark-glow-${gid}`;
  const utilBars = [0.44, 0.58, 0.5, 0.72, 0.55, 0.68, 0.48, 0.76, 0.58, 0.7, 0.52, 0.64, 0.46, 0.74];

  return (
    <div className="expertise-primary-viz relative z-[4] flex min-h-[220px] flex-1 flex-col gap-3 lg:min-h-[280px]">
      <div
        aria-hidden
        className="expertise-ft-bloom pointer-events-none absolute left-1/2 top-[46%] z-[1] h-[min(100%,300px)] w-[min(100%,300px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_42%_32%,rgba(96,140,255,0.24),rgba(24,36,72,0.14)_48%,transparent_70%)] blur-[44px] opacity-90"
      />

      <div className="relative z-[3] flex flex-wrap items-center gap-1.5">
        <span
          aria-hidden
          className="expertise-primary-livedot mr-0.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(108,148,255,0.95)] shadow-[0_0_8px_rgba(108,148,255,0.6)]"
        />
        {chips.map((label) => (
          <span
            key={label}
            className="rounded border border-white/[0.14] bg-black/25 px-1.5 py-0.5 font-mono text-[10px] leading-tight tracking-[0.04em] text-white/[0.7]"
          >
            {label}
          </span>
        ))}
      </div>

      <div
        aria-hidden
        className="relative z-[3] mt-1 flex flex-col rounded-md border border-white/[0.07] bg-black/25 px-3 py-2 font-mono text-[11px] leading-[1.6] text-white/80 backdrop-blur-[2px]"
      >
        {tickerRows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center justify-between gap-3 ${
              i < tickerRows.length - 1 ? "border-b border-white/[0.06]" : ""
            }`}
          >
            <span className="truncate text-white/[0.5]">{row.label}</span>
            <span className="flex items-center gap-1 text-white/[0.92]">
              <span className="tabular-nums">{row.value}</span>
              <span
                className="expertise-primary-cursor inline-block w-[5px] text-[rgba(108,148,255,0.85)]"
                style={{ animationDelay: `${i * 0.22}s` }}
              >
                ▍
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="expertise-ft-panel relative z-[3] mt-1 rounded-md border border-white/[0.1] bg-black/35 px-3 py-2 backdrop-blur-[2px]">
        <div className="mb-2 flex items-end justify-between gap-2">
          <span className="font-mono text-[10px] leading-tight tracking-[0.04em] text-white/50">
            Throughput (req/s · 5m)
          </span>
          <span className="font-mono text-[10px] text-[rgba(150,188,255,0.95)]">within SLO</span>
        </div>
        <svg aria-hidden className="expertise-ft-chart h-[92px] w-full overflow-visible" viewBox="0 0 360 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={sparkFillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(108,148,255,0.45)" />
              <stop offset="50%" stopColor="rgba(108,148,255,0.14)" />
              <stop offset="100%" stopColor="rgba(108,148,255,0)" />
            </linearGradient>
            <filter id={sparkGlowId} x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <line x1="6" y1="82" x2="354" y2="82" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <path
            className="expertise-ft-spark-fill-path"
            pathLength="1"
            d="M 8 70 C 48 66 72 54 112 58 S 168 40 216 46 S 272 28 352 32 L 352 82 L 8 82 Z"
            fill={`url(#${sparkFillId})`}
          />
          <path
            className="expertise-ft-spark-stroke"
            pathLength="1"
            d="M 8 70 C 48 66 72 54 112 58 S 168 40 216 46 S 272 28 352 32"
            fill="none"
            stroke="rgba(175,205,255,0.95)"
            strokeWidth="1.85"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${sparkGlowId})`}
          />
        </svg>
      </div>

      <div className="expertise-ft-panel relative z-[3] mt-1 rounded-md border border-white/[0.1] bg-black/35 px-3 pb-2.5 pt-2 backdrop-blur-[2px]">
        <div className="mb-2 font-mono text-[10px] leading-tight tracking-[0.04em] text-white/50">
          Rail utilization (14 active paths)
        </div>
        <div className="flex h-[4.5rem] items-end gap-1 sm:h-[5.25rem] sm:gap-1.5">
          {utilBars.map((h, i) => (
            <div
              key={i}
              className="expertise-ft-util-bar min-w-0 flex-1 origin-bottom rounded-t-[5px] bg-gradient-to-t from-white/[0.1] to-[rgba(108,148,255,0.62)] shadow-[0_-4px_14px_rgba(72,118,255,0.14)]"
              style={{ height: `${Math.round(h * 100)}%`, animationDelay: `${i * 0.055}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExpertiseBentoSection({
  cards,
  heading,
  subheading,
  portfolioVertical,
}: {
  cards: SectionCard[];
  heading: string;
  subheading: string;
  portfolioVertical?: "fintech" | "healthcare";
}) {
  if (!cards.length) return null;

  const primary = cards[0];
  const rail = cards.slice(1, Math.min(4, cards.length));
  const tertiary = cards.length > 4 ? cards.slice(4) : [];
  const primarySpan = rail.length > 0 ? "lg:col-span-8" : "lg:col-span-12";

  return (
    <section className={`mt-6 w-full pb-14 pt-8 md:pb-20 md:pt-10 ${SECTION_PAGE_X}`}>
      <div className={SECTION_CONTENT}>
        <h2 className="max-w-2xl text-[clamp(1.5rem,3.2vw,2.12rem)] font-medium tracking-tight text-white">
          <HighlightText text={heading} />
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-[1.55] text-white/55 md:text-lg">
          <HighlightText text={subheading} />
        </p>

        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-12 lg:gap-5 lg:items-stretch">
          <article
            className={`expertise-bento-primary group relative isolate flex min-h-[min(52vh,380px)] flex-col overflow-hidden rounded-[20px] border border-white/[0.09] bg-[radial-gradient(120%_90%_at_20%_0%,rgba(72,118,255,0.2),rgba(6,10,22,0.92)_55%,rgba(0,0,0,0.88)_100%)] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:min-h-[340px] md:p-9 ${primarySpan}`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1] opacity-[0.28] mix-blend-overlay"
              style={{ backgroundImage: "url(/textures/grid.svg)", backgroundSize: "64px 64px" }}
            />
            <div className="featured-infra-bloom pointer-events-none absolute -right-[22%] top-[14%] z-[2] h-[min(68vw,400px)] w-[min(68vw,400px)] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(88,118,168,0.14)_0%,rgba(72,118,255,0.06)_45%,transparent_72%)] opacity-[0.35] blur-[80px]" />
            <div className="featured-infra-scanline pointer-events-none absolute inset-x-[-20%] top-[40%] z-[3] h-px opacity-30 bg-gradient-to-r from-transparent via-[rgba(115,135,175,0.22)] to-transparent" />

            <ExpertisePrimaryViz variant={portfolioVertical} />

            <div className="relative z-[6] mt-3 shrink-0 border-t border-white/[0.06] pt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Primary capability</p>
              <h3 className="mt-2 text-[clamp(1.35rem,2.8vw,1.85rem)] font-medium leading-tight text-white">{primary.title}</h3>
              <p className="mt-4 max-w-xl text-[16px] leading-[1.6] text-white/72 md:text-[17px]">{primary.body}</p>
            </div>
          </article>

          {rail.length > 0 ? (
            <div className="flex flex-col gap-3 lg:col-span-4">
              {rail.map((card) => (
                <article
                  key={card.title}
                  className="expertise-bento-rail group relative flex flex-1 flex-col justify-center rounded-[14px] border-l-2 border-purple/45 bg-white/[0.04] py-4 pl-5 pr-4 transition-colors hover:bg-white/[0.06]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{card.title}</p>
                  <p className="mt-2 text-[14px] leading-[1.5] text-white/70">{card.body}</p>
                </article>
              ))}
            </div>
          ) : null}
        </div>

        {tertiary.length === 1 ? (
          <div className="mt-5 flex flex-col gap-3 border-t border-white/[0.06] pt-5 md:mt-6 md:flex-row md:items-center md:gap-6 md:pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55 md:shrink-0">
              {tertiary[0].title}
            </p>
            <ul aria-label={tertiary[0].title} className="flex flex-wrap items-center gap-2">
              {deriveCapabilityChips(tertiary[0].body).map((token) => (
                <li
                  key={token}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-2.5 py-1 text-[12px] leading-none text-white/72"
                >
                  <span
                    aria-hidden
                    className="h-[5px] w-[5px] rounded-full bg-[rgba(108,148,255,0.55)]"
                  />
                  {token}
                </li>
              ))}
            </ul>
          </div>
        ) : tertiary.length > 1 ? (
          <div className="mt-4 grid w-full gap-3 lg:mt-5 md:grid-cols-2">
            {tertiary.map((card) => (
              <article
                key={card.title}
                className="expertise-bento-tertiary w-full rounded-[12px] border border-white/[0.06] bg-white/[0.02] px-3 py-4 md:px-5"
              >
                <p className="text-[13px] font-medium text-white/78 md:shrink-0">{card.title}</p>
                <p className="text-[13px] leading-relaxed text-white/48">{card.body}</p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export type OperatingModelPillar = {
  title: string;
  body: string;
};

const DEFAULT_OPERATING_MODEL_TITLE = "The Boostmysites Operating Model";

function defaultOperatingModelSubheading(vertical?: "fintech" | "healthcare"): string {
  if (vertical === "healthcare") {
    return "Senior execution with HIPAA-aware design, clinical interoperability, and production discipline baked in.";
  }
  if (vertical === "fintech") {
    return "Senior execution with compliance-first architecture, sprint visibility, and production discipline baked in.";
  }
  return "Senior teams, transparent execution, and production discipline—without agency theater.";
}

function defaultOperatingCenterLabel(): string {
  return "Design → ship → operate";
}

function defaultOperatingCenterHint(): string {
  return "Weekly demos, code you own, and disciplined releases—with observability and rollback readiness end to end.";
}

function OperatingModelHubSection({
  title,
  subheading,
  pillars,
  centerLabel,
  centerHint,
}: {
  title: string;
  subheading: string;
  pillars: OperatingModelPillar[];
  centerLabel: string;
  centerHint: string;
}) {
  if (pillars.length < 4) return null;
  const [tl, tr, bl, br] = pillars;

  function PillarCard({ pillar, className }: { pillar: OperatingModelPillar; className: string }) {
    return (
      <div className={`flex flex-col justify-center rounded-[14px] bg-white/[0.035] py-4 ${className}`}>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">{pillar.title}</p>
        <p className="mt-2 text-[14px] leading-[1.5] text-white/68 md:text-[15px]">{pillar.body}</p>
      </div>
    );
  }

  /* Primary page signature for motion: hub connector topology (paths + dash drift).
   * Featured infrastructure keeps its own hero-scale motion; avoid matching intensity here. */
  return (
    <section className={`mt-6 w-full py-10 md:py-16 ${SECTION_PAGE_X}`}>
      <div className={SECTION_CONTENT}>
        <h2 className="section-heading-wash relative z-[1] max-w-[42rem] text-[clamp(1.5rem,3.2vw,2.05rem)] font-medium tracking-tight text-white">
          <HighlightText text={title} />
        </h2>
        <p className="mt-4 max-w-2xl text-[16px] leading-[1.55] text-white/55 md:text-[17px]">
          <HighlightText text={subheading} />
        </p>

        <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:hidden">
          <div className="operating-hub-focal relative mx-auto flex min-h-[240px] w-full max-w-[min(540px,100%)] flex-col items-center justify-center overflow-hidden rounded-[22px] border border-white/[0.1] px-6 py-9 text-center md:px-7 md:py-11">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
              style={{ backgroundImage: "url(/textures/grid.svg)", backgroundSize: "56px 56px" }}
            />
            <div className="operating-hub-orbit pointer-events-none absolute inset-[10%] rounded-full border border-dashed border-white/[0.12]" />
            <div className="operating-hub-orbit operating-hub-orbit--outer pointer-events-none absolute inset-[4%] rounded-full border border-dashed border-white/[0.07]" />
            <div className="featured-infra-bloom pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[min(72vw,280px)] w-[min(72vw,280px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(100,160,255,0.2)_0%,transparent_70%)] blur-[52px]" />
            <p className="relative z-[2] font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">Operating loop</p>
            <p className="relative z-[2] mt-3 text-[clamp(1.05rem,4vw,1.35rem)] font-medium leading-snug text-white md:text-[clamp(1.1rem,3.2vw,1.45rem)]">
              {centerLabel}
            </p>
            <p className="relative z-[2] mt-3 max-w-[min(360px,90%)] text-[13px] leading-relaxed text-white/55">{centerHint}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[tl, tr, bl, br].map((pillar) => (
              <PillarCard key={pillar.title} pillar={pillar} className="border-l-2 border-purple/50 pl-5 pr-4" />
            ))}
          </div>
        </div>

        <div className="mt-12 hidden lg:mt-16 lg:block">
          <div className="operating-hub-diagram relative mx-auto aspect-[16/10] w-full max-w-full">
            <svg
              className="operating-hub-connect-layer pointer-events-none absolute inset-0 z-[2] h-full w-full"
              viewBox="0 0 940 587"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
            >
              <defs>
                <marker
                  id="operating-hub-arrow"
                  viewBox="0 0 12 10"
                  refX="11"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 12 5 L 0 10 L 3 5 z" fill="rgba(170,195,255,0.78)" />
                </marker>
              </defs>

              <path
                className="operating-hub-connect-path"
                d="M 268 142 C 314 156 342 168 358 182"
                strokeLinecap="round"
                markerEnd="url(#operating-hub-arrow)"
              />
              <path
                className="operating-hub-connect-path operating-hub-connect-path--b"
                d="M 672 142 C 626 156 598 168 582 182"
                strokeLinecap="round"
                markerEnd="url(#operating-hub-arrow)"
              />
              <path
                className="operating-hub-connect-path operating-hub-connect-path--c"
                d="M 268 445 C 314 431 342 419 358 405"
                strokeLinecap="round"
                markerEnd="url(#operating-hub-arrow)"
              />
              <path
                className="operating-hub-connect-path operating-hub-connect-path--d"
                d="M 672 445 C 626 431 598 419 582 405"
                strokeLinecap="round"
                markerEnd="url(#operating-hub-arrow)"
              />
            </svg>

            <div className="operating-hub-pillar absolute left-0 top-0 z-[3] w-[260px] rounded-[12px] border-l-2 border-purple/55 bg-white/[0.025] py-3.5 pl-5 pr-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/52">{tl.title}</p>
              <p className="mt-2 text-[13.5px] leading-[1.5] text-white/68">{tl.body}</p>
            </div>
            <div className="operating-hub-pillar absolute right-0 top-0 z-[3] w-[260px] rounded-[12px] border-r-2 border-purple/55 bg-white/[0.025] py-3.5 pl-4 pr-5 text-right">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/52">{tr.title}</p>
              <p className="mt-2 text-[13.5px] leading-[1.5] text-white/68">{tr.body}</p>
            </div>
            <div className="operating-hub-pillar absolute bottom-0 left-0 z-[3] w-[260px] rounded-[12px] border-l-2 border-purple/55 bg-white/[0.025] py-3.5 pl-5 pr-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/52">{bl.title}</p>
              <p className="mt-2 text-[13.5px] leading-[1.5] text-white/68">{bl.body}</p>
            </div>
            <div className="operating-hub-pillar absolute bottom-0 right-0 z-[3] w-[260px] rounded-[12px] border-r-2 border-purple/55 bg-white/[0.025] py-3.5 pl-4 pr-5 text-right">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/52">{br.title}</p>
              <p className="mt-2 text-[13.5px] leading-[1.5] text-white/68">{br.body}</p>
            </div>

            <div className="operating-hub-focal absolute left-1/2 top-1/2 z-[4] flex h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-hidden rounded-full border border-white/[0.12] px-7 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_30px_100px_rgba(0,0,0,0.45)]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full opacity-[0.18] mix-blend-overlay"
                style={{ backgroundImage: "url(/textures/grid.svg)", backgroundSize: "56px 56px" }}
              />
              <div className="operating-hub-orbit pointer-events-none absolute inset-[10%] rounded-full border border-dashed border-white/[0.14]" />
              <div className="operating-hub-orbit operating-hub-orbit--outer pointer-events-none absolute inset-[2%] rounded-full border border-dashed border-white/[0.08]" />
              <div className="featured-infra-bloom pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(110,165,255,0.28)_0%,transparent_70%)] blur-[58px]" />
              <div className="featured-infra-scanline pointer-events-none absolute inset-x-[-10%] top-[52%] z-[2] h-px bg-gradient-to-r from-transparent via-[rgba(150,180,255,0.28)] to-transparent" />
              <p className="relative z-[3] font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/52">Operating loop</p>
              <p className="relative z-[3] mt-3 max-w-[260px] text-[clamp(1.1rem,1.8vw,1.4rem)] font-medium leading-snug text-white">
                {centerLabel}
              </p>
              <p className="relative z-[3] mt-3 max-w-[244px] text-[12.5px] leading-[1.55] text-white/58">
                {centerHint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export type ScaleArchitectureItem = {
  label: string;
  detail: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

function ScaleArchitectureSection({
  title,
  items,
  rootLabel = "Infrastructure layer",
}: {
  title: string;
  items: ScaleArchitectureItem[];
  rootLabel?: string;
}) {
  if (!items.length) return null;

  return (
    <section className={`mt-6 w-full py-12 md:py-16 ${SECTION_PAGE_X}`} style={sectionWashStyle}>
      <div className={SECTION_CONTENT}>
        <SectionTitle>{title}</SectionTitle>

        <div className="relative mt-8 md:mt-10">
          <div className="relative z-[3] flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-black/45 px-4 py-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-sm">
              <span
                aria-hidden
                className="h-2 w-2 shrink-0 rounded-full bg-[rgba(108,148,255,0.9)] shadow-[0_0_14px_rgba(72,118,255,0.35)]"
              />
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/58">{rootLabel}</p>
            </div>
          </div>

          <div className="relative z-[2] mx-auto mt-4 w-full max-w-full md:mt-5">
            <svg
              className="scale-arch-svg pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
              viewBox="0 0 1000 1000"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                className="scale-arch-path"
                d="M 500 0 L 500 56"
                stroke="rgba(178,198,255,0.42)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
              />
              <path
                className="scale-arch-path scale-arch-path--cap-l"
                d="M 500 56 L 4 56"
                stroke="rgba(178,198,255,0.42)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
              />
              <path
                className="scale-arch-path scale-arch-path--cap-r"
                d="M 500 56 L 996 56"
                stroke="rgba(178,198,255,0.42)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
              />
              <path
                className="scale-arch-path scale-arch-path--vert-l"
                d="M 4 56 L 4 960"
                stroke="rgba(178,198,255,0.42)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
              />
              <path
                className="scale-arch-path scale-arch-path--vert-r"
                d="M 996 56 L 996 960"
                stroke="rgba(178,198,255,0.42)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
              />
            </svg>
            <div
              aria-hidden
              className="pointer-events-none absolute left-[13px] top-0 bottom-0 w-px bg-gradient-to-b from-white/22 via-white/10 to-white/[0.06] md:hidden"
            />
            <ul
              className="scale-arch-list relative z-[1] list-none space-y-5 md:grid md:grid-cols-2 md:gap-x-14 md:gap-y-7 md:space-y-0 md:pt-12"
              role="list"
            >
              {items.map((item, index) => {
                const isCol2 = index % 2 === 1;
                return (
                  <li
                    key={item.label}
                    className={`relative flex gap-4 pl-8 md:min-h-0 md:gap-0 ${
                      isCol2 ? "md:pl-0 md:pr-6 md:text-right" : "md:pl-6"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`scale-arch-node absolute top-[0.35rem] z-[1] h-2.5 w-2.5 shrink-0 rounded-full border border-white/30 bg-[rgba(108,148,255,0.45)] shadow-[0_0_10px_rgba(108,148,255,0.4)] md:top-2 ${
                        isCol2
                          ? "left-[9px] md:left-auto md:right-[-3px]"
                          : "left-[9px] md:left-[-3px]"
                      }`}
                      style={{ animationDelay: `${index * 0.35}s` }}
                    />
                    <div className="min-w-0 flex-1 md:min-h-0">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/72">{item.label}</p>
                      <p className="mt-1.5 text-[13px] leading-[1.55] text-white/52 md:text-[13.5px] md:leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export type CaseStudy = {
  title: string;
  category: string;
  impact: string;
  stack: string[];
  businessResult: string;
  slug?: string;
  image?: string;
  gradient?: string;
};

function shouldShowBusinessResult(impact: string, businessResult: string): boolean {
  const b = businessResult.trim();
  if (!b) return false;
  return b !== impact.trim();
}

function IndustryWorkStackChips({ stack }: { stack: string[] }) {
  const shown = stack.slice(0, INDUSTRY_WORK_MAX_STACK);
  const more = stack.length - shown.length;
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {shown.map((tech) => (
        <span
          key={tech}
          className="rounded-md border border-white/12 bg-black/35 px-2 py-1 text-[11px] text-white/75"
        >
          {tech}
        </span>
      ))}
      {more > 0 ? (
        <span className="rounded-md border border-white/12 bg-black/25 px-2 py-1 text-[11px] text-white/55">
          +{more} more
        </span>
      ) : null}
    </div>
  );
}

function flagshipLeadCopy(card: CaseStudy, vertical?: "fintech" | "healthcare"): string {
  const imp = card.impact.trim();
  const br = card.businessResult.trim();
  if (br && br !== imp) {
    const combined = `${imp} ${br}`.trim();
    return combined.length > 420 ? `${combined.slice(0, 417)}…` : combined;
  }
  if (imp.length >= 80) return imp;
  if (vertical === "healthcare") {
    return "HIPAA-aware delivery with clear clinical boundaries—systems that move at the speed of care without trading security, interoperability, or auditability.";
  }
  if (vertical === "fintech") {
    return "Broker-orchestrated, low-latency delivery with AI-assisted workflows—observable pipelines built for regulated markets and real-time execution.";
  }
  return "High-stakes delivery with integrations, observability, and cloud-native execution engineered for reliability at scale.";
}

function featuredCapabilityBullets(vertical?: "fintech" | "healthcare"): string[] {
  if (vertical === "healthcare") {
    return [
      "HIPAA-aware workflows and PHI boundaries by design",
      "Clinical interoperability—FHIR, HL7, and EHR-connected delivery",
      "Secure, observable infrastructure for care operations at scale",
    ];
  }
  if (vertical === "fintech") {
    return [
      "Multi-broker architecture and execution orchestration",
      "Real-time analytics and AI-assisted trading workflows",
      "Cloud-native delivery with observability and risk controls",
    ];
  }
  return [
    "Mission-critical architecture with clear operational boundaries",
    "Real-time pipelines, integrations, and AI-assisted workflows where it matters",
    "Observable, resilient cloud delivery for regulated and high-stakes domains",
  ];
}

function featuredInfrastructureSubtitle(vertical?: "fintech" | "healthcare"): string {
  if (vertical === "healthcare") {
    return "Built for regulated care delivery—secure systems, clinical velocity, and operational reliability.";
  }
  if (vertical === "fintech") {
    return "Built for regulated, real-time financial operations—from broker-scale execution to AI-assisted validation and observability.";
  }
  return "Built for mission-critical systems—secure delivery, real-time operations, and observable infrastructure.";
}

function featuredSeoSummary(vertical?: "fintech" | "healthcare"): string {
  if (vertical === "healthcare") {
    return "Boostmysites builds healthcare software including telemedicine platforms, HIPAA-ready workflows, FHIR integrations, clinical data pipelines, EHR-connected applications, and secure cloud architecture for providers.";
  }
  if (vertical === "fintech") {
    return "Boostmysites builds fintech infrastructure including algorithmic trading systems, broker API integrations, trading automation, real-time transaction pipelines, AI trading engines, cloud-native architecture, and risk management controls.";
  }
  return "Boostmysites delivers enterprise software engineering including real-time systems, regulated workflows, cloud architecture, integrations, and observability.";
}

function FeaturedInfrastructureVisual({
  image,
  gradient,
  category,
  videoSrc,
  videoSrcFallback,
  videoPoster,
}: {
  image?: string;
  gradient?: string;
  category: string;
  videoSrc?: string;
  videoSrcFallback?: string;
  videoPoster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoSrc) return;
    const el = videoRef.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (mq.matches) {
        el.pause();
      } else {
        void el.play().catch(() => {});
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [videoSrc]);

  const bgStyle: CSSProperties =
    !videoSrc && image
      ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }
      : {
          background:
            gradient ??
            "radial-gradient(120% 100% at 30% 18%, rgba(72,118,255,0.58), rgba(8,16,40,0.92) 58%, rgba(0,0,0,0.94) 100%)",
        };

  const videoMime = (src: string) => {
    const lower = src.toLowerCase();
    if (lower.endsWith(".mov")) return "video/quicktime";
    return "video/mp4";
  };

  return (
    <div className="featured-infra-visual group relative isolate mx-auto aspect-video w-full max-h-[min(68vh,720px)] overflow-hidden rounded-[20px] border border-white/[0.12] bg-black/40 shadow-[0_28px_90px_rgba(0,0,0,0.5)]">
      {videoSrc ? (
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 size-full object-cover transition-transform duration-1000 ease-out will-change-transform motion-safe:group-hover:scale-[1.02]"
          {...(videoPoster ? { poster: videoPoster } : {})}
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          aria-label={`${category} looping product preview`}
        >
          <source src={videoSrc} type={videoMime(videoSrc)} />
          {videoSrcFallback ? <source src={videoSrcFallback} type={videoMime(videoSrcFallback)} /> : null}
        </video>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 ease-out will-change-transform motion-safe:group-hover:scale-[1.02]"
          style={bgStyle}
        />
      )}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(150deg,rgba(10,22,52,0.42)_0%,rgba(0,0,0,0.02)_38%,rgba(0,0,0,0.62)_100%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.38] mix-blend-overlay"
        style={{ backgroundImage: "url(/textures/grid.svg)", backgroundSize: "72px 72px" }}
      />
      <div className="featured-infra-bloom pointer-events-none absolute -right-[18%] top-[22%] z-[3] h-[min(92vw,540px)] w-[min(92vw,540px)] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(100,160,255,0.38)_0%,rgba(72,118,255,0.12)_42%,transparent_70%)] blur-[88px]" />
      <div className="featured-infra-scanline pointer-events-none absolute inset-x-[-24%] top-[40%] z-[4] h-px bg-gradient-to-r from-transparent via-[rgba(130,175,255,0.55)] to-transparent" />
      <div className="absolute left-5 top-5 z-[6]">
        <span className="rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/88 backdrop-blur-md">
          {category}
        </span>
      </div>
    </div>
  );
}

export type AfterContactVerticalShowcase = {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  /** Portrait-first looping clip (shown inside a 9:16 frame). Add e.g. `/videos/finnly-vertical.m4v` under `public/videos/`. */
  videoSrc?: string;
  videoSrcFallback?: string;
  videoPoster?: string;
  /** Shown when `videoSrc` is not set (or as poster reference for video). */
  fallbackImageSrc: string;
  caseStudySlug?: string;
  liveHref?: string;
  liveLabel?: string;
  /** Label for the primary case study link (default: “View case study”). */
  caseStudyLabel?: string;
  /** Label for the secondary CTA that scrolls to `#contact-form` (default: “Build similar”). */
  buildSimilarLabel?: string;
};

function AfterContactVerticalShowcaseSection({
  data,
  onBuildSimilar,
}: {
  data: AfterContactVerticalShowcase;
  onBuildSimilar: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    eyebrow,
    title,
    description,
    bullets,
    videoSrc,
    videoSrcFallback,
    videoPoster,
    fallbackImageSrc,
    caseStudySlug,
    liveHref,
    liveLabel = "View product",
    caseStudyLabel = "View case study",
    buildSimilarLabel = "Build similar",
  } = data;

  useEffect(() => {
    if (!videoSrc) return;
    const el = videoRef.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (mq.matches) {
        el.pause();
      } else {
        void el.play().catch(() => {});
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
    };
  }, [videoSrc]);

  const videoMime = (src: string) => {
    const lower = src.toLowerCase();
    if (lower.endsWith(".mov")) return "video/quicktime";
    return "video/mp4";
  };

  return (
    <section
      className={`mt-10 w-full py-12 md:py-16 ${SECTION_PAGE_X}`}
      style={sectionWashStyle}
      aria-label={title}
    >
      <div className={SECTION_CONTENT}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:gap-14">
          <div className="relative isolate mx-auto w-full max-w-[min(292px,88vw)] shrink-0 lg:mx-0 lg:justify-self-center">
            <div className="relative aspect-[9/19.5] max-h-[min(74vh,720px)] w-full overflow-hidden rounded-[32px] border border-white/[0.14] bg-black shadow-[0_18px_48px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.06]">
              {videoSrc ? (
                <video
                  ref={videoRef}
                  className="absolute left-1/2 top-1/2 z-0 min-h-[112%] min-w-[112%] -translate-x-1/2 -translate-y-1/2 object-cover object-center motion-safe:scale-[1.28] motion-reduce:min-h-full motion-reduce:min-w-full motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100"
                  {...(videoPoster ? { poster: videoPoster } : {})}
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="metadata"
                  aria-label={`${title} product preview`}
                >
                  <source src={videoSrc} type={videoMime(videoSrc)} />
                  {videoSrcFallback ? <source src={videoSrcFallback} type={videoMime(videoSrcFallback)} /> : null}
                </video>
              ) : (
                <div
                  aria-hidden
                  className="absolute inset-0 z-0 bg-cover bg-center motion-safe:scale-105"
                  style={{ backgroundImage: `url(${fallbackImageSrc})` }}
                />
              )}
              <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(150deg,rgba(10,22,52,0.22)_0%,rgba(0,0,0,0.02)_45%,rgba(0,0,0,0.35)_100%)]" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[2] opacity-[0.22] mix-blend-overlay"
                style={{ backgroundImage: "url(/textures/grid.svg)", backgroundSize: "44px 44px" }}
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-5 lg:pl-1">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">{eyebrow}</p>
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-tight text-white">{title}</h2>
            <p className="text-[16px] leading-[1.65] text-white/72 md:text-[17px]">{description}</p>
            {bullets && bullets.length > 0 ? (
              <ul className="flex flex-col gap-3 border-l-2 border-white/15 pl-5">
                {bullets.map((line) => (
                  <li key={line} className="text-[15px] leading-snug text-white/88 md:text-[16px]">
                    {line}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {caseStudySlug ? (
                <a href={workCaseStudyUrl(caseStudySlug)} rel="noopener" className={WORK_PRIMARY_GLOSS_CTA_H10}>
                  <span className={WORK_PRIMARY_GLOSS_CTA_INNER}>{caseStudyLabel}</span>
                </a>
              ) : null}
              <button
                type="button"
                onClick={onBuildSimilar}
                className="inline-flex h-10 items-center rounded-[10px] border border-white/20 bg-black/50 px-4 text-[12px] font-semibold text-white/95 transition-colors hover:bg-black/65 hover:text-white"
              >
                {buildSimilarLabel}
              </button>
              {liveHref ? (
                <a
                  href={liveHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-fit items-center rounded-[10px] border border-white/20 bg-black/50 px-4 text-[12px] font-semibold text-white/95 transition-colors hover:bg-black/65 hover:text-white"
                >
                  {liveLabel}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type BuildItem = {
  title: string;
  description: string;
};

export type PressCoverageItem = {
  publication: string;
  href: string;
  yearLabel: string;
  isPartnerContent?: boolean;
};

export type OperatorQuote = {
  quote: string;
  attribution: string;
};

export type InsightItem = {
  category: string;
  title: string;
  summary: string;
  href: string;
};

type FaqGroup = {
  category: string;
  items: FaqItem[];
};

type Props = {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  socialProofItems: string[];
  trustIndicators: string[];
  trustedByHeading: string;
  trustedBySubheading: string;
  trustedByGroups: string[];
  capabilityTitle: string;
  capabilityCards: SectionCard[];
  buildItems: BuildItem[];
  operatingModelTitle?: string;
  operatingModelSubheading?: string;
  operatingModelPillars: OperatingModelPillar[];
  operatingModelCenterLabel?: string;
  operatingModelCenterHint?: string;
  scaleTitle: string;
  scaleArchitecture: ScaleArchitectureItem[];
  scaleRootLabel?: string;
  caseStudies: CaseStudy[];
  portfolioVertical?: "fintech" | "healthcare";
  /** Override default bento section H2 (defaults are vertical-specific). */
  expertiseSectionHeading?: string;
  /** Override default supporting line under the H2. */
  expertiseSectionSubheading?: string;
  processTitle: string;
  processSteps: { title: string; body: string }[];
  faqGroups: FaqGroup[];
  finalTitle: string;
  finalSubtitle: string;
  pressCoverage?: PressCoverageItem[];
  operatorQuotes?: OperatorQuote[];
  insights?: InsightItem[];
  insightsHeading?: string;
  /** When exactly one featured case study is shown, replace the hero still with this looping video (H.264 `.mp4` / `.m4v` recommended for Chrome; `.mov` is Safari-first). */
  featuredInfrastructureVideo?: string;
  /** Optional second `<source>` (e.g. `.mov`) if the primary file cannot play in a given browser. */
  featuredInfrastructureVideoFallback?: string;
  /** Optional poster while the first frame loads — omit to avoid showing the case-study still instead of video. */
  featuredInfrastructureVideoPoster?: string;
  /** Optional external link shown under flagship CTAs (e.g. live product). */
  featuredLiveSiteHref?: string;
  featuredLiveSiteLabel?: string;
  /** When set, always show the single flagship “Featured infrastructure” block (video + story) for this card, ignoring extra backend portfolio rows. */
  featuredFlagshipCaseStudy?: CaseStudy;
  /** Optional band directly under the contact form: vertical media (left) + story (right). */
  afterContactVerticalShowcase?: AfterContactVerticalShowcase;
  /** Hero: primary gloss CTA targets founder application vs contact form scroll. */
  heroPrimaryCta?: "founder" | "project";
  /** Founder application path (may include UTM query). */
  founderApplicationHref?: string;
  /** Overrides default lead-form / book-call sourcePage when not fintech/healthcare. */
  leadSourcePage?: string;
  /** Full-width hero banner image (tech company landing). */
  heroBannerSrc?: string;
  /** Portrait hero for viewports below md; defaults to heroBannerSrc. */
  heroBannerMobileSrc?: string;
  /** Apply CTA target when using heroBannerSrc; defaults to founderApplicationHref. */
  heroBannerApplyHref?: string;
  /** Primary CTA label when heroPrimaryCta is founder. */
  heroPrimaryCtaLabel?: string;
  /** Optional copy for founder leadership strip (tech banner landings). */
  founderStripEyebrow?: string;
  founderStripTitle?: string;
  founderStripIntro?: string;
  founderStripPullQuote?: string;
  founderStripShowCta?: boolean;
};

const MORPH_WORDS = ["fintech", "stock_market", "platform", "payment_gateways", "lending_platforms"];
const MORPH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!<>/{}[]";

const DEFAULT_PRESS_COVERAGE: PressCoverageItem[] = [
  {
    publication: "Outlook India",
    href: "https://www.outlookindia.com/hub4business/boostmysites-acclaim-as-industry-leader",
    yearLabel: "May 2024",
    isPartnerContent: true,
  },
  {
    publication: "The Quint",
    href: "https://www.thequint.com/brandstudio/boostmysite-2000-ai-projects-milestone",
    yearLabel: "Sep 2024",
    isPartnerContent: true,
  },
  {
    publication: "Forbes",
    href: "https://www.forbes.com/",
    yearLabel: "Editorial",
    isPartnerContent: false,
  },
  {
    publication: "Entrepreneur",
    href: "https://www.entrepreneur.com/",
    yearLabel: "Editorial",
    isPartnerContent: false,
  },
];

function defaultOperatorQuotes(vertical?: "fintech" | "healthcare"): OperatorQuote[] {
  if (vertical === "healthcare") {
    return [
      {
        quote:
          "The team mapped clinical workflow constraints faster than other vendors we evaluated.",
        attribution: "Head of Engineering, digital health platform",
      },
      {
        quote:
          "Architecture conversations stayed at a systems level — interoperability, audit, recovery.",
        attribution: "CTO, telehealth product",
      },
      {
        quote: "Weekly demos cut delivery uncertainty during a regulated launch window.",
        attribution: "VP Product, clinical operations",
      },
    ];
  }
  return [
    {
      quote:
        "The team understood regulated infrastructure constraints faster than most vendors we evaluated.",
      attribution: "Head of Engineering, regulated payments",
    },
    {
      quote: "Architecture discussions happened at a systems level, not just feature delivery.",
      attribution: "CTO, lending platform",
    },
    {
      quote: "Weekly shipping visibility reduced operational uncertainty significantly.",
      attribution: "VP Product, treasury infrastructure",
    },
  ];
}

function defaultInsightsHeading(): string {
  return "Signals & infrastructure notes";
}

function defaultInsights(vertical?: "fintech" | "healthcare"): InsightItem[] {
  if (vertical === "healthcare") {
    return [
      {
        category: "Interop",
        title: "HIPAA-aware health platform architecture",
        summary:
          "Clinical interoperability, audit logging, and recovery patterns we ship with regulated teams.",
        href: "/healthcare-landing#contact-form",
      },
      {
        category: "Delivery",
        title: "Shipping cadence under regulated launch windows",
        summary: "Weekly demos, transparent backlog, and explicit cut lines for clinical-grade releases.",
        href: "/healthcare-landing#contact-form",
      },
      {
        category: "Observability",
        title: "Operating health systems at production scale",
        summary: "Logs, metrics, and incident playbooks for systems that cannot fail quietly.",
        href: "/healthcare-landing#contact-form",
      },
      {
        category: "Infrastructure",
        title: "Field notes from the team",
        summary: "Architecture, delivery, and operating-discipline reading we publish from active work.",
        href: "/blogs",
      },
    ];
  }
  return [
    {
      category: "Architecture",
      title: "Building payout systems at scale",
      summary: "Idempotent settlement flows, retries, and reconciliation patterns regulated teams ship with.",
      href: "/payin-payout-software-development",
    },
    {
      category: "Compliance",
      title: "PCI-aware fintech architecture",
      summary: "Where cardholder-data flows, tokenization patterns, and evidence-oriented logging actually live.",
      href: "/fintech-development-company",
    },
    {
      category: "Execution",
      title: "Trading platform engineering",
      summary: "Multi-broker orchestration, observability, and risk controls for live execution paths.",
      href: "/trading-app-development",
    },
    {
      category: "Infrastructure",
      title: "Field notes from the team",
      summary: "Architecture, delivery, and operating-discipline reading we publish from active work.",
      href: "/blogs",
    },
  ];
}

/** Publication wordmark — distinct typographic treatment per outlet so the strip reads
 *  as logos, not plain text. Uses serif + bold combinations for visual identity. */
function PublicationWordmark({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes("outlook")) {
    return (
      <span
        className="text-[20px] font-semibold leading-none tracking-[-0.015em] text-white md:text-[23px]"
        style={{ fontFamily: "'Times New Roman', Georgia, serif", letterSpacing: "-0.02em" }}
      >
        Outlook<span className="font-normal italic text-white/70"> India</span>
      </span>
    );
  }
  if (n.includes("quint")) {
    return (
      <span className="text-[20px] font-bold leading-none tracking-[-0.04em] text-white md:text-[23px]">
        The Quint
      </span>
    );
  }
  if (n.includes("forbes")) {
    return (
      <span
        className="text-[22px] font-bold leading-none tracking-[-0.02em] text-white md:text-[25px]"
        style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
      >
        Forbes
      </span>
    );
  }
  if (n.includes("entrepreneur")) {
    return (
      <span className="text-[20px] font-bold leading-none tracking-[-0.03em] text-white md:text-[23px]">
        Entrepreneur
      </span>
    );
  }
  return (
    <span className="text-[18px] font-semibold leading-none tracking-tight text-white md:text-[20px]">
      {name}
    </span>
  );
}

function PressStrip({ items, compact }: { items: PressCoverageItem[]; compact?: boolean }) {
  if (!items.length) return null;
  return (
    <section
      className={`w-full ${SECTION_PAGE_X} ${compact ? "mt-4 py-6 md:py-8" : "mt-6 py-10 md:py-12"}`}
      aria-label="Press and partner coverage"
    >
      <div className={`flex flex-col items-center gap-6 text-center ${SECTION_CONTENT}`}>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
          Featured in conversations across fintech & AI
        </p>
        <ul className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
          {items.map((item) => (
            <li key={item.href} className="flex flex-col items-center gap-1.5">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center underline-offset-4 transition-opacity hover:opacity-90"
                aria-label={`${item.publication} — ${item.yearLabel}${item.isPartnerContent ? " (partner content)" : ""}`}
              >
                <PublicationWordmark name={item.publication} />
              </a>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                <span>{item.yearLabel}</span>
                {item.isPartnerContent ? (
                  <>
                    <span aria-hidden className="h-[3px] w-[3px] rounded-full bg-white/25" />
                    <span className="text-white/40">Partner</span>
                  </>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Concrete, understated social-proof metrics. Mirrors home-page Stats values but tuned
 *  for this landing page: 5 stat cells in a horizontal row, mono numerals, no big slabs. */
function SocialProofStrip({ compact }: { compact?: boolean }) {
  return (
    <section
      className={`w-full ${SECTION_PAGE_X} ${compact ? "mt-2 pb-[50px]" : "mt-3"}`}
      aria-label="Boostmysites delivery metrics"
    >
      <div className={`${SECTION_CONTENT} overflow-hidden rounded-[14px] border border-white/[0.08] bg-white/[0.02]`}>
        <ul className="grid grid-cols-2 divide-x divide-y divide-white/[0.06] md:grid-cols-5 md:divide-y-0">
          {siteStats.map((s) => (
            <li key={s.label} className="flex flex-col items-start gap-1 px-5 py-5 md:items-center md:px-4 md:py-6 md:text-center">
              <span className="font-mono text-[clamp(1.4rem,2.4vw,1.85rem)] font-medium leading-none tracking-tight text-white">
                {s.value}
              </span>
              <span className="text-[12.5px] font-medium leading-tight text-white/78 md:text-[13px]">
                {s.label}
              </span>
              {s.sublabel ? (
                <span className="text-[11px] leading-tight text-white/40 md:text-[11.5px]">{s.sublabel}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Derive short initials from an attribution like "Head of Engineering, regulated payments"
 *  → "HE". Falls back to first letter of the role tokens. Used to give anonymous
 *  operator quotes a small visual human anchor without surfacing fake names. */
function attributionInitials(attribution: string): string {
  const rolePart = attribution.split(/[,·•|]/)[0].trim();
  const tokens = rolePart.split(/\s+/).filter((t) => /^[A-Za-z]/.test(t));
  const stop = new Set(["of", "the", "and", "for", "in", "at"]);
  const significant = tokens.filter((t) => !stop.has(t.toLowerCase()));
  if (significant.length === 0) return "—";
  if (significant.length === 1) return significant[0].slice(0, 2).toUpperCase();
  return (significant[0][0] + significant[1][0]).toUpperCase();
}

function OperatorQuotesSection({ quotes }: { quotes: OperatorQuote[] }) {
  if (!quotes.length) return null;
  return (
    <section className={`mt-6 w-full py-14 md:py-20 ${SECTION_PAGE_X}`} style={sectionWashStyle}>
      <div className={SECTION_CONTENT}>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Operators trust us
        </p>
        <h2 className="mt-3 max-w-[42rem] text-[clamp(1.5rem,3.2vw,2.05rem)] font-medium tracking-tight text-white">
          Notes from teams we have shipped with.
        </h2>
        <p className="mt-3 max-w-2xl text-[14.5px] leading-[1.55] text-white/45 md:text-[15px]">
          Attribution kept to role and domain — anonymised at the operator&rsquo;s request.
        </p>
        <ul className="mt-10 divide-y divide-white/[0.08] md:mt-12">
          {quotes.map((q, index) => {
            const initials = attributionInitials(q.attribution);
            return (
              <li
                key={`${q.attribution}-${index}`}
                className="flex flex-col gap-5 py-8 md:flex-row md:items-start md:gap-8 md:py-10"
              >
                <span
                  aria-hidden
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-[13px] font-semibold tracking-[0.06em] text-white/82 md:h-14 md:w-14 md:text-[14px]"
                  style={{
                    background:
                      "radial-gradient(120% 100% at 50% 0%, rgba(108,148,255,0.32), rgba(72,118,255,0.22) 50%, rgba(0,0,0,0.55))",
                  }}
                >
                  {initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[16px] leading-[1.55] text-white/90 md:text-[18px] md:leading-[1.6]">
                    &ldquo;{q.quote}&rdquo;
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
                    {q.attribution}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function InsightsSection({ items, heading }: { items: InsightItem[]; heading: string }) {
  if (!items.length) return null;
  return (
    <section className={`mt-6 w-full py-12 md:py-16 ${SECTION_PAGE_X}`} style={sectionWashStyle}>
      <div className={SECTION_CONTENT}>
        <h2 className="max-w-[42rem] text-[clamp(1.5rem,3.2vw,2.05rem)] font-medium tracking-tight text-white">{heading}</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-[1.55] text-white/55 md:text-[16px]">
          Working notes on the infrastructure questions regulated teams keep asking us.
        </p>
        <ul className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2 md:gap-y-10">
          {items.map((item) => (
            <li key={item.title}>
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/45">
                {item.category}
              </p>
              <a
                href={item.href}
                rel="noopener"
                className="mt-2 block text-[17px] font-medium leading-snug text-white transition-colors hover:text-white/80 md:text-[18px]"
              >
                {item.title}
              </a>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-white/55 md:text-[14px]">{item.summary}</p>
              <a
                href={item.href}
                rel="noopener"
                className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium tracking-tight text-white/55 transition-colors hover:text-white/85"
              >
                Read <span aria-hidden>→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FlagshipFounderNotesStrip({
  portfolioVertical,
  onGoToMainForm,
}: {
  portfolioVertical?: "fintech" | "healthcare";
  onGoToMainForm: () => void;
}) {
  return (
    <FounderLeadershipStrip
      variant="embedded"
      eyebrow="Leadership"
      title="From the founder."
      intro={founder.intro}
      pullQuote={FOUNDER_STRIP_REGULATED_QUOTE}
      showCta
      ctaLabel={buildTogetherCtaLabel(portfolioVertical)}
      onCtaClick={onGoToMainForm}
    />
  );
}

/** Humanized founder band — named, photographed, Forbes-featured. Sits above the final CTA
 *  to land the "real people behind the system" closer before the conversion ask. */
function FounderBand({
  portfolioVertical,
  onGoToMainForm,
}: {
  portfolioVertical?: "fintech" | "healthcare";
  onGoToMainForm: () => void;
}) {
  return (
    <section className={`mt-6 w-full ${SECTION_PAGE_X}`} aria-label="A note from the founder">
      <div
        className={`${SECTION_CONTENT} overflow-hidden rounded-[18px] border border-white/12`}
        style={{
          background:
            "radial-gradient(120% 100% at 0% 0%, rgba(72,118,255,0.18), rgba(8,12,28,0.92) 55%, rgba(0,0,0,0.88) 100%)",
        }}
      >
        <div className="grid items-stretch gap-0 md:grid-cols-[260px_minmax(0,1fr)]">
          <div className="relative flex items-center justify-center border-b border-white/10 bg-gradient-to-br from-[#1d2230] to-[#0c0e16] p-6 md:border-b-0 md:border-r md:p-7">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{ backgroundImage: "url(/textures/grid.svg)", backgroundSize: "44px auto" }}
            />
            <div className="relative z-[1] aspect-[3/4] w-[min(100%,200px)] overflow-hidden rounded-xl border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(72,118,255,0.18),transparent_55%)]" />
              <img
                src={founder.imageSrc}
                alt={founder.imageAlt}
                loading="lazy"
                decoding="async"
                className="relative z-[1] h-full w-full object-cover object-[center_15%]"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 p-6 md:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center rounded-full border border-white/20 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-black"
                aria-label="Forbes-featured"
              >
                Forbes
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/45">
                A note from the founder
              </span>
            </div>

            <div>
              <p className="text-[20px] font-semibold tracking-tight text-white md:text-[22px]">
                {founder.firstName} {founder.lastName}
              </p>
              <p className="mt-0.5 text-[13.5px] text-white/65 md:text-[14px]">
                {founder.role}, {founder.company}
              </p>
            </div>

            <blockquote className="border-l-2 border-purple/70 pl-4 text-[15.5px] leading-[1.6] text-white/85 md:text-[17px] md:leading-[1.65]">
              &ldquo;We work with teams building systems where reliability matters. If you are operating in
              regulated or high-throughput environments, we would be happy to understand what you are
              building.&rdquo;
            </blockquote>

            <p className="text-[13px] leading-relaxed text-white/45 md:text-[13.5px]">
              {founder.intro}
            </p>

            <div className="mt-2 flex w-full justify-center">
              <button type="button" onClick={onGoToMainForm} className={WORK_PRIMARY_GLOSS_CTA_H10}>
                <span className={WORK_PRIMARY_GLOSS_CTA_INNER}>{buildTogetherCtaLabel(portfolioVertical)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MorphingWordAnimation() {
  const [text, setText] = useState("");

  useEffect(() => {
    let cancelled = false;
    let timer: number | null = null;
    const intervals = new Set<number>();

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    const typeIn = (target: string) =>
      new Promise<void>((resolve) => {
        let i = 0;
        setText("");
        const id = window.setInterval(() => {
          if (cancelled) {
            window.clearInterval(id);
            intervals.delete(id);
            resolve();
            return;
          }
          i += 1;
          setText(target.slice(0, i));
          if (i >= target.length) {
            window.clearInterval(id);
            intervals.delete(id);
            resolve();
          }
        }, 60);
        intervals.add(id);
      });

    const deleteOut = (target: string) =>
      new Promise<void>((resolve) => {
        let i = target.length;
        const id = window.setInterval(() => {
          if (cancelled) {
            window.clearInterval(id);
            intervals.delete(id);
            resolve();
            return;
          }
          i -= 1;
          setText(target.slice(0, Math.max(0, i)));
          if (i <= 0) {
            window.clearInterval(id);
            intervals.delete(id);
            resolve();
          }
        }, 38);
        intervals.add(id);
      });

    const scrambleIn = (target: string) =>
      new Promise<void>((resolve) => {
        const maxLen = target.length;
        let frame = 0;
        const totalFrames = 18;
        const id = window.setInterval(() => {
          if (cancelled) {
            window.clearInterval(id);
            intervals.delete(id);
            resolve();
            return;
          }
          frame += 1;
          const progress = frame / totalFrames;
          let result = "";
          for (let i = 0; i < maxLen; i += 1) {
            if (Math.random() < progress * 1.4 || frame > totalFrames - 3) {
              result += target[i];
            } else {
              result += MORPH_CHARS[Math.floor(Math.random() * MORPH_CHARS.length)];
            }
          }
          setText(result);
          if (frame >= totalFrames) {
            window.clearInterval(id);
            intervals.delete(id);
            setText(target);
            resolve();
          }
        }, 40);
        intervals.add(id);
      });

    const run = async () => {
      let current = 0;
      while (!cancelled) {
        const word = MORPH_WORDS[current];
        await typeIn(word);
        if (cancelled) return;
        await sleep(1200);
        if (cancelled) return;
        await deleteOut(word);
        if (cancelled) return;
        await sleep(120);
        if (cancelled) return;
        current = (current + 1) % MORPH_WORDS.length;
        await scrambleIn(MORPH_WORDS[current]);
        if (cancelled) return;
        await sleep(240);
      }
    };

    timer = window.setTimeout(() => {
      void run();
    }, 400);

    return () => {
      cancelled = true;
      if (timer !== null) {
        window.clearTimeout(timer);
      }
      intervals.forEach((id) => window.clearInterval(id));
      intervals.clear();
    };
  }, []);

  return (
    <div className="hidden xl:flex min-h-[220px] items-center justify-center">
      <p className="sr-only">Morphing text animation cycling through fintech product categories</p>
      <div className="flex items-center font-mono">
        <span className="mr-1 select-none text-[20px] text-white/60">&gt;</span>
        <span className="min-w-[2ch] text-[30px] font-medium tracking-[-0.02em] text-white">{text}</span>
        <span className="ml-1 inline-block h-[32px] w-[3px] rounded-[1px] bg-white animate-[morph-blink_1s_step-end_infinite]" />
      </div>
    </div>
  );
}

function ProcessStepIcon({ title }: { title: string }) {
  const normalized = title.toLowerCase();

  if (normalized.includes("discover")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M20 20l-4.2-4.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized.includes("design")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <path d="M4 16l8-8 4 4-8 8H4v-4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M13.8 6.2l2-2a1.8 1.8 0 1 1 2.6 2.6l-2 2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (normalized.includes("build")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <path
          d="M9.6 5a4.8 4.8 0 0 0 6.6 6.6L20 15.4l-3.4 3.4-3.8-3.8A4.8 4.8 0 1 1 9.6 5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
      <path d="M12 3l7 4v5c0 5-3.4 8-7 9-3.6-1-7-4-7-9V7l7-4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.5 12.5l1.8 1.8 3.4-3.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Large faint watermark — same glyphs as `ProcessStepIcon`, centered inside the card so it is not clipped. */
function ProcessStepBackgroundIcon({ title }: { title: string }) {
  const cls = "h-32 w-32 text-white/[0.065] sm:h-36 sm:w-36 md:h-40 md:w-40";
  const normalized = title.toLowerCase();

  if (normalized.includes("discover")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={cls}>
        <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M20 20l-4.2-4.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized.includes("design")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={cls}>
        <path d="M4 16l8-8 4 4-8 8H4v-4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M13.8 6.2l2-2a1.8 1.8 0 1 1 2.6 2.6l-2 2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (normalized.includes("build")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={cls}>
        <path
          d="M9.6 5a4.8 4.8 0 0 0 6.6 6.6L20 15.4l-3.4 3.4-3.8-3.8A4.8 4.8 0 1 1 9.6 5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cls}>
      <path d="M12 3l7 4v5c0 5-3.4 8-7 9-3.6-1-7-4-7-9V7l7-4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.5 12.5l1.8 1.8 3.4-3.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ProcessStepsSection({
  title,
  steps,
  tightSpacing,
}: {
  title: string;
  steps: { title: string; body: string }[];
  tightSpacing?: boolean;
}) {
  return (
    <section
      className={`mt-6 w-full ${tightSpacing ? "pt-5 pb-10 md:pt-5 md:pb-12" : "py-10 md:py-12"} ${SECTION_PAGE_X}`}
      style={sectionWashStyle}
    >
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">
        {steps.map((step, index) => (
          <div key={step.title} className="contents">
            <div className="relative flex-1 overflow-hidden rounded-[10px] border border-white/12 bg-black/30 p-4">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <ProcessStepBackgroundIcon title={step.title} />
              </div>
              <div className="relative z-[1] flex items-center justify-between">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[linear-gradient(145deg,rgba(92,138,255,0.2),rgba(92,138,255,0.05))] text-white/85">
                  <ProcessStepIcon title={step.title} />
                </span>
                <p
                  className="text-[11px] uppercase tracking-[0.12em] text-white/45"
                  aria-label={`Step ${index + 1} of ${steps.length}`}
                >
                  <span aria-hidden="true">0{index + 1}</span>
                </p>
              </div>
              <p className="relative z-[1] mt-2 text-[15px] font-medium text-white">{step.title}</p>
              <p className="relative z-[1] mt-2 text-[13px] text-white/65">{step.body}</p>
            </div>
            {index !== steps.length - 1 ? (
              <div className="hidden items-center justify-center md:flex">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/70">
                  →
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function BuildItemIcon({ title }: { title: string }) {
  const normalized = title.toLowerCase();

  if (normalized.includes("wallet")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <rect x="3" y="6" width="18" height="12" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M15 12h6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16.5" cy="12" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (normalized.includes("payment")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 10h18" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (normalized.includes("lending") || normalized.includes("loan")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9.5 9.2h3.1a1.7 1.7 0 0 1 0 3.4h-1.2a1.7 1.7 0 0 0 0 3.4h3.1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized.includes("settlement")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <path d="M4 8h9a3 3 0 1 1 0 6H4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M14 14l2.5-2.5L14 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (normalized.includes("expense")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <path d="M7 4h10v16l-2.5-1.8L12 20l-2.5-1.8L7 20V4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (normalized.includes("insurance")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <path d="M12 3l7 4v5c0 5-3.4 8-7 9-3.6-1-7-4-7-9V7l7-4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (normalized.includes("investment") || normalized.includes("dashboard")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <path d="M4 19V5M4 19h16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7 15l3-3 2.5 2.5L17 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (normalized.includes("bank")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <path d="M4 9h16M6 9v8M10 9v8M14 9v8M18 9v8M3 17h18M12 4l8 3H4l8-3z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v8M8 12h8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IndustryGrowthSections({
  capabilityCards,
  expertiseHeading,
  expertiseSubheading,
  portfolioVertical,
  operatingTitle,
  operatingSubheading,
  operatingPillars,
  operatingCenterLabel,
  operatingCenterHint,
  scaleTitle,
  scaleArchitecture,
  scaleRootLabel,
  operatorQuotes,
}: {
  capabilityCards: SectionCard[];
  expertiseHeading: string;
  expertiseSubheading: string;
  portfolioVertical?: "fintech" | "healthcare";
  operatingTitle: string;
  operatingSubheading: string;
  operatingPillars: OperatingModelPillar[];
  operatingCenterLabel: string;
  operatingCenterHint: string;
  scaleTitle: string;
  scaleArchitecture: ScaleArchitectureItem[];
  scaleRootLabel?: string;
  operatorQuotes: OperatorQuote[];
}) {
  return (
    <>
      <ExpertiseBentoSection
        cards={capabilityCards}
        heading={expertiseHeading}
        subheading={expertiseSubheading}
        portfolioVertical={portfolioVertical}
      />

      <SectionDivider />

      <OperatingModelHubSection
        title={operatingTitle}
        subheading={operatingSubheading}
        pillars={operatingPillars}
        centerLabel={operatingCenterLabel}
        centerHint={operatingCenterHint}
      />

      <SectionDivider />

      <ScaleArchitectureSection title={scaleTitle} items={scaleArchitecture} rootLabel={scaleRootLabel} />

      <SectionDivider />

      <OperatorQuotesSection quotes={operatorQuotes} />
    </>
  );
}

function IndustryFaqSection({
  faqGroups,
  compactTop = false,
}: {
  faqGroups: { category: string; items: FaqItem[] }[];
  /** Tighter top spacing when placed directly under hero-band sections. */
  compactTop?: boolean;
}) {
  return (
    <section
      className={`mt-6 w-full ${compactTop ? "pt-0 pb-12 md:pt-0 md:pb-20" : "py-12 md:py-20"} ${SECTION_PAGE_X}`}
      style={sectionWashStyle}
    >
      <div className={SECTION_CONTENT}>
        <h2 className="section-heading-wash max-w-[42rem] text-[clamp(1.45rem,3.2vw,2.05rem)] font-medium tracking-tight text-white">
          FAQ
        </h2>
        <div className="mt-10 grid gap-x-14 gap-y-12 md:mt-14 md:grid-cols-2 md:gap-y-14">
          {faqGroups.map((group) => (
            <div key={group.category}>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                {group.category}
              </p>
              <div className="faq-accordion divide-y divide-white/[0.12]">
                {group.items.map((item) => (
                  <details key={item.question} className="group">
                    <summary className="flex cursor-pointer items-start gap-4 py-5 text-[15px] font-medium leading-snug text-white/92 marker:content-none md:text-[16px] [&::-webkit-details-marker]:hidden">
                      <span className="flex-1">{item.question}</span>
                      <span
                        aria-hidden="true"
                        className="ml-2 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 text-[13px] leading-none text-white/55 transition-transform duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-5 text-[14px] leading-relaxed text-white/58 md:text-[15px] md:leading-relaxed">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryFinalCtaBand({
  finalTitle,
  finalSubtitle,
  heroPrimaryCta,
  founderApplicationHref,
  heroPrimaryCtaLabel,
  onScrollToForm,
}: {
  finalTitle: string;
  finalSubtitle: string;
  heroPrimaryCta: "founder" | "project";
  founderApplicationHref: string;
  heroPrimaryCtaLabel: string;
  onScrollToForm: () => void;
}) {
  return (
    <section
      className={`mt-6 w-full rounded-[16px] border border-white/12 bg-[radial-gradient(circle_at_top,rgba(92,138,255,0.2),rgba(0,0,0,0.385)_55%)] py-8 text-center backdrop-blur-[8px] md:py-10 ${SECTION_PAGE_X}`}
    >
      <h2 className="text-[34px] font-medium -tracking-[0.02em] text-white md:text-[44px]">
        <HighlightText text={finalTitle} />
      </h2>
      <p className="mx-auto mt-3 max-w-3xl text-white/70">
        <HighlightText text={finalSubtitle} />
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {heroPrimaryCta === "founder" ? (
          <Link
            to={founderApplicationHref}
            className="btn-gloss relative overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-sm font-medium text-white"
          >
            {heroPrimaryCtaLabel}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onScrollToForm}
            className="btn-gloss relative overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-sm font-medium text-white"
          >
            Get proposal in 24 hours
          </button>
        )}
        {heroPrimaryCta === "founder" ? null : (
          <button
            type="button"
            onClick={onScrollToForm}
            className="rounded-[10px] border border-white/15 bg-black/40 px-5 py-3 text-sm font-medium text-white/90"
          >
            Plan your build
          </button>
        )}
      </div>
    </section>
  );
}

function SectionTitle({
  children,
  watermark,
  titleClassName,
  watermarkClassName,
  containerClassName,
  hideTitle = false,
}: {
  children: string;
  watermark?: string;
  titleClassName?: string;
  watermarkClassName?: string;
  containerClassName?: string;
  hideTitle?: boolean;
}) {
  if (watermark) {
    return (
      <div className={`relative min-h-[136px] overflow-hidden pb-2 max-md:min-h-[110px] ${containerClassName ?? ""}`}>
        <p
          aria-hidden
          className={`pointer-events-none absolute left-0 top-[-8px] z-0 w-full select-none text-left font-bold uppercase leading-[0.86] tracking-[0.02em] opacity-[0.24] max-md:opacity-[0.2] ${watermarkClassName ?? ""}`}
          style={{
            fontSize: "clamp(2.2rem, min(10vw, 8.8rem), 8.8rem)",
            backgroundImage:
              "linear-gradient(180deg, rgb(140, 178, 255) 0%, rgb(88, 132, 255) 28%, rgb(48, 88, 210) 58%, rgb(18, 32, 72) 88%, rgb(8, 14, 36) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {watermark}
        </p>
        {!hideTitle ? (
          <h2
            className={`relative z-[2] mt-[clamp(1.9rem,6.1vw,4.4rem)] max-w-[760px] text-left text-[28px] font-medium -tracking-[0.02em] text-white md:text-[34px] ${titleClassName ?? ""}`}
          >
            <HighlightText text={children} />
          </h2>
        ) : null}
      </div>
    );
  }

  return (
    <h2 className="text-[28px] font-medium -tracking-[0.02em] text-white md:text-[34px]">
      <HighlightText text={children} />
    </h2>
  );
}

export function IndustryLandingPage({
  eyebrow,
  heroTitle,
  heroSubtitle,
  socialProofItems,
  trustIndicators,
  trustedByHeading: _trustedByHeading,
  trustedBySubheading: _trustedBySubheading,
  trustedByGroups: _trustedByGroups,
  capabilityTitle,
  capabilityCards,
  buildItems,
  operatingModelTitle,
  operatingModelSubheading,
  operatingModelPillars,
  operatingModelCenterLabel,
  operatingModelCenterHint,
  scaleTitle,
  scaleArchitecture,
  scaleRootLabel,
  caseStudies,
  portfolioVertical,
  expertiseSectionHeading,
  expertiseSectionSubheading,
  processTitle,
  processSteps,
  faqGroups,
  finalTitle,
  finalSubtitle,
  pressCoverage,
  operatorQuotes,
  insights,
  insightsHeading,
  featuredInfrastructureVideo,
  featuredInfrastructureVideoFallback,
  featuredInfrastructureVideoPoster,
  featuredFlagshipCaseStudy,
  afterContactVerticalShowcase,
  heroPrimaryCta = "project",
  founderApplicationHref = "/founder-partnership",
  leadSourcePage,
  heroBannerSrc,
  heroBannerMobileSrc,
  heroBannerApplyHref,
  heroPrimaryCtaLabel = "Founder Application →",
  founderStripEyebrow,
  founderStripTitle,
  founderStripIntro,
  founderStripPullQuote,
  founderStripShowCta = false,
}: Props) {
  const [backendCaseStudies, setBackendCaseStudies] = useState<CaseStudy[]>([]);

  const resolvedLeadSourcePage =
    leadSourcePage ??
    (portfolioVertical === "healthcare"
      ? "healthcare-landing"
      : portfolioVertical === "fintech"
        ? "fintech-landing"
        : "industry-landing");

  const resolvedBannerApplyHref = heroBannerApplyHref ?? founderApplicationHref;
  const resolvedFounderStripEyebrow = founderStripEyebrow ?? "Who backs your build";
  const resolvedFounderStripTitle =
    founderStripTitle ?? "A founder-led team—not a faceless agency.";
  const resolvedFounderStripIntro =
    founderStripIntro ??
    "Mahin B S built BoostMySites for founders with a vision but no technical co-founder—so you get product, brand, and launch under one roof instead of juggling freelancers.";
  const resolvedFounderStripPullQuote = founderStripPullQuote ?? founder.quote;
  const trustGridClass = heroBannerSrc
    ? "grid grid-cols-2 gap-3 md:grid-cols-5"
    : "grid grid-cols-2 gap-3 md:grid-cols-4";

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCaseStudies = async () => {
      try {
      const { data, error } = await supabase.from("portfolios").select("*").order("created_at", { ascending: false });
      if (error || !data || !isMounted) return;

      const normalized = normalizeBackendPortfolio(data as Record<string, unknown>[]);
      const verticalItems = portfolioVertical ? filterPortfolioByVertical(normalized, portfolioVertical) : normalized;
      const chosen = verticalItems.slice(0, 3).map((item) => ({
        title: item.title,
        category: item.industry,
        impact: item.outcome,
        stack: item.stack.length > 0 ? item.stack : ["Web", "Product", "Engineering"],
          businessResult: item.description?.trim() ?? "",
        slug: item.slug,
        image: item.image,
        gradient: item.gradient,
      }));

      if (isMounted) setBackendCaseStudies(chosen);
      } catch {
        if (isMounted) setBackendCaseStudies([]);
      }
    };

    void fetchCaseStudies();

    return () => {
      isMounted = false;
    };
  }, [portfolioVertical]);

  const displayCaseStudies = backendCaseStudies.length > 0 ? backendCaseStudies : caseStudies;
  const workCount = displayCaseStudies.length;

  const workGridClass =
    workCount === 2
      ? "mt-4 grid w-full max-w-full mx-auto gap-4 md:grid-cols-2"
      : "mt-4 grid w-full max-w-full mx-auto gap-4 md:grid-cols-3";

  const featuredWork =
    featuredFlagshipCaseStudy ?? (workCount === 1 ? displayCaseStudies[0] : null);

  const resolvedExpertiseHeading =
    expertiseSectionHeading ?? defaultExpertiseSectionHeading(portfolioVertical);
  const resolvedExpertiseSubheading =
    expertiseSectionSubheading ?? defaultExpertiseSectionSubheading(portfolioVertical);

  const resolvedOperatingTitle = operatingModelTitle ?? DEFAULT_OPERATING_MODEL_TITLE;
  const resolvedOperatingSubheading =
    operatingModelSubheading ?? defaultOperatingModelSubheading(portfolioVertical);
  const resolvedOperatingCenterLabel = operatingModelCenterLabel ?? defaultOperatingCenterLabel();
  const resolvedOperatingCenterHint = operatingModelCenterHint ?? defaultOperatingCenterHint();

  const resolvedPressCoverage = pressCoverage ?? DEFAULT_PRESS_COVERAGE;
  const resolvedOperatorQuotes = operatorQuotes ?? defaultOperatorQuotes(portfolioVertical);
  const resolvedInsights = insights ?? defaultInsights(portfolioVertical);
  const resolvedInsightsHeading = insightsHeading ?? defaultInsightsHeading();

  return (
    <>
      <SiteBackground />
      <Nav />
      <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center px-5 pb-[80px] pt-[88px] sm:pt-[96px] md:px-10">
        {heroBannerSrc ? (
          <section
            className={`relative w-full overflow-hidden border border-white/15 ${
              heroBannerMobileSrc ? "rounded-[12px] md:rounded-[20px]" : "rounded-[20px]"
            }`}
          >
            <TechCompanyHeroBanner
              src={heroBannerSrc}
              mobileSrc={heroBannerMobileSrc}
              applyHref={resolvedBannerApplyHref}
            />
          </section>
        ) : null}

        {heroBannerSrc ? (
          <>
            <PressStrip items={resolvedPressCoverage} compact />
            <SocialProofStrip compact />
            <SectionDivider />
            <HeroPanelShell>
              <p className="inline-flex w-fit items-center rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/80">
                {eyebrow}
              </p>
              <h1 className="max-w-4xl text-[36px] font-medium leading-[1.05] -tracking-[0.03em] text-white md:text-[62px]">
                <HighlightText text={heroSubtitle} />
              </h1>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={founderApplicationHref}
                  className="btn-gloss relative overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-purple/40"
                >
                  {heroPrimaryCtaLabel}
                </Link>
              </div>
              <div className="flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:gap-5 md:pt-7">
                <span className="max-w-full text-sm font-normal -tracking-[0.01em] leading-snug text-white/70 md:shrink-0 md:whitespace-nowrap">
                  {capabilityTitle}
                </span>
                <div
                  className="flex min-h-[104px] min-w-0 flex-1 items-center overflow-hidden pb-1 md:pb-0"
                  style={capabilityMarqueeMaskStyle}
                >
                  <div className="build-marquee-track flex w-max gap-3 pr-2">
                    {[...buildItems, ...buildItems].map((item, index) => (
                      <div
                        key={`${item.title}-${index}`}
                        className="group relative w-[300px] shrink-0 overflow-hidden rounded-[10px] border border-white/12 bg-black/35 px-4 py-4 transition-colors hover:border-white/30 md:w-[320px]"
                      >
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(120% 120% at 0% 0%, rgba(92,138,255,0.2) 0%, rgba(92,138,255,0.06) 40%, rgba(0,0,0,0) 70%)",
                          }}
                        />
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-[linear-gradient(145deg,rgba(92,138,255,0.2),rgba(92,138,255,0.05))] text-white/85">
                            <BuildItemIcon title={item.title} />
                          </span>
                          <p className="relative z-[1] text-[14px] font-medium text-white">{item.title}</p>
                        </div>
                        <p className="relative z-[1] mt-2 text-[12px] leading-[1.45] text-white/60 group-hover:text-white/75">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </HeroPanelShell>
          </>
        ) : null}

        {!heroBannerSrc ? (
        <HeroPanelShell>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-center">
              <div className="flex flex-col gap-6">
                <p className="inline-flex w-fit items-center rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/80">
                  {eyebrow}
                </p>
                <h1 className="max-w-4xl text-[36px] font-medium leading-[1.05] -tracking-[0.03em] text-white md:text-[62px]">
                  <HighlightText text={heroTitle} />
                </h1>
                <p className="max-w-3xl text-[16px] leading-[1.5] text-white/75 md:text-[20px]">
                  <HighlightText text={heroSubtitle} />
                </p>

                <div className="flex flex-wrap gap-3">
                  {heroPrimaryCta === "founder" ? (
                    <>
                      <Link
                        to={founderApplicationHref}
                        className="btn-gloss relative overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-purple/40"
                      >
                        {heroPrimaryCtaLabel}
                      </Link>
                      <button
                        type="button"
                        onClick={scrollToForm}
                        className="rounded-[10px] border border-white/15 bg-black/40 px-5 py-3 text-sm font-medium text-white/90 transition-colors hover:border-purple/40 hover:bg-black/60 hover:text-white"
                      >
                        Start your project
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={scrollToForm}
                        className="btn-gloss relative overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-sm font-medium text-white"
                      >
                        Start your project
                      </button>
                      <Link
                        to={founderApplicationHref}
                        className="rounded-[10px] border border-white/15 bg-black/40 px-5 py-3 text-sm font-medium text-white/90 transition-colors hover:border-purple/40 hover:bg-black/60 hover:text-white"
                      >
                        {heroPrimaryCtaLabel}
                      </Link>
                    </>
                  )}
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[10px] border border-white/15 bg-black/40 px-5 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-black/60 hover:text-white"
                  >
                    Talk on WhatsApp
                  </a>
                </div>
              </div>
              <MorphingWordAnimation />
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-white/65">
                {socialProofItems.map((item, index) => (
                  <div key={item} className="flex items-center gap-4">
                    <span>{item}</span>
                    {index !== socialProofItems.length - 1 ? <span className="text-white/35">•</span> : null}
                  </div>
                ))}
              </div>

            <div className={trustGridClass}>
                {trustIndicators.map((item) => (
                  <div
                    key={item}
                    className="rounded-[10px] border border-white/12 bg-black/35 px-3 py-2 text-[12px] leading-[1.35] text-white/85"
                  >
                    {item}
                  </div>
                ))}
              </div>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:gap-5 md:pt-7">
              <span className="max-w-full text-sm font-normal -tracking-[0.01em] leading-snug text-white/70 md:shrink-0 md:whitespace-nowrap">
                {capabilityTitle}
              </span>
              <div
                className="min-h-[104px] min-w-0 flex-1 overflow-hidden pb-1 md:pb-0 flex items-center"
                style={capabilityMarqueeMaskStyle}
              >
            <div className="build-marquee-track flex w-max gap-3 pr-2">
              {[...buildItems, ...buildItems].map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="group relative w-[300px] shrink-0 overflow-hidden rounded-[10px] border border-white/12 bg-black/35 px-4 py-4 transition-colors hover:border-white/30 md:w-[320px]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(120% 120% at 0% 0%, rgba(92,138,255,0.2) 0%, rgba(92,138,255,0.06) 40%, rgba(0,0,0,0) 70%)",
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-[linear-gradient(145deg,rgba(92,138,255,0.2),rgba(92,138,255,0.05))] text-white/85">
                      <BuildItemIcon title={item.title} />
                    </span>
                    <p className="relative z-[1] text-[14px] font-medium text-white">{item.title}</p>
                  </div>
                  <p className="relative z-[1] mt-2 text-[12px] leading-[1.45] text-white/60 group-hover:text-white/75">
                    {item.description}
                  </p>
                </div>
              ))}
                </div>
              </div>
            </div>
        </HeroPanelShell>
        ) : null}

        {!heroBannerSrc ? (
          <>
            <SectionDivider />
            <PressStrip items={resolvedPressCoverage} />
            <SocialProofStrip />
            <SectionDivider />
          </>
        ) : null}

        {heroBannerSrc ? <SectionDivider /> : null}

        {heroBannerSrc ? (
          <>
            <FounderLeadershipStrip
              eyebrow={resolvedFounderStripEyebrow}
              title={resolvedFounderStripTitle}
              intro={resolvedFounderStripIntro}
              pullQuote={resolvedFounderStripPullQuote}
              showForbesVideo
              showCta={founderStripShowCta}
              ctaHref={founderStripShowCta ? founderApplicationHref : undefined}
              ctaLabel={heroPrimaryCtaLabel}
            />
            <SectionDivider />
            <ProcessStepsSection title={processTitle} steps={processSteps} tightSpacing />
            <SectionDivider />
            <FounderServicesSection className="py-8 md:py-10" />
            <SectionDivider />
            <BookCallWithFounderBand sourcePage={resolvedLeadSourcePage} tightSpacing />
            <SectionDivider />

            <IndustryFaqSection faqGroups={faqGroups} compactTop />

            <SectionDivider />

            <IndustryFinalCtaBand
              finalTitle={finalTitle}
              finalSubtitle={finalSubtitle}
              heroPrimaryCta={heroPrimaryCta}
              founderApplicationHref={founderApplicationHref}
              heroPrimaryCtaLabel={heroPrimaryCtaLabel}
              onScrollToForm={scrollToForm}
            />

            <SectionDivider />
          </>
        ) : null}

        {!heroBannerSrc ? (
        <section className={`mt-6 w-full rounded-[16px] py-10 md:py-14 ${SECTION_PAGE_X}`} style={sectionWashStyle}>
          {featuredWork ? (
            <div className={SECTION_CONTENT}>
              <p className="sr-only">{featuredSeoSummary(portfolioVertical)}</p>
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-tight text-white">Featured infrastructure</h2>
              <p className="mt-4 max-w-2xl text-[17px] leading-[1.55] text-white/58 md:text-lg">
                {featuredInfrastructureSubtitle(portfolioVertical)}
              </p>

              <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className="order-2 flex flex-col gap-7 lg:order-1">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Flagship delivery</p>
                    <h3 className="mt-2 text-[clamp(1.45rem,3vw,1.95rem)] font-medium leading-tight text-white">
                      {featuredWork.title}
                    </h3>
                  </div>
                  <p className="text-[16px] leading-[1.65] text-white/75 md:text-[17px]">
                    {flagshipLeadCopy(featuredWork, portfolioVertical)}
                  </p>
                  <ul className="flex flex-col gap-3.5 border-l-2 border-white/15 pl-5">
                    {featuredCapabilityBullets(portfolioVertical).map((line) => (
                      <li key={line} className="text-[15px] leading-snug text-white/88 md:text-[16px]">
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3 pt-1">
                    <div className="flex flex-wrap items-center gap-3">
                      {featuredWork.slug ? (
                        <a href={workCaseStudyUrl(featuredWork.slug)} rel="noopener" className={WORK_PRIMARY_GLOSS_CTA_H10}>
                          <span className={WORK_PRIMARY_GLOSS_CTA_INNER}>View case study</span>
                        </a>
                      ) : null}
                      <button
                        type="button"
                        onClick={scrollToForm}
                        className="inline-flex h-10 items-center rounded-[10px] border border-white/20 bg-black/50 px-4 text-[12px] font-semibold text-white/95 transition-colors hover:bg-black/65"
                      >
                        Plan a similar build
                      </button>
                    </div>
                  </div>
                </div>

                <div className="order-1 flex items-center justify-center lg:order-2">
                  <FeaturedInfrastructureVisual
                    image={featuredWork.image}
                    gradient={featuredWork.gradient}
                    category={featuredWork.category}
                    videoSrc={featuredInfrastructureVideo}
                    videoSrcFallback={featuredInfrastructureVideoFallback}
                    videoPoster={featuredInfrastructureVideoPoster}
                  />
                </div>
              </div>

              <FlagshipFounderNotesStrip portfolioVertical={portfolioVertical} onGoToMainForm={scrollToForm} />
            </div>
          ) : (
            <div className={SECTION_CONTENT}>
              <SectionTitle
                watermark="OUR WORKS"
                watermarkClassName={workCount <= 2 ? "mt-[30px] mb-[30px] opacity-[0.17]" : "mt-[30px] mb-[30px]"}
                hideTitle
              >
            Our Works
          </SectionTitle>

              <div className={workGridClass}>
                {displayCaseStudies.map((card, idx) => (
              <article
                    key={`${card.title}-${idx}`}
                className="group relative overflow-hidden rounded-[14px] border border-white/12 bg-black/35 backdrop-blur-[8px]"
              >
                <div className="relative h-[210px] w-full overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-[1.04]"
                    style={
                      card.image
                        ? {
                            backgroundImage: `url(${card.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : {
                            background:
                              card.gradient ??
                              "radial-gradient(120% 100% at 0% 0%, rgba(72,118,255,0.48), rgba(0,0,0,0.85) 70%)",
                          }
                    }
                  />
                  <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.72)_80%,rgba(0,0,0,0.92)_100%)]" />
                  <div className="absolute left-4 top-4 z-[2]">
                    <span className="rounded-full border border-white/15 bg-black/45 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur-[3px]">
                      {card.category}
                    </span>
                  </div>
                </div>

                <div className="relative z-[2] p-5">
                  <h3 className="text-[19px] font-medium text-white">{card.title}</h3>
                  <p className="mt-2 text-[15px] font-medium text-white/90">{card.impact}</p>
                      {shouldShowBusinessResult(card.impact, card.businessResult) ? (
                  <p className="mt-2 text-[13px] text-white/65">{card.businessResult}</p>
                      ) : null}
                      <IndustryWorkStackChips stack={card.stack} />
                  {card.slug ? (
                    <a
                      href={workCaseStudyUrl(card.slug)}
                      rel="noopener"
                          className={`${WORK_PRIMARY_GLOSS_CTA_H10} mt-4`}
                    >
                          <span className={WORK_PRIMARY_GLOSS_CTA_INNER}>View case study</span>
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={scrollToForm}
              className="btn-gloss relative overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-sm font-medium text-white"
            >
              Start your project
            </button>
          </div>
            </div>
          )}
        </section>
        ) : null}

        {!heroBannerSrc ? (
          <>
            <SectionDivider />
            <ProcessStepsSection title={processTitle} steps={processSteps} />
            <SectionDivider />
            <BookCallWithFounderBand sourcePage={resolvedLeadSourcePage} />
          </>
        ) : null}

        {!heroBannerSrc ? (
          <>
        <SectionDivider />

        {afterContactVerticalShowcase ? (
          <AfterContactVerticalShowcaseSection data={afterContactVerticalShowcase} onBuildSimilar={scrollToForm} />
        ) : null}

        <SectionDivider />

        {portfolioVertical === "fintech" ? <ProcessTestimonialBand /> : null}

        <SectionDivider />

        <CTA
          id="contact-form"
          leadFormProps={
            portfolioVertical === "healthcare"
              ? {
                  sourcePage: resolvedLeadSourcePage,
                  vertical: "healthcare",
                }
              : portfolioVertical === "fintech"
                ? {
                    sourcePage: resolvedLeadSourcePage,
                    vertical: "fintech",
                  }
                : {
                    sourcePage: resolvedLeadSourcePage,
                    vertical: "none",
                  }
          }
        />

        <SectionDivider />

        <IndustryGrowthSections
          capabilityCards={capabilityCards}
          expertiseHeading={resolvedExpertiseHeading}
          expertiseSubheading={resolvedExpertiseSubheading}
          portfolioVertical={portfolioVertical}
          operatingTitle={resolvedOperatingTitle}
          operatingSubheading={resolvedOperatingSubheading}
          operatingPillars={operatingModelPillars}
          operatingCenterLabel={resolvedOperatingCenterLabel}
          operatingCenterHint={resolvedOperatingCenterHint}
          scaleTitle={scaleTitle}
          scaleArchitecture={scaleArchitecture}
          scaleRootLabel={scaleRootLabel}
          operatorQuotes={resolvedOperatorQuotes}
        />

        <SectionDivider />
          </>
        ) : null}

        {!heroBannerSrc ? <IndustryFaqSection faqGroups={faqGroups} /> : null}

        {!heroBannerSrc ? (
          <>
            <SectionDivider />

            <InsightsSection items={resolvedInsights} heading={resolvedInsightsHeading} />

            {featuredWork ? null : <FounderBand portfolioVertical={portfolioVertical} onGoToMainForm={scrollToForm} />}

            <SectionDivider />

            <IndustryFinalCtaBand
              finalTitle={finalTitle}
              finalSubtitle={finalSubtitle}
              heroPrimaryCta={heroPrimaryCta}
              founderApplicationHref={founderApplicationHref}
              heroPrimaryCtaLabel={heroPrimaryCtaLabel}
              onScrollToForm={scrollToForm}
            />

            <SectionDivider />
          </>
        ) : null}

      </main>
      <Footer />
    </>
  );
}
