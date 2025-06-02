
import { projectsData, Service, Project } from '@/data/projects';
import { adminDataService } from './adminDataService';

export const getCombinedProjects = (): Project[] => {
  // Get admin projects from localStorage
  const adminProjects = adminDataService.getProjects();
  
  // Get all static projects from all services
  const staticProjects = projectsData.flatMap(service => service.projects);
  
  // Combine and return all projects
  return [...staticProjects, ...adminProjects];
};

export const findProject = (projectId: string): Project | null => {
  const allProjects = getCombinedProjects();
  return allProjects.find(project => project.id === projectId) || null;
};

// Listen for localStorage changes and provide refresh capability
export const onProjectsChange = (callback: () => void) => {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'admin_projects') {
      callback();
    }
  };
  
  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('focus', callback);
  
  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('focus', callback);
  };
};
