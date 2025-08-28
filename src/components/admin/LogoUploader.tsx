import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Upload, Image } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LogoUploaderProps {
  logos: string[];
  onLogosChange: (logos: string[]) => void;
  title: string;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ logos, onLogosChange, title }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newLogos = [...logos];

    try {
      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Error",
            description: `${file.name} is not an image file`,
            variant: "destructive",
          });
          continue;
        }

        // Create FormData and upload
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('https://upxsbhsamorhvnfebvor.supabase.co/functions/v1/upload-webinar-logo', {
          method: 'POST',
          headers: {
            'x-admin-token': 'admin-upload-token-2024',
          },
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Upload failed');
        }

        const result = await response.json();
        newLogos.push(result.url);
      }

      onLogosChange(newLogos);
      toast({
        title: "Success",
        description: `${Array.from(files).length} logo(s) uploaded successfully`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: `Failed to upload: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeLogo = (index: number) => {
    const newLogos = logos.filter((_, i) => i !== index);
    onLogosChange(newLogos);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <Button 
          onClick={triggerFileSelect} 
          disabled={uploading}
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mr-2" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload Images
            </>
          )}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Zone */}
      <Card 
        className="border-2 border-dashed border-gray-600 hover:border-gray-500 transition-colors cursor-pointer bg-gray-800"
        onClick={triggerFileSelect}
      >
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Image className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-300 text-center">
            Click to upload logo images or drag and drop
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PNG, JPG, WEBP up to 10MB each
          </p>
        </CardContent>
      </Card>

      {/* Logo Grid */}
      {logos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {logos.map((logo, index) => (
            <Card key={index} className="relative group bg-gray-800 border-gray-700">
              <CardContent className="p-2">
                <div className="aspect-video relative">
                  <img 
                    src={logo} 
                    alt={`Logo ${index + 1}`}
                    className="w-full h-full object-contain rounded"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLogo(index);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LogoUploader;