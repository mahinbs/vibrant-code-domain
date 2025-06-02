
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminProject } from '@/services/adminDataService';

const services = [
  { id: 'web-apps', label: 'Web Applications' },
  { id: 'saas', label: 'SAAS Solutions' },
  { id: 'mobile-apps', label: 'Mobile Applications' },
  { id: 'ai-calling', label: 'AI Calling Agency' },
  { id: 'ai-automation', label: 'AI Automation' }
];

interface BasicInformationSectionProps {
  formData: AdminProject;
  setFormData: React.Dispatch<React.SetStateAction<AdminProject>>;
}

const BasicInformationSection = ({ formData, setFormData }: BasicInformationSectionProps) => {
  return (
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
          <Label htmlFor="liveUrl">Live Project URL</Label>
          <Input
            id="liveUrl"
            value={formData.liveUrl || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
            placeholder="https://example.com"
            type="url"
          />
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
  );
};

export default BasicInformationSection;
