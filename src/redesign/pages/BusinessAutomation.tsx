import { lazy, Suspense, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { SiteBackground } from "../components/SiteBackground";
import { Nav } from "../components/Nav";
import { BusinessAutomationHero } from "../components/BusinessAutomationHero";
import { SectionDivider } from "../components/SectionDivider";
import { FloatingWhatsAppButton } from "../components/FloatingWhatsAppButton";
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
const AutomationExamples = lazy(() =>
  import("../components/AutomationExamples").then((m) => ({ default: m.AutomationExamples })),
);
const TeamSection = lazy(() =>
  import("../components/TeamSection").then((m) => ({ default: m.TeamSection })),
);
const CTA = lazy(() => import("../components/CTA").then((m) => ({ default: m.CTA })));
const Footer = lazy(() => import("../components/Footer").then((m) => ({ default: m.Footer })));

const landingProcessSteps: ProcessStep[] = businessAutomationSteps.map((s) => ({
  number: s.num,
  title: s.title,
  description: s.desc,
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

export default function BusinessAutomation({
  whatsappHref = businessAutomationWhatsappHref,
  sourcePage = "business-automation",
  showCaseStudies = false,
  showExamples = false,
  showTeam = false,
}: {
  /** Override the WhatsApp link (e.g. homepage copy uses the main number). */
  whatsappHref?: string;
  /** Lead sourcePage — routes to the right leads table (homepage vs /business-automation). */
  sourcePage?: string;
  /** YouTube case-study video band (homepage only). */
  showCaseStudies?: boolean;
  /** Ten concrete automation examples explorer (homepage only). */
  showExamples?: boolean;
  /** Leadership team section (homepage only). */
  showTeam?: boolean;
} = {}) {
  useHashScroll();
  const isHome = sourcePage === "homepage";

  return (
    <>
      <Helmet>
        <title>AI Automation for Businesses — Boostmysites</title>
        <meta
          name="description"
          content="Automate lead follow-ups, customer support, invoicing, and ops workflows. Free 30-minute AI audit — live in 30 days."
        />
      </Helmet>
      <SiteBackground />
      <Nav
        links={businessAutomationNavLinks}
        cta={businessAutomationCta}
        whatsappHref={whatsappHref}
        ctaOutsideNav
      />
      <FloatingWhatsAppButton href={whatsappHref} />
      <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-x-hidden pb-16 md:pb-24">
        <BusinessAutomationHero whatsappHref={whatsappHref} />
        <FeaturedInTrustBand
          pressItems={[...businessAutomationPressItems]}
          metrics={businessLandingStats}
        />
        <Suspense fallback={<div className="h-[60vh] w-full" aria-hidden="true" />}>
          <SectionWithTopRule>
            <BookCallWithFounderBand
              id="book-ceo-call"
              variant="thin"
              sourcePage={sourcePage}
              headline={reshabAuditCallCopy.headline}
              subheadline={reshabAuditCallCopy.subheadline}
              ctaLabel={reshabAuditCallCopy.ctaLabel}
              {...(isHome
                ? {
                    eyebrowLabel: "1:1 with the Founder & Chairman",
                    photoSrc: "/mahin-profile.jpg",
                    photoAlt: "Mahin B S — Founder & Chairman, Boostmysites",
                    badgeLabel: "Mahin B S · Founder & Chairman",
                  }
                : {})}
            />
          </SectionWithTopRule>
          <SectionWithTopRule showDivider={false}>
            <CostOfInaction />
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
              subtitle="Book a free audit, get your automation blueprint, and go live in 30 days — we stay until it runs clean."
              watermark="PROCESS"
              mockup={{
                src: "/videos/mockup-2.mp4",
                poster: "/videos/mockup-2.jpg",
                eyebrow: "We build it",
                title: "Automations built around your stack",
                text: "We wire your existing tools together into workflows that run themselves — no rip-and-replace, no fragile scripts. You stay in the loop; you don't lift a finger.",
              }}
            />
          </SectionWithTopRule>
          <FounderMediaStrip />
          <SectionWithTopRule>
            <AutomationScopeExplorer />
          </SectionWithTopRule>
          {showExamples ? (
            <SectionWithTopRule>
              <AutomationExamples />
            </SectionWithTopRule>
          ) : null}
          <SectionWithTopRule>
            <IndustryPlaybook />
          </SectionWithTopRule>
          {showTeam ? (
            <SectionWithTopRule>
              <TeamSection />
            </SectionWithTopRule>
          ) : null}
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
              quickForm={isHome}
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
