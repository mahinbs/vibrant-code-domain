
import { Project } from '@/data/projects';
import { findProject, getCombinedProjects } from './caseStudyDataService';

// Cache for loaded projects
const projectCache = new Map<string, Project>();

export const getProjectSummary = async (projectId: string): Promise<Project | null> => {
  console.log('ProjectService - Getting project summary for:', projectId);
  
  const project = await findProject(projectId);

  if (!project) {
    console.log('ProjectService - Project not found:', projectId);
    return null;
  }

  console.log('ProjectService - Project summary found:', project.title);
  return project;
};

export const loadFullProject = async (projectId: string): Promise<Project | null> => {
  console.log('ProjectService - Loading full project for:', projectId);
  
  // Check cache first
  if (projectCache.has(projectId)) {
    console.log('ProjectService - Project found in cache');
    return projectCache.get(projectId)!;
  }

  // Load from combined data (static + admin)
  const project = await findProject(projectId);

  if (project) {
    console.log('ProjectService - Project loaded and cached:', project.title);
    projectCache.set(projectId, project);
    return project;
  }

  console.log('ProjectService - Project not found:', projectId);
  return null;
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
