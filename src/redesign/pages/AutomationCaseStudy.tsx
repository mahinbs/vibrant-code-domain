import { lazy, Suspense, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { Nav } from "../components/Nav";
import { SiteBackground } from "../components/SiteBackground";
import { CTA } from "../components/CTA";
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from "../components/icons";
import { whatsappHref } from "../data/site";
import { useHashScroll } from "../lib/useHashScroll";
import {
  automationCaseStudies,
  caseStudyPath,
  getCaseStudyBySlug,
  type AutomationCaseStudy,
} from "../data/automationCaseStudies";

const Footer = lazy(() =>
  import("../components/Footer").then((m) => ({ default: m.Footer })),
);

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)));

const GLOSS =
  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)";
const DEEP_GLOSS =
  "linear-gradient(180deg, rgba(18,38,96,.55) 0%, rgba(6,12,30,.92) 52%, rgba(0,0,0,.98) 100%)";
const GRID_OVERLAY: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(120,145,220,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(120,145,220,.10) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

function GridDots() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-40"
      style={GRID_OVERLAY}
    />
  );
}

function Watermark({ children }: { children: ReactNode }) {
  return (
    <p
      aria-hidden
      className="pointer-events-none absolute left-0 top-1/2 z-0 hidden w-full -translate-y-1/2 select-none text-left font-bold uppercase leading-[0.85] tracking-[0.02em] opacity-[0.22] md:block"
      style={{
        fontSize: "clamp(2.5rem, min(11vw, 9rem), 9rem)",
        backgroundImage:
          "linear-gradient(180deg, rgb(140, 178, 255) 0%, rgb(88, 132, 255) 28%, rgb(48, 88, 210) 58%, rgb(18, 32, 72) 88%, rgb(8, 14, 36) 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </p>
  );
}

function Section({
  watermark,
  eyebrow,
  title,
  intro,
  children,
}: {
  watermark?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className="relative w-full max-w-[1180px] mx-auto px-5 md:px-10 py-14 md:py-20">
      <div className="relative">
        {watermark ? <Watermark>{watermark}</Watermark> : null}
        <div className="relative z-[2]">
          {eyebrow ? (
            <p className="mb-3 inline-flex w-fit items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-purple backdrop-blur-[5px]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-[30px] font-medium -tracking-[0.04em] leading-[1.05em] text-white md:text-[44px]">
            {title}
          </h2>
          {intro ? (
            <p className="mt-3 max-w-[680px] text-base text-white/60 md:text-lg">
              {intro}
            </p>
          ) : null}
        </div>
        <div className="relative z-[2] mt-8">{children}</div>
      </div>
    </section>
  );
}

function HeroResultsCard({ study }: { study: AutomationCaseStudy }) {
  return (
    <div
      className="relative w-full max-w-[400px] justify-self-end overflow-hidden rounded-[20px] border border-white/15 p-6 max-xl:justify-self-center"
      style={{
        background: DEEP_GLOSS,
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,.08), 0 24px 60px rgba(0,0,0,.5)",
      }}
    >
      <GridDots />
      <div className="relative z-[1] flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
            Typical results
          </p>
          <span className="rounded-full border border-[#4b78ff]/40 bg-[#4b78ff]/15 px-2.5 py-1 text-[10px] font-semibold text-[#cdd9ff]">
            Live in ~2 weeks
          </span>
        </div>

        <div className="flex flex-col">
          {study.savings.metrics.map((m, i) => (
            <div
              key={m.label}
              className={`flex items-end justify-between gap-3 py-3 ${
                i > 0 ? "border-t border-white/10" : ""
              }`}
            >
              <span className="text-[34px] font-semibold leading-none text-gradient">
                {m.value}
              </span>
              <span className="pb-1 text-right text-[13px] leading-snug text-white/60">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3.5 py-3">
          <CheckIcon className="size-4 shrink-0 text-[#5dcaa5]" />
          <span className="text-[13px] text-white/75">
            ROI in under 90 days for most clients
          </span>
        </div>
      </div>
    </div>
  );
}

function SavingsCalculator({ study }: { study: AutomationCaseStudy }) {
  const { defaultHoursPerWeek, defaultPeople, defaultHourlyCost, automationRate } =
    study.savings;
  const [hours, setHours] = useState(defaultHoursPerWeek);
  const [people, setPeople] = useState(defaultPeople);
  const [rate, setRate] = useState(defaultHourlyCost);

  const { weeklyHoursSaved, monthly, annual } = useMemo(() => {
    const weeklyHoursSaved = hours * people * automationRate;
    const weeklySaving = weeklyHoursSaved * rate;
    return {
      weeklyHoursSaved,
      monthly: (weeklySaving * 52) / 12,
      annual: weeklySaving * 52,
    };
  }, [hours, people, rate, automationRate]);

  const fields = [
    {
      label: "Hours on this, per person / week",
      value: hours,
      set: setHours,
      min: 1,
      max: 40,
      step: 1,
      suffix: "hrs",
    },
    {
      label: "People doing this work",
      value: people,
      set: setPeople,
      min: 1,
      max: 50,
      step: 1,
      suffix: "ppl",
    },
    {
      label: "Average hourly cost",
      value: rate,
      set: setRate,
      min: 5,
      max: 150,
      step: 1,
      suffix: "$/hr",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,380px)]">
      {/* Inputs */}
      <div
        className="relative overflow-hidden rounded-[18px] border border-white/12 p-6 md:p-8"
        style={{ background: GLOSS }}
      >
        <GridDots />
        <div className="relative z-[1] flex flex-col gap-7">
          {fields.map((f) => (
            <div key={f.label} className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm text-white/70">{f.label}</label>
                <span className="rounded-md border border-white/12 bg-black/40 px-2.5 py-1 text-sm font-semibold text-white whitespace-nowrap">
                  {f.value} {f.suffix}
                </span>
              </div>
              <input
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={f.value}
                onChange={(e) => f.set(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#4b78ff]"
                aria-label={f.label}
              />
            </div>
          ))}
          <p className="text-[12px] leading-relaxed text-white/45">
            Estimate only. Assumes automation removes ~
            {Math.round(automationRate * 100)}% of this manual work. We confirm
            the real numbers in your free audit.
          </p>
        </div>
      </div>

      {/* Result */}
      <div
        className="relative flex flex-col justify-center gap-5 overflow-hidden rounded-[18px] border border-[#4b78ff]/40 p-6 md:p-8 text-center"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, rgba(72,118,255,0.32), rgba(0,0,0,0.88) 70%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, rgba(96,142,255,0.55), rgba(0,0,0,0) 75%)",
            filter: "blur(20px)",
          }}
        />
        <div className="relative z-[1]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/60">
            You could save
          </p>
          <p className="mt-3 text-[52px] font-semibold leading-none text-white max-md:text-[42px]">
            {usd(annual)}
          </p>
          <p className="mt-1.5 text-sm text-white/55">per year</p>
        </div>
        <div className="relative z-[1] flex items-center justify-center gap-8 border-t border-white/10 pt-5 text-sm">
          <div>
            <p className="font-semibold text-white">{usd(monthly)}</p>
            <p className="text-white/50">/ month</p>
          </div>
          <div>
            <p className="font-semibold text-white">
              {Math.round(weeklyHoursSaved)} hrs
            </p>
            <p className="text-white/50">/ week back</p>
          </div>
        </div>
        <a
          href="#contact-form"
          className="btn-gloss relative z-[1] mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-[#4b78ff]/70 bg-[linear-gradient(180deg,#2f5eff_0%,#254dcf_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[inset_0_0_8px_2px_rgba(255,255,255,0.18)]"
        >
          <span className="relative z-[2]">Lock in these savings</span>
          <ArrowRightIcon className="relative z-[2] size-[14px]" />
        </a>
      </div>
    </div>
  );
}

function CaseStudyContent({ study }: { study: AutomationCaseStudy }) {
  const others = automationCaseStudies.filter((c) => c.slug !== study.slug);

  return (
    <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-x-hidden pb-16 md:pb-24">
      {/* ===== HERO ===== */}
      <section className="flex w-full items-center justify-center px-3 pt-2 md:px-5">
        <div
          className="relative w-full max-w-[1400px] overflow-hidden rounded-[20px] border border-white/15 px-6 pb-[60px] pt-[110px] md:px-[70px] md:pb-[72px] md:pt-[124px]"
          style={{
            background:
              "radial-gradient(108% 100% at 100% 100.6%, var(--color-purple) 12.8%, rgb(8,16,40) 69.1%, #000 98.2%)",
          }}
        >
          {/* vignette */}
          <div
            aria-hidden
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 64.5%, rgba(0,0,0,0.85) 100%)",
            }}
          />
          {/* stars */}
          <div
            aria-hidden
            className="absolute inset-0 z-[1] pointer-events-none opacity-70 bg-repeat bg-[length:400px_auto]"
            style={{ backgroundImage: "url(/textures/stars.svg)" }}
          />
          {/* grid */}
          <div
            aria-hidden
            className="absolute inset-0 z-[3] pointer-events-none opacity-50 mix-blend-overlay bg-repeat bg-[length:67px_auto]"
            style={{ backgroundImage: "url(/textures/grid.svg)" }}
          />
          {/* ambient orb */}
          <div
            aria-hidden
            className="absolute right-[-160px] top-[-120px] z-[2] pointer-events-none size-[560px] rounded-full opacity-30 max-md:hidden"
            style={{
              background:
                "radial-gradient(closest-side, rgba(96,142,255,0.42), rgba(72,118,255,0.20) 45%, rgba(0,0,0,0) 75%)",
              filter: "blur(20px)",
            }}
          />

          <div className="relative z-[5] grid grid-cols-[minmax(0,1fr)_400px] items-center gap-12 max-xl:grid-cols-1 max-xl:gap-10">
            {/* Left: copy */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to="/#services"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[12px] text-white/65 transition-colors hover:text-white"
                >
                  ← All automations
                </Link>
                <span className="inline-flex items-center rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-purple">
                  {study.category}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <h1 className="text-[44px] font-medium leading-[0.98em] -tracking-[0.05em] text-white md:text-[68px]">
                  {study.title}
                </h1>
                <p className="text-[24px] font-medium leading-[1.1] -tracking-[0.02em] text-gradient md:text-[32px]">
                  {study.hook}
                </p>
                <p className="max-w-[620px] text-lg leading-[1.5] text-white/70 max-md:text-base">
                  {study.heroSub}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#contact-form"
                  className="btn-gloss relative inline-flex items-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-[15px] text-sm font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]"
                >
                  <span className="relative z-[2]">Get my free automation audit</span>
                  <ArrowRightIcon className="relative z-[2] size-[14px]" />
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-black/40 px-5 py-[15px] text-sm font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white"
                >
                  <WhatsAppIcon className="size-4 fill-white" />
                  WhatsApp us
                </a>
              </div>
            </div>

            {/* Right: results card */}
            <HeroResultsCard study={study} />
          </div>
        </div>
      </section>

      {/* ===== PAIN ===== */}
      <Section
        watermark="THE COST"
        eyebrow="Why it matters"
        title="The cost of doing it by hand"
        intro="Every hour your team spends on this manually is money quietly walking out the door."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {study.painPoints.map((p) => (
            <div
              key={p}
              className="relative flex items-start gap-4 overflow-hidden rounded-[16px] border border-white/10 p-5 md:p-6"
              style={{ background: GLOSS }}
            >
              <GridDots />
              <span className="relative z-[1] flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-red-400/30 bg-red-500/10 text-red-300">
                ✕
              </span>
              <p className="relative z-[1] text-[15px] leading-relaxed text-white/75">
                {p}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== HOW IT WORKS ===== */}
      <Section
        watermark="HOW IT WORKS"
        eyebrow="The build"
        title="How we automate it"
        intro="A clear four-step build — done around the tools you already use, with you in the loop and nothing for your team to lift."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {study.howItWorks.map((step, i) => (
            <div
              key={step.title}
              className="relative flex flex-col gap-3 overflow-hidden rounded-[16px] border border-white/12 p-6"
              style={{ background: DEEP_GLOSS }}
            >
              <GridDots />
              <div className="relative z-[1] flex items-center justify-between">
                <span className="text-[36px] font-semibold leading-none text-gradient">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < study.howItWorks.length - 1 ? (
                  <span className="text-xl text-purple/50 max-md:hidden">→</span>
                ) : (
                  <CheckIcon className="size-5 text-[#5dcaa5] max-md:hidden" />
                )}
              </div>
              <h3 className="relative z-[1] text-lg font-medium text-white">
                {step.title}
              </h3>
              <p className="relative z-[1] text-[14px] leading-[1.55] text-white/65">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-white/45">Works with:</span>
          {study.tools.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[12px] font-medium text-white/65"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* ===== BEFORE / AFTER ===== */}
      <Section watermark="BEFORE" title="Before & after" eyebrow="The shift">
        <div className="grid items-stretch gap-5 md:grid-cols-[1fr_auto_1fr]">
          <div
            className="relative overflow-hidden rounded-[18px] border border-white/10 p-6 md:p-7"
            style={{ background: GLOSS }}
          >
            <GridDots />
            <p className="relative z-[1] text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
              Today, by hand
            </p>
            <ul className="relative z-[1] mt-4 flex flex-col gap-3.5">
              {study.before.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-[15px] text-white/65"
                >
                  <span className="mt-0.5 text-red-400/70" aria-hidden>
                    ✕
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center max-md:hidden">
            <span className="flex size-11 items-center justify-center rounded-full border border-[#4b78ff]/40 bg-[#4b78ff]/15 text-lg text-[#cdd9ff]">
              →
            </span>
          </div>

          <div
            className="relative overflow-hidden rounded-[18px] border border-[#1D9E75]/35 p-6 md:p-7"
            style={{
              background:
                "linear-gradient(180deg, rgba(29,158,117,0.12) 0%, rgba(0,0,0,0.55) 100%)",
            }}
          >
            <GridDots />
            <p className="relative z-[1] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5dcaa5]">
              With Boostmysites automation
            </p>
            <ul className="relative z-[1] mt-4 flex flex-col gap-3.5">
              {study.after.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-2.5 text-[15px] text-white/85"
                >
                  <CheckIcon className="mt-1 size-[14px] shrink-0 text-[#5dcaa5]" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ===== SAVINGS ===== */}
      <Section
        watermark="SAVINGS"
        eyebrow="The payoff"
        title="How much you could save"
        intro="Drag the sliders to match your team. This is the money currently lost to manual work — most clients see ROI in under 90 days."
      >
        <SavingsCalculator study={study} />
      </Section>

      {/* ===== FAQ ===== */}
      {study.faqs.length > 0 ? (
        <Section watermark="FAQ" title="Questions" eyebrow="Good to know">
          <div className="flex flex-col gap-4">
            {study.faqs.map((f) => (
              <div
                key={f.q}
                className="relative overflow-hidden rounded-[16px] border border-white/10 p-6"
                style={{ background: GLOSS }}
              >
                <GridDots />
                <h3 className="relative z-[1] text-lg font-medium text-white">
                  {f.q}
                </h3>
                <p className="relative z-[1] mt-2 text-[15px] leading-relaxed text-white/65">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ===== Lead form CTA ===== */}
      <div className="w-full">
        <CTA />
      </div>

      {/* ===== Explore others ===== */}
      <Section title="Explore other automations">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((c) => (
            <Link
              key={c.slug}
              to={caseStudyPath(c.slug)}
              className="group relative flex flex-col gap-2 overflow-hidden rounded-[16px] border border-white/12 p-6 transition-colors hover:border-white/25"
              style={{ background: GLOSS }}
            >
              <GridDots />
              <span className="relative z-[1] text-[11px] uppercase tracking-[0.08em] text-purple">
                {c.category}
              </span>
              <span className="relative z-[1] text-base font-medium text-white">
                {c.title}
              </span>
              <span className="relative z-[1] text-[13px] text-white/55">
                {c.hook}
              </span>
              <span className="relative z-[1] mt-2 inline-flex items-center gap-1 text-sm text-white/55 transition-colors group-hover:text-white">
                See how it works <ArrowRightIcon className="size-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  );
}

export default function AutomationCaseStudy() {
  useHashScroll();
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;

  return (
    <>
      <SiteBackground />
      <Nav />
      {study ? (
        <CaseStudyContent study={study} />
      ) : (
        <main className="relative z-10 mx-auto flex min-h-[60vh] w-full max-w-[800px] flex-col items-center justify-center gap-5 px-6 text-center">
          <h1 className="text-[36px] font-medium text-white">
            Automation not found
          </h1>
          <p className="text-white/60">
            That case study doesn&apos;t exist. Browse all the ways we can
            automate your business.
          </p>
          <Link
            to="/#services"
            className="btn-gloss relative inline-flex items-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-[14px] text-sm font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-[2]">View all automations</span>
            <ArrowRightIcon className="relative z-[2] size-[14px]" />
          </Link>
        </main>
      )}
      <Suspense fallback={<div className="h-40" aria-hidden="true" />}>
        <Footer />
      </Suspense>
    </>
  );
}
