import { useRef, useState } from "react";
import { Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { uploadPortfolioImage } from "@/services/adminImageUpload";

interface AdminImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: "covers" | "gallery";
  id?: string;
}

const AdminImageUpload = ({
  label,
  value,
  onChange,
  folder = "covers",
  id = "admin-image-upload",
}: AdminImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File | undefined) => {
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadPortfolioImage(file, folder);
      onChange(url);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    void handleFileSelect(file);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    void handleFileSelect(file);
  };

  const triggerFileSelect = () => {
    if (!uploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-gray-200">
        {label}
      </Label>

      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept="image/*"
        onChange={onInputChange}
        className="hidden"
      />

      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-gray-600 bg-gray-700/50">
          <img
            src={value}
            alt="Project preview"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={triggerFileSelect}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Replace"}
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onChange("")}
              disabled={uploading}
            >
              <X className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={triggerFileSelect}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              triggerFileSelect();
            }
          }}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-gray-800 transition-colors"
        >
          {uploading ? (
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
          ) : (
            <Image className="w-10 h-10 text-gray-400 mb-3" />
          )}
          <p className="text-sm text-gray-300 text-center">
            {uploading
              ? "Uploading image..."
              : "Click or drag an image to upload"}
          </p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
        </div>
      )}
    </div>
  );
};

export default AdminImageUpload;
