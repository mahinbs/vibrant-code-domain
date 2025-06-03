
import { Project } from '@/data/projects';
import CaseStudyHero from './CaseStudyHero';
import CaseStudyOverview from './CaseStudyOverview';
import CaseStudyResults from './CaseStudyResults';
import CaseStudyGallery from './CaseStudyGallery';

interface CaseStudyComponentsProps {
  project: Project;
}

const CaseStudyComponents = ({ project }: CaseStudyComponentsProps) => {
  return (
    <>
      <CaseStudyHero project={project} />
      <CaseStudyOverview project={project} />
      <CaseStudyResults project={project} />
      <CaseStudyGallery project={project} />
    </>
  );
};

export default CaseStudyComponents;
