
import { supabaseDataService } from './supabaseDataService';
import { projectsData } from '@/data/projects';
import { blogsData } from '@/data/blogs';

export const dataMigrationService = {
  migrateAllData: async () => {
    console.log('DataMigration - Starting migration of all static data to database...');
    
    try {
      // Extract all projects from static data
      const allProjects = projectsData.flatMap(service => service.projects);
      console.log(`DataMigration - Found ${allProjects.length} projects to migrate`);
      
      // Migrate projects
      const migratedProjects = [];
      for (const project of allProjects) {
        console.log(`DataMigration - Migrating project: ${project.title}`);
        try {
          const migratedProject = await supabaseDataService.saveProject({
            title: project.title,
            client: project.client,
            serviceId: project.serviceId,
            description: project.description,
            challenge: project.challenge,
            solution: project.solution,
            image: project.image,
            liveUrl: project.liveUrl,
            technologies: project.technologies,
            detailedMetrics: project.detailedMetrics,
            gallery: project.gallery,
            extendedTestimonial: project.extendedTestimonial
          });
          migratedProjects.push(migratedProject);
          console.log(`DataMigration - Successfully migrated project: ${project.title}`);
        } catch (error) {
          console.error(`DataMigration - Failed to migrate project ${project.title}:`, error);
        }
      }
      
      // Migrate blogs
      console.log(`DataMigration - Found ${blogsData.length} blogs to migrate`);
      const migratedBlogs = [];
      for (const blog of blogsData) {
        console.log(`DataMigration - Migrating blog: ${blog.title}`);
        try {
          const migratedBlog = await supabaseDataService.saveBlog({
            title: blog.title,
            content: blog.content,
            excerpt: blog.excerpt,
            author: blog.author,
            publishedDate: blog.publishedDate,
            readingTime: blog.readingTime,
            tags: blog.tags,
            featuredImage: blog.featuredImage
          });
          migratedBlogs.push(migratedBlog);
          console.log(`DataMigration - Successfully migrated blog: ${blog.title}`);
        } catch (error) {
          console.error(`DataMigration - Failed to migrate blog ${blog.title}:`, error);
        }
      }
      
      console.log('DataMigration - Migration completed successfully!');
      console.log(`DataMigration - Migrated ${migratedProjects.length} projects and ${migratedBlogs.length} blogs`);
      
      return {
        success: true,
        projectsCount: migratedProjects.length,
        blogsCount: migratedBlogs.length,
        projects: migratedProjects,
        blogs: migratedBlogs
      };
      
    } catch (error) {
      console.error('DataMigration - Migration failed:', error);
      return {
        success: false,
        error: error.message || 'Unknown error during migration'
      };
    }
  },

  checkDataExists: async () => {
    try {
      const projects = await supabaseDataService.getProjects();
      const blogs = await supabaseDataService.getBlogs();
      
      return {
        projectsCount: projects.length,
        blogsCount: blogs.length,
        hasData: projects.length > 0 || blogs.length > 0
      };
    } catch (error) {
      console.error('DataMigration - Error checking existing data:', error);
      return {
        projectsCount: 0,
        blogsCount: 0,
        hasData: false,
        error: error.message
      };
    }
  }
};
