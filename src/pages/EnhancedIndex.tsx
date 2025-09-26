import React from 'react';
import Header from '@/components/Header';
import EnhancedHero from '@/components/enhanced/EnhancedHero';
import StatsGrid from '@/components/StatsGrid';
import EnhancedProblemSolution from '@/components/enhanced/EnhancedProblemSolution';
import EnhancedServices from '@/components/enhanced/EnhancedServices';
import PortfolioSection from '@/components/PortfolioSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import SimpleContactForm from '@/components/forms/SimpleContactForm';
import ConversionStickyButton from '@/components/ConversionStickyButton';
import MediaCoverage from '@/components/MediaCoverage';

// Enhanced journey components
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionTransition from '@/components/ui/SectionTransition';
import ScrollProgress from '@/components/ui/ScrollProgress';
import JourneyNavigation from '@/components/ui/JourneyNavigation';
import ParallaxContainer from '@/components/ui/ParallaxContainer';

const EnhancedIndex = () => {
  const navigationSections = [
    { id: 'hero', label: 'Home', section: 'hero' },
    { id: 'problem-solution', label: 'Solutions', section: 'problem-solution' },
    { id: 'services', label: 'Services', section: 'services' },
    { id: 'portfolio', label: 'Portfolio', section: 'portfolio' },
    { id: 'testimonials', label: 'Testimonials', section: 'testimonials' },
    { id: 'contact', label: 'Contact', section: 'contact-form' }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <ScrollProgress showPercentage={false} />
      
      {/* Journey Navigation */}
      <JourneyNavigation sections={navigationSections} />
      
      <Header />
      
      <main className="w-full">
        {/* Enhanced Hero Section */}
        <div id="hero">
          <EnhancedHero />
        </div>
        
        {/* First Contact Form Section with Enhanced Animation */}
        <SectionTransition
          id="contact-form"
          fromGradient="from-black via-gray-900 to-black"
          toGradient="from-gray-900 via-slate-800 to-black"
          transitionType="gradient"
          className="py-20 relative"
        >
          <ParallaxContainer
            layers={[
              {
                speed: 0.3,
                children: (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />
                )
              },
              {
                speed: 0.6,
                children: (
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/3 to-transparent" />
                )
              }
            ]}
            className="absolute inset-0"
          />
          
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-full text-red-300 text-sm font-medium mb-4">
                  ⚡ Limited Slots Available This Month
                </div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Get Your Free Consultation in 24 Hours!
                </h2>
                <p className="text-xl text-gray-300 mb-4">
                  Ready to transform your business with custom software solutions? Tell us about your project and get a detailed proposal within 24 hours.
                </p>
                <div className="flex justify-center items-center space-x-8 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>No Hidden Costs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>Free Consultation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>24hr Response</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="scale" delay={0.4}>
              <SimpleContactForm sourcePage="home" className="max-w-2xl mx-auto" />
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.6}>
              <div className="text-center mt-8">
                <p className="text-gray-400 mb-4">Prefer to talk directly?</p>
                <a 
                  href="#final-contact-form"
                  className="inline-flex items-center space-x-2 px-6 py-3 border border-cyan-400/30 rounded-xl font-semibold hover:bg-cyan-500/10 transition-all duration-300"
                >
                  <span>Schedule a Call Instead</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </SectionTransition>
        
        {/* Enhanced Problem + Solution Section */}
        <EnhancedProblemSolution />
        
        {/* Enhanced Services Section */}
        <EnhancedServices />
        
        {/* Media Coverage Section with Animation */}
        <SectionTransition
          fromGradient="from-slate-800 via-gray-900 to-black"
          toGradient="from-gray-900 via-black to-slate-800"
          transitionType="fade"
          className="relative"
        >
          <ScrollReveal direction="stagger" delay={0.3}>
            <MediaCoverage />
          </ScrollReveal>
        </SectionTransition>
        
        {/* Stats Grid with Enhanced Animation */}
        <SectionTransition
          fromGradient="from-gray-900 via-black to-slate-800"
          toGradient="from-black to-gray-900"
          transitionType="scale"
          className="relative"
        >
          <ScrollReveal direction="stagger" delay={0.2}>
            <StatsGrid />
          </ScrollReveal>
        </SectionTransition>
        
        {/* Portfolio Section with Animation */}
        <SectionTransition
          id="portfolio"
          fromGradient="from-black to-gray-900"
          toGradient="from-gray-900 via-slate-800 to-black"
          transitionType="gradient"
          className="relative"
        >
          <ScrollReveal direction="up" delay={0.2}>
            <PortfolioSection />
          </ScrollReveal>
        </SectionTransition>
        
        {/* Why Choose Us with Animation */}
        <SectionTransition
          fromGradient="from-gray-900 via-slate-800 to-black"
          toGradient="from-slate-800 via-black to-gray-900"
          transitionType="fade"
          className="relative"
        >
          <ScrollReveal direction="stagger" delay={0.3}>
            <WhyChooseUs />
          </ScrollReveal>
        </SectionTransition>
        
        {/* Testimonials Section with Animation */}
        <SectionTransition
          id="testimonials"
          fromGradient="from-slate-800 via-black to-gray-900"
          toGradient="from-black via-gray-900 to-black"
          transitionType="scale"
          className="relative"
        >
          <ScrollReveal direction="stagger" delay={0.2}>
            <TestimonialsSection />
          </ScrollReveal>
        </SectionTransition>
        
        {/* Final Contact Form Section with Enhanced Animation */}
        <SectionTransition
          id="final-contact-form"
          fromGradient="from-black via-gray-900 to-black"
          toGradient="from-purple-900/50 via-black to-cyan-900/50"
          transitionType="gradient"
          className="py-20 relative"
        >
          <ParallaxContainer
            layers={[
              {
                speed: 0.3,
                children: (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5" />
                )
              },
              {
                speed: 0.7,
                children: (
                  <div className="absolute inset-0">
                    {/* Floating elements */}
                    <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl animate-pulse" />
                    <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                )
              }
            ]}
            className="absolute inset-0"
          />
          
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-gray-300">
                  Let's discuss your project and create the perfect tech solution for your business. From web apps to AI automation - we've got you covered.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="scale" delay={0.4}>
              <SimpleContactForm sourcePage="home-final" className="max-w-2xl mx-auto" />
            </ScrollReveal>
          </div>
        </SectionTransition>
      </main>
      
      <Footer />
      <ConversionStickyButton />
    </div>
  );
};

export default EnhancedIndex;