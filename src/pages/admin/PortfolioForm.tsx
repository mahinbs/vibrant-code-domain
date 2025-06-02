
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminDataService, AdminProject } from '@/services/adminDataService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import BasicInformationSection from '@/components/admin/portfolio-form/BasicInformationSection';
import TechnologiesSection from '@/components/admin/portfolio-form/TechnologiesSection';
import TechStackSection from '@/components/admin/portfolio-form/TechStackSection';
import ResultsMetricsSection from '@/components/admin/portfolio-form/ResultsMetricsSection';
import GallerySection from '@/components/admin/portfolio-form/GallerySection';
import CaseStudyDetailsSection from '@/components/admin/portfolio-form/CaseStudyDetailsSection';
import TestimonialSection from '@/components/admin/portfolio-form/TestimonialSection';

const PortfolioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<AdminProject>({
    title: '',
    client: '',
    description: '',
    technologies: [],
    metrics: {},
    timeline: '',
    team: '',
    industry: '',
    testimonial: '',
    clientLogo: '',
    image: '',
    serviceId: '',
    liveUrl: '',
    challenge: '',
    solution: '',
    approach: [],
    gallery: [],
    detailedMetrics: [],
    techStack: [],
    features: [],
    extendedTestimonial: {
      quote: '',
      author: '',
      position: '',
      company: ''
    }
  });

  useEffect(() => {
    if (isEdit && id) {
      const projects = adminDataService.getProjects();
      const project = projects.find(p => p.id === id);
      if (project) {
        setFormData(project);
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.serviceId) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      adminDataService.saveProject(formData);
      toast({
        title: isEdit ? "Portfolio updated" : "Portfolio created",
        description: `The portfolio has been successfully ${isEdit ? 'updated' : 'created'}.`,
      });
      navigate('/secure-management-portal-x7k9/portfolios');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/secure-management-portal-x7k9/portfolios')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Portfolios
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Edit Portfolio' : 'Add New Portfolio'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Update portfolio details' : 'Create a new portfolio project'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <BasicInformationSection formData={formData} setFormData={setFormData} />
        <TechnologiesSection formData={formData} setFormData={setFormData} />
        <TechStackSection formData={formData} setFormData={setFormData} />
        <ResultsMetricsSection formData={formData} setFormData={setFormData} />
        <GallerySection formData={formData} setFormData={setFormData} />
        <CaseStudyDetailsSection formData={formData} setFormData={setFormData} />
        <TestimonialSection formData={formData} setFormData={setFormData} />

        <div className="flex gap-4">
          <Button type="submit">
            {isEdit ? 'Update Portfolio' : 'Create Portfolio'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/secure-management-portal-x7k9/portfolios')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioForm;
