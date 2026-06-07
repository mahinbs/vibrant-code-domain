import { lazy, Suspense, type ReactNode } from "react";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { SiteBackground } from "./components/SiteBackground";
import { RedesignShell } from "./RedesignShell";
import DeferredSection from "@/components/ui/DeferredSection";
import { SectionDivider } from "./components/SectionDivider";
import { useHashScroll } from "./lib/useHashScroll";

const Stats = lazy(() => import("./components/Stats").then((m) => ({ default: m.Stats })));
const FintechHealthcareSection = lazy(() =>
  import("./components/FintechHealthcareSection").then((m) => ({ default: m.FintechHealthcareSection }))
);
const Services = lazy(() => import("./components/Services").then((m) => ({ default: m.Services })));
const MockupBand = lazy(() =>
  import("./components/MockupBand").then((m) => ({ default: m.MockupBand }))
);
const FounderForbesSection = lazy(() =>
  import("./components/FounderForbesSection").then((m) => ({ default: m.FounderForbesSection }))
);
const Process = lazy(() => import("./components/Process").then((m) => ({ default: m.Process })));
const ProblemSolution = lazy(() =>
  import("./components/ProblemSolution").then((m) => ({ default: m.ProblemSolution }))
);
const Portfolio = lazy(() => import("./components/Portfolio").then((m) => ({ default: m.Portfolio })));
const Testimonial = lazy(() => import("./components/Testimonial").then((m) => ({ default: m.Testimonial })));
const CTA = lazy(() => import("./components/CTA").then((m) => ({ default: m.CTA })));
const Footer = lazy(() => import("./components/Footer").then((m) => ({ default: m.Footer })));

/** Faint rule at the **top** of each below-the-fold block (divider sits above lazy content). */
function SectionWithTopRule({ minHeight, children }: { minHeight: number; children: ReactNode }) {
  return (
    <div className="flex w-full max-w-[1920px] flex-col">
      <SectionDivider />
      <DeferredSection minHeight={minHeight}>{children}</DeferredSection>
    </div>
  );
}

/**
 * Below-the-fold sections mount when near the viewport (lazy chunks still split JS work).
 * Each block is prefixed with the same faint line used on industry landings.
 */
export function RedesignHomePage() {
  useHashScroll();
  return (
    <RedesignShell>
      <SiteBackground />
      <Nav />
      <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-x-hidden pb-16 md:pb-24">
        <Hero />
        <Suspense fallback={<div className="h-[60vh] w-full" aria-hidden="true" />}>
          <SectionWithTopRule minHeight={240}>
            <Stats />
          </SectionWithTopRule>
          <SectionWithTopRule minHeight={620}>
            <FintechHealthcareSection />
          </SectionWithTopRule>
          <SectionWithTopRule minHeight={620}>
            <Services />
          </SectionWithTopRule>
          <SectionWithTopRule minHeight={520}>
            <MockupBand
              id="how-built"
              src="/videos/mockup-2.mp4"
              poster="/videos/mockup-2.jpg"
              eyebrow="We build it"
              title="Automations built around your stack"
              text="We wire your existing tools together into workflows that run themselves — no rip-and-replace, no fragile scripts. You stay in the loop; you don't lift a finger."
            />
          </SectionWithTopRule>
          <SectionWithTopRule minHeight={560}>
            <FounderForbesSection />
          </SectionWithTopRule>
          <SectionWithTopRule minHeight={640}>
            <Process />
          </SectionWithTopRule>
          <SectionWithTopRule minHeight={520}>
            <MockupBand
              src="/videos/mockup-3.mp4"
              poster="/videos/mockup-3.jpg"
              eyebrow="The before"
              title="Stop drowning in manual work"
              text="Copy-pasting between apps, chasing follow-ups, re-keying data, buried in busywork. That's the hidden cost automation quietly takes off your team's plate."
              reverse
            />
          </SectionWithTopRule>
          <SectionWithTopRule minHeight={620}>
            <ProblemSolution />
          </SectionWithTopRule>
          <SectionWithTopRule minHeight={620}>
            <Portfolio />
          </SectionWithTopRule>
          <SectionWithTopRule minHeight={500}>
            <Testimonial />
          </SectionWithTopRule>
          <SectionWithTopRule minHeight={520}>
            <MockupBand
              src="/videos/mockup-1.mp4"
              poster="/videos/mockup-1.jpg"
              eyebrow="Always on"
              title="Your systems, running 24/7"
              text="Once it's live, it just runs — quietly, accurately, around the clock — while we monitor and improve it as you grow. You get the time back."
            />
          </SectionWithTopRule>
          <SectionWithTopRule minHeight={420}>
            <CTA />
          </SectionWithTopRule>
          <SectionWithTopRule minHeight={240}>
            <Footer />
          </SectionWithTopRule>
        </Suspense>
      </main>
    </RedesignShell>
  );
}

export default RedesignHomePage;
