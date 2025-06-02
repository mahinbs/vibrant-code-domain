
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/data/projects';
import { BlogPost } from '@/data/blogs';

export interface DatabaseProject {
  id?: string;
  title: string;
  client: string;
  serviceId: string;
  description: string;
  challenge: string;
  solution: string;
  image: string;
  liveUrl: string;
  technologies: string[];
  detailedMetrics: Array<{ label: string; value: string; description: string; }>;
  gallery: string[];
  extendedTestimonial: { quote: string; author: string; position: string; company: string; };
}

export interface DatabaseBlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  author: { name: string; avatar: string; bio: string; };
  publishedDate: string;
  readingTime: number;
  tags: string[];
  featuredImage: string;
  category: string;
}

// Transform database row to Project type
const transformDbProjectToProject = (dbProject: any): Project => {
  return {
    id: dbProject.id,
    title: dbProject.title,
    client: dbProject.client,
    serviceId: dbProject.service_id,
    description: dbProject.description,
    challenge: dbProject.challenge,
    solution: dbProject.solution,
    image: dbProject.image,
    liveUrl: dbProject.link,
    technologies: dbProject.technologies || [],
    detailedMetrics: dbProject.detailed_metrics || [],
    gallery: dbProject.gallery || [],
    extendedTestimonial: dbProject.extended_testimonial || { quote: '', author: '', position: '', company: '' },
    // Add default values for required Project fields that don't exist in DB
    metrics: {},
    timeline: '',
    team: '',
    industry: '',
    clientLogo: '',
    category: 'Featured',
    tags: [],
    testimonial: { quote: '', author: '' },
    approach: [],
    techStack: [],
    features: []
  };
};

// Transform database row to BlogPost type
const transformDbBlogToBlogPost = (dbBlog: any): BlogPost => {
  return {
    id: dbBlog.id,
    title: dbBlog.title,
    content: dbBlog.content,
    excerpt: dbBlog.excerpt,
    author: dbBlog.author || { name: '', avatar: '', bio: '' },
    publishedDate: dbBlog.published_date,
    readingTime: dbBlog.reading_time || 5,
    tags: dbBlog.tags || [],
    featuredImage: dbBlog.image,
    category: 'General'
  };
};

export const supabaseDataService = {
  // Projects/Portfolios
  getProjects: async (): Promise<Project[]> => {
    console.log('SupabaseDataService - Getting projects from database...');
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('SupabaseDataService - Error retrieving projects:', error);
        throw error;
      }

      console.log('SupabaseDataService - Projects retrieved:', data);
      return (data || []).map(transformDbProjectToProject);
    } catch (error) {
      console.error('SupabaseDataService - Error getting projects:', error);
      return [];
    }
  },

  saveProject: async (project: DatabaseProject): Promise<Project> => {
    console.log('SupabaseDataService - Saving project:', project);
    
    try {
      if (project.id) {
        // Update existing project
        const { data, error } = await supabase
          .from('portfolios')
          .update({
            title: project.title,
            client: project.client,
            service_id: project.serviceId,
            description: project.description,
            challenge: project.challenge,
            solution: project.solution,
            image: project.image,
            link: project.liveUrl,
            technologies: project.technologies,
            detailed_metrics: project.detailedMetrics,
            gallery: project.gallery,
            extended_testimonial: project.extendedTestimonial
          })
          .eq('id', project.id)
          .select()
          .single();

        if (error) throw error;
        console.log('SupabaseDataService - Project updated:', data);
        return transformDbProjectToProject(data);
      } else {
        // Create new project
        const { data, error } = await supabase
          .from('portfolios')
          .insert({
            title: project.title,
            client: project.client,
            service_id: project.serviceId,
            description: project.description,
            challenge: project.challenge,
            solution: project.solution,
            image: project.image,
            link: project.liveUrl,
            technologies: project.technologies,
            detailed_metrics: project.detailedMetrics,
            gallery: project.gallery,
            extended_testimonial: project.extendedTestimonial
          })
          .select()
          .single();

        if (error) throw error;
        console.log('SupabaseDataService - Project created:', data);
        return transformDbProjectToProject(data);
      }
    } catch (error) {
      console.error('SupabaseDataService - Error saving project:', error);
      throw error;
    }
  },

  deleteProject: async (id: string): Promise<void> => {
    console.log('SupabaseDataService - Deleting project with id:', id);
    
    try {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id);

      if (error) throw error;
      console.log('SupabaseDataService - Project deleted successfully');
    } catch (error) {
      console.error('SupabaseDataService - Error deleting project:', error);
      throw error;
    }
  },

  // Blogs
  getBlogs: async (): Promise<BlogPost[]> => {
    console.log('SupabaseDataService - Getting blogs from database...');
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('published_date', { ascending: false });

      if (error) {
        console.error('SupabaseDataService - Error retrieving blogs:', error);
        throw error;
      }

      console.log('SupabaseDataService - Blogs retrieved:', data);
      return (data || []).map(transformDbBlogToBlogPost);
    } catch (error) {
      console.error('SupabaseDataService - Error getting blogs:', error);
      return [];
    }
  },

  saveBlog: async (blog: DatabaseBlogPost): Promise<BlogPost> => {
    console.log('SupabaseDataService - Saving blog:', blog);
    
    try {
      if (blog.id) {
        // Update existing blog
        const { data, error } = await supabase
          .from('blogs')
          .update({
            title: blog.title,
            content: blog.content,
            excerpt: blog.excerpt,
            author: blog.author,
            published_date: blog.publishedDate,
            reading_time: blog.readingTime,
            tags: blog.tags,
            image: blog.featuredImage
          })
          .eq('id', blog.id)
          .select()
          .single();

        if (error) throw error;
        console.log('SupabaseDataService - Blog updated:', data);
        return transformDbBlogToBlogPost(data);
      } else {
        // Create new blog
        const { data, error } = await supabase
          .from('blogs')
          .insert({
            title: blog.title,
            content: blog.content,
            excerpt: blog.excerpt,
            author: blog.author,
            published_date: blog.publishedDate,
            reading_time: blog.readingTime,
            tags: blog.tags,
            image: blog.featuredImage
          })
          .select()
          .single();

        if (error) throw error;
        console.log('SupabaseDataService - Blog created:', data);
        return transformDbBlogToBlogPost(data);
      }
    } catch (error) {
      console.error('SupabaseDataService - Error saving blog:', error);
      throw error;
    }
  },

  deleteBlog: async (id: string): Promise<void> => {
    console.log('SupabaseDataService - Deleting blog with id:', id);
    
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      console.log('SupabaseDataService - Blog deleted successfully');
    } catch (error) {
      console.error('SupabaseDataService - Error deleting blog:', error);
      throw error;
    }
  },

  // Data management
  exportData: async () => {
    console.log('SupabaseDataService - Exporting data...');
    try {
      const projects = await supabaseDataService.getProjects();
      const blogs = await supabaseDataService.getBlogs();
      
      const data = {
        projects,
        blogs,
        exportDate: new Date().toISOString()
      };
      console.log('SupabaseDataService - Exported data:', data);
      return data;
    } catch (error) {
      console.error('SupabaseDataService - Error exporting data:', error);
      throw error;
    }
  }
};
