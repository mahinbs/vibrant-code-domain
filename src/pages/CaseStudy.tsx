
import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaseStudyLoading from '@/components/case-study/CaseStudyLoading';
import { getProjectSummary, loadFullProject } from '@/services/projectService';
import { Project } from '@/data/projects';

// Lazy load heavy components
const CaseStudyHero = lazy(() => import('@/components/case-study/CaseStudyHero'));
const CaseStudyOverview = lazy(() => import('@/components/case-study/CaseStudyOverview'));
const CaseStudyResults = lazy(() => import('@/components/case-study/CaseStudyResults'));
const CaseStudyGallery = lazy(() => import('@/components/case-study/CaseStudyGallery'));

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

    // First, try to get project summary for immediate render
    const summary = getProjectSummary(projectId);
    if (!summary) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    // Load full project data
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
      <Suspense fallback={<div className="h-screen bg-gray-900" />}>
        <CaseStudyHero project={project} />
        <CaseStudyOverview project={project} />
        <CaseStudyResults project={project} />
        <CaseStudyGallery project={project} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default CaseStudy;
