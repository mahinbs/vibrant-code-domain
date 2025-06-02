import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminDataService, AdminProject } from '@/services/adminDataService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, X } from 'lucide-react';

const services = [
  { id: 'web-apps', label: 'Web Applications' },
  { id: 'saas', label: 'SAAS Solutions' },
  { id: 'mobile-apps', label: 'Mobile Applications' },
  { id: 'ai-calling', label: 'AI Calling Agency' },
  { id: 'ai-automation', label: 'AI Automation' }
];

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

  const [techInput, setTechInput] = useState('');
  const [approachInput, setApproachInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [galleryInput, setGalleryInput] = useState('');

  // Tech Stack inputs
  const [techStackCategory, setTechStackCategory] = useState('');
  const [techStackTechnology, setTechStackTechnology] = useState('');

  // Detailed Metrics inputs
  const [metricLabel, setMetricLabel] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [metricDescription, setMetricDescription] = useState('');

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
      navigate('/admin/portfolios');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addApproach = () => {
    if (approachInput.trim() && !formData.approach.includes(approachInput.trim())) {
      setFormData(prev => ({
        ...prev,
        approach: [...prev.approach, approachInput.trim()]
      }));
      setApproachInput('');
    }
  };

  const removeApproach = (approach: string) => {
    setFormData(prev => ({
      ...prev,
      approach: prev.approach.filter(a => a !== approach)
    }));
  };

  const addFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  // New Tech Stack functions
  const addTechStack = () => {
    if (techStackCategory.trim() && techStackTechnology.trim()) {
      setFormData(prev => {
        const existingCategoryIndex = prev.techStack.findIndex(ts => ts.category === techStackCategory.trim());
        
        if (existingCategoryIndex >= 0) {
          // Add to existing category
          const updatedTechStack = [...prev.techStack];
          if (!updatedTechStack[existingCategoryIndex].technologies.includes(techStackTechnology.trim())) {
            updatedTechStack[existingCategoryIndex].technologies.push(techStackTechnology.trim());
          }
          return { ...prev, techStack: updatedTechStack };
        } else {
          // Create new category
          return {
            ...prev,
            techStack: [...prev.techStack, {
              category: techStackCategory.trim(),
              technologies: [techStackTechnology.trim()]
            }]
          };
        }
      });
      setTechStackTechnology('');
    }
  };

  const removeTechFromStack = (categoryIndex: number, techIndex: number) => {
    setFormData(prev => {
      const updatedTechStack = [...prev.techStack];
      updatedTechStack[categoryIndex].technologies.splice(techIndex, 1);
      
      // Remove category if empty
      if (updatedTechStack[categoryIndex].technologies.length === 0) {
        updatedTechStack.splice(categoryIndex, 1);
      }
      
      return { ...prev, techStack: updatedTechStack };
    });
  };

  // Detailed Metrics functions
  const addDetailedMetric = () => {
    if (metricLabel.trim() && metricValue.trim() && metricDescription.trim()) {
      setFormData(prev => ({
        ...prev,
        detailedMetrics: [...prev.detailedMetrics, {
          label: metricLabel.trim(),
          value: metricValue.trim(),
          description: metricDescription.trim()
        }]
      }));
      setMetricLabel('');
      setMetricValue('');
      setMetricDescription('');
    }
  };

  const removeDetailedMetric = (index: number) => {
    setFormData(prev => ({
      ...prev,
      detailedMetrics: prev.detailedMetrics.filter((_, i) => i !== index)
    }));
  };

  // Gallery functions
  const addGalleryImage = () => {
    if (galleryInput.trim() && !formData.gallery.includes(galleryInput.trim())) {
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, galleryInput.trim()]
      }));
      setGalleryInput('');
    }
  };

  const removeGalleryImage = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter(url => url !== imageUrl)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/portfolios')}>
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
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Project title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                  placeholder="Client name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Project description"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceId">Service *</Label>
                <Select value={formData.serviceId} onValueChange={(value) => setFormData(prev => ({ ...prev, serviceId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  placeholder="e.g., Healthcare, Finance"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline</Label>
                <Input
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                  placeholder="e.g., 12 weeks"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team">Team Size</Label>
                <Input
                  id="team"
                  value={formData.team}
                  onChange={(e) => setFormData(prev => ({ ...prev, team: e.target.value }))}
                  placeholder="e.g., 5 developers"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Featured Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientLogo">Client Logo URL</Label>
              <Input
                id="clientLogo"
                value={formData.clientLogo}
                onChange={(e) => setFormData(prev => ({ ...prev, clientLogo: e.target.value }))}
                placeholder="https://example.com/logo.jpg"
                type="url"
              />
            </div>
          </CardContent>
        </Card>

        {/* Basic Technologies (Legacy) */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Technologies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add technology"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              />
              <Button type="button" onClick={addTechnology}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech) => (
                <span key={tech} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {tech}
                  <button type="button" onClick={() => removeTechnology(tech)} className="text-blue-600 hover:text-blue-800">×</button>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack (Structured) */}
        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Input
                value={techStackCategory}
                onChange={(e) => setTechStackCategory(e.target.value)}
                placeholder="Category (e.g., Frontend)"
              />
              <Input
                value={techStackTechnology}
                onChange={(e) => setTechStackTechnology(e.target.value)}
                placeholder="Technology (e.g., React)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
              />
              <Button type="button" onClick={addTechStack}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.techStack.map((category, categoryIndex) => (
                <div key={category.category} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{category.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech, techIndex) => (
                      <span key={tech} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        {tech}
                        <button 
                          type="button" 
                          onClick={() => removeTechFromStack(categoryIndex, techIndex)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results & Impact (Detailed Metrics) */}
        <Card>
          <CardHeader>
            <CardTitle>Results & Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <Input
                value={metricLabel}
                onChange={(e) => setMetricLabel(e.target.value)}
                placeholder="Metric label"
              />
              <Input
                value={metricValue}
                onChange={(e) => setMetricValue(e.target.value)}
                placeholder="Value (e.g., +75%)"
              />
              <Input
                value={metricDescription}
                onChange={(e) => setMetricDescription(e.target.value)}
                placeholder="Description"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDetailedMetric())}
              />
              <Button type="button" onClick={addDetailedMetric}>
                <Plus className="h-4 w-4 mr-2" />
                Add Metric
              </Button>
            </div>
            
            <div className="space-y-2">
              {formData.detailedMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded border">
                  <div>
                    <span className="font-semibold">{metric.label}:</span>
                    <span className="ml-2 text-blue-600">{metric.value}</span>
                    <p className="text-sm text-gray-600">{metric.description}</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => removeDetailedMetric(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gallery */}
        <Card>
          <CardHeader>
            <CardTitle>Project Gallery</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={galleryInput}
                onChange={(e) => setGalleryInput(e.target.value)}
                placeholder="Image URL"
                type="url"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryImage())}
              />
              <Button type="button" onClick={addGalleryImage}>
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formData.gallery.map((imageUrl) => (
                <div key={imageUrl} className="relative border rounded-lg overflow-hidden">
                  <img src={imageUrl} alt="Gallery" className="w-full h-32 object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeGalleryImage(imageUrl)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Case Study Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="challenge">Challenge</Label>
              <Textarea
                id="challenge"
                value={formData.challenge}
                onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
                placeholder="What challenge did this project solve?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="solution">Solution</Label>
              <Textarea
                id="solution"
                value={formData.solution}
                onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
                placeholder="How did you solve the challenge?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Approach</Label>
              <div className="flex gap-2">
                <Input
                  value={approachInput}
                  onChange={(e) => setApproachInput(e.target.value)}
                  placeholder="Add approach step"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addApproach())}
                />
                <Button type="button" onClick={addApproach}>Add</Button>
              </div>
              <div className="space-y-2">
                {formData.approach.map((approach) => (
                  <div key={approach} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span>{approach}</span>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeApproach(approach)}>Remove</Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Features</Label>
              <div className="flex gap-2">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Add feature"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <Button type="button" onClick={addFeature}>Add</Button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feature) => (
                  <div key={feature} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span>{feature}</span>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeFeature(feature)}>Remove</Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testimonial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="testimonial-text">Testimonial Text</Label>
              <Textarea
                id="testimonial-text"
                value={formData.extendedTestimonial.quote}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  extendedTestimonial: { ...prev.extendedTestimonial, quote: e.target.value }
                }))}
                placeholder="Client testimonial"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="testimonial-author">Author</Label>
                <Input
                  id="testimonial-author"
                  value={formData.extendedTestimonial.author}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    extendedTestimonial: { ...prev.extendedTestimonial, author: e.target.value }
                  }))}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testimonial-position">Position</Label>
                <Input
                  id="testimonial-position"
                  value={formData.extendedTestimonial.position}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    extendedTestimonial: { ...prev.extendedTestimonial, position: e.target.value }
                  }))}
                  placeholder="CEO"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testimonial-company">Company</Label>
                <Input
                  id="testimonial-company"
                  value={formData.extendedTestimonial.company}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    extendedTestimonial: { ...prev.extendedTestimonial, company: e.target.value }
                  }))}
                  placeholder="Company Name"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit">
            {isEdit ? 'Update Portfolio' : 'Create Portfolio'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/portfolios')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioForm;
