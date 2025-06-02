
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/data/projects';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface CaseStudyGalleryProps {
  project: Project;
}

const CaseStudyGallery = ({ project }: CaseStudyGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % project.gallery.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? project.gallery.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Project <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Gallery</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl"
                onClick={() => openLightbox(index)}
              >
                <OptimizedImage
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-64 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-lg font-semibold">View Full Size</div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox */}
          {selectedImage !== null && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
              <button 
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-colors duration-300"
              >
                <X className="h-8 w-8" />
              </button>

              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-cyan-400 transition-colors duration-300"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-cyan-400 transition-colors duration-300"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <OptimizedImage
                src={project.gallery[selectedImage]}
                alt={`${project.title} screenshot ${selectedImage + 1}`}
                className="max-w-full max-h-full rounded-lg"
                priority={true}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyGallery;
