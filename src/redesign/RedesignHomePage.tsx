import { lazy, Suspense, type ReactNode } from "react";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { SiteBackground } from "./components/SiteBackground";
import { RedesignShell } from "./RedesignShell";
import DeferredSection from "@/components/ui/DeferredSection";
import { SectionDivider } from "./components/SectionDivider";

const Stats = lazy(() => import("./components/Stats").then((m) => ({ default: m.Stats })));
const FintechHealthcareSection = lazy(() =>
  import("./components/FintechHealthcareSection").then((m) => ({ default: m.FintechHealthcareSection }))
);
const Services = lazy(() => import("./components/Services").then((m) => ({ default: m.Services })));
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
          <SectionWithTopRule minHeight={560}>
            <FounderForbesSection />
          </SectionWithTopRule>
          <SectionWithTopRule minHeight={640}>
            <Process />
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
