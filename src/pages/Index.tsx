import { lazy, Suspense } from "react";
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SimpleContactForm from '@/components/forms/SimpleContactForm';
import ConversionStickyButton from '@/components/ConversionStickyButton';
import DeferredSection from "@/components/ui/DeferredSection";

const ProblemSolution = lazy(() => import("@/components/ProblemSolution"));
const Services = lazy(() => import("@/components/Services"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const Payoff = lazy(() => import("@/components/Payoff"));
const MediaCoverage = lazy(() => import("@/components/MediaCoverage"));
const StatsGrid = lazy(() => import("@/components/StatsGrid"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const TestimonialsCarousel = lazy(() => import("@/components/TestimonialsCarousel"));
const Investment = lazy(() => import("@/components/Investment"));
const FAQ = lazy(() => import("@/components/FAQ"));
const RiskReversal = lazy(() => import("@/components/RiskReversal"));
const FooterLazy = lazy(() => import("@/components/Footer"));


const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="w-full">
        <div id="hero">
          <Hero />
        </div>

        {/* First contact form — always mounted (avoids progressive phase swap scroll jank) */}
        <section id="contact-form" className="py-20 bg-gradient-to-r from-black via-gray-900 to-black relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-full text-red-300 text-sm font-medium mb-4">
                  ⚡ Limited Audit Slots Available This Month
                </div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Get Your Free Automation Audit
                </h2>
                <p className="text-xl text-gray-300 mb-4">
                  Tell us how your team spends its week. We'll map where time and money are leaking — and exactly what it would take to stop it. You keep the plan whether you hire us or not.
                </p>
                <div className="flex justify-center items-center space-x-8 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>No Contracts to Start</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>Plan Yours to Keep</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>24hr Response</span>
                  </div>
                </div>
              </div>
              <SimpleContactForm sourcePage="home" className="max-w-2xl mx-auto" />
              <div className="text-center mt-8">
                <p className="text-gray-400 mb-4">Prefer to talk directly?</p>
                <a
                  href="#final-contact-form"
                  className="inline-flex items-center space-x-2 px-6 py-3 border border-cyan-400/30 rounded-xl font-semibold hover:bg-cyan-500/10 transition-all duration-300"
                >
                  <span>Schedule a Call Instead</span>
                </a>
              </div>
            </div>
        </section>

        <Suspense fallback={<div className="h-40" aria-hidden="true" />}>
          <DeferredSection minHeight={420}>
            <StatsGrid />
          </DeferredSection>

          <DeferredSection minHeight={560}>
            <ProblemSolution />
          </DeferredSection>

          <DeferredSection minHeight={700}>
            <div id="services">
              <Services />
            </div>
          </DeferredSection>

          <DeferredSection minHeight={560}>
            <HowItWorks />
          </DeferredSection>

          <DeferredSection minHeight={520}>
            <Payoff />
          </DeferredSection>

          <DeferredSection minHeight={560}>
            <TestimonialsCarousel />
          </DeferredSection>

          <DeferredSection minHeight={420}>
            <MediaCoverage />
          </DeferredSection>

          <DeferredSection minHeight={720}>
            <PortfolioSection />
          </DeferredSection>

          <DeferredSection minHeight={560}>
            <WhyChooseUs />
          </DeferredSection>

          <DeferredSection minHeight={520}>
            <Investment />
          </DeferredSection>

          <DeferredSection minHeight={520}>
            <FAQ />
          </DeferredSection>

          <DeferredSection minHeight={360}>
            <RiskReversal />
          </DeferredSection>
        </Suspense>

        <DeferredSection minHeight={520}>
          {/* Final Contact Form Section */}
          <section id="final-contact-form" className="py-20 bg-gradient-to-r from-black via-gray-900 to-black relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5"></div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Your competitors are automating. Your hours aren't coming back on their own.
                </h2>
                <p className="text-xl text-gray-300">
                  Book your free automation audit today. In 30 minutes, we'll show you exactly where your business is leaking time and money — and what it would take to stop it. No cost. No commitment. Just a clear look at what's possible.
                </p>
              </div>
              <SimpleContactForm sourcePage="home-final" className="max-w-2xl mx-auto" />
            </div>
          </section>
        </DeferredSection>
      </main>
      <Suspense fallback={<div className="h-20" aria-hidden="true" />}>
        <DeferredSection minHeight={220}>
          <FooterLazy />
        </DeferredSection>
      </Suspense>
      <ConversionStickyButton />
    </div>
  );
};

export default Index;
