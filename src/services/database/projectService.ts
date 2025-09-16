
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/data/projects';
import { DatabaseProject } from './types';
import { transformDbProjectToProject } from './transformers';

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    console.log('ProjectService - Getting projects from database...');
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('ProjectService - Error retrieving projects:', error);
        throw error;
      }

      console.log('ProjectService - Projects retrieved:', data);
      return (data || []).map(transformDbProjectToProject);
    } catch (error) {
      console.error('ProjectService - Error getting projects:', error);
      return [];
    }
  },

  saveProject: async (project: DatabaseProject): Promise<Project> => {
    console.log('ProjectService - Saving project:', project);
    
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
            extended_testimonial: project.extendedTestimonial,
            timeline: project.timeline,
            team: project.team,
            industry: project.industry
          })
          .eq('id', project.id)
          .select()
          .single();

        if (error) throw error;
        console.log('ProjectService - Project updated:', data);
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
            extended_testimonial: project.extendedTestimonial,
            timeline: project.timeline,
            team: project.team,
            industry: project.industry
          })
          .select()
          .single();

        if (error) throw error;
        console.log('ProjectService - Project created:', data);
        return transformDbProjectToProject(data);
      }
    } catch (error) {
      console.error('ProjectService - Error saving project:', error);
      throw error;
    }
  },

  deleteProject: async (id: string): Promise<void> => {
    console.log('ProjectService - Deleting project with id:', id);
    
    try {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id);

      if (error) throw error;
      console.log('ProjectService - Project deleted successfully');
    } catch (error) {
      console.error('ProjectService - Error deleting project:', error);
      throw error;
    }
  }
};
