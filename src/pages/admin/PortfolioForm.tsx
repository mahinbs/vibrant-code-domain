
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminDataService, AdminProject } from '@/services/adminDataService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const PortfolioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<AdminProject>({
    title: '',
    description: '',
    service: '',
    client: '',
    url: '',
    image: '',
    technologies: [],
    challenge: '',
    solution: '',
    results: [],
    testimonial: {
      text: '',
      author: '',
      role: '',
      company: ''
    },
    gallery: []
  });

  const [techInput, setTechInput] = useState('');
  const [resultInput, setResultInput] = useState('');

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
    
    if (!formData.title || !formData.description || !formData.service) {
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

  const addResult = () => {
    if (resultInput.trim() && !formData.results.includes(resultInput.trim())) {
      setFormData(prev => ({
        ...prev,
        results: [...prev.results, resultInput.trim()]
      }));
      setResultInput('');
    }
  };

  const removeResult = (result: string) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter(r => r !== result)
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
                <Label htmlFor="service">Service *</Label>
                <Input
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                  placeholder="e.g., Web Development"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Project URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://example.com"
                  type="url"
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technologies</CardTitle>
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
              <Label>Results</Label>
              <div className="flex gap-2">
                <Input
                  value={resultInput}
                  onChange={(e) => setResultInput(e.target.value)}
                  placeholder="Add result"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResult())}
                />
                <Button type="button" onClick={addResult}>Add</Button>
              </div>
              <div className="space-y-2">
                {formData.results.map((result) => (
                  <div key={result} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span>{result}</span>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeResult(result)}>Remove</Button>
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
                value={formData.testimonial.text}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  testimonial: { ...prev.testimonial, text: e.target.value }
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
                  value={formData.testimonial.author}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    testimonial: { ...prev.testimonial, author: e.target.value }
                  }))}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testimonial-role">Role</Label>
                <Input
                  id="testimonial-role"
                  value={formData.testimonial.role}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    testimonial: { ...prev.testimonial, role: e.target.value }
                  }))}
                  placeholder="CEO"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testimonial-company">Company</Label>
                <Input
                  id="testimonial-company"
                  value={formData.testimonial.company}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    testimonial: { ...prev.testimonial, company: e.target.value }
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
