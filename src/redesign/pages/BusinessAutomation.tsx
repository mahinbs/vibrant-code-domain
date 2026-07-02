import { lazy, Suspense, useEffect, useMemo, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { SiteBackground } from "../components/SiteBackground";
import { Nav } from "../components/Nav";
import { BusinessAutomationHero } from "../components/BusinessAutomationHero";
import { SectionDivider } from "../components/SectionDivider";
import { FloatingWhatsAppButton } from "../components/FloatingWhatsAppButton";
import { ScoreCtaBand } from "../components/automationScore/ScoreCtaBand";
import { ScoreTeaserPrompt } from "../components/automationScore/ScoreTeaserPrompt";
import { ArrowRightIcon, WhatsAppIcon } from "../components/icons";
import { useHashScroll } from "../lib/useHashScroll";
import {
  businessAutomationCta,
  businessAutomationNavLinks,
} from "../data/site";
import { FeaturedInTrustBand } from "../components/FeaturedInTrustBand";
import { FounderMediaStrip } from "../components/FounderMediaStrip";
import {
  businessAutomationPressItems,
  businessAutomationSteps,
  businessAutomationWhatsappHref,
  businessLandingStats,
  reshabAuditCallCopy,
} from "../data/businessAutomationContent";
import type { ProcessStep } from "../data/process";

const CostOfInaction = lazy(() =>
  import("../components/CostOfInaction").then((m) => ({ default: m.CostOfInaction })),
);
const IndustryPlaybook = lazy(() =>
  import("../components/IndustryPlaybook").then((m) => ({ default: m.IndustryPlaybook })),
);
const MockupBand = lazy(() =>
  import("../components/MockupBand").then((m) => ({ default: m.MockupBand })),
);
const AutomationScopeExplorer = lazy(() =>
  import("../components/AutomationScopeExplorer").then((m) => ({
    default: m.AutomationScopeExplorer,
  })),
);
const BookCallWithFounderBand = lazy(() =>
  import("../components/BookCallWithFounderBand").then((m) => ({
    default: m.BookCallWithFounderBand,
  })),
);
const ProcessMockupSplit = lazy(() =>
  import("../components/ProcessMockupSplit").then((m) => ({ default: m.ProcessMockupSplit })),
);
const CaseStudyVideos = lazy(() =>
  import("../components/CaseStudyVideos").then((m) => ({ default: m.CaseStudyVideos })),
);
const CTA = lazy(() => import("../components/CTA").then((m) => ({ default: m.CTA })));
const Footer = lazy(() => import("../components/Footer").then((m) => ({ default: m.Footer })));

const landingProcessSteps: ProcessStep[] = businessAutomationSteps.map((s) => ({
  number: s.num,
  title: s.title,
  description: s.desc,
  illustrationSrc: s.illustrationSrc,
  illustrationAlt: s.illustrationAlt,
}));

const businessAutomationAuditCta = {
  eyebrow: "Free AI Audit",
  title: "What's holding your business back?",
  subtitle:
    "Book a free 30-minute AI Audit. We'll identify 3 things your team does manually that can be automated this month.",
  leadFormProps: { sourcePage: "business-automation" as const },
  whatsappHref: businessAutomationWhatsappHref,
};

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

/** Session flags shared with the score funnel's own storage. */
const SCORE_PROMPT_KEY = "bms-score-prompt-shown";
const SCORE_STATE_KEY = "bms-automation-score-v1";

function hasUnlockedReport(): boolean {
  try {
    const raw = window.sessionStorage.getItem(SCORE_STATE_KEY);
    if (!raw) return false;
    return (JSON.parse(raw) as { phase?: string }).phase === "report";
  } catch {
    return false;
  }
}

export default function BusinessAutomation({
  whatsappHref = businessAutomationWhatsappHref,
  sourcePage = "business-automation",
  showCaseStudies = false,
}: {
  /** Override the WhatsApp link (e.g. homepage copy uses the main number). */
  whatsappHref?: string;
  /** Lead sourcePage — routes to the right leads table (homepage vs /business-automation). */
  sourcePage?: string;
  /** YouTube case-study video band (homepage only). */
  showCaseStudies?: boolean;
} = {}) {
  useHashScroll();
  const location = useLocation();
  const [stickyBarVisible, setStickyBarVisible] = useState(false);
  const [teaserVisible, setTeaserVisible] = useState(false);

  const scoreHref = useMemo(() => {
    const params = new URLSearchParams(location.search);
    params.set("start", "1");
    return `/automation-score?${params.toString()}`;
  }, [location.search]);

  const markScorePromptSeen = () => {
    try {
      window.sessionStorage.setItem(SCORE_PROMPT_KEY, "1");
    } catch {
      /* storage unavailable */
    }
    setTeaserVisible(false);
  };

  // Sticky mobile CTA bar: appears once the hero has scrolled away.
  useEffect(() => {
    const onScroll = () => setStickyBarVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // One-shot re-capture: exit intent on desktop, 60% scroll depth on mobile.
  // Shows a small teaser prompt (not the full survey modal).
  useEffect(() => {
    let shown = false;
    try {
      shown = window.sessionStorage.getItem(SCORE_PROMPT_KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    if (shown || hasUnlockedReport()) return;

    let fired = false;
    const onMouseOut = (e: MouseEvent) => {
      if (!fired && e.relatedTarget === null && e.clientY <= 0) fire();
    };
    const onScroll = () => {
      const doc = document.documentElement;
      if (!fired && (window.scrollY + window.innerHeight) / doc.scrollHeight > 0.6) fire();
    };
    const cleanup = () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
    function fire() {
      fired = true;
      cleanup();
      try {
        window.sessionStorage.setItem(SCORE_PROMPT_KEY, "1");
      } catch {
        /* storage unavailable */
      }
      setTeaserVisible(true);
    }

    if (window.matchMedia("(max-width: 767px)").matches) {
      window.addEventListener("scroll", onScroll, { passive: true });
    } else {
      document.addEventListener("mouseout", onMouseOut);
    }
    return cleanup;
  }, []);

  return (
    <>
      <Helmet>
        <title>AI Automation for Businesses | Boostmysites</title>
        <meta
          name="description"
          content="Automate lead follow-ups, customer support, invoicing, and ops workflows. Free 30-minute AI audit. Live in 30 days."
        />
      </Helmet>
      <SiteBackground />
      <Nav
        links={businessAutomationNavLinks}
        cta={businessAutomationCta}
        whatsappHref={whatsappHref}
        ctaOutsideNav
      />
      {!stickyBarVisible ? <FloatingWhatsAppButton href={whatsappHref} /> : null}
      <ScoreTeaserPrompt
        visible={teaserVisible}
        href={scoreHref}
        onDismiss={() => setTeaserVisible(false)}
        onNavigate={markScorePromptSeen}
      />
      {/* Sticky mobile CTA bar (hero CTA scrolls away; the form is 8 screens down). */}
      <div
        className={[
          "fixed inset-x-0 bottom-0 z-[110] border-t border-white/15 bg-black/85 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur-[10px] transition-transform duration-300 md:hidden",
          stickyBarVisible ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <div className="flex items-center gap-2.5">
          <span className="btn-glow-ring flex min-w-0 flex-1">
            <Link
              to={scoreHref}
              onClick={markScorePromptSeen}
              className="btn-gloss relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-4 py-3.5 text-[14px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-[2]">Get my automation score · 60 sec</span>
              <ArrowRightIcon className="relative z-[2] size-[13px] shrink-0 text-white" />
            </Link>
          </span>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="flex size-[46px] shrink-0 items-center justify-center rounded-[10px] bg-[#25D366]"
          >
            <WhatsAppIcon className="size-6 fill-white" />
          </a>
        </div>
      </div>
      <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-x-hidden pb-16 max-md:pb-28 md:pb-24">
        <BusinessAutomationHero
          whatsappHref={whatsappHref}
          scoreCtaHref={scoreHref}
          onScoreCtaNavigate={markScorePromptSeen}
        />
        <FeaturedInTrustBand
          pressItems={[...businessAutomationPressItems]}
          metrics={businessLandingStats}
        />
        <Suspense fallback={<div className="h-[60vh] w-full" aria-hidden="true" />}>
          <SectionWithTopRule>
            <CostOfInaction />
          </SectionWithTopRule>
          <SectionWithTopRule showDivider={false}>
            <ScoreCtaBand href={scoreHref} onNavigate={markScorePromptSeen} />
          </SectionWithTopRule>
          <SectionWithTopRule>
            <ProcessMockupSplit
              steps={landingProcessSteps}
              title={
                <>
                  <span className="impact-highlight">Simple</span>. Fast.{" "}
                  <span className="impact-highlight">No fluff</span>.
                </>
              }
              subtitle="Book a free audit, get your automation blueprint, and go live in 30 days. We stay until it runs clean."
              watermark="PROCESS"
              mockup={{
                src: "/videos/mockup-2.mp4",
                poster: "/videos/mockup-2.jpg",
                eyebrow: "We build it",
                title: "Automations built around your stack",
                text: "We wire your existing tools together into workflows that run themselves. No rip-and-replace, no fragile scripts. You stay in the loop; you don't lift a finger.",
              }}
            />
          </SectionWithTopRule>
          <SectionWithTopRule>
            <BookCallWithFounderBand
              id="book-ceo-call"
              variant="thin"
              sourcePage={sourcePage}
              headline={reshabAuditCallCopy.headline}
              subheadline={reshabAuditCallCopy.subheadline}
              ctaLabel={reshabAuditCallCopy.ctaLabel}
            />
          </SectionWithTopRule>
          <FounderMediaStrip />
          <SectionWithTopRule>
            <AutomationScopeExplorer />
          </SectionWithTopRule>
          <SectionWithTopRule>
            <IndustryPlaybook />
          </SectionWithTopRule>
          <SectionWithTopRule>
            <MockupBand
              src="/videos/mockup-3.mp4"
              poster="/videos/mockup-3.jpg"
              eyebrow="The before"
              title={
                <>
                  <span className="impact-highlight">Stop</span> drowning in{" "}
                  <span className="impact-highlight">manual work</span>
                </>
              }
              text="Copy-pasting between apps, chasing follow-ups, re-keying data, buried in busywork. That's the hidden cost automation quietly takes off your team's plate."
              reverse
            />
          </SectionWithTopRule>
          {showCaseStudies ? (
            <SectionWithTopRule>
              <CaseStudyVideos />
            </SectionWithTopRule>
          ) : null}
          <SectionWithTopRule>
            <CTA
              id="contact-form"
              {...businessAutomationAuditCta}
              whatsappHref={whatsappHref}
              leadFormProps={{ sourcePage }}
            />
          </SectionWithTopRule>
          <SectionWithTopRule>
            <Footer whatsappHref={whatsappHref} />
          </SectionWithTopRule>
        </Suspense>
      </main>
    </>
  );
}
