
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminDataService, AdminProject } from '@/services/adminDataService';
import { generateProjectSlug } from '@/lib/slugUtils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2 } from 'lucide-react';
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

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<AdminProject>({
    title: '',
    slug: '',
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
      const loadProject = async () => {
        try {
          setLoading(true);
          const projects = await adminDataService.getProjects();
          const project = projects.find(p => p.id === id);
          if (project) {
            setFormData(project);
          } else {
            toast({
              title: "Project not found",
              description: "The project you're trying to edit doesn't exist.",
              variant: "destructive",
            });
            navigate('/admin/portfolio');
          }
        } catch (error) {
          console.error('Error loading project:', error);
          toast({
            title: "Error",
            description: "Failed to load project. Please try again.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };
      loadProject();
    }
  }, [id, isEdit, navigate, toast]);

  // Auto-generate slug when relevant fields change
  useEffect(() => {
    if (formData.title && formData.client && formData.industry && formData.technologies.length > 0 && !isEdit) {
      const generatedSlug = generateProjectSlug({
        title: formData.title,
        client: formData.client,
        industry: formData.industry,
        technologies: formData.technologies
      });
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, formData.client, formData.industry, formData.technologies, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
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
      setSaving(true);
      const projectData = {
        ...formData,
        // Ensure slug is generated if not present
        slug: formData.slug || generateProjectSlug({
          title: formData.title,
          client: formData.client,
          industry: formData.industry,
          technologies: formData.technologies
        })
      };
      await adminDataService.saveProject(projectData);
      toast({
        title: isEdit ? "Portfolio updated" : "Portfolio created",
        description: `The portfolio has been successfully ${isEdit ? 'updated' : 'created'}.`,
      });
      navigate('/admin/portfolio');
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        <span className="ml-2 text-black">Loading project...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-3">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/portfolio')} className="border-gray-600 text-gray-900 hover:bg-gray-700 hover:text-white">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Portfolios
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-black">
            {isEdit ? 'Edit Portfolio' : 'Add New Portfolio'}
          </h1>
          <p className="text-gray-400">
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
          <Button 
            type="submit" 
            disabled={saving}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isEdit ? 'Update Portfolio' : 'Create Portfolio'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/portfolio')}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioForm;
