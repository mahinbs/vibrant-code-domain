
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSolution from '@/components/ProblemSolution';
import Services from '@/components/Services';
import PortfolioSection from '@/components/PortfolioSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import SimpleContactForm from '@/components/forms/SimpleContactForm';

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="w-full">
        <div id="hero">
          <Hero />
        </div>
        
        {/* Problem + Solution Section */}
        <ProblemSolution />
        
        {/* First Contact Form Section */}
        <section id="contact-form" className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get Your Free Quote in 24 Hours!</h2>
              <p className="text-xl text-gray-300">
                Ready to transform your business? Fill out the form below and we'll get back to you within 24 hours with a custom quote.
              </p>
            </div>
            <SimpleContactForm sourcePage="home" className="max-w-2xl mx-auto" />
            <div className="text-center mt-8">
              <p className="text-gray-400 mb-4">Or</p>
              <a 
                href="#final-contact-form"
                className="inline-flex items-center space-x-2 px-6 py-3 border border-cyan-400/30 rounded-xl font-semibold hover:bg-cyan-500/10 transition-all duration-300"
              >
                <span>Schedule a Call</span>
              </a>
            </div>
          </div>
        </section>
        
        <div id="services">
          <Services />
        </div>
        <PortfolioSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <FAQSection />
        
        {/* Final Contact Form Section */}
        <section id="final-contact-form" className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dream Website?</h2>
              <p className="text-xl text-gray-300">
                Contact us today and let's start your project! We're ready to transform your digital presence.
              </p>
            </div>
            <SimpleContactForm sourcePage="home-final" className="max-w-2xl mx-auto" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
