
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { adminDataService } from '@/services/adminDataService';
import { Project } from '@/data/projects';

const WebAppsPortfolio = () => {
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchPortfolioProjects = async () => {
      try {
        console.log('WebAppsPage - Fetching web application portfolios...');
        const allProjects = await adminDataService.getProjects();
        
        const webAppProjects = allProjects
          .filter(project => project.serviceId === 'web-apps')
          .slice(0, 9);
        
        console.log('WebAppsPage - Web app projects loaded:', webAppProjects.length);
        setPortfolioProjects(webAppProjects);
      } catch (error) {
        console.error('WebAppsPage - Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioProjects();
  }, []);

  const toggleCardExpansion = (projectId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <section className="py-20 bg-gray-900/70">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Web Application Portfolio</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing our latest web application projects and their impact
          </p>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-white">Loading portfolio projects...</div>
          </div>
        ) : portfolioProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => {
              const isExpanded = expandedCards.has(project.id);
              const shouldShowMore = project.description.length > 120;
              
              return (
                <div key={project.id} className="group bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300">
                  {/* Image Section - 75% */}
                  <div className="relative h-64 overflow-hidden">
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
                  
                  {/* Information Section - 25% */}
                  <div className={`p-4 flex flex-col ${isExpanded ? 'min-h-32' : 'h-32'}`}>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed mb-3">
                        {isExpanded ? project.description : truncateText(project.description, 80)}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center space-x-2">
                        {shouldShowMore && (
                          <button
                            onClick={() => toggleCardExpansion(project.id)}
                            className="inline-flex items-center text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            {isExpanded ? (
                              <>
                                Less <ChevronUp className="ml-1 h-3 w-3" />
                              </>
                            ) : (
                              <>
                                More <ChevronDown className="ml-1 h-3 w-3" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                      <Link 
                        to={`/case-study/${project.slug || project.id}`}
                        className="inline-flex items-center text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                      >
                        View <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No portfolio projects available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WebAppsPortfolio;
