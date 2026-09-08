import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Helmet } from "react-helmet-async";
import { motion, useReducedMotion } from "motion/react";
import { SiteBackground } from "../components/SiteBackground";
import { Nav, type NavLinkItem } from "../components/Nav";
import { SectionDivider } from "../components/SectionDivider";
import { FloatingWhatsAppButton } from "../components/FloatingWhatsAppButton";
import { BusinessAutomationHero } from "../components/BusinessAutomationHero";
import { FeaturedInTrustBand } from "../components/FeaturedInTrustBand";
import { Process } from "../components/Process";
import { MockupBand } from "../components/MockupBand";
import { ArrowRightIcon, StarIcon } from "../components/icons";
import { useHashScroll } from "../lib/useHashScroll";
import { whatsappHref } from "../data/site";
import { businessAutomationPressItems } from "../data/businessAutomationContent";
import type { ProcessStep } from "../data/process";
import type { IconType } from "react-icons";
import {
  SiGoogle,
  SiLinkedin,
  SiMeta,
  SiOpenai,
  SiSnapchat,
  SiTiktok,
  SiYoutube,
} from "react-icons/si";

const CTA = lazy(() => import("../components/CTA").then((m) => ({ default: m.CTA })));
const Footer = lazy(() => import("../components/Footer").then((m) => ({ default: m.Footer })));

/**
 * AI Client Acquisition System — current homepage (`/`).
 * Full stack: ads + WhatsApp + LinkedIn + email. The eight agents block is the
 * ad-engine deep dive only (that content predated the other channels).
 * Previous homepage lives at `/previous-homepage`.
 */

const SOURCE_PAGE = "homepage";

const GLOSS =
  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------ nav ------------------------------ */

const NAV_LINKS: ReadonlyArray<NavLinkItem> = [
  {
    label: "Services",
    dropdown: [
      { label: "AI Client Acquisition System", href: "/" },
      { label: "AI Automation", href: "/business-automation" },
      { label: "SaaS Development", href: "/saas" },
      { label: "Trading AI", href: "/trading-app-development" },
    ],
  },
  { label: "How it works", href: "#demo" },
  { label: "Features", href: "#features" },
  { label: "Reviews", href: "#reviews" },
];

const NAV_CTA = { label: "Get my acquisition plan", href: "#contact-form" } as const;

/* ---------------------------- content ---------------------------- */

const HERO_ROTATING = [
  "budget split across six platforms",
  "audiences and targeting",
  "ad copy for every platform",
  "lead follow-ups on WhatsApp",
  "plain-English weekly report",
];

const ACQUISITION_METRICS = [
  { value: "12,540+", label: "Leads generated" },
  { value: "3,218+", label: "Campaigns launched" },
  { value: "48%", label: "Avg. conversion uplift" },
  { value: "2.6x", label: "ROI improvement" },
] as const;

const AD_CAMPAIGN_PLATFORMS: ReadonlyArray<{
  name: string;
  Icon: IconType;
  color: string;
}> = [
  { name: "Meta", Icon: SiMeta, color: "#0081FB" },
  { name: "Google", Icon: SiGoogle, color: "#4285F4" },
  { name: "Snapchat", Icon: SiSnapchat, color: "#FFFC00" },
  { name: "TikTok", Icon: SiTiktok, color: "#69C9D0" },
  { name: "ChatGPT", Icon: SiOpenai, color: "#FFFFFF" },
  { name: "LinkedIn", Icon: SiLinkedin, color: "#0A66C2" },
  { name: "YouTube", Icon: SiYoutube, color: "#FF0000" },
];

const FEATURES = [
  {
    iconSrc: "/brand/stack/ad-campaign.png",
    title: "Ad campaigns",
    desc: "Plan, create, and optimize across Meta, Google, LinkedIn Ads, TikTok, YouTube, Snapchat, and ChatGPT. Paused until you approve.",
    platforms: AD_CAMPAIGN_PLATFORMS,
  },
  {
    iconSrc: "/brand/stack/whatsapp.png",
    title: "WhatsApp automation",
    desc: "Instant reply, qualify, and follow up so every lead gets a response before they go cold.",
  },
  {
    iconSrc: "/brand/stack/linkedin.png",
    title: "LinkedIn outreach",
    desc: "Targeted outreach that opens more qualified conversations with the people you actually want to sell to.",
  },
  {
    iconSrc: "/brand/stack/mail.png",
    title: "Email marketing",
    desc: "Sequences that nurture the pipeline and convert interest into booked calls and closed deals.",
  },
  {
    iconSrc: "/brand/stack/always-on.png",
    title: "Always on",
    desc: "The whole stack runs around the clock so acquisition does not pause when your team clocks out.",
  },
] as const;

