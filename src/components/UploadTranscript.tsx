import { Upload, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { toast } from "sonner";

const UploadTranscript = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.txt')) {
        toast.error("Only .txt files are supported");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10 MB");
        return;
      }
      setSelectedFile(file);
      toast.success(`File "${file.name}" selected`);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }
    // Handle upload logic here
    toast.success("File uploaded successfully");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold text-foreground mb-2">Upload Transcript</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Add your documents here, and you can upload up to...
      </p>

      <div className="border-2 border-dashed border-border rounded-lg p-12 text-center mb-4">
        <div className="flex justify-center mb-4">
          <Cloud className="w-16 h-16 text-primary" strokeWidth={1.5} />
        </div>
        <p className="text-foreground mb-2">
          Drag your file(s) or{" "}
          <button 
            onClick={handleBrowseClick}
            className="text-primary hover:underline font-medium"
          >
            browse
          </button>
        </p>
        <p className="text-muted-foreground text-sm">
          Max 10 MB files are allowed
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <p className="text-muted-foreground text-sm mb-4">Only support txt file</p>

      <Button 
        onClick={handleUpload}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Upload
      </Button>
    </div>
  );
};

export default UploadTranscript;
