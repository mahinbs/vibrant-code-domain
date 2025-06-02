
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminProject } from '@/services/adminDataService';

interface TechnologiesSectionProps {
  formData: AdminProject;
  setFormData: React.Dispatch<React.SetStateAction<AdminProject>>;
}

const TechnologiesSection = ({ formData, setFormData }: TechnologiesSectionProps) => {
  const [techInput, setTechInput] = useState('');

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

  return (
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
  );
};

export default TechnologiesSection;
