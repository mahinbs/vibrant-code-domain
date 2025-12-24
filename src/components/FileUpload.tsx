/* eslint-disable */
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface FileUploadProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  errors: FieldErrors<any>;
  setFile: (file: File | null) => void;
  file: File | null;
  handleRemoveFile: () => void;
  setImage: (url: string | null) => void;
  image: string | null;
}

const FileUpload = ({
  register,
  name,
  label,
  errors,
  setFile,
  file,
  handleRemoveFile,
  setImage,
  image,
}: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setImage(URL.createObjectURL(uploadedFile));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setImage(URL.createObjectURL(uploadedFile));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mb-6">
      <label className="block text-white text-lg mb-2">
        {label} <span className="text-red-400">*</span>
      </label>
      <div
        className="border-2 border-dashed border-cyan-400/30 rounded-lg p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 hover:border-cyan-400/50 transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="text-center">
          <input
            type="file"
            className="hidden"
            {...register(name, { required: "Please upload a file" })}
            id={name}
            onChange={handleFileChange}
          />
          {!image && (
            <>
              <label htmlFor={name} className="cursor-pointer block">
                <div className="text-cyan-300 text-lg mb-2">
                  Drop A File Here Or Click To Upload
                </div>
                <div className="text-muted-foreground text-sm">
                  Maximum upload size: 268.44MB
                </div>
              </label>
            </>
          )}
        </div>

        {image && (
          <div className="mt-4">
            <img
              src={image}
              alt="Uploaded file preview"
              className="max-w-full h-auto mb-2 rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-400 text-sm hover:text-red-300 transition-colors"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {errors[name] && !file && (
        <span className="text-red-400 text-sm mt-2">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FileUpload;

