
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioServiceFilter from '@/components/portfolio/PortfolioServiceFilter';
import PortfolioProjectsGrid from '@/components/portfolio/PortfolioProjectsGrid';
import PortfolioCTASection from '@/components/portfolio/PortfolioCTASection';
import { getPortfolioData } from '@/services/portfolioDataService';
import { Service } from '@/data/projects';

const Portfolio = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data when component mounts
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        console.log('Portfolio Page - Starting to load portfolio data...');
        setLoading(true);
        const data = await getPortfolioData();
        console.log('Portfolio Page - Portfolio data loaded:', data);
        
        // Log the total number of projects
        const totalProjects = data.reduce((total, service) => total + service.projects.length, 0);
        console.log(`Portfolio Page - Total projects loaded: ${totalProjects}`);
        
        // Check specifically for Crave Kitchen
        const allProjects = data.flatMap(service => service.projects);
        const craveKitchenProject = allProjects.find(p => p.title.toLowerCase().includes('crave kitchen'));
        if (craveKitchenProject) {
          console.log('Portfolio Page - ✅ Crave Kitchen found in loaded data');
        } else {
          console.log('Portfolio Page - ❌ Crave Kitchen NOT found in loaded data');
        }
        
        setServices(data);
      } catch (error) {
        console.error('Portfolio Page - Error loading portfolio data:', error);
        setServices([]);
      } finally {
        setLoading(false);
        console.log('Portfolio Page - Loading completed');
      }
    };

    loadPortfolioData();
    
    // Listen for storage changes (when admin adds/edits projects)
    window.addEventListener('storage', loadPortfolioData);
    
    // Also refresh on focus (for same-tab updates)
    window.addEventListener('focus', loadPortfolioData);

    return () => {
      window.removeEventListener('storage', loadPortfolioData);
      window.removeEventListener('focus', loadPortfolioData);
    };
  }, []);

  const handleProjectClick = (projectId: string) => {
    // Use React Router navigation instead of window.location.href
    navigate(`/case-study/${projectId}`);
  };

  const totalProjects = services.reduce((total, service) => total + service.projects.length, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <PortfolioHero totalProjects={totalProjects} />

      {/* Portfolio Grid */}
      <section 
        className="py-20 bg-gradient-to-b from-black to-gray-900 relative"
        style={{
          backgroundImage: `url('/lovable-uploads/d0fa4f38-5951-4a69-9df8-13d4faa03aaa.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Enhanced Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-gray-900/75"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <PortfolioServiceFilter 
            services={services}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            totalProjects={totalProjects}
          />
          
          <PortfolioProjectsGrid 
            services={services}
            selectedService={selectedService}
            handleProjectClick={handleProjectClick}
          />
          
          <PortfolioCTASection />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
