
import { projectsData, Service } from '@/data/projects';
import { adminDataService } from './adminDataService';
import { Code, Cloud, Brain, Smartphone, Zap } from 'lucide-react';

export const getPortfolioData = async (): Promise<Service[]> => {
  console.log('PortfolioDataService - Getting portfolio data...');
  
  try {
    // Get admin projects from database
    const adminProjects = await adminDataService.getProjects();
    console.log('PortfolioDataService - Admin projects retrieved:', adminProjects);
    console.log('PortfolioDataService - Number of admin projects:', adminProjects.length);
    
    // Create a copy of static data
    const combinedData = JSON.parse(JSON.stringify(projectsData)) as Service[];
    console.log('PortfolioDataService - Static projects data:', combinedData);
    
    // Add missing services that exist in admin but not in static data
    const existingServiceIds = combinedData.map(s => s.id);
    console.log('PortfolioDataService - Existing service IDs:', existingServiceIds);
    
    if (!existingServiceIds.includes('mobile-apps')) {
      console.log('PortfolioDataService - Adding mobile-apps service');
      combinedData.push({
        id: 'mobile-apps',
        icon: null,
        title: 'Mobile Applications',
        color: 'purple',
        projects: []
      });
    }
    
    if (!existingServiceIds.includes('ai-automation')) {
      console.log('PortfolioDataService - Adding ai-automation service');
      combinedData.push({
        id: 'ai-automation',
        icon: null,
        title: 'AI Automation',
        color: 'green',
        projects: []
      });
    }
    
    // Group admin projects by service
    const adminProjectsByService = adminProjects.reduce((acc, project) => {
      console.log('PortfolioDataService - Processing admin project:', project.title, 'for service:', project.serviceId);
      if (!acc[project.serviceId]) {
        acc[project.serviceId] = [];
      }
      acc[project.serviceId].push(project);
      return acc;
    }, {} as Record<string, any[]>);
    
    console.log('PortfolioDataService - Admin projects grouped by service:', adminProjectsByService);
    
    // Add admin projects to their respective services
    combinedData.forEach(service => {
      const originalProjectCount = service.projects.length;
      
      if (adminProjectsByService[service.id]) {
        console.log(`PortfolioDataService - Adding ${adminProjectsByService[service.id].length} admin projects to service ${service.id}`);
        service.projects = [...service.projects, ...adminProjectsByService[service.id]];
      }
      
      // Set icons for all services
      service.icon = getServiceIcon(service.id);
      
      console.log(`PortfolioDataService - Service ${service.id} now has ${service.projects.length} projects (was ${originalProjectCount})`);
    });
    
    console.log('PortfolioDataService - Final combined data:', combinedData);
    
    return combinedData;
  } catch (error) {
    console.error('PortfolioDataService - Error getting portfolio data:', error);
    // Return static data as fallback
    return projectsData.map(service => ({
      ...service,
      icon: getServiceIcon(service.id)
    }));
  }
};

const getServiceIcon = (serviceId: string) => {
  switch (serviceId) {
    case 'web-apps': return Code;
    case 'saas': return Cloud;
    case 'mobile-apps': return Smartphone;
    case 'ai-calling': return Brain;
    case 'ai-automation': return Zap;
    default: return Code;
  }
};
