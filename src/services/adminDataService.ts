
import { Project } from '@/data/projects';
import { BlogPost } from '@/data/blogs';
import { supabaseDataService, DatabaseProject, DatabaseBlogPost } from './supabaseDataService';

export interface AdminProject extends Omit<Project, 'id'> {
  id?: string;
}

export interface AdminBlogPost extends Omit<BlogPost, 'id'> {
  id?: string;
}

export const adminDataService = {
  // Projects
  getProjects: async (): Promise<Project[]> => {
    console.log('AdminDataService - Getting projects from Supabase...');
    return await supabaseDataService.getProjects();
  },

  saveProject: async (project: AdminProject): Promise<Project> => {
    console.log('AdminDataService - Saving project:', project);
    return await supabaseDataService.saveProject(project as DatabaseProject);
  },

  deleteProject: async (id: string): Promise<void> => {
    console.log('AdminDataService - Deleting project with id:', id);
    await supabaseDataService.deleteProject(id);
  },

  // Blogs
  getBlogs: async (): Promise<BlogPost[]> => {
    console.log('AdminDataService - Getting blogs from Supabase...');
    return await supabaseDataService.getBlogs();
  },

  saveBlog: async (blog: AdminBlogPost): Promise<BlogPost> => {
    console.log('AdminDataService - Saving blog:', blog);
    return await supabaseDataService.saveBlog(blog as DatabaseBlogPost);
  },

  deleteBlog: async (id: string): Promise<void> => {
    console.log('AdminDataService - Deleting blog with id:', id);
    await supabaseDataService.deleteBlog(id);
  },

  // Data management
  exportData: async () => {
    console.log('AdminDataService - Exporting data...');
    return await supabaseDataService.exportData();
  },

  importData: async (data: any) => {
    console.log('AdminDataService - Importing data not yet implemented for database');
    throw new Error('Import functionality needs to be implemented for database storage');
  },

  // Legacy method for debugging - now shows database connection status
  debugLocalStorage: () => {
    console.log('=== DATABASE CONNECTION DEBUG ===');
    console.log('Using Supabase database instead of localStorage');
    console.log('All data is now stored permanently in the database');
    console.log('=== END DEBUG ===');
  }
};
