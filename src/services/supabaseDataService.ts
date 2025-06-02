
import { Project } from '@/data/projects';
import { BlogPost } from '@/data/blogs';
import { DatabaseProject, DatabaseBlogPost } from './database/types';
import { projectService } from './database/projectService';
import { blogService } from './database/blogService';
import { dataExportService } from './database/dataExportService';

// Re-export types for backward compatibility
export type { DatabaseProject, DatabaseBlogPost };

export const supabaseDataService = {
  // Projects/Portfolios
  getProjects: projectService.getProjects,
  saveProject: projectService.saveProject,
  deleteProject: projectService.deleteProject,

  // Blogs
  getBlogs: blogService.getBlogs,
  saveBlog: blogService.saveBlog,
  deleteBlog: blogService.deleteBlog,

  // Data management
  exportData: dataExportService.exportData
};
