
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminProject } from '@/services/adminDataService';

interface CaseStudyDetailsSectionProps {
  formData: AdminProject;
  setFormData: React.Dispatch<React.SetStateAction<AdminProject>>;
}

const CaseStudyDetailsSection = ({ formData, setFormData }: CaseStudyDetailsSectionProps) => {
  const [approachInput, setApproachInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

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

  return (
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
  );
};

export default CaseStudyDetailsSection;
