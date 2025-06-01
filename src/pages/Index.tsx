
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import PortfolioSection from '@/components/PortfolioSection';
import About from '@/components/About';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div id="hero">
        <Hero />
      </div>
      <div id="services">
        <Services />
      </div>
      <PortfolioSection />
      <div id="about">
        <About />
      </div>
      <div id="team">
        <Team />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
