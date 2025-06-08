
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
        console.log('PortfolioSection - Starting to load portfolio data from database only...');
        setLoading(true);
        const data = await getPortfolioData();
        console.log('PortfolioSection - Portfolio data loaded:', data);
        
        // Log the total number of projects
        const totalProjects = data.reduce((total, service) => total + service.projects.length, 0);
        console.log(`PortfolioSection - Total real projects loaded: ${totalProjects}`);
        
        // Check specifically for Crave Kitchen
        const allProjects = data.flatMap(service => service.projects);
        const craveKitchenProject = allProjects.find(p => p.title.toLowerCase().includes('crave kitchen'));
        if (craveKitchenProject) {
          console.log('PortfolioSection - ✅ Crave Kitchen found in loaded data');
        } else {
          console.log('PortfolioSection - ❌ Crave Kitchen NOT found in loaded data');
        }
        
        setServices(data);
      } catch (error) {
        console.error('PortfolioSection - Error loading portfolio data:', error);
        // Set empty array as fallback (no static data)
        setServices([]);
      } finally {
        setLoading(false);
        console.log('PortfolioSection - Loading completed');
      }
    };

    loadPortfolioData();
  }, []);

  const handleProjectClick = (projectId: string) => {
    console.log('PortfolioSection - Project clicked:', projectId);
    window.location.href = `/case-study/${projectId}`;
  };

  // Log whenever services state changes
  useEffect(() => {
    console.log('PortfolioSection - Services state updated:', services.length, 'services');
    services.forEach((service, index) => {
      console.log(`  Service ${index + 1}: ${service.title} (${service.projects.length} projects)`);
    });
  }, [services]);

  // Calculate total projects
  const totalProjects = services.reduce((total, service) => total + service.projects.length, 0);

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
            <div className="text-white text-lg">Loading real portfolios...</div>
          </div>
        ) : totalProjects === 0 ? (
          <div className="text-center py-12">
            <div className="text-white text-lg mb-4">No portfolios available yet.</div>
            <div className="text-gray-400">Please check back later for our latest projects.</div>
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
