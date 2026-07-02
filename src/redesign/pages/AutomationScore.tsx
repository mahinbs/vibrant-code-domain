import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { SiteBackground } from "../components/SiteBackground";
import { Nav } from "../components/Nav";
import {
  AutomationScoreLanding,
  type ScoreLandingHeadline,
} from "../components/automationScore/AutomationScoreLanding";
import { SurveyFlow } from "../components/automationScore/SurveyFlow";
import { INDUSTRY_PROFILES } from "../data/automationScore/industryProfiles";
import { businessAutomationWhatsappHref } from "../data/businessAutomationContent";

const SOURCE_PAGE = "automation-score";

/** Headline variants keyed by utm_campaign so each ad can land on matching copy. */
const HEADLINES: Record<string, ScoreLandingHeadline> = {
  default: {
    title: "How many hours is",
    highlight: "manual work",
    titleAfter: "costing you this week?",
    sub: "Most founders don't have an exact number. This gives you one in 60 seconds, plus what it's costing you monthly.",
  },
  "cost-of-manual": {
    title: "Manual work has a price. Find out",
    highlight: "yours.",
    sub: "4 questions. 60 seconds. A personalized breakdown of what manual processes cost your business every month.",
  },
  "competitor-automation": {
    title: "Your competitors are automating. See how far",
    highlight: "behind you are.",
    sub: "Get your automation score in 60 seconds, benchmarked against what businesses like yours are already automating.",
  },
};

export default function AutomationScore() {
  const [searchParams] = useSearchParams();

  const utmIndustry = useMemo(() => {
    const raw = searchParams.get("industry")?.toLowerCase() ?? "";
    return INDUSTRY_PROFILES.some((p) => p.id === raw) ? raw : undefined;
  }, [searchParams]);

  const headline = useMemo(() => {
    const campaign = searchParams.get("utm_campaign") ?? "";
    return HEADLINES[campaign] ?? HEADLINES.default;
  }, [searchParams]);

  // Resume straight into the survey if this session already started it, or when linked with ?start=1.
  const [started, setStarted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      if (searchParams.get("start") === "1") return true;
      return window.sessionStorage.getItem("bms-automation-score-v1") !== null;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (started) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [started]);

  const landingShell = !started ? "flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden" : "";

  return (
    <>
      <Helmet>
        <title>Free Automation Score | Boostmysites</title>
        <meta
          name="description"
          content="Get your automation score in 60 seconds. A personalized report on the hours and money your business loses to manual work, and what to automate first."
        />
      </Helmet>
      <div className={landingShell}>
      <SiteBackground />
      <Nav
        links={[]}
        cta={{ label: "Get my score", href: "#score" }}
        whatsappHref={businessAutomationWhatsappHref}
        onCtaClick={!started ? () => setStarted(true) : undefined}
      />
      <main
        className={
          started
            ? "relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center px-4 pb-20 pt-4"
            : "relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden"
        }
      >
        <section
          id="score"
          className={
            started
              ? "relative flex w-full max-w-[1400px] flex-col items-center overflow-hidden rounded-[20px] border border-white/15 px-4 py-6 md:px-10 md:py-10"
              : "relative flex h-full min-h-0 flex-1 flex-col overflow-hidden"
          }
          style={{
            background: started
              ? "radial-gradient(108% 100% at 100% 100.6%, var(--color-purple) 12.8%, rgb(8,16,40) 69.1%, #000 98.2%)"
              : "radial-gradient(108% 100% at 100% 100.6%, var(--color-purple) 12.8%, rgb(8,16,40) 69.1%, #000 98.2%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-left-top bg-repeat opacity-60 bg-[length:400px_auto]"
            style={{ backgroundImage: "url(/textures/stars.svg)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 64.5%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          <div
            className={`relative z-[5] flex w-full flex-col items-center ${
              started ? "" : "h-full min-h-0 flex-1"
            }`}
          >
            {!started ? (
              <AutomationScoreLanding headline={headline} onStart={() => setStarted(true)} />
            ) : (
              <div className="flex w-full max-w-[1400px] flex-col items-center py-4 md:py-8">
                <SurveyFlow sourcePage={SOURCE_PAGE} initialIndustryId={utmIndustry} />
              </div>
            )}
          </div>
        </section>
      </main>
      </div>
    </>
  );
}