const PAINS = [
  {
    title: "Agencies are slow",
    desc: "A brief becomes a campaign in 5 to 10 days. By then the moment has moved on, and the retainer is due either way.",
  },
  {
    title: "Doing it yourself is a job",
    desc: "Six ad platforms, six logins, six ways to waste money. Most owners open Ads Manager, feel lost, boost a post, and hope.",
  },
  {
    title: "\u201cLeads\u201d that aren't leads",
    desc: "Form fills with fake numbers. Clicks that never call back. Volume looks great in a dashboard and terrible in your CRM.",
  },
] as const;

const TODAY_VS_SYSTEM: ReadonlyArray<{ today: string; system: string }> = [
  {
    today: "Account reviewed weekly, if you're lucky",
    system: "Checked every 20 minutes, 72 times a day",
  },
  {
    today: "Creative fatigue found at month-end, after the spend",
    system: "Fatigue and frequency creep flagged the same afternoon",
  },
  {
    today: "One account manager, twenty other clients",
    system: "Eight AI agents on your ads, plus WhatsApp, LinkedIn, and email",
  },
  {
    today: "Reports full of impressions, empty of revenue",
    system: "Leads scored, enriched, and pushed into your CRM",
  },
  {
    today: "Retainer whether it performs or not",
    system: "Pause everything in one click, any time",
  },
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Tell it your goal",
    description:
      "One sentence: what you sell, who you want to reach, and your budget. The AI asks only for what's missing.",
  },
  {
    number: "02",
    title: "Review the plan",
    description:
      "Budget split, audiences, keywords, and ad copy for every platform. Assembled in minutes, staged paused.",
  },
  {
    number: "03",
    title: "Approve and go live",
    description:
      "Campaigns launch inside your own ad accounts, under your own billing. Then the 20-minute loop takes over.",
  },
];

const AGENTS = [
  {
    num: "01",
    name: "Lead Scout AI",
    desc: "Finds and invites prospects that match your ideal customer. Continuously, not in batches.",
    iconSrc: "/brand/agents/lead-scout.png",
  },
  {
    num: "02",
    name: "Qualifier AI",
    desc: "Scores every prospect for fit before a rupee is spent chasing them. Screens, never spams.",
    iconSrc: "/brand/agents/qualifier.png",
  },
  {
    num: "03",
    name: "Follow-up AI",
    desc: "Messages leads the moment they respond, so nobody goes cold waiting on your sales team.",
    iconSrc: "/brand/agents/follow-up.png",
  },
  {
    num: "04",
    name: "Enrichment AI",
    desc: "Captures the email and phone number behind a lead so you get a contact, not a click.",
    iconSrc: "/brand/agents/enrichment.png",
  },
  {
    num: "05",
    name: "Campaign Launcher AI",
    desc: "Builds the ad campaigns across every platform and leaves them paused for your approval.",
    iconSrc: "/brand/agents/campaign-builder.png",
  },
  {
    num: "06",
    name: "Health Monitor AI",
    desc: "Watches account safety and acceptance rates so you never get flagged, throttled, or banned.",
    iconSrc: "/brand/agents/health-monitor.png",
  },
  {
    num: "07",
    name: "Scheduler AI",
    desc: "Runs the ad stack on autopilot during your working hours. Weekdays, unattended.",
    iconSrc: "/brand/agents/scheduler.png",
  },
  {
    num: "08",
    name: "Report Writer AI",
    desc: "Writes the weekly summary in plain English: what worked, what's wasting money, what to do next.",
    iconSrc: "/brand/agents/reporting.png",
  },
] as const;

const LOOP = [
  { time: "00:00", verb: "Read", desc: "Pull live spend, clicks, CTR, and cost-per-lead from every connected platform." },
  { time: "00:04", verb: "Compare", desc: "Benchmark each ad set against its category target and its own last run." },
  { time: "00:09", verb: "Decide", desc: "Flag fatigue, frequency creep, dead creatives, and starved budgets." },
  { time: "00:14", verb: "Act", desc: "Shift budget to what converts, pause what doesn't, queue creative rotation." },
  { time: "00:20", verb: "Repeat", desc: "Log every change to the audit trail, then start the next cycle." },
] as const;

const MONTH: ReadonlyArray<{ when: string; what: string; youDo: string; youGet: string }> = [
  {
    when: "Day 0 · Setup",
    what: "Scans your website, connects your ad accounts and CRM, runs the pre-flight check.",
    youDo: "Sign in to your own accounts",
    youGet: "Ad-health baseline and fix list",
  },
  {
    when: "Day 0 · Brief",
    what: "Reads your one-sentence goal, then plans budget split, audiences, and copy across platforms.",
    youDo: "Type one sentence",
    youGet: "Full campaign plan, paused",
  },
  {
    when: "Day 1 · Launch",
    what: "Campaign Launcher AI builds every campaign in a real Chrome window, inside your accounts.",
    youDo: "Review and approve",
    youGet: "Live campaigns on six platforms",
  },
  {
    when: "Days 1–30 · Run",
    what: "The 20-minute loop reads, compares, decides, and acts. 72 checks every day, unattended.",
    youDo: "Nothing",
    youGet: "Real-time dashboard",
  },
  {
    when: "Continuous · Qualify",
    what: "WhatsApp, LinkedIn, and email pick up where ads leave off: qualify, follow up, and nurture.",
    youDo: "Answer your leads",
    youGet: "Qualified leads in WhatsApp and CRM",
  },
];

