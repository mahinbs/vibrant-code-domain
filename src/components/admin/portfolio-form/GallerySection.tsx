
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { AdminProject } from '@/services/adminDataService';

interface GallerySectionProps {
  formData: AdminProject;
  setFormData: React.Dispatch<React.SetStateAction<AdminProject>>;
}

const GallerySection = ({ formData, setFormData }: GallerySectionProps) => {
  const [galleryInput, setGalleryInput] = useState('');

  const addGalleryImage = () => {
    if (galleryInput.trim() && !formData.gallery.includes(galleryInput.trim())) {
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, galleryInput.trim()]
      }));
      setGalleryInput('');
    }
  };

  const removeGalleryImage = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter(url => url !== imageUrl)
    }));
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Project Gallery</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={galleryInput}
            onChange={(e) => setGalleryInput(e.target.value)}
            placeholder="Image URL"
            type="url"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryImage())}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
          />
          <Button type="button" onClick={addGalleryImage} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {formData.gallery.map((imageUrl) => (
            <div key={imageUrl} className="relative border border-gray-600 rounded-lg overflow-hidden bg-gray-700/50">
              <img src={imageUrl} alt="Gallery" className="w-full h-32 object-cover" />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => removeGalleryImage(imageUrl)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GallerySection;
