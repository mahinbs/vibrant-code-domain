
import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaseStudyLoading from '@/components/case-study/CaseStudyLoading';
import CaseStudyComponents from '@/components/case-study/CaseStudyComponents';
import { getProjectSummary, loadFullProject } from '@/services/projectService';
import { Project } from '@/data/projects';

const CaseStudy = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!projectId) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    // Try to get project summary for immediate render
    const summary = getProjectSummary(projectId);
    if (!summary) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    // Load full project data immediately (no artificial delay)
    loadFullProject(projectId).then((fullProject) => {
      if (fullProject) {
        setProject(fullProject);
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    });
  }, [projectId]);

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
