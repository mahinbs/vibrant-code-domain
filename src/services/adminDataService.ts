
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
    const data = localStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveProject: (project: AdminProject): Project => {
    const projects = adminDataService.getProjects();
    const newProject = { ...project, id: project.id || generateId() } as Project;
    
    const existingIndex = projects.findIndex(p => p.id === newProject.id);
    if (existingIndex >= 0) {
      projects[existingIndex] = newProject;
    } else {
      projects.push(newProject);
    }
    
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    return newProject;
  },

  deleteProject: (id: string): void => {
    const projects = adminDataService.getProjects().filter(p => p.id !== id);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  },

  // Blogs
  getBlogs: (): BlogPost[] => {
    const data = localStorage.getItem(BLOGS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveBlog: (blog: AdminBlogPost): BlogPost => {
    const blogs = adminDataService.getBlogs();
    const newBlog = { ...blog, id: blog.id || generateId() } as BlogPost;
    
    const existingIndex = blogs.findIndex(b => b.id === newBlog.id);
    if (existingIndex >= 0) {
      blogs[existingIndex] = newBlog;
    } else {
      blogs.push(newBlog);
    }
    
    localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
    return newBlog;
  },

  deleteBlog: (id: string): void => {
    const blogs = adminDataService.getBlogs().filter(b => b.id !== id);
    localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
  },

  // Data management
  exportData: () => {
    return {
      projects: adminDataService.getProjects(),
      blogs: adminDataService.getBlogs(),
      exportDate: new Date().toISOString()
    };
  },

  importData: (data: any) => {
    if (data.projects) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(data.projects));
    }
    if (data.blogs) {
      localStorage.setItem(BLOGS_KEY, JSON.stringify(data.blogs));
    }
  }
};
