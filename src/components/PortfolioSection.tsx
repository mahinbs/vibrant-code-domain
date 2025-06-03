
import { useState, useEffect } from 'react';
import { getPortfolioData } from '@/services/portfolioDataService';
import PortfolioHeader from './portfolio/PortfolioHeader';
import ServiceFilter from './portfolio/ServiceFilter';
import ProjectGrid from './portfolio/ProjectGrid';
import PortfolioCTA from './portfolio/PortfolioCTA';
import { Service } from '@/data/projects';

const PortfolioSection = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data when component mounts
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setLoading(true);
        const data = await getPortfolioData();
        setServices(data);
      } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Keep existing static data as fallback
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
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
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-white">Loading portfolio...</div>
          </div>
        ) : (
          <>
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
          </>
        )}
        
        <PortfolioCTA isVisible={isVisible} />
      </div>
    </section>
  );
};

export default PortfolioSection;
