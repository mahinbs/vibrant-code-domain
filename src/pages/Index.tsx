
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import PortfolioSection from '@/components/PortfolioSection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import HomeCTASection from '@/components/HomeCTASection';
import SimpleContactForm from '@/components/forms/SimpleContactForm';

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="w-full">
        <div id="hero">
          <Hero />
        </div>
        
        {/* Enquiry Form Section */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-xl text-gray-300">
                Let's discuss your requirements and create something amazing together.
              </p>
            </div>
            <SimpleContactForm sourcePage="home" className="max-w-2xl mx-auto" />
          </div>
        </section>
        
        <div id="services">
          <Services />
        </div>
        <PortfolioSection />
        <HomeCTASection />
        <div id="about">
          <About />
        </div>
        <div id="contact">
          <Contact />
        </div>
        
        {/* Final CTA Section */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Let's Build Something Great</h2>
              <p className="text-xl text-gray-300">
                Ready to transform your ideas into reality? Get in touch with us today.
              </p>
            </div>
            <SimpleContactForm sourcePage="home-cta" className="max-w-2xl mx-auto" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
