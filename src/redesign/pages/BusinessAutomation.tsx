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

export default function BusinessAutomation() {
  useHashScroll();

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
        whatsappHref={businessAutomationWhatsappHref}
        ctaOutsideNav
      />
      <FloatingWhatsAppButton href={businessAutomationWhatsappHref} />
      <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-x-hidden pb-16 md:pb-24">
        <BusinessAutomationHero whatsappHref={businessAutomationWhatsappHref} />
        <FeaturedInTrustBand
          pressItems={[...businessAutomationPressItems]}
          metrics={businessLandingStats}
        />
        <Suspense fallback={<div className="h-[60vh] w-full" aria-hidden="true" />}>
          <SectionWithTopRule>
            <BookCallWithFounderBand
              id="book-ceo-call"
              variant="thin"
              sourcePage="business-automation"
              headline={reshabAuditCallCopy.headline}
              subheadline={reshabAuditCallCopy.subheadline}
              ctaLabel={reshabAuditCallCopy.ctaLabel}
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
          <SectionWithTopRule>
            <CTA id="contact-form" {...businessAutomationAuditCta} />
          </SectionWithTopRule>
          <SectionWithTopRule>
            <Footer whatsappHref={businessAutomationWhatsappHref} />
          </SectionWithTopRule>
        </Suspense>
      </main>
    </>
  );
}
