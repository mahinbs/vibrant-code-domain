
import { Project } from '@/data/projects';
import { findProject, getCombinedProjects } from './caseStudyDataService';

// Cache for loaded projects
const projectCache = new Map<string, Project>();

export const getProjectSummary = async (projectId: string): Promise<Project | null> => {
  console.log('ProjectService - Getting project summary for:', projectId);
  
  const project = await findProjectByIdOrSlug(projectId);

  if (!project) {
    console.log('ProjectService - Project not found:', projectId);
    return null;
  }

  console.log('ProjectService - Project summary found:', project.title);
  return project;
};

export const loadFullProject = async (projectIdOrSlug: string): Promise<Project | null> => {
  console.log('ProjectService - Loading full project for:', projectIdOrSlug);
  
  // Check cache first
  if (projectCache.has(projectIdOrSlug)) {
    console.log('ProjectService - Project found in cache');
    return projectCache.get(projectIdOrSlug)!;
  }

  // Load from combined data (static + admin)
  const project = await findProjectByIdOrSlug(projectIdOrSlug);

  if (project) {
    console.log('ProjectService - Project loaded and cached:', project.title);
    projectCache.set(projectIdOrSlug, project);
    // Also cache by the other identifier (ID or slug)
    if (project.slug && project.slug !== projectIdOrSlug) {
      projectCache.set(project.slug, project);
    }
    if (project.id !== projectIdOrSlug) {
      projectCache.set(project.id, project);
    }
    return project;
  }

  console.log('ProjectService - Project not found:', projectIdOrSlug);
  return null;
};

// Helper function to find project by either ID or slug
const findProjectByIdOrSlug = async (identifier: string): Promise<Project | null> => {
  try {
    const allProjects = await getCombinedProjects();
    
    // First try to find by slug
    let project = allProjects.find(p => p.slug === identifier);
    
    // If not found by slug, try by ID
    if (!project) {
      project = allProjects.find(p => p.id === identifier);
    }
    
    return project || null;
  } catch (error) {
    console.error('ProjectService - Error finding project:', error);
    return null;
  }
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
