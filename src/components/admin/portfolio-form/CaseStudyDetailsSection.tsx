
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
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Case Study Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="challenge" className="text-gray-200">Challenge</Label>
          <Textarea
            id="challenge"
            value={formData.challenge}
            onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
            placeholder="What challenge did this project solve?"
            rows={3}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="solution" className="text-gray-200">Solution</Label>
          <Textarea
            id="solution"
            value={formData.solution}
            onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
            placeholder="How did you solve the challenge?"
            rows={3}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-200">Approach</Label>
          <div className="flex gap-2">
            <Input
              value={approachInput}
              onChange={(e) => setApproachInput(e.target.value)}
              placeholder="Add approach step"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addApproach())}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
            <Button type="button" onClick={addApproach} className="bg-cyan-600 hover:bg-cyan-700 text-white">Add</Button>
          </div>
          <div className="space-y-2">
            {formData.approach.map((approach) => (
              <div key={approach} className="flex items-center justify-between bg-gray-700/50 p-2 rounded border border-gray-600">
                <span className="text-white">{approach}</span>
                <Button type="button" variant="outline" size="sm" onClick={() => removeApproach(approach)} className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">Remove</Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-200">Features</Label>
          <div className="flex gap-2">
            <Input
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              placeholder="Add feature"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
            <Button type="button" onClick={addFeature} className="bg-cyan-600 hover:bg-cyan-700 text-white">Add</Button>
          </div>
          <div className="space-y-2">
            {formData.features.map((feature) => (
              <div key={feature} className="flex items-center justify-between bg-gray-700/50 p-2 rounded border border-gray-600">
                <span className="text-white">{feature}</span>
                <Button type="button" variant="outline" size="sm" onClick={() => removeFeature(feature)} className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">Remove</Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseStudyDetailsSection;
