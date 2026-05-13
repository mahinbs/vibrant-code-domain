import { lazy, Suspense } from "react";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { SiteBackground } from "./components/SiteBackground";
import { RedesignShell } from "./RedesignShell";
import { useProgressiveRender } from "@/hooks/useProgressiveRender";
import DeferredSection from "@/components/ui/DeferredSection";

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

export function RedesignHomePage() {
  const { phase, sentinelRef } = useProgressiveRender();

  return (
    <RedesignShell>
      <SiteBackground />
      <Nav />
      <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-x-hidden pb-16 md:pb-24">
        <Hero />
        <div ref={sentinelRef} className="h-1 w-full" aria-hidden="true" />
        {phase >= 3 ? (
          <Suspense fallback={<div className="h-[60vh] w-full" aria-hidden="true" />}>
            <DeferredSection minHeight={240}>
              <Stats />
            </DeferredSection>
            <DeferredSection minHeight={620}>
              <FintechHealthcareSection />
            </DeferredSection>
            <DeferredSection minHeight={620}>
              <Services />
            </DeferredSection>
            <DeferredSection minHeight={560}>
              <FounderForbesSection />
            </DeferredSection>
            <DeferredSection minHeight={640}>
              <Process />
            </DeferredSection>
            <DeferredSection minHeight={620}>
              <ProblemSolution />
            </DeferredSection>
            <DeferredSection minHeight={620}>
              <Portfolio />
            </DeferredSection>
            <DeferredSection minHeight={500}>
              <Testimonial />
            </DeferredSection>
            <DeferredSection minHeight={420}>
              <CTA />
            </DeferredSection>
            <DeferredSection minHeight={240}>
              <Footer />
            </DeferredSection>
          </Suspense>
        ) : (
          <div className="h-[60vh] w-full" aria-hidden="true" />
        )}
      </main>
    </RedesignShell>
  );
}

export default RedesignHomePage;