const REVIEWS = [
  {
    img: "/brand/reviews/r1.jpg",
    name: "Ramesh Iyer",
    role: "Founder, Iyer Coaching Academy · Chennai",
    quote:
      "We asked for 200 leads a month on WhatsApp. Now 8 to 10 parent enquiries come in every single day.",
    rating: 5,
  },
  {
    img: "/brand/reviews/r2.jpg",
    name: "Sneha Kulkarni",
    role: "Director, LittleSteps Preschool · Pune",
    quote:
      "Admission season used to be stressful. The AI filled both our demo classes in under two weeks.",
    rating: 4.5,
  },
  {
    img: "/brand/reviews/r3.jpg",
    name: "Dr. Suresh Menon",
    role: "Chairman, Menon Institute of Technology",
    quote:
      "Cost per lead dropped 40%. It runs Meta and Google better than the agency we paid for years.",
    rating: 5,
  },
  {
    img: "/brand/reviews/r4.jpg",
    name: "Ananya Gupta",
    role: "Founder, UpSkill Academy (EdTech)",
    quote:
      "I typed one line, 'fill my webinar', and it built campaigns on three platforms. 900+ registrations.",
    rating: 5,
  },
  {
    img: "/brand/reviews/r5.jpg",
    name: "Vikram Reddy",
    role: "MD, GreenNest Interiors · Hyderabad",
    quote:
      "The approval-first flow gives me total control. Qualified leads land straight in my CRM.",
    rating: 4.5,
  },
] as const;

/* ----------------------------- helpers ----------------------------- */

function SectionWithTopRule({
  showDivider = true,
  children,
}: {
  showDivider?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full max-w-[1920px] flex-col">
      {showDivider ? <SectionDivider /> : null}
      {children}
    </div>
  );
}

/** One-shot fade-up when the block enters the viewport. */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function RevealStagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
      }}
    >
      {children}
    </motion.div>
  );
}

function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={
        reduced
          ? undefined
          : {
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
            }
      }
    >
      {children}
    </motion.div>
  );
}

function StackTypewriter() {
  const reduced = useReducedMotion();
  const phrase = "Plans. Campaigns. Outreach. Follow-ups.";
  const [shown, setShown] = useState(reduced ? phrase.length : 0);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const tick = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= phrase.length) window.clearInterval(tick);
    }, 48);
    return () => window.clearInterval(tick);
  }, [reduced, phrase]);

  return (
    <span className="relative mt-2 block font-mono text-[14px] font-normal leading-snug tracking-[0.04em] text-white/70 sm:text-[15px] md:mt-2.5 md:text-[20px] md:leading-none md:tracking-[0.06em]">
      <span className="invisible max-md:hidden" aria-hidden>
        {phrase}
      </span>
      <span className="md:absolute md:inset-0 md:whitespace-nowrap">
        {phrase.slice(0, shown)}
        <span
          aria-hidden
          className="ml-[2px] inline-block h-[0.86em] w-[2px] translate-y-[0.08em] animate-pulse bg-[#7c97ff] align-middle"
        />
      </span>
    </span>
  );
}

function RotatingClause() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const longest = HERO_ROTATING.reduce((a, b) => (a.length >= b.length ? a : b));

  useEffect(() => {
    const iv = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % HERO_ROTATING.length);
        setFade(true);
      }, 280);
    }, 2400);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      Tell it your goal in one sentence. It builds your{" "}
      <span className="relative inline-grid align-baseline">
        <span className="invisible col-start-1 row-start-1 font-medium" aria-hidden>
          {longest}
        </span>
        <span
          className="impact-highlight col-start-1 row-start-1 font-medium transition-opacity duration-300"
          style={{ opacity: fade ? 1 : 0 }}
        >
          {HERO_ROTATING[index]}
        </span>
      </span>
      .
      <br />
      Nothing spends until you approve.
    </>
  );
}

/* ------------------------------ page ------------------------------ */

export default function AiClientAcquisition() {
  return <AiClientAcquisitionInner />;
}

