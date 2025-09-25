
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ClientLogos from '@/components/ClientLogos';
import Services from '@/components/Services';
import PortfolioSection from '@/components/PortfolioSection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import EnterpriseContactForm from '@/components/forms/EnterpriseContactForm';

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="w-full">
        <div id="hero">
          <Hero />
        </div>
        
        {/* Client Logos */}
        <ClientLogos />
        
        {/* First Enterprise Contact Form - After Hero */}
        <EnterpriseContactForm 
          sourcePage="home-hero" 
          title="Ready to Scale Your Business with Custom Technology?"
          description="Schedule a strategic consultation with our enterprise solutions team."
        />
        
        <div id="services">
          <Services />
        </div>
        <PortfolioSection />
        <div id="about">
          <About />
        </div>
        <div id="contact">
          <Contact />
        </div>
        
        {/* Second Enterprise Contact Form - Before Footer */}
        <EnterpriseContactForm 
          sourcePage="home-footer" 
          title="Let's Discuss Your Digital Transformation"
          description="Transform your business with enterprise-grade technology solutions."
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
