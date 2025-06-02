import { Link } from 'react-router-dom';
import { preloadProject } from '@/services/projectService';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  industry: string;
  metrics: Record<string, any>;
}

interface Service {
  id: string;
  title: string;
  color: string;
}

interface ColorClasses {
  border: string;
  gradient: string;
  icon: string;
  text: string;
  button: string;
  tag: string;
}

interface ProjectCardProps {
  project: Project;
  service: Service;
  colors: ColorClasses;
  ServiceIcon: React.ComponentType<{ className?: string }>;
  isVisible: boolean;
  handleProjectClick: (projectId: string) => void;
  animationDelay: number;
}

const ProjectCard = ({ 
  project, 
  service, 
  colors, 
  ServiceIcon, 
  isVisible, 
  handleProjectClick, 
  animationDelay 
}: ProjectCardProps) => {
  const handleMouseEnter = () => {
    // Preload project data on hover for faster navigation
    preloadProject(project.id);
  };

  return (
    <div
      className={`group relative rounded-2xl bg-gray-900/80 backdrop-blur-sm border ${colors.border} hover:bg-gray-800/90 transition-all duration-400 overflow-hidden cursor-pointer hover:transform hover:scale-102 hover:shadow-lg will-change-auto ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      onClick={() => handleProjectClick(project.id)}
      onMouseEnter={handleMouseEnter}
      style={{ 
        animationDelay: `${animationDelay}ms`,
        contentVisibility: 'auto'
      }}
    >
      {/* Project Image - Optimized */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${colors.gradient} opacity-60`}></div>
        <div className={`absolute top-4 left-4 w-10 h-10 rounded-lg ${colors.icon} border flex items-center justify-center`}>
          <ServiceIcon className="h-5 w-5" />
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
            <h4 className={`text-xl font-bold text-white mb-2 group-hover:${colors.text} transition-colors duration-300`}>
              {project.title}
            </h4>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>
          <Link 
            to={`/case-study/${project.id}`}
            className={`px-3 py-1 rounded-lg text-xs ${colors.tag} border font-medium hover:scale-105 transition-transform duration-200`}
            onClick={(e) => e.stopPropagation()}
          >
            View Case Study
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
      </div>
    </div>
  );
};

export default ProjectCard;