function AiClientAcquisitionInner() {
  useHashScroll();

  return (
    <>
      <Helmet>
        <title>Get more clients with AI · Boostmysites</title>
        <meta
          name="description"
          content="Get more clients with AI. Plans, campaigns, LinkedIn outreach, email, and WhatsApp follow-ups. All running 24/7. Nothing spends until you approve."
        />
      </Helmet>
      <SiteBackground />
      <Nav
        links={NAV_LINKS}
        cta={NAV_CTA}
        whatsappHref={whatsappHref}
        ctaOutsideNav
      />
      <FloatingWhatsAppButton href={whatsappHref} />

      <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-x-hidden pb-16 md:pb-24">
        <BusinessAutomationHero
          whatsappHref={whatsappHref}
          content={{
            badgeTag: "NEW",
            badgeLabel: "AI Client Acquisition System",
            headline: (
              <>
                Get <span className="impact-highlight">more clients</span> with{" "}
                <span className="impact-highlight">AI</span>.
                <span className="mt-3 block border-l-2 border-purple/60 pl-3 font-mono text-[14px] font-normal leading-[1.3] tracking-[0.04em] text-white/70 sm:mt-4 sm:pl-4 sm:text-[15px] md:mt-5 md:pl-6 md:text-[20px] md:leading-[1.25] md:tracking-[0.06em]">
                  Your client acquisition stack
                  <br />
                  that never clocks out.
                  <StackTypewriter />
                </span>
                <span className="impact-highlight mt-3 block text-[26px] leading-[1.08] sm:mt-4 sm:text-[28px] md:mt-5 md:text-[inherit]">
                  All running 24/7.
                </span>
              </>
            ),
            subcopy: <RotatingClause />,
            primaryCta: { label: "Get my client acquisition plan", href: "#contact-form" },
            exploreCta: { label: "See how it works ↓", href: "#demo" },
            video: { src: "/brand/hero.mp4", poster: "/brand/hero-poster.jpg" },
            trustStats: [
              { value: "72", label: "account checks a day" },
              { value: "8", label: "AI agents on your ads" },
              { value: "24/7", label: "plan, launch, optimize, follow up" },
            ],
          }}
        />

        <FeaturedInTrustBand
          pressItems={[...businessAutomationPressItems]}
          metrics={ACQUISITION_METRICS}
        />

        <Suspense fallback={<div className="h-[60vh] w-full" aria-hidden="true" />}>
          {/* ---------- Features: full acquisition stack ---------- */}
          <SectionWithTopRule showDivider={false}>
            <section
              id="features"
              className="relative flex w-full max-w-[1920px] flex-col overflow-x-hidden px-5 py-12 md:px-10 md:py-16"
            >
              <Reveal className="relative z-[1] w-full overflow-visible">
                <div className="relative z-[2] flex w-full items-end justify-between gap-6 pt-1 lg:gap-10">
                  <div className="flex min-w-0 max-w-[720px] flex-col items-start gap-4 text-left md:mt-2">
                    <p className="acq-eyebrow impact-highlight inline-flex w-fit items-center rounded-full border border-purple/50 bg-black/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em] backdrop-blur-[5px]">
                      What you get
                    </p>
                    <h2 className="text-left text-[32px] font-medium leading-[1.1] -tracking-[0.04em] text-white max-md:text-[30px] md:text-[44px]">
                      Ads are only one part.
                      <br />
                      The <span className="impact-highlight">full stack</span> runs with them.
                    </h2>
                    <p className="max-w-[54ch] font-mono text-[14px] leading-relaxed tracking-[0.04em] text-white/60 md:text-[15px]">
                      Plan and launch campaigns, then qualify and nurture on WhatsApp, LinkedIn, and email.
                      One system. Around the clock.
                    </p>
                  </div>

                  <p
                    aria-hidden
                    className="acq-watermark pointer-events-none hidden min-w-0 flex-1 select-none self-end overflow-hidden whitespace-nowrap text-right font-bold uppercase leading-[0.82] tracking-[0.02em] opacity-[0.55] lg:block"
                    style={{
                      fontSize: "clamp(2.75rem, 5.5vw, 6.75rem)",
                      backgroundImage:
                        "linear-gradient(180deg, rgb(196,214,255) 0%, rgb(88,132,255) 48%, rgb(48,82,196) 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                  >
                    THE STACK
                  </p>
                </div>
              </Reveal>

              <RevealStagger className="relative z-[1] mx-auto mt-8 grid w-full max-w-[1400px] grid-cols-1 gap-x-5 gap-y-10 overflow-visible pt-8 sm:grid-cols-2 sm:gap-y-12 sm:pt-10 md:mt-12 md:gap-y-14 md:pt-12 lg:grid-cols-5">
                {FEATURES.map((f) => (
                  <RevealItem key={f.title} className="overflow-visible">
                    <div
                      className="acq-gloss relative flex h-full flex-col overflow-visible rounded-[16px] border border-white/12 px-5 pb-5 pt-11 transition-colors hover:border-purple/50 sm:pt-12 md:px-6 md:pb-6 md:pt-14"
                      style={{ background: GLOSS }}
                    >
                      <img
                        src={f.iconSrc}
                        alt=""
                        aria-hidden
                        className="pointer-events-none absolute -left-3 -top-7 z-10 h-[68px] w-[68px] object-contain object-center drop-shadow-[0_12px_28px_rgba(51,102,255,0.5)] sm:-left-4 sm:-top-9 sm:h-[84px] sm:w-[84px] md:-left-6 md:-top-11 md:h-[96px] md:w-[96px]"
                      />
                      <p className="impact-highlight font-mono text-[13px] font-bold uppercase leading-tight tracking-[0.08em] sm:text-[15px] sm:tracking-[0.1em] md:text-[16px]">
                        {f.title}
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/60">{f.desc}</p>
                      {"platforms" in f && f.platforms ? (
                        <ul
                          aria-label="Ad platforms"
                          className="mt-auto flex flex-wrap gap-1.5 border-t border-white/10 pt-3.5"
                        >
                          {f.platforms.map((p) => (
                            <li key={p.name} title={p.name}>
                              <span className="inline-flex size-7 items-center justify-center rounded-[7px] border border-white/10 bg-white/[0.05]">
                                <p.Icon
                                  aria-hidden
                                  className="size-3.5"
                                  style={{ color: p.color }}
                                />
                                <span className="sr-only">{p.name}</span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </section>
          </SectionWithTopRule>

          {/* ---------- Ad engine: eight agents + 20-min loop ---------- */}
          <SectionWithTopRule>
            <section
              id="agents"
              className="relative flex w-full max-w-[1920px] flex-col overflow-x-hidden px-5 py-12 md:px-10 md:py-16"
            >
              <Reveal className="relative z-[1] w-full overflow-visible">
                <div className="relative z-[2] flex w-full items-end justify-between gap-6 pt-1 lg:gap-10">
                <div className="flex min-w-0 max-w-[720px] flex-col items-start gap-4 text-left md:mt-2">
                  <p className="acq-eyebrow impact-highlight inline-flex w-fit items-center rounded-full border border-purple/50 bg-black/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em] backdrop-blur-[5px]">
                    Inside the ad engine · eight AI agents
                  </p>
                  <h2 className="text-left text-[32px] font-medium leading-[1.1] -tracking-[0.04em] text-white max-md:text-[30px] md:text-[44px]">
                    An agency media team that{" "}
                    <span className="impact-highlight">never sleeps</span>,
                    <br />
                    rebuilt as <span className="impact-highlight">software</span>.
                  </h2>
                  <p className="max-w-[54ch] font-mono text-[14px] leading-relaxed tracking-[0.04em] text-white/60 md:text-[15px]">
                    These eight agents run your paid campaigns. WhatsApp, LinkedIn, and email sit alongside them in the stack above.
                  </p>
                </div>

                <p
                  aria-hidden
                  className="acq-watermark pointer-events-none hidden min-w-0 flex-1 select-none self-end overflow-hidden whitespace-nowrap text-right font-bold uppercase leading-[0.82] tracking-[0.02em] opacity-[0.55] lg:block"
                  style={{
                    fontSize: "clamp(2.75rem, 5.5vw, 6.75rem)",
                    backgroundImage:
                      "linear-gradient(180deg, rgb(196,214,255) 0%, rgb(88,132,255) 48%, rgb(48,82,196) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  THE AGENTS
                </p>
                </div>
              </Reveal>

              <RevealStagger className="relative z-[1] mx-auto mt-10 grid w-full max-w-[1400px] grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
                {AGENTS.map((a) => (
                  <RevealItem key={a.num}>
                    <div
                      className="acq-gloss flex h-full flex-col rounded-[16px] border border-white/12 p-5 transition-colors hover:border-purple/50 md:p-6"
                      style={{ background: GLOSS }}
                    >
                      <div className="mb-3 flex h-[140px] items-center justify-center sm:mb-4 sm:h-[168px] md:h-[196px]">
                        <img
                          src={a.iconSrc}
                          alt=""
                          aria-hidden
                          className="h-full w-full object-contain object-center drop-shadow-[0_16px_32px_rgba(0,0,0,0.45)]"
                        />
                      </div>
                      <p className="font-mono text-[12px] font-semibold tracking-[0.1em] text-bright-purple">
                        {a.num}
                      </p>
                      <p className="impact-highlight mt-2 text-[16px] font-semibold leading-tight">
                        {a.name}
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/60">{a.desc}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>

              <Reveal className="relative z-[1] mx-auto mt-12 w-full max-w-[1400px] md:mt-16" delay={0.08}>
                <div
                  className="acq-loop-panel rounded-[16px] border border-white/12 p-6 md:p-8 acq-gloss"
                  style={{ background: GLOSS }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[22px] font-medium -tracking-[0.02em] text-white md:text-[26px]">
                      The <span className="impact-highlight">20-minute loop</span>
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                      72 cycles a day · every change logged
                    </p>
                  </div>
                  <RevealStagger className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {LOOP.map((step, index) => (
                      <RevealItem key={step.time}>
                        <div
                          className={[
                            "acq-loop-step relative h-full rounded-[12px] border border-white/[0.08] bg-black/30 p-4",
                            index === LOOP.length - 1 ? "border-purple/40" : "",
                          ].join(" ")}
                        >
                          <p className="impact-highlight font-mono text-[11px] tracking-[0.1em]">
                            {step.time}
                          </p>
                          <p className="mt-1.5 text-[15px] font-semibold text-white">{step.verb}</p>
                          <p className="mt-1.5 text-[12px] leading-snug text-white/55">{step.desc}</p>
                        </div>
                      </RevealItem>
                    ))}
                  </RevealStagger>
                </div>
              </Reveal>
            </section>
          </SectionWithTopRule>

          {/* ---------- Your first 30 days ---------- */}
          <SectionWithTopRule>
            <section className="w-full max-w-[1920px] px-5 py-12 md:px-10 md:py-16">
              <div className="mx-auto w-full max-w-[1200px]">
                <Reveal className="flex max-w-[720px] flex-col items-start gap-4">
                  <p className="acq-eyebrow impact-highlight inline-flex w-fit items-center rounded-full border border-purple/50 bg-black/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em] backdrop-blur-[5px]">
                    From sign-up to pipeline
                  </p>
                  <h2 className="text-left text-[32px] font-medium leading-[1.1] -tracking-[0.04em] text-white max-md:text-[30px] md:text-[44px]">
                    Your first <span className="impact-highlight">30 days</span>
                  </h2>
                </Reveal>

                <RevealStagger className="acq-month-table mt-8 overflow-hidden rounded-[16px] border border-white/12 md:mt-10">
                  {MONTH.map((row, index) => (
                    <RevealItem key={row.when}>
                      <div
                        className={[
                          "grid gap-3 p-5 md:grid-cols-[190px_minmax(0,1fr)_300px] md:items-center md:gap-6 md:p-6",
                          index > 0 ? "border-t border-white/[0.06]" : "",
                        ].join(" ")}
                        style={{
                          background:
                            index % 2 === 0
                              ? "rgba(72, 118, 255, 0.10)"
                              : "rgba(72, 118, 255, 0.04)",
                        }}
                      >
                        <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-bright-purple">
                          {row.when}
                        </p>
                        <p className="text-[14px] leading-relaxed text-white/75">{row.what}</p>
                        <div className="flex flex-col gap-1.5 text-[12.5px]">
                          <p className="text-white/50">
                            <span className="font-semibold text-white/70">You do:</span> {row.youDo}
                          </p>
                          <p className="text-white/50">
                            <span className="font-semibold text-bright-purple">You get:</span>{" "}
                            {row.youGet}
                          </p>
                        </div>
                      </div>
                    </RevealItem>
                  ))}
                </RevealStagger>
              </div>
            </section>
          </SectionWithTopRule>

          {/* ---------- Demo video ---------- */}
          <SectionWithTopRule>
            <section id="demo" className="w-full max-w-[1920px] px-5 py-12 md:px-10 md:py-16">
              <Reveal className="mx-auto max-w-[720px] text-center">
                <h2 className="text-[32px] font-medium leading-[1.1] -tracking-[0.04em] text-white max-md:text-[30px] md:text-[44px]">
                  See it work. <span className="impact-highlight">2½ minutes</span>
                </h2>
                <p className="mt-3 font-mono text-[14px] tracking-[0.04em] text-white/60 md:text-[15px]">
                  One sentence in. A full multi-platform campaign out. Watch the real dashboard do it.
                </p>
              </Reveal>
              <Reveal className="mx-auto mt-8 max-w-[960px] md:mt-10" delay={0.06}>
                <DemoVideoPlayer />
              </Reveal>
            </section>
          </SectionWithTopRule>

          {/* ---------- Launch ---------- */}
          <SectionWithTopRule>
            <section
              id="process"
              className="relative flex w-full max-w-[1920px] flex-col overflow-x-hidden px-5 py-10 md:px-10 md:py-14"
              style={{
                background:
                  "radial-gradient(50% 40% at 35% 30%, var(--color-dark-purple) 0%, rgba(0,0,0,0) 100%)",
              }}
            >
              <Reveal>
                <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-10">
                  <Process
                    embedded
                    steps={PROCESS_STEPS}
                    columns={3}
                    title={
                      <>
                        One <span className="impact-highlight">sentence</span>.{" "}
                        <span className="impact-highlight">Full stack</span>.
                      </>
                    }
                    subtitle="From a one-line brief to ads, WhatsApp follow-ups, LinkedIn outreach, and email. You approve before anything spends."
                    watermark="LAUNCH"
                    align="left"
                    contentMaxWidth="100%"
                  />
                  <div className="flex min-h-0 min-w-0 flex-col border-t border-white/[0.06] pt-8 lg:h-full lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                    <MockupBand
                      variant="sidebar"
                      src="/brand/how.mp4"
                      poster="/brand/how-poster.jpg"
                      eyebrow="The command centre"
                      title="Watch it build a campaign"
                      text="The AI drives a real Chrome window inside your own ad accounts. Your billing, your data. It opens the login page and you sign in yourself. Your password is never seen or stored."
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal className="relative z-[1] mx-auto mt-8 w-full max-w-[1200px] border-t border-white/[0.06] pt-8 md:mt-10 md:pt-10" delay={0.06}>
                <div className="flex flex-col items-center gap-3 rounded-[12px] border border-white/[0.06] bg-white/[0.02] px-4 py-5 text-center md:px-8 md:py-6">
                  <div className="max-w-[640px] space-y-1">
                    <p className="text-lg font-medium text-white md:text-xl">
                      <span className="impact-highlight">One sentence</span>. Thirty days.{" "}
                      <span className="impact-highlight">Real clients</span>.
                    </p>
                    <p className="font-mono text-[14px] tracking-[0.04em] text-white/65 md:text-[15px]">
                      See the exact campaign plan before a rupee leaves your account.
                    </p>
                  </div>
                  <a
                    href="#contact-form"
                    className="btn-gloss relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3.5 text-sm font-semibold text-white sm:w-auto md:px-6 md:text-[15px]"
                  >
                    <span className="relative z-[2]">Get my client acquisition plan</span>
                    <ArrowRightIcon className="relative z-[2] size-4 shrink-0 text-white" />
                  </a>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                    Free consultation · Plan before spend · No retainer
                  </p>
                </div>
              </Reveal>
            </section>
          </SectionWithTopRule>

          {/* ---------- Problem ---------- */}
          <SectionWithTopRule>
            <section
              id="problem"
              className="relative flex w-full max-w-[1920px] flex-col overflow-x-hidden px-5 pb-12 pt-5 md:px-10 md:pb-16 md:pt-6"
              style={{
                background:
                  "radial-gradient(50% 40% at 50% 20%, rgba(80,20,30,0.12) 0%, rgba(0,0,0,0) 100%)",
              }}
            >
              <Reveal className="relative z-[1] w-full overflow-visible">
                <div className="relative z-[2] flex w-full items-end justify-between gap-6 pt-1 lg:gap-10">
                  <div className="flex min-w-0 max-w-[720px] flex-col items-start gap-4 text-left md:mt-2">
                    <p className="acq-eyebrow acq-eyebrow-danger inline-flex w-fit items-center rounded-full border border-red-400/50 bg-black/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-red-400 backdrop-blur-[5px]">
                      Why your ads underperform
                    </p>
                    <h2 className="text-left text-[32px] font-medium leading-[1.1] -tracking-[0.04em] text-white max-md:text-[30px] md:text-[44px]">
                      You&apos;re paying for <span className="loss-highlight-red">attention</span>
                      <br />
                      that no one is <span className="loss-highlight-red">watching</span>.
                    </h2>
                  </div>

                  <p
                    aria-hidden
                    className="acq-watermark pointer-events-none hidden min-w-0 flex-1 select-none self-end overflow-hidden whitespace-nowrap text-right font-bold uppercase leading-[0.82] tracking-[0.02em] opacity-[0.45] lg:block"
                    style={{
                      fontSize: "clamp(2.75rem, 5.5vw, 6.75rem)",
                      backgroundImage:
                        "linear-gradient(180deg, rgb(255, 170, 170) 0%, rgb(220, 80, 80) 48%, rgb(120, 30, 30) 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                  >
                    THE OLD WAY
                  </p>
                </div>
              </Reveal>

              <RevealStagger className="relative z-[1] mx-auto mt-10 grid w-full max-w-[1200px] gap-3 sm:grid-cols-3 md:mt-14 md:gap-4">
                {PAINS.map((p) => (
                  <RevealItem key={p.title}>
                    <div
                      className="acq-pain-chip h-full rounded-[14px] border border-white/12 p-4 md:p-5 acq-gloss"
                      style={{ background: GLOSS }}
                    >
                      <p className="text-[15px] font-semibold leading-tight text-white md:text-[16px]">
                        {p.title}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">
                        {p.desc}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>

              <Reveal className="relative z-[1] mx-auto mt-6 w-full max-w-[1200px] md:mt-8">
                <div
                  className="acq-ledger overflow-hidden rounded-[16px] border border-white/12"
                  style={{ background: GLOSS }}
                >
                  <div className="grid gap-1 border-b border-white/[0.08] px-5 py-3 md:grid-cols-2 md:px-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-red-400/90">
                      Your account today
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bright-purple">
                      With the system
                    </p>
                  </div>
                  {TODAY_VS_SYSTEM.map((row, index) => (
                    <div
                      key={row.today}
                      className={[
                        "acq-ledger-row grid gap-2 px-5 py-3.5 md:grid-cols-2 md:items-center md:gap-8 md:px-7",
                        index > 0 ? "border-t border-white/[0.08]" : "",
                      ].join(" ")}
                    >
                      <p className="flex gap-3 text-[13.5px] leading-snug text-white/65">
                        <span className="mt-[7px] h-px w-3 shrink-0 bg-red-400/60" />
                        {row.today}
                      </p>
                      <p className="flex gap-3 text-[13.5px] leading-snug text-white/85">
                        <span className="mt-[7px] h-px w-3 shrink-0 bg-bright-purple" />
                        {row.system}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>
          </SectionWithTopRule>

          {/* ---------- Reviews ---------- */}
          <SectionWithTopRule>
            <section id="reviews" className="w-full max-w-[1920px] px-5 py-12 md:px-10 md:py-16">
              <Reveal className="mx-auto max-w-[720px] text-center">
                <h2 className="text-[32px] font-medium leading-[1.1] -tracking-[0.04em] text-white max-md:text-[30px] md:text-[44px]">
                  Loved by <span className="impact-highlight">business owners</span>
                </h2>
                <p className="mt-3 font-mono text-[14px] tracking-[0.04em] text-white/60 md:text-[15px]">
                  Real outcomes from owners who told the AI what they needed.
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <ReviewsMarquee />
              </Reveal>
            </section>
          </SectionWithTopRule>

          {/* ---------- Final CTA ---------- */}
          <SectionWithTopRule>
            <Reveal>
              <CTA
                eyebrow="AI Client Acquisition System"
                title="See your campaign plan before you spend."
                subtitle="Tell us what you sell and who you want to reach. We'll show you the plan: budget split, audiences, ad copy. Nothing goes live until you approve it."
                leadFormProps={{ sourcePage: SOURCE_PAGE }}
                whatsappHref={whatsappHref}
              />
            </Reveal>
          </SectionWithTopRule>

          <Footer />
        </Suspense>
      </main>
    </>
  );
}

/* ----------------------------- pieces ----------------------------- */

function DemoVideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playing) videoRef.current?.play().catch(() => undefined);
  }, [playing]);

  return (
    <div
      className="acq-gloss overflow-hidden rounded-[16px] border border-white/12"
      style={{
        background: GLOSS,
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
      }}
    >
      {/* macOS-style chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] bg-black/40 px-3 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-md border border-white/[0.06] bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-white/45">
          boostmysites.in
        </span>
      </div>

      {playing ? (
        <video
          ref={videoRef}
          src="/demo/boostmysites-demo.mp4"
          poster="/demo/demo-poster.jpg"
          controls
          playsInline
          className="aspect-video w-full bg-black object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative block w-full"
          aria-label="Play the demo video"
        >
          <img
            src="/demo/demo-poster.jpg"
            alt="BOOSTMYSITES demo video"
            className="aspect-video w-full object-cover"
          />
          <span className="absolute inset-0 grid place-items-center bg-black/35 transition group-hover:bg-black/25">
            <span className="grid size-16 place-items-center rounded-full border border-white/25 bg-purple/80 text-white shadow-[0_12px_40px_rgba(72,118,255,0.45)] transition-transform group-hover:scale-105 md:size-20">
              <svg viewBox="0 0 24 24" className="ml-0.5 size-7 fill-current" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

function ReviewsMarquee() {
  const cards = [...REVIEWS, ...REVIEWS];
  return (
    <div
      className="relative mt-8 overflow-hidden md:mt-10"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <div className="flex w-max animate-ticker gap-4" style={{ animationDuration: "45s" }}>
        {cards.map((r, i) => (
          <div
            key={`${r.name}-${i}`}
            className="w-[min(300px,82vw)] shrink-0 rounded-[16px] border border-white/12 p-4 acq-gloss sm:w-[340px] sm:p-5"
            style={{ background: GLOSS }}
          >
            <div className="flex items-center gap-3">
              <img
                src={r.img}
                alt={r.name}
                loading="lazy"
                className="h-12 w-12 rounded-full border border-white/15 object-cover"
              />
              <div className="min-w-0">
                <p className="impact-highlight truncate text-[13px] font-bold">{r.name}</p>
                <p className="truncate text-[10.5px] text-white/50">{r.role}</p>
              </div>
              <ReviewStars rating={r.rating} id={`review-star-${i}`} />
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-white/80">
              &ldquo;{r.quote}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const STAR_PATH =
  "M8 1.2l1.94 4.36 4.76.45-3.6 3.16 1.06 4.66L8 11.4l-4.16 2.43 1.06-4.66L1.3 6.01l4.76-.45z";

function ReviewStars({ rating, id }: { rating: number; id: string }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const halfId = `${id}-half`;

  return (
    <span className="ml-auto flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }, (_, i) => (
        <StarIcon key={`f-${i}`} className="size-3.5 fill-[#7c97ff]" />
      ))}
      {half ? (
        <svg key="half" viewBox="0 0 16 16" className="size-3.5" aria-hidden>
          <defs>
            <linearGradient id={halfId} x1="0" x2="1" y1="0" y2="0">
              <stop offset="50%" stopColor="#7c97ff" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.85)" />
            </linearGradient>
          </defs>
          <path d={STAR_PATH} fill={`url(#${halfId})`} />
        </svg>
      ) : null}
      {Array.from({ length: empty }, (_, i) => (
        <StarIcon key={`e-${i}`} className="size-3.5 fill-white/35" />
      ))}
    </span>
  );
}
