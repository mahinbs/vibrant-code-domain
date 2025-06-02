
import { Project } from '@/data/projects';
import { findProject, getCombinedProjects } from './caseStudyDataService';

// Cache for loaded projects
const projectCache = new Map<string, Project>();

export const getProjectSummary = async (projectId: string) => {
  const project = await findProject(projectId);

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

  // Load from combined data (static + admin)
  const project = await findProject(projectId);

  if (project) {
    projectCache.set(projectId, project);
  }

  return project || null;
};

// Preload likely next projects
export const preloadProject = async (projectId: string) => {
  if (!projectCache.has(projectId)) {
    await loadFullProject(projectId);
  }
};

// Bulk preload for faster navigation
export const preloadMultipleProjects = async (projectIds: string[]) => {
  await Promise.all(projectIds.map(id => preloadProject(id)));
};
