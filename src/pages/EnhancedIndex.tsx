import Header from '@/components/Header';
import { CheckCircle } from 'lucide-react';
import EnhancedHero from '@/components/enhanced/EnhancedHero';
import EnhancedProblemSolution from '@/components/enhanced/EnhancedProblemSolution';
import EnhancedServices from '@/components/enhanced/EnhancedServices';
import StatsGrid from '@/components/StatsGrid';
import PortfolioSection from '@/components/PortfolioSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import Footer from '@/components/Footer';
import SimpleContactForm from '@/components/forms/SimpleContactForm';
import ConversionStickyButton from '@/components/ConversionStickyButton';
import MediaCoverage from '@/components/MediaCoverage';
import { SectionTransition } from '@/components/ui/SectionTransition';
import { ScrollProgress } from '@/components/ui/ScrollProgress';


const EnhancedIndex = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <ScrollProgress />
      <Header />
      <main className="w-full">
        <div id="hero">
          <EnhancedHero />
        </div>
        
        <SectionTransition 
          fromGradient="from-black to-gray-900" 
          toGradient="from-gray-900 to-black"
          type="fade"
        >
          <section id="contact-form" className="py-20 bg-gradient-to-r from-black via-gray-900 to-black relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-full text-red-300 text-sm font-medium mb-4">
                  Limited Slots Available This Month
                </div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Get Your Free Consultation in 24 Hours!
                </h2>
                <p className="text-xl text-gray-300 mb-4">
                  Ready to transform your business with custom software solutions? Tell us about your project and get a detailed proposal within 24 hours.
                </p>
                <div className="flex justify-center items-center space-x-8 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>No Hidden Costs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Free Consultation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
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
        </SectionTransition>
          
        <SectionTransition 
          fromGradient="from-gray-900 to-black" 
          toGradient="from-black to-gray-800"
          type="slide"
        >
          <EnhancedProblemSolution />
        </SectionTransition>
        
        <EnhancedServices />
       
        <SectionTransition 
          fromGradient="from-gray-800 to-black" 
          toGradient="from-black to-gray-900"
          type="scale"
        >
          {/* App Ideas Lab Section */}
          <section className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
            <div className="absolute inset-0">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="container mx-auto max-w-5xl relative z-10">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  Innovation Showcase
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Explore Our App Ideas Lab
                </h2>
                
                <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                  Step into our innovation showcase where we're prototyping the future. Discover cutting-edge AI solutions and groundbreaking app concepts before they become industry standards. From marketplace platforms to AI-powered tools — see what's next in tech innovation.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Live Prototypes</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Partnership Opportunities</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Exclusive Access</span>
                  </div>
                </div>
                
                <a 
                  href="/app-ideas-lab"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <span>Visit Our Innovation Lab</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </SectionTransition>
        
        <SectionTransition 
          fromGradient="from-black to-gray-900" 
          toGradient="from-gray-900 to-black"
          type="fade"
        >
          <MediaCoverage />
        </SectionTransition>
        
        <SectionTransition 
          fromGradient="from-gray-900 to-black" 
          toGradient="from-black to-gray-900"
          type="slide"
        >
          <StatsGrid />
        </SectionTransition>
        
        <SectionTransition 
          fromGradient="from-black to-gray-900" 
          toGradient="from-gray-900 to-black"
          type="scale"
        >
          <PortfolioSection />
        </SectionTransition>
        
        <SectionTransition 
          fromGradient="from-gray-900 to-black" 
          toGradient="from-black to-gray-800"
          type="fade"
        >
          <WhyChooseUs />
        </SectionTransition>
        
        <SectionTransition 
          fromGradient="from-black to-gray-800" 
          toGradient="from-gray-800 to-black"
          type="slide"
        >
          <TestimonialsCarousel />
        </SectionTransition>
        
        <SectionTransition 
          fromGradient="from-gray-800 to-black" 
          toGradient="from-black to-gray-900"
          type="fade"
        >
          <section id="final-contact-form" className="py-20 bg-gradient-to-r from-black via-gray-900 to-black relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5"></div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-gray-300">
                  Let's discuss your project and create the perfect tech solution for your business. From web apps to AI automation - we've got you covered.
                </p>
              </div>
              <SimpleContactForm sourcePage="home-final" className="max-w-2xl mx-auto" />
            </div>
          </section>
        </SectionTransition>
      </main>
      <Footer />
      <ConversionStickyButton />
    </div>
  );
};

export default EnhancedIndex;