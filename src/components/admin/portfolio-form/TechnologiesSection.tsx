
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
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Basic Technologies</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="Add technology"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
          />
          <Button type="button" onClick={addTechnology} className="bg-cyan-600 hover:bg-cyan-700 text-white">Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies.map((tech) => (
            <span key={tech} className="bg-cyan-700 text-cyan-200 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-cyan-600">
              {tech}
              <button type="button" onClick={() => removeTechnology(tech)} className="text-cyan-300 hover:text-cyan-100">×</button>
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnologiesSection;
