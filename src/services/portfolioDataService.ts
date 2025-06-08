
import { Service } from '@/data/projects';
import { adminDataService } from './adminDataService';
import { Code, Cloud, Brain, Smartphone, Zap } from 'lucide-react';

export const getPortfolioData = async (): Promise<Service[]> => {
  console.log('PortfolioDataService - Getting portfolio data from database only...');
  
  try {
    // Get only admin projects from database (no static data)
    const adminProjects = await adminDataService.getProjects();
    console.log('PortfolioDataService - Admin projects retrieved:', adminProjects);
    console.log('PortfolioDataService - Number of admin projects:', adminProjects.length);
    
    // Log each admin project details
    adminProjects.forEach((project, index) => {
      console.log(`PortfolioDataService - Admin Project ${index + 1}:`, {
        id: project.id,
        title: project.title,
        serviceId: project.serviceId,
        client: project.client,
        description: project.description,
        image: project.image
      });
    });
    
    // Group admin projects by service
    const adminProjectsByService = adminProjects.reduce((acc, project) => {
      console.log(`PortfolioDataService - Processing admin project "${project.title}" for service "${project.serviceId}"`);
      if (!acc[project.serviceId]) {
        acc[project.serviceId] = [];
      }
      
      // Transform admin project to match the expected Project interface
      const transformedProject = {
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image || '/placeholder.svg',
        industry: project.industry || 'Technology',
        client: project.client || 'Client',
        timeline: project.timeline || '3 months',
        team: project.team || '3 developers',
        technologies: project.technologies || [],
        metrics: project.metrics || {},
        testimonial: project.testimonial || '',
        clientLogo: project.clientLogo || '',
        liveUrl: project.liveUrl || '',
        challenge: project.challenge || 'Challenge details coming soon...',
        solution: project.solution || 'Solution details coming soon...',
        approach: project.approach || [],
        gallery: project.gallery || [],
        detailedMetrics: project.detailedMetrics || [],
        techStack: project.techStack || [],
        features: project.features || [],
        extendedTestimonial: project.extendedTestimonial || {
          quote: project.testimonial || '',
          author: 'Client Representative',
          position: 'Project Manager',
          company: project.client || 'Client Company'
        }
      };
      
      acc[project.serviceId].push(transformedProject);
      console.log(`PortfolioDataService - Added transformed project "${transformedProject.title}" to service "${project.serviceId}"`);
      return acc;
    }, {} as Record<string, any[]>);
    
    console.log('PortfolioDataService - Admin projects grouped by service:', 
      Object.entries(adminProjectsByService).map(([serviceId, projects]) => ({
        serviceId,
        projectCount: projects.length,
        projectTitles: projects.map(p => p.title)
      }))
    );
    
    // Create services only for those that have actual projects
    const services: Service[] = [];
    const serviceConfigs = {
      'web-apps': { title: 'Web Applications', color: 'cyan' as const },
      'saas': { title: 'SAAS Solutions', color: 'blue' as const },
      'mobile-apps': { title: 'Mobile Applications', color: 'purple' as const },
      'ai-calling': { title: 'AI Calling Agency', color: 'pink' as const },
      'ai-automation': { title: 'AI Automation', color: 'green' as const }
    };
    
    // Only create service objects for services that have projects
    Object.entries(adminProjectsByService).forEach(([serviceId, projects]) => {
      const config = serviceConfigs[serviceId as keyof typeof serviceConfigs];
      if (config && projects.length > 0) {
        console.log(`PortfolioDataService - Creating service "${serviceId}" with ${projects.length} projects`);
        services.push({
          id: serviceId,
          icon: getServiceIcon(serviceId),
          title: config.title,
          color: config.color,
          projects: projects
        });
      }
    });
    
    // Final validation
    console.log('PortfolioDataService - Final services created:');
    services.forEach(service => {
      console.log(`- Service "${service.id}" (${service.title}): ${service.projects.length} projects`);
      service.projects.forEach((project, index) => {
        console.log(`  ${index + 1}. ${project.title} (${project.client || 'No client'})`);
      });
    });
    
    // Check specifically for Crave Kitchen
    const allProjects = services.flatMap(service => service.projects);
    const craveKitchenProject = allProjects.find(p => p.title.toLowerCase().includes('crave kitchen'));
    if (craveKitchenProject) {
      console.log('PortfolioDataService - ✅ Crave Kitchen project found in final data:', craveKitchenProject);
    } else {
      console.log('PortfolioDataService - ❌ Crave Kitchen project NOT found in final data');
      console.log('PortfolioDataService - Available project titles:', allProjects.map(p => p.title));
    }
    
    return services;
  } catch (error) {
    console.error('PortfolioDataService - Error getting portfolio data:', error);
    // Return empty array as fallback (no static data)
    return [];
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
