
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
    
    // Create a deep copy of static data to avoid mutations
    const combinedData = JSON.parse(JSON.stringify(projectsData)) as Service[];
    console.log('PortfolioDataService - Static services before combination:', combinedData.map(s => ({ id: s.id, title: s.title, projectCount: s.projects.length })));
    
    // Get existing service IDs from static data
    const existingServiceIds = combinedData.map(s => s.id);
    console.log('PortfolioDataService - Existing service IDs:', existingServiceIds);
    
    // Add missing services that exist in admin but not in static data
    const uniqueAdminServiceIds = [...new Set(adminProjects.map(p => p.serviceId))];
    console.log('PortfolioDataService - Unique admin service IDs:', uniqueAdminServiceIds);
    
    uniqueAdminServiceIds.forEach(serviceId => {
      if (!existingServiceIds.includes(serviceId)) {
        console.log(`PortfolioDataService - Adding missing service: ${serviceId}`);
        let serviceTitle = serviceId;
        let serviceColor: 'cyan' | 'blue' | 'pink' | 'purple' | 'green' = 'blue';
        
        switch (serviceId) {
          case 'mobile-apps':
            serviceTitle = 'Mobile Applications';
            serviceColor = 'purple';
            break;
          case 'ai-automation':
            serviceTitle = 'AI Automation';
            serviceColor = 'green';
            break;
          default:
            serviceTitle = serviceId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
        
        combinedData.push({
          id: serviceId,
          icon: getServiceIcon(serviceId),
          title: serviceTitle,
          color: serviceColor,
          projects: []
        });
      }
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
        image: project.image || '/placeholder.svg', // Ensure image is always present
        industry: project.industry || 'Technology',
        client: project.client || 'Client',
        timeline: project.timeline || '3 months',
        team: project.team || '3 developers',
        technologies: project.technologies || [],
        metrics: project.metrics || {},
        testimonial: project.testimonial || '',
        clientLogo: project.clientLogo || '',
        liveUrl: project.liveUrl || '',
        // Add case study specific fields with defaults
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
    
    // Add admin projects to their respective services
    combinedData.forEach(service => {
      const originalProjectCount = service.projects.length;
      
      if (adminProjectsByService[service.id]) {
        console.log(`PortfolioDataService - Adding ${adminProjectsByService[service.id].length} admin projects to service "${service.id}"`);
        console.log(`PortfolioDataService - Admin projects for "${service.id}":`, adminProjectsByService[service.id].map(p => p.title));
        
        // Add admin projects to the service
        service.projects = [...service.projects, ...adminProjectsByService[service.id]];
        
        console.log(`PortfolioDataService - Service "${service.id}" now has ${service.projects.length} projects (was ${originalProjectCount})`);
        console.log(`PortfolioDataService - All projects in "${service.id}":`, service.projects.map(p => p.title));
      } else {
        console.log(`PortfolioDataService - No admin projects found for service "${service.id}"`);
      }
      
      // Ensure all services have icons
      service.icon = getServiceIcon(service.id);
    });
    
    // Final validation
    console.log('PortfolioDataService - Final combined data summary:');
    combinedData.forEach(service => {
      console.log(`- Service "${service.id}" (${service.title}): ${service.projects.length} projects`);
      service.projects.forEach((project, index) => {
        console.log(`  ${index + 1}. ${project.title} (${project.client || 'No client'})`);
      });
    });
    
    // Check specifically for Crave Kitchen
    const allProjects = combinedData.flatMap(service => service.projects);
    const craveKitchenProject = allProjects.find(p => p.title.toLowerCase().includes('crave kitchen'));
    if (craveKitchenProject) {
      console.log('PortfolioDataService - ✅ Crave Kitchen project found in final data:', craveKitchenProject);
    } else {
      console.log('PortfolioDataService - ❌ Crave Kitchen project NOT found in final data');
      console.log('PortfolioDataService - Available project titles:', allProjects.map(p => p.title));
    }
    
    return combinedData;
  } catch (error) {
    console.error('PortfolioDataService - Error getting portfolio data:', error);
    // Return static data with icons as fallback
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
