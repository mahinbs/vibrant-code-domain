
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { AdminProject } from '@/services/adminDataService';

interface TechStackSectionProps {
  formData: AdminProject;
  setFormData: React.Dispatch<React.SetStateAction<AdminProject>>;
}

const TechStackSection = ({ formData, setFormData }: TechStackSectionProps) => {
  const [techStackCategory, setTechStackCategory] = useState('');
  const [techStackTechnology, setTechStackTechnology] = useState('');

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

  return (
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
  );
};

export default TechStackSection;
