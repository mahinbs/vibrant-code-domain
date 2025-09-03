
import { Code, Cloud, Brain, Smartphone, Zap } from 'lucide-react';
import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  industry: string;
  metrics: Record<string, string | number>;
}

interface Service {
  id: string;
  title: string;
  color: 'cyan' | 'blue' | 'pink' | 'purple' | 'green';
  projects: Project[];
}

interface ProjectGridProps {
  services: Service[];
  selectedService: string | null;
  isVisible: boolean;
  handleProjectClick: (projectId: string) => void;
}

const ProjectGrid = ({ services, selectedService, isVisible, handleProjectClick }: ProjectGridProps) => {
  const getServiceIcon = (serviceId: string) => {
    switch (serviceId) {
      case 'web-apps': return Code;
      case 'saas': return Cloud;
      case 'mobile-apps': return Smartphone;
      case 'ai-calling': return Brain;
      case 'ai-automation': return Zap;
      default: return Code;
    }
  };

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
    pink: {
      border: 'border-pink-400/30',
      gradient: 'from-pink-400/10 to-pink-600/10',
      icon: 'bg-pink-500/10 text-pink-400 border-pink-400/30',
      text: 'text-pink-400',
      button: 'bg-pink-500/20 border-pink-400/30 text-pink-400 hover:bg-pink-500/30',
      tag: 'bg-pink-500/20 text-pink-300 border-pink-500/30'
    },
    purple: {
      border: 'border-purple-400/30',
      gradient: 'from-purple-400/10 to-purple-600/10',
      icon: 'bg-purple-500/10 text-purple-400 border-purple-400/30',
      text: 'text-purple-400',
      button: 'bg-purple-500/20 border-purple-400/30 text-purple-400 hover:bg-purple-500/30',
      tag: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    green: {
      border: 'border-green-400/30',
      gradient: 'from-green-400/10 to-green-600/10',
      icon: 'bg-green-500/10 text-green-400 border-green-400/30',
      text: 'text-green-400',
      button: 'bg-green-500/20 border-green-400/30 text-green-400 hover:bg-green-500/30',
      tag: 'bg-green-500/20 text-green-300 border-green-500/30'
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12 lg:space-y-16 px-4">
      {services
        .filter(service => !selectedService || service.id === selectedService)
        .map((service, serviceIndex) => {
          const colors = colorClasses[service.color];
          const ServiceIcon = getServiceIcon(service.id);
          
          return (
            <div 
              key={service.id} 
              className="space-y-6 sm:space-y-8"
            >
              {/* Service Header - Responsive */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${colors.icon} border flex items-center justify-center flex-shrink-0`}>
                  <ServiceIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{service.title}</h3>
                  <p className="text-gray-400 mt-1 text-sm sm:text-base">{service.projects.length} featured projects</p>
                </div>
              </div>

              {/* Projects Grid - Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {service.projects.map((project, projectIndex) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    service={service}
                    colors={colors}
                    ServiceIcon={ServiceIcon}
                    isVisible={isVisible}
                    handleProjectClick={handleProjectClick}
                    animationDelay={serviceIndex * 200 + projectIndex * 150 + 600}
                  />
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProjectGrid;
