
import { Project } from '@/data/projects';
import { projectsData } from '@/data/projects';

// Cache for loaded projects
const projectCache = new Map<string, Project>();

export const getProjectSummary = (projectId: string) => {
  const project = projectsData
    .flatMap(service => service.projects)
    .find(p => p.id === projectId);

  if (!project) return null;

  // Return minimal data for initial render
  return {
    id: project.id,
    title: project.title,
    client: project.client,
    description: project.description,
    image: project.image,
    industry: project.industry,
    clientLogo: project.clientLogo,
    metrics: project.metrics,
    timeline: project.timeline,
    team: project.team
  };
};

export const loadFullProject = async (projectId: string): Promise<Project | null> => {
  // Check cache first
  if (projectCache.has(projectId)) {
    return projectCache.get(projectId)!;
  }

  // No artificial delay - load immediately
  const project = projectsData
    .flatMap(service => service.projects)
    .find(p => p.id === projectId);

  if (project) {
    projectCache.set(projectId, project);
  }

  return project || null;
};

// Preload likely next projects
export const preloadProject = (projectId: string) => {
  if (!projectCache.has(projectId)) {
    loadFullProject(projectId);
  }
};

// Bulk preload for faster navigation
export const preloadMultipleProjects = (projectIds: string[]) => {
  projectIds.forEach(id => preloadProject(id));
};
