
import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaseStudyLoading from '@/components/case-study/CaseStudyLoading';
import CaseStudyComponents from '@/components/case-study/CaseStudyComponents';
import { getProjectSummary, loadFullProject } from '@/services/projectService';
import { onProjectsChange } from '@/services/caseStudyDataService';
import { extractIdFromSlug } from '@/lib/slugUtils';
import { Project } from '@/data/projects';

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    const loadProject = async () => {
      try {
        console.log('CaseStudy - Loading project with slug:', slug);
        
        // First try to find project by slug directly
        let fullProject = await loadFullProject(slug);
        
        // If not found by slug, try to extract ID for backwards compatibility
        if (!fullProject && slug.includes('-')) {
          const projectId = extractIdFromSlug(slug);
          console.log('CaseStudy - Trying with extracted ID:', projectId);
          fullProject = await loadFullProject(projectId);
        }
        
        // If still not found, try just using the slug as an ID
        if (!fullProject) {
          console.log('CaseStudy - Trying slug as direct ID:', slug);
          fullProject = await loadFullProject(slug);
        }
        
        if (fullProject) {
          console.log('CaseStudy - Project found:', fullProject.title);
          setProject(fullProject);
          
          // Update URL to use SEO-friendly slug if user accessed via old ID
          if (fullProject.slug && slug !== fullProject.slug && !slug.includes('-')) {
            window.history.replaceState(null, '', `/case-study/${fullProject.slug}`);
          }
        } else {
          console.log('CaseStudy - Project not found for slug:', slug);
          setNotFound(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading project:', error);
        setNotFound(true);
        setIsLoading(false);
      }
    };

    loadProject();

    // Listen for data changes
    const cleanup = onProjectsChange(() => {
      loadProject();
    });

    return cleanup;
  }, [slug]);

  useEffect(() => {
    // Update page title and meta description for SEO
    if (project) {
      document.title = `${project.title} - Case Study | Boostmysites`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `${project.description} Case study showcasing ${project.technologies.join(', ')} for ${project.client} in ${project.industry} industry.`
        );
      }
    }
  }, [project]);

  if (notFound) {
    return <Navigate to="/portfolio" replace />;
  }

  if (isLoading || !project) {
    return <CaseStudyLoading />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <CaseStudyComponents project={project} />
      <Footer />
    </div>
  );
};

export default CaseStudy;
