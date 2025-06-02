
import { projectService } from './projectService';
import { blogService } from './blogService';

export const dataExportService = {
  exportData: async () => {
    console.log('DataExportService - Exporting data...');
    try {
      const projects = await projectService.getProjects();
      const blogs = await blogService.getBlogs();
      
      const data = {
        projects,
        blogs,
        exportDate: new Date().toISOString()
      };
      console.log('DataExportService - Exported data:', data);
      return data;
    } catch (error) {
      console.error('DataExportService - Error exporting data:', error);
      throw error;
    }
  }
};
