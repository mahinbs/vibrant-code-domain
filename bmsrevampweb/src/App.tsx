import { CTA } from "./components/CTA";
import { FounderForbesSection } from "./components/FounderForbesSection";
import { Footer } from "./components/Footer";
import { FintechHealthcareSection } from "./components/FintechHealthcareSection";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { SiteBackground } from "./components/SiteBackground";
import { Portfolio } from "./components/Portfolio";
import { ProblemSolution } from "./components/ProblemSolution";
import { Process } from "./components/Process";
import { Services } from "./components/Services";
import { Stats } from "./components/Stats";
import { Testimonial } from "./components/Testimonial";
import { Routes, Route } from "react-router-dom";
import FintechPortfolioLanding from "./pages/FintechPortfolioLanding";
import HealthcarePortfolioLanding from "./pages/HealthcarePortfolioLanding";

function HomePage() {
  return (
    <>
      <SiteBackground />
      <Nav />
      <main className="relative z-10 w-full max-w-[min(1920px,96vw)] mx-auto flex flex-col items-center pb-[80px]">
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
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/fintech-portfolio" element={<FintechPortfolioLanding />} />
      <Route path="/healthcare-portfolio" element={<HealthcarePortfolioLanding />} />
      <Route path="/fintech-landing" element={<FintechPortfolioLanding />} />
      <Route path="/healthcare-landing" element={<HealthcarePortfolioLanding />} />
    </Routes>
  );
}
