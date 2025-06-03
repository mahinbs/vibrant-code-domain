
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Service } from '@/data/projects';

interface PortfolioProjectsGridProps {
  services: Service[];
  selectedService: string | null;
  handleProjectClick: (projectId: string) => void;
}

const PortfolioProjectsGrid = ({ 
  services, 
  selectedService, 
  handleProjectClick 
}: PortfolioProjectsGridProps) => {
  const colorClasses = {
    cyan: {
      border: 'border-cyan-400/30',
      gradient: 'from-cyan-400/10 to-cyan-600/10',
      icon: 'bg-cyan-500/10 text-cyan-400 border-cyan-400/30',
      text: 'text-cyan-400',
      button: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30',
      tag: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    },
    blue: {
      border: 'border-blue-400/30',
      gradient: 'from-blue-400/10 to-blue-600/10',
      icon: 'bg-blue-500/10 text-blue-400 border-blue-400/30',
      text: 'text-blue-400',
      button: 'bg-blue-500/20 border-blue-400/30 text-blue-400 hover:bg-blue-500/30',
      tag: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    purple: {
      border: 'border-purple-400/30',
      gradient: 'from-purple-400/10 to-purple-600/10',
      icon: 'bg-purple-500/10 text-purple-400 border-purple-400/30',
      text: 'text-purple-400',
      button: 'bg-purple-500/20 border-purple-400/30 text-purple-400 hover:bg-purple-500/30',
      tag: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    pink: {
      border: 'border-pink-400/30',
      gradient: 'from-pink-400/10 to-pink-600/10',
      icon: 'bg-pink-500/10 text-pink-400 border-pink-400/30',
      text: 'text-pink-400',
      button: 'bg-pink-500/20 border-pink-400/30 text-pink-400 hover:bg-pink-500/30',
      tag: 'bg-pink-500/20 text-pink-300 border-pink-500/30'
    },
    green: {
      border: 'border-green-400/30',
      gradient: 'from-green-400/10 to-green-600/10',
      icon: 'bg-green-500/10 text-green-400 border-green-400/30',
      text: 'text-green-400',
      button: 'bg-green-500/20 border-green-400/30 text-green-400 hover:bg-green-500/30',
      tag: 'bg-green-500/20 text-green-300 border-green-500/30'
    },
  };

  return (
    <div className="space-y-20">
      {services
        .filter(service => !selectedService || service.id === selectedService)
        .map((service) => {
          const colors = colorClasses[service.color];
          
          return (
            <div key={service.id} className="space-y-8">
              <div className="flex items-center space-x-4 mb-8">
                <div className={`w-12 h-12 rounded-xl ${colors.icon} border flex items-center justify-center`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className={`text-3xl font-bold text-white transition-colors duration-300`}>
                    {service.title}
                  </h2>
                  <p className="text-gray-400 mt-1">{service.projects.length} projects completed</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {service.projects.map((project) => (
                  <div
                    key={project.id}
                    className={`group relative rounded-2xl bg-gray-900/80 backdrop-blur-sm border ${colors.border} hover:bg-gray-800/90 transition-all duration-500 overflow-hidden cursor-pointer hover:transform hover:scale-105 hover:shadow-2xl`}
                    onClick={() => handleProjectClick(project.id)}
                  >
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${colors.gradient} opacity-60`}></div>
                      <div className={`absolute top-4 left-4 w-10 h-10 rounded-lg ${colors.icon} border flex items-center justify-center`}>
                        <service.icon className="h-5 w-5" />
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-2 py-1 rounded text-xs ${colors.tag} border`}>
                          {project.industry}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold text-white mb-2 group-hover:${colors.text} transition-colors duration-300`}>
                            {project.title}
                          </h3>
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                        <Link 
                          to={`/case-study/${project.id}`}
                          className={`px-3 py-1 rounded-lg text-xs ${colors.tag} border font-medium hover:scale-105 transition-transform duration-200`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Study
                        </Link>
                      </div>

                      {/* Quick Metrics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                          <span key={key} className={`px-3 py-1 rounded-full text-xs ${colors.tag} border`}>
                            {key}: {String(value)}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <Link 
                        to={`/case-study/${project.id}`}
                        className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl ${colors.button} border font-medium transition-all duration-300 hover:transform hover:scale-105 mt-4`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>View Full Case Study</span>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PortfolioProjectsGrid;
