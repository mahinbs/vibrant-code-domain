import { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SiteBackground } from "../components/SiteBackground";
import { Nav } from "../components/Nav";
import { BusinessAutomationHero } from "../components/BusinessAutomationHero";
import { FloatingWhatsAppButton } from "../components/FloatingWhatsAppButton";
import {
  CaseStudyVideoHeader,
  ShortCaseStudyCard,
  YouTubeVideoCard,
} from "../components/YouTubeVideoCard";
import { ScoreCtaBand } from "../components/automationScore/ScoreCtaBand";
import { TrustMetricsRow } from "../components/TrustMetricsRow";
import { ArrowRightIcon, WhatsAppIcon } from "../components/icons";
import {
  CASE_STUDY_PAGE_STATS,
  EVENT_HIGHLIGHT_STATS,
  videosBySection,
} from "../data/automationCaseStudyVideos";
import { businessAutomationWhatsappHref } from "../data/businessAutomationContent";

const CTA = lazy(() => import("../components/CTA").then((m) => ({ default: m.CTA })));
const Footer = lazy(() => import("../components/Footer").then((m) => ({ default: m.Footer })));

const SOURCE_PAGE = "automation-case-studies" as const;
const SCORE_HREF = "/automation-score?start=1";

const NAV_LINKS = [
  { label: "Case studies", href: "#long-form" },
  { label: "Score", href: "#automation-score" },
  { label: "Event", href: "#event" },
  { label: "Shorts", href: "#shorts" },
  { label: "Book audit", href: "#contact-form" },
] as const;

const auditCta = {
  eyebrow: "Free AI Audit",
  title: "Seen enough? Let's map your automation.",
  subtitle:
    "Book a free 30-minute audit. We'll show you 3 workflows your team can automate this month.",
  leadFormProps: { sourcePage: SOURCE_PAGE },
  whatsappHref: businessAutomationWhatsappHref,
};

const CASE_STUDY_HERO = {
  badgeTag: "ON VIDEO",
  badgeLabel: "10 real client builds",
  headline: (
    <>
      Real automations.
      <br />
      <span className="impact-highlight">Real workflows.</span>
      <br />
      <span className="text-white/65">On camera.</span>
    </>
  ),
  subcopy: (
    <>
      Long-form walkthroughs, event highlights, and 60-second proof — see exactly what we build
      before you book the audit.
      <br />
      <span className="text-white/55">500+ workflows deployed across 200+ businesses.</span>
    </>
  ),
  primaryCta: { label: "Watch case studies ↓", href: "#long-form" },
  showTrustedTicker: false,
} as const;

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-purple">{children}</p>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex max-w-[720px] flex-col gap-3">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="text-[28px] font-medium -tracking-[0.03em] leading-[1.12] text-white md:text-[36px]">
        {title}
      </h2>
      <p className="text-[15px] leading-relaxed text-white/60 md:text-base">{description}</p>
    </div>
  );
}

