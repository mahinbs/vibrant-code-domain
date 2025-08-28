
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
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Technology Stack</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Input
            value={techStackCategory}
            onChange={(e) => setTechStackCategory(e.target.value)}
            placeholder="Category (e.g., Frontend)"
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
          />
          <Input
            value={techStackTechnology}
            onChange={(e) => setTechStackTechnology(e.target.value)}
            placeholder="Technology (e.g., React)"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
          />
          <Button type="button" onClick={addTechStack} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
        
        <div className="space-y-4">
          {formData.techStack.map((category, categoryIndex) => (
            <div key={category.category} className="border border-gray-600 rounded-lg p-4 bg-gray-700/50">
              <h4 className="font-semibold mb-2 text-white">{category.category}</h4>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech, techIndex) => (
                  <span key={tech} className="bg-green-700 text-green-200 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-green-600">
                    {tech}
                    <button 
                      type="button" 
                      onClick={() => removeTechFromStack(categoryIndex, techIndex)}
                      className="text-green-300 hover:text-green-100"
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
