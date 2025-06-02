
import { projectsData, Service } from '@/data/projects';
import { adminDataService } from './adminDataService';
import { Code, Cloud, Brain, Smartphone, Zap } from 'lucide-react';

export const getPortfolioData = (): Service[] => {
  // Get admin projects from localStorage
  const adminProjects = adminDataService.getProjects();
  
  // Create a copy of static data
  const combinedData = JSON.parse(JSON.stringify(projectsData)) as Service[];
  
  // Add missing services that exist in admin but not in static data
  const existingServiceIds = combinedData.map(s => s.id);
  
  if (!existingServiceIds.includes('mobile-apps')) {
    combinedData.push({
      id: 'mobile-apps',
      icon: null,
      title: 'Mobile Applications',
      color: 'purple',
      projects: []
    });
  }
  
  if (!existingServiceIds.includes('ai-automation')) {
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
    if (!acc[project.serviceId]) {
      acc[project.serviceId] = [];
    }
    acc[project.serviceId].push(project);
    return acc;
  }, {} as Record<string, any[]>);
  
  // Add admin projects to their respective services
  combinedData.forEach(service => {
    if (adminProjectsByService[service.id]) {
      service.projects = [...service.projects, ...adminProjectsByService[service.id]];
    }
    
    // Set icons for all services
    service.icon = getServiceIcon(service.id);
  });
  
  return combinedData;
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
