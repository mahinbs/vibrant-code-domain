import Header from '@/components/Header';
import { CheckCircle } from 'lucide-react';
import EnhancedHero from '@/components/enhanced/EnhancedHero';
import EnhancedProblemSolution from '@/components/enhanced/EnhancedProblemSolution';
import EnhancedServices from '@/components/enhanced/EnhancedServices';
import StatsGrid from '@/components/StatsGrid';
import PortfolioSection from '@/components/PortfolioSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
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
          type="fade"
        >
          <MediaCoverage />
        </SectionTransition>
        
        <SectionTransition 
          fromGradient="from-black to-gray-900" 
          toGradient="from-gray-900 to-black"
          type="slide"
        >
          <StatsGrid />
        </SectionTransition>
        
        <SectionTransition 
          fromGradient="from-gray-900 to-black" 
          toGradient="from-black to-gray-800"
          type="scale"
        >
          <PortfolioSection />
        </SectionTransition>
        
        <SectionTransition 
          fromGradient="from-black to-gray-800" 
          toGradient="from-gray-800 to-black"
          type="fade"
        >
          <WhyChooseUs />
        </SectionTransition>
        
        <SectionTransition 
          fromGradient="from-gray-800 to-black" 
          toGradient="from-black to-gray-900"
          type="slide"
        >
          <TestimonialsSection />
        </SectionTransition>
        
        <SectionTransition 
          fromGradient="from-black to-gray-900" 
          toGradient="from-gray-900 to-black"
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