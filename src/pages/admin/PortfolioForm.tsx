
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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

// Comprehensive validation schema for portfolio form
const portfolioSchema = z.object({
  title: z.string().min(1, 'Title is required').min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(1, 'Slug is required'),
  client: z.string().min(1, 'Client name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  metrics: z.record(z.string()),
  timeline: z.string().min(1, 'Timeline is required'),
  team: z.string().min(1, 'Team information is required'),
  industry: z.string().min(1, 'Industry is required'),
  testimonial: z.string().min(10, 'Testimonial must be at least 10 characters'),
  clientLogo: z.string().url('Please enter a valid URL for client logo').or(z.literal('')),
  image: z.string().url('Please enter a valid URL for project image').or(z.literal('')),
  serviceId: z.string().min(1, 'Service is required'),
  liveUrl: z.string().url('Please enter a valid live URL').or(z.literal('')).optional(),
  challenge: z.string().min(10, 'Challenge description must be at least 10 characters'),
  solution: z.string().min(10, 'Solution description must be at least 10 characters'),
  approach: z.array(z.string()).min(1, 'At least one approach step is required'),
  gallery: z.array(z.string()).min(1, 'At least one gallery image is required'),
  detailedMetrics: z.array(z.object({
    label: z.string().min(1, 'Metric label is required'),
    value: z.string().min(1, 'Metric value is required'),
    description: z.string().min(1, 'Metric description is required'),
  })).min(1, 'At least one detailed metric is required'),
  techStack: z.array(z.object({
    category: z.string().min(1, 'Category is required'),
    technologies: z.array(z.string()).min(1, 'At least one technology per category is required'),
  })).min(1, 'At least one tech stack category is required'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  extendedTestimonial: z.object({
    quote: z.string().min(10, 'Testimonial quote must be at least 10 characters'),
    author: z.string().min(1, 'Author name is required'),
    position: z.string().min(1, 'Position is required'),
    company: z.string().min(1, 'Company name is required'),
  }),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

const PortfolioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
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
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      const loadProject = async () => {
        try {
          setLoading(true);
          const projects = await adminDataService.getProjects();
          const project = projects.find(p => p.id === id);
          if (project) {
            form.reset(project);
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
  }, [id, isEdit, navigate, toast, form]);

  // Auto-generate slug when relevant fields change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name && ['title', 'client', 'industry', 'technologies'].includes(name) && !isEdit) {
        const title = form.getValues('title');
        const client = form.getValues('client');
        const industry = form.getValues('industry');
        const technologies = form.getValues('technologies');
        
        if (title && client && industry && technologies.length > 0) {
          const generatedSlug = generateProjectSlug({
            title,
            client,
            industry,
            technologies
          });
          form.setValue('slug', generatedSlug);
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, isEdit]);

  const onSubmit = async (data: PortfolioFormData) => {
    try {
      setSaving(true);
      const projectData = {
        ...data,
        // Ensure slug is generated if not present
        slug: data.slug || generateProjectSlug({
          title: data.title,
          client: data.client,
          industry: data.industry,
          technologies: data.technologies
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

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BasicInformationSection formData={form.getValues()} setFormData={(data) => form.reset({ ...form.getValues(), ...data })} />
        <TechnologiesSection formData={form.getValues()} setFormData={(data) => form.reset({ ...form.getValues(), ...data })} />
        <TechStackSection formData={form.getValues()} setFormData={(data) => form.reset({ ...form.getValues(), ...data })} />
        <ResultsMetricsSection formData={form.getValues()} setFormData={(data) => form.reset({ ...form.getValues(), ...data })} />
        <GallerySection formData={form.getValues()} setFormData={(data) => form.reset({ ...form.getValues(), ...data })} />
        <CaseStudyDetailsSection formData={form.getValues()} setFormData={(data) => form.reset({ ...form.getValues(), ...data })} />
        <TestimonialSection formData={form.getValues()} setFormData={(data) => form.reset({ ...form.getValues(), ...data })} />

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
