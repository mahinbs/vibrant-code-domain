
import { Project } from '@/data/projects';
import { BlogPost } from '@/data/blogs';
import { dataBackupService } from './dataBackupService';

const PROJECTS_KEY = 'admin_projects';
const BLOGS_KEY = 'admin_blogs';

export interface AdminProject extends Omit<Project, 'id'> {
  id?: string;
}

export interface AdminBlogPost extends Omit<BlogPost, 'id'> {
  id?: string;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const adminDataService = {
  // Projects
  getProjects: (): Project[] => {
    console.log('AdminDataService - Getting projects from localStorage...');
    try {
      const data = localStorage.getItem(PROJECTS_KEY);
      console.log('AdminDataService - Raw localStorage data for projects:', data);
      
      if (data === null) {
        console.warn('AdminDataService - No projects data found in localStorage');
        return [];
      }
      
      const projects = JSON.parse(data);
      console.log('AdminDataService - Parsed projects:', projects);
      console.log('AdminDataService - Number of projects found:', projects.length);
      
      return projects;
    } catch (error) {
      console.error('AdminDataService - Error retrieving projects:', error);
      return [];
    }
  },

  saveProject: (project: AdminProject): Project => {
    console.log('AdminDataService - Saving project:', project);
    
    // Create backup before saving
    const currentProjects = adminDataService.getProjects();
    const currentBlogs = adminDataService.getBlogs();
    dataBackupService.createBackup(currentProjects, currentBlogs);
    
    const projects = adminDataService.getProjects();
    const newProject = { ...project, id: project.id || generateId() } as Project;
    
    const existingIndex = projects.findIndex(p => p.id === newProject.id);
    if (existingIndex >= 0) {
      console.log('AdminDataService - Updating existing project at index:', existingIndex);
      projects[existingIndex] = newProject;
    } else {
      console.log('AdminDataService - Adding new project');
      projects.push(newProject);
    }
    
    try {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
      console.log('AdminDataService - Projects saved to localStorage:', projects);
      
      // Trigger storage event for same-window updates
      window.dispatchEvent(new StorageEvent('storage', {
        key: PROJECTS_KEY,
        newValue: JSON.stringify(projects)
      }));
      
      return newProject;
    } catch (error) {
      console.error('AdminDataService - Error saving project:', error);
      throw error;
    }
  },

  deleteProject: (id: string): void => {
    console.log('AdminDataService - Deleting project with id:', id);
    
    // Create backup before deleting
    const currentProjects = adminDataService.getProjects();
    const currentBlogs = adminDataService.getBlogs();
    dataBackupService.createBackup(currentProjects, currentBlogs);
    
    const projects = adminDataService.getProjects().filter(p => p.id !== id);
    
    try {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
      console.log('AdminDataService - Projects after deletion:', projects);
      
      // Trigger storage event for same-window updates
      window.dispatchEvent(new StorageEvent('storage', {
        key: PROJECTS_KEY,
        newValue: JSON.stringify(projects)
      }));
    } catch (error) {
      console.error('AdminDataService - Error deleting project:', error);
      throw error;
    }
  },

  // Blogs
  getBlogs: (): BlogPost[] => {
    console.log('AdminDataService - Getting blogs from localStorage...');
    try {
      const data = localStorage.getItem(BLOGS_KEY);
      console.log('AdminDataService - Raw localStorage data for blogs:', data);
      
      if (data === null) {
        console.warn('AdminDataService - No blogs data found in localStorage');
        return [];
      }
      
      const blogs = JSON.parse(data);
      console.log('AdminDataService - Parsed blogs:', blogs);
      console.log('AdminDataService - Number of blogs found:', blogs.length);
      
      return blogs;
    } catch (error) {
      console.error('AdminDataService - Error retrieving blogs:', error);
      return [];
    }
  },

  saveBlog: (blog: AdminBlogPost): BlogPost => {
    console.log('AdminDataService - Saving blog:', blog);
    
    // Create backup before saving
    const currentProjects = adminDataService.getProjects();
    const currentBlogs = adminDataService.getBlogs();
    dataBackupService.createBackup(currentProjects, currentBlogs);
    
    const blogs = adminDataService.getBlogs();
    const newBlog = { ...blog, id: blog.id || generateId() } as BlogPost;
    
    const existingIndex = blogs.findIndex(b => b.id === newBlog.id);
    if (existingIndex >= 0) {
      console.log('AdminDataService - Updating existing blog at index:', existingIndex);
      blogs[existingIndex] = newBlog;
    } else {
      console.log('AdminDataService - Adding new blog');
      blogs.push(newBlog);
    }
    
    try {
      localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
      console.log('AdminDataService - Blogs saved to localStorage:', blogs);
      
      // Trigger storage event for same-window updates
      window.dispatchEvent(new StorageEvent('storage', {
        key: BLOGS_KEY,
        newValue: JSON.stringify(blogs)
      }));
      
      return newBlog;
    } catch (error) {
      console.error('AdminDataService - Error saving blog:', error);
      throw error;
    }
  },

  deleteBlog: (id: string): void => {
    console.log('AdminDataService - Deleting blog with id:', id);
    
    // Create backup before deleting
    const currentProjects = adminDataService.getProjects();
    const currentBlogs = adminDataService.getBlogs();
    dataBackupService.createBackup(currentProjects, currentBlogs);
    
    const blogs = adminDataService.getBlogs().filter(b => b.id !== id);
    
    try {
      localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
      console.log('AdminDataService - Blogs after deletion:', blogs);
      
      // Trigger storage event for same-window updates
      window.dispatchEvent(new StorageEvent('storage', {
        key: BLOGS_KEY,
        newValue: JSON.stringify(blogs)
      }));
    } catch (error) {
      console.error('AdminDataService - Error deleting blog:', error);
      throw error;
    }
  },

  // Data management
  exportData: () => {
    console.log('AdminDataService - Exporting data...');
    const data = {
      projects: adminDataService.getProjects(),
      blogs: adminDataService.getBlogs(),
      exportDate: new Date().toISOString()
    };
    console.log('AdminDataService - Exported data:', data);
    return data;
  },

  importData: (data: any) => {
    console.log('AdminDataService - Importing data:', data);
    
    // Create backup before importing
    const currentProjects = adminDataService.getProjects();
    const currentBlogs = adminDataService.getBlogs();
    dataBackupService.createBackup(currentProjects, currentBlogs);
    
    try {
      if (data.projects) {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(data.projects));
        console.log('AdminDataService - Projects imported');
      }
      if (data.blogs) {
        localStorage.setItem(BLOGS_KEY, JSON.stringify(data.blogs));
        console.log('AdminDataService - Blogs imported');
      }
    } catch (error) {
      console.error('AdminDataService - Error importing data:', error);
      throw error;
    }
  },

  // Enhanced debug helper
  debugLocalStorage: () => {
    console.log('=== ENHANCED DEBUG LOCALSTORAGE ===');
    console.log('All localStorage keys:', Object.keys(localStorage));
    console.log('Total localStorage usage:', JSON.stringify(localStorage).length, 'characters');
    
    // Check for various possible keys
    const possibleKeys = [
      'admin_projects', 'admin_blogs', 
      'projects', 'blogs',
      'portfolio_projects', 'portfolio_blogs',
      'admin_data_backup', 'admin_backup_history'
    ];
    
    possibleKeys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          const parsed = JSON.parse(value);
          console.log(`Found data in key "${key}":`, parsed);
          console.log(`Key "${key}" size:`, value.length, 'characters');
        } catch {
          console.log(`Found non-JSON data in key "${key}":`, value);
        }
      } else {
        console.log(`No data found in key "${key}"`);
      }
    });
    
    // Check data integrity
    const integrity = dataBackupService.validateDataIntegrity();
    console.log('Data integrity check:', integrity);
    
    console.log('=== END ENHANCED DEBUG ===');
  }
};
