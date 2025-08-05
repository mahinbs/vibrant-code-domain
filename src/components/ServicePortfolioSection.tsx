import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { adminDataService } from '@/services/adminDataService';
import { Project } from '@/data/projects';

interface ServicePortfolioSectionProps {
  serviceId: string;
  serviceName: string;
  fallbackProjects?: any[];
}

const ServicePortfolioSection = ({ serviceId, serviceName, fallbackProjects = [] }: ServicePortfolioSectionProps) => {
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const projects = await adminDataService.getProjects();
        const serviceProjects = projects.filter(project => project.serviceId === serviceId);
        
        // If no database projects, use fallback projects
        if (serviceProjects.length === 0 && fallbackProjects.length > 0) {
          setPortfolioProjects(fallbackProjects);
        } else {
          setPortfolioProjects(serviceProjects);
        }
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setPortfolioProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [serviceId, fallbackProjects]);

  if (loading) {
    return (
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading portfolio projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our {serviceName} Portfolio</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our successful {serviceName.toLowerCase()} implementations across various industries
          </p>
        </div>
        
        {portfolioProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => (
              <div key={project.id} className="group bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-sm text-cyan-300">
                      {project.industry}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      <div>Client: {project.client}</div>
                      <div>Timeline: {project.timeline}</div>
                    </div>
                  </div>
                  <Link 
                    to={`/case-study/${project.slug || project.id}`}
                    className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                  >
                    View Case Study <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No portfolio projects available yet for {serviceName}.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Portfolio projects can be added through the admin panel.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicePortfolioSection;