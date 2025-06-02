
import { Project } from '@/data/projects';
import { BlogPost } from '@/data/blogs';

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
    const data = localStorage.getItem(PROJECTS_KEY);
    console.log('AdminDataService - Raw localStorage data for projects:', data);
    
    const projects = data ? JSON.parse(data) : [];
    console.log('AdminDataService - Parsed projects:', projects);
    console.log('AdminDataService - Number of projects found:', projects.length);
    
    return projects;
  },

  saveProject: (project: AdminProject): Project => {
    console.log('AdminDataService - Saving project:', project);
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
    
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    console.log('AdminDataService - Projects saved to localStorage:', projects);
    
    // Trigger storage event for same-window updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: PROJECTS_KEY,
      newValue: JSON.stringify(projects)
    }));
    
    return newProject;
  },

  deleteProject: (id: string): void => {
    console.log('AdminDataService - Deleting project with id:', id);
    const projects = adminDataService.getProjects().filter(p => p.id !== id);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    console.log('AdminDataService - Projects after deletion:', projects);
    
    // Trigger storage event for same-window updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: PROJECTS_KEY,
      newValue: JSON.stringify(projects)
    }));
  },

  // Blogs
  getBlogs: (): BlogPost[] => {
    console.log('AdminDataService - Getting blogs from localStorage...');
    const data = localStorage.getItem(BLOGS_KEY);
    console.log('AdminDataService - Raw localStorage data for blogs:', data);
    
    const blogs = data ? JSON.parse(data) : [];
    console.log('AdminDataService - Parsed blogs:', blogs);
    console.log('AdminDataService - Number of blogs found:', blogs.length);
    
    return blogs;
  },

  saveBlog: (blog: AdminBlogPost): BlogPost => {
    console.log('AdminDataService - Saving blog:', blog);
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
    
    localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
    console.log('AdminDataService - Blogs saved to localStorage:', blogs);
    
    // Trigger storage event for same-window updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: BLOGS_KEY,
      newValue: JSON.stringify(blogs)
    }));
    
    return newBlog;
  },

  deleteBlog: (id: string): void => {
    console.log('AdminDataService - Deleting blog with id:', id);
    const blogs = adminDataService.getBlogs().filter(b => b.id !== id);
    localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
    console.log('AdminDataService - Blogs after deletion:', blogs);
    
    // Trigger storage event for same-window updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: BLOGS_KEY,
      newValue: JSON.stringify(blogs)
    }));
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
    if (data.projects) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(data.projects));
      console.log('AdminDataService - Projects imported');
    }
    if (data.blogs) {
      localStorage.setItem(BLOGS_KEY, JSON.stringify(data.blogs));
      console.log('AdminDataService - Blogs imported');
    }
  },

  // Debug helper to check localStorage directly
  debugLocalStorage: () => {
    console.log('=== DEBUG LOCALSTORAGE ===');
    console.log('All localStorage keys:', Object.keys(localStorage));
    
    // Check for various possible keys
    const possibleKeys = [
      'admin_projects', 'admin_blogs', 
      'projects', 'blogs',
      'portfolio_projects', 'portfolio_blogs'
    ];
    
    possibleKeys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        console.log(`Found data in key "${key}":`, JSON.parse(value));
      } else {
        console.log(`No data found in key "${key}"`);
      }
    });
    
    console.log('=== END DEBUG ===');
  }
};
