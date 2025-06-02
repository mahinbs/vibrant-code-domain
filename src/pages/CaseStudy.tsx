
import { useParams, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudyOverview from '@/components/case-study/CaseStudyOverview';
import CaseStudyResults from '@/components/case-study/CaseStudyResults';
import CaseStudyGallery from '@/components/case-study/CaseStudyGallery';
import { projectsData } from '@/data/projects';

const CaseStudy = () => {
  const { projectId } = useParams<{ projectId: string }>();

  // Find the project across all services
  const project = projectsData
    .flatMap(service => service.projects)
    .find(p => p.id === projectId);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <CaseStudyHero project={project} />
      <CaseStudyOverview project={project} />
      <CaseStudyResults project={project} />
      <CaseStudyGallery project={project} />
      <Footer />
    </div>
  );
};

export default CaseStudy;
