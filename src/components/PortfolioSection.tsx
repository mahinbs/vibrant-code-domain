
import { useState, useEffect } from 'react';
import { Code, Cloud, Brain, Smartphone, Zap } from 'lucide-react';
import { getPortfolioData } from '@/services/portfolioDataService';
import PortfolioHeader from './portfolio/PortfolioHeader';
import ServiceFilter from './portfolio/ServiceFilter';
import ProjectGrid from './portfolio/ProjectGrid';
import PortfolioCTA from './portfolio/PortfolioCTA';

const PortfolioSection = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [services, setServices] = useState(getPortfolioData());

  // Refresh data when component mounts or when localStorage changes
  useEffect(() => {
    const refreshData = () => {
      setServices(getPortfolioData());
    };

    // Listen for storage changes (when admin adds/edits projects)
    window.addEventListener('storage', refreshData);
    
    // Also refresh on focus (for same-tab updates)
    window.addEventListener('focus', refreshData);

    return () => {
      window.removeEventListener('storage', refreshData);
      window.removeEventListener('focus', refreshData);
    };
  }, []);

  const handleProjectClick = (projectId: string) => {
    window.location.href = `/case-study/${projectId}`;
  };

  return (
    <section 
      id="portfolio"
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dknafpppp/image/upload/v1748805837/representation-user-experience-interface-design_1_halzwq.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll'
      }}
    >
      {/* Optimized Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-gray-900/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

      <div className="container mx-auto px-6 relative z-10">
        <PortfolioHeader isVisible={isVisible} setIsVisible={setIsVisible} />
        <ServiceFilter 
          services={services} 
          selectedService={selectedService} 
          setSelectedService={setSelectedService}
          isVisible={isVisible}
        />
        <ProjectGrid 
          services={services}
          selectedService={selectedService}
          isVisible={isVisible}
          handleProjectClick={handleProjectClick}
        />
        <PortfolioCTA isVisible={isVisible} />
      </div>
    </section>
  );
};

export default PortfolioSection;
