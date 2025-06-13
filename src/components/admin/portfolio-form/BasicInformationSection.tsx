
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminProject } from '@/services/adminDataService';

interface BasicInformationSectionProps {
  formData: AdminProject;
  setFormData: React.Dispatch<React.SetStateAction<AdminProject>>;
}

const BasicInformationSection = ({ formData, setFormData }: BasicInformationSectionProps) => {
  const serviceOptions = [
    { value: 'web-apps', label: 'Web Applications' },
    { value: 'saas', label: 'SaaS Solutions' },
    { value: 'mobile-apps', label: 'Mobile Applications' },
    { value: 'ai-automation', label: 'AI Automation' },
    { value: 'ai-calling', label: 'AI Calling' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Project title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client">Client Name *</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
              placeholder="Client name"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">URL Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            placeholder="url-friendly-slug (auto-generated from title)"
            disabled={!formData.id} // Only allow manual editing when editing existing projects
          />
          <p className="text-sm text-gray-500">
            {formData.id ? 'You can manually edit the slug for existing projects' : 'Slug will be auto-generated from title, client, industry and technologies'}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Brief project description"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="serviceId">Service Category *</Label>
            <Select
              value={formData.serviceId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, serviceId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
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
              placeholder="e.g., E-commerce, Healthcare"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="image">Project Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              type="url"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input
              id="liveUrl"
              value={formData.liveUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
              placeholder="https://example.com"
              type="url"
            />
          </div>
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
  );
};

export default BasicInformationSection;
