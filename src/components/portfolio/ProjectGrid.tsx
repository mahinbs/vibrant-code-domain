
import { Code, Cloud, Brain, Smartphone, Zap } from 'lucide-react';
import ProjectCard from './ProjectCard';

interface Service {
  id: string;
  title: string;
  color: 'cyan' | 'blue' | 'pink' | 'purple' | 'green';
  projects: any[];
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
    <div className="space-y-16">
      {services
        .filter(service => !selectedService || service.id === selectedService)
        .map((service, serviceIndex) => {
          const colors = colorClasses[service.color];
          const ServiceIcon = getServiceIcon(service.id);
          
          return (
            <div key={service.id} className="space-y-8">
              <div className={`flex items-center space-x-4 mb-8 transition-all duration-700 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: `${serviceIndex * 200 + 400}ms` }}>
                <div className={`w-12 h-12 rounded-xl ${colors.icon} border flex items-center justify-center`}>
                  <ServiceIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">{service.title}</h3>
                  <p className="text-gray-400 mt-1">{service.projects.length} featured projects</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
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