export default function AutomationCaseStudies() {
  const longForm = videosBySection("long-form");
  const eventVideo = videosBySection("event")[0];
  const shorts = videosBySection("short");
  const [stickyBarVisible, setStickyBarVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setStickyBarVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Automation Case Studies | Boostmysites</title>
        <meta
          name="description"
          content="Watch real AI automation case studies — healthcare, manufacturing, dairy, sales, and more. Long-form walkthroughs, event highlights, and 60-second proof."
        />
      </Helmet>
      <SiteBackground />
      <Nav
        links={[...NAV_LINKS]}
        cta={{ label: "Get my score", href: SCORE_HREF }}
        whatsappHref={businessAutomationWhatsappHref}
      />
      {!stickyBarVisible ? (
        <FloatingWhatsAppButton href={businessAutomationWhatsappHref} />
      ) : null}
      <div
        className={[
          "fixed inset-x-0 bottom-0 z-[110] border-t border-white/15 bg-black/85 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur-[10px] transition-transform duration-300 md:hidden",
          stickyBarVisible ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <div className="flex items-center gap-2.5">
          <span className="btn-glow-ring flex min-w-0 flex-1">
            <Link
              to={SCORE_HREF}
              className="btn-gloss relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-4 py-3.5 text-[14px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-[2]">Get my automation score · 60 sec</span>
              <ArrowRightIcon className="relative z-[2] size-[13px] shrink-0 text-white" />
            </Link>
          </span>
          <a
            href={businessAutomationWhatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="flex size-[46px] shrink-0 items-center justify-center rounded-[10px] bg-[#25D366]"
          >
            <WhatsAppIcon className="size-6 fill-white" />
          </a>
        </div>
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-x-hidden px-5 pb-16 max-md:pb-28 md:px-10 md:pb-24">
        <BusinessAutomationHero
          whatsappHref={businessAutomationWhatsappHref}
          scoreCtaHref={SCORE_HREF}
          content={CASE_STUDY_HERO}
        />

        <section
          aria-label="Automation outcomes"
          className="w-full py-6 md:py-8"
        >
          <div className="w-full rounded-[16px] border border-white/10 bg-black/40 px-2 py-2 md:px-4">
            <TrustMetricsRow items={CASE_STUDY_PAGE_STATS} />
          </div>
        </section>

        {/* Long-form case studies */}
        <section
          id="long-form"
          className="w-full border-t border-white/[0.06] py-12 md:py-16"
        >
          <div className="flex w-full flex-col gap-10">
            <SectionHeader
              eyebrow="Deep dives · 16:9"
              title="Full walkthroughs"
              description="Each build shows the problem, the workflows we automated, and the outcome — with the full video walkthrough."
            />

            <div className="flex flex-col gap-10 md:gap-12">
              {longForm.map((video, index) => (
                <div
                  key={video.id}
                  className={[
                    "flex flex-col gap-6 rounded-[18px] border border-white/10 bg-white/[0.02] p-5 md:gap-8 md:p-8",
                    index % 2 === 1
                      ? "md:flex-row-reverse md:items-center"
                      : "md:flex-row md:items-center",
                  ].join(" ")}
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-5 md:max-w-[42%]">
                    <CaseStudyVideoHeader video={video} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <YouTubeVideoCard video={video} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div id="automation-score" className="w-full">
          <ScoreCtaBand
            href={SCORE_HREF}
            badge="Free automation score · 60 seconds"
            headline={
              <>
                Watched the builds.{" "}
                <span className="impact-highlight">What would yours look like?</span>
              </>
            }
            subheadline="Get your automation score — hours lost, monthly cost, and the top 3 workflows we'd automate first for your business."
            ctaLabel="Get my free automation score"
          />
        </div>

        {/* Event */}
        {eventVideo ? (
          <section id="event" className="w-full py-10 md:py-12">
            <div
              className="w-full overflow-hidden rounded-[20px] border border-white/12 p-5 md:p-8"
              style={{
                background:
                  "radial-gradient(90% 120% at 100% 0%, rgba(72,118,255,0.22) 0%, rgba(8,16,40,0.95) 55%, #000 100%)",
              }}
            >
              <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[minmax(0,200px)_1fr] sm:items-center sm:gap-8 lg:grid-cols-[minmax(0,220px)_1fr_auto] lg:gap-10">
                <div className="mx-auto w-full max-w-[200px] sm:mx-0">
                  <YouTubeVideoCard video={eventVideo} compact />
                </div>

                <div className="flex flex-col gap-3.5">
                  <SectionEyebrow>Community · Live event</SectionEyebrow>
                  <h2 className="text-[24px] font-medium -tracking-[0.03em] leading-[1.12] text-white md:text-[30px]">
                    {eventVideo.title}
                  </h2>
                  <p className="max-w-[520px] text-[14px] leading-relaxed text-white/65">
                    {eventVideo.description}
                  </p>
                  <ul className="flex flex-col gap-1.5 text-[13px] text-white/55">
                    <li>✓ Live demos from real client builds</li>
                    <li>✓ Founders sharing what&apos;s working now</li>
                    <li>✓ Q&amp;A with the Boostmysites team</li>
                  </ul>
                  <a
                    href={`https://www.youtube.com/watch?v=${eventVideo.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 text-sm font-medium text-purple transition-colors hover:text-white"
                  >
                    Watch on YouTube
                    <ArrowRightIcon className="size-4" />
                  </a>
                </div>

                <ul className="grid grid-cols-2 gap-3 sm:col-span-2 sm:max-w-[320px] lg:col-span-1 lg:max-w-none lg:grid-cols-1">
                  {EVENT_HIGHLIGHT_STATS.map((stat) => (
                    <li
                      key={stat.label}
                      className="flex flex-col gap-0.5 rounded-[10px] border border-white/10 bg-black/30 px-3 py-2.5"
                    >
                      <span className="text-[22px] font-medium leading-none text-white">
                        {stat.value}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
                        {stat.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        {/* Shorts */}
        <section
          id="shorts"
          className="w-full border-t border-white/[0.06] py-12 md:py-16"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 100%, rgba(72,118,255,0.08) 0%, transparent 70%)",
          }}
        >
          <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="60-second proof · 9:16"
                title="Quick hits"
                description="Same builds as the walkthroughs above — cut to the outcome in under a minute."
              />
              <a
                href="#contact-form"
                className="inline-flex shrink-0 items-center gap-2 rounded-[10px] border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-white/30 hover:bg-white/[0.07] hover:text-white"
              >
                Book your free audit
                <ArrowRightIcon className="size-4" />
              </a>
            </div>

            <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0">
              {shorts.map((video) => (
                <div
                  key={video.id}
                  className="w-[min(68vw,240px)] shrink-0 snap-center md:w-auto"
                >
                  <ShortCaseStudyCard video={video} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={null}>
          <CTA id="contact-form" {...auditCta} />
          <Footer whatsappHref={businessAutomationWhatsappHref} />
        </Suspense>
      </main>
    </>
  );
}
