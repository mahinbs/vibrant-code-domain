import { CTA } from "./components/CTA";
import { FintechHealthcareSection } from "./components/FintechHealthcareSection";
import { Footer } from "./components/Footer";
import { FounderForbesSection } from "./components/FounderForbesSection";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Portfolio } from "./components/Portfolio";
import { ProblemSolution } from "./components/ProblemSolution";
import { Process } from "./components/Process";
import { Services } from "./components/Services";
import { SiteBackground } from "./components/SiteBackground";
import { Stats } from "./components/Stats";
import { Testimonial } from "./components/Testimonial";
import { RedesignShell } from "./RedesignShell";

export function RedesignHomePage() {
  return (
    <RedesignShell>
      <SiteBackground />
      <Nav />
      <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-x-hidden pb-16 md:pb-24">
        <Hero />
        <Stats />
        <FintechHealthcareSection />
        <Services />
        <FounderForbesSection />
        <Process />
        <ProblemSolution />
        <Portfolio />
        <Testimonial />
        <CTA />
        <Footer />
      </main>
    </RedesignShell>
  );
}

export default RedesignHomePage;
