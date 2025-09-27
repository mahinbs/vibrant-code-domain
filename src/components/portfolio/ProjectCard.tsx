import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { preloadProject, preloadMultipleProjects } from '@/services/projectService';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  color: string;
  projects: Project[];
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
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Preload project data when card becomes visible
  useEffect(() => {
    if (isVisible) {
      preloadProject(project.id);
    }
  }, [isVisible, project.id]);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const shouldShowReadMore = project.description.length > 100;

  const handleMouseEnter = () => {
    // Aggressively preload project data on hover
    preloadProject(project.id);
    
    // Also preload related projects from the same service
    const relatedProjects = service.projects
      .filter(p => p.id !== project.id)
      .slice(0, 2)
      .map(p => p.id);
    
    if (relatedProjects.length > 0) {
      preloadMultipleProjects(relatedProjects);
    }
  };

  const handleClick = () => {
    // Navigate using SEO-friendly slug
    const slug = project.slug || project.id;
    window.location.href = `/case-study/${slug}`;
  };

  return (
    <div
      className={`group relative rounded-xl sm:rounded-2xl bg-gray-900/80 backdrop-blur-sm border ${colors.border} hover:bg-gray-800/90 transition-all duration-300 overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      {/* Project Image - Responsive */}
      <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-xl sm:rounded-t-2xl">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading={isVisible ? "eager" : "lazy"}
          decoding="async"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${colors.gradient} opacity-60`}></div>
        
        {/* Service Icon - Responsive */}
        <div className={`absolute top-3 left-3 sm:top-4 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${colors.icon} border flex items-center justify-center`}>
          <ServiceIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        
        {/* Industry Tag - Responsive */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <span className={`px-2 py-1 rounded text-xs ${colors.tag} border`}>
            {project.industry}
          </span>
        </div>
      </div>

      {/* Project Content - Responsive */}
      <div className="p-4 sm:p-6">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          <div className="space-y-3">
            <h4 className={`text-lg sm:text-xl font-bold text-white group-hover:${colors.text} transition-colors duration-300 leading-tight`}>
              {project.title}
            </h4>
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <div className="space-y-2">
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                  {isExpanded ? project.description : truncateText(project.description, 100)}
                </p>
                {shouldShowReadMore && (
                  <CollapsibleTrigger className="flex items-center text-xs text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                    {isExpanded ? (
                      <>Read less <ChevronUp className="h-3 w-3 ml-1" /></>
                    ) : (
                      <>Read more <ChevronDown className="h-3 w-3 ml-1" /></>
                    )}
                  </CollapsibleTrigger>
                )}
              </div>
            </Collapsible>
            
            {/* Mobile Metrics */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                <span key={key} className={`px-2 py-1 rounded-full text-xs ${colors.tag} border`}>
                  {key}: {String(value)}
                </span>
              ))}
            </div>
            
            {/* Mobile Action Button */}
            <div className="pt-2">
              <Link 
                to={`/case-study/${project.slug || project.id}`}
                className={`inline-flex items-center justify-center w-full px-4 py-2 rounded-lg text-sm ${colors.button} border font-medium hover:scale-105 transition-transform duration-200`}
                onClick={(e) => e.stopPropagation()}
              >
                View Case Study
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h4 className={`text-xl font-bold text-white mb-2 group-hover:${colors.text} transition-colors duration-300`}>
                {project.title}
              </h4>
              <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                <div className="space-y-2">
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                    {isExpanded ? project.description : truncateText(project.description, 100)}
                  </p>
                  {shouldShowReadMore && (
                    <CollapsibleTrigger className="flex items-center text-xs text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                      {isExpanded ? (
                        <>Read less <ChevronUp className="h-3 w-3 ml-1" /></>
                      ) : (
                        <>Read more <ChevronDown className="h-3 w-3 ml-1" /></>
                      )}
                    </CollapsibleTrigger>
                  )}
                </div>
              </Collapsible>
            </div>
            <Link 
              to={`/case-study/${project.slug || project.id}`}
              className={`px-3 py-1 rounded-lg text-xs ${colors.tag} border font-medium hover:scale-105 transition-transform duration-200`}
              onClick={(e) => e.stopPropagation()}
            >
              View Case Study
            </Link>
          </div>

          {/* Desktop Metrics */}
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
              <span key={key} className={`px-3 py-1 rounded-full text-xs ${colors.tag} border`}>
                {key}: {String(value)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;