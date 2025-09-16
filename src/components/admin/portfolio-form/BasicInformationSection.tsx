
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
interface BasicInformationSectionProps {
  formData: any;
  setFormData: (field: string, value: unknown) => void;
}

const BasicInformationSection = ({ formData, setFormData }: BasicInformationSectionProps) => {
  const serviceOptions = [
    { value: 'web-apps', label: 'Web Applications' },
    { value: 'saas', label: 'SaaS Solutions' },
    { value: 'mobile-apps', label: 'Mobile Applications' },
    { value: 'ai-automation', label: 'AI Automation' },
    { value: 'ai-calling', label: 'AI Calling' },
    { value: 'uxui-design', label: 'UX/UI Design' },
    { value: 'cloud-computing', label: 'Cloud Computing Services' },
    { value: 'ai-development', label: 'AI Development' },
    { value: 'ar-vr-development', label: 'AR/VR Development' },
    { value: 'blockchain-development', label: 'Blockchain Development' },
    { value: 'chatbot-development', label: 'Chatbot Development' },
    { value: 'data-analytics', label: 'Data Analytics & Business Intelligence' },
    { value: 'game-development', label: 'Game Development' },
    { value: 'iot-development', label: 'IoT Development' }
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-200">Project Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData('title', e.target.value)}
              placeholder="Project title"
              required
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client" className="text-gray-200">Client Name *</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData('client', e.target.value)}
              placeholder="Client name"
              required
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug" className="text-gray-200">URL Slug (Auto-generated)</Label>
          <Input
            id="slug"
            value={formData.slug || ""}
            onChange={(e) => setFormData('slug', e.target.value)}
            placeholder="url-friendly-slug (auto-generated from title)"
            disabled={true} // Always disabled since it's auto-generated
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 disabled:bg-gray-800 disabled:text-gray-500"
          />
          <p className="text-sm text-gray-400">
            Slug is automatically generated from title, client, industry and technologies
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-200">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData('description', e.target.value)}
            placeholder="Brief project description"
            rows={3}
            required
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="serviceId" className="text-gray-200">Service Category *</Label>
            <Select
              value={formData.serviceId}
              onValueChange={(value) => setFormData('serviceId', value)}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {serviceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-gray-300 hover:bg-gray-700">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-gray-200">Industry</Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) => setFormData('industry', e.target.value)}
              placeholder="e.g., E-commerce, Healthcare"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="timeline" className="text-gray-200">Timeline</Label>
            <Input
              id="timeline"
              value={formData.timeline}
              onChange={(e) => setFormData('timeline', e.target.value)}
              placeholder="e.g., 12 weeks"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="team" className="text-gray-200">Team Size</Label>
            <Input
              id="team"
              value={formData.team}
              onChange={(e) => setFormData('team', e.target.value)}
              placeholder="e.g., 5 developers"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="image" className="text-gray-200">Project Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData('image', e.target.value)}
              placeholder="https://example.com/image.jpg"
              type="url"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveUrl" className="text-gray-200">Live URL</Label>
            <Input
              id="liveUrl"
              value={formData.liveUrl}
              onChange={(e) => setFormData('liveUrl', e.target.value)}
              placeholder="https://example.com"
              type="url"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientLogo" className="text-gray-200">Client Logo URL</Label>
          <Input
            id="clientLogo"
            value={formData.clientLogo}
            onChange={(e) => setFormData('clientLogo', e.target.value)}
            placeholder="https://example.com/logo.jpg"
            type="url"
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInformationSection;
