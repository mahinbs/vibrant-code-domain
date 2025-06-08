
import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaseStudyLoading from '@/components/case-study/CaseStudyLoading';
import CaseStudyComponents from '@/components/case-study/CaseStudyComponents';
import { getProjectSummary, loadFullProject } from '@/services/projectService';
import { onProjectsChange } from '@/services/caseStudyDataService';
import { Project } from '@/data/projects';

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    const loadProject = async () => {
      try {
        // Try to get project summary for immediate render
        const summary = await getProjectSummary(id);
        if (!summary) {
          setNotFound(true);
          setIsLoading(false);
          return;
        }

        // Load full project data
        const fullProject = await loadFullProject(id);
        if (fullProject) {
          setProject(fullProject);
        } else {
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
  }, [id]);

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
