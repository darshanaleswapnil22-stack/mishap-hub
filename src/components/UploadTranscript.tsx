import { Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const UploadTranscript = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shortDescription, setShortDescription] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");
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
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!shortDescription || !acceptanceCriteria) {
      toast.error("Please fill in all fields");
      return;
    }
    // Handle upload logic here
    toast.success("Story created successfully");
    setSelectedFile(null);
    setShortDescription("");
    setAcceptanceCriteria("");
    setIsDialogOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setShortDescription("");
    setAcceptanceCriteria("");
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold text-foreground mb-2">Upload Transcript</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Add your documents here, and you can upload up to...
      </p>

      <div 
        className="border border-dashed border-border rounded-lg p-3 text-center mb-4 flex flex-col items-center justify-center gap-3"
        style={{ 
          width: '335px', 
          height: '144px',
          borderWidth: '1px',
          strokeDasharray: '6 6'
        }}
      >
        <Cloud className="w-12 h-12 text-primary" strokeWidth={1.5} />
        <p className="text-foreground text-sm">
          Drag your file(s) or{" "}
          <button 
            onClick={handleBrowseClick}
            className="text-primary hover:underline font-medium"
          >
            browse
          </button>
        </p>
        <p className="text-muted-foreground text-xs">
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">Short Description</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Input
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Story 16677ABC"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-foreground">Acceptance Criteria</Label>
              <Textarea
                value={acceptanceCriteria}
                onChange={(e) => setAcceptanceCriteria(e.target.value)}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi velit, laoreet ut porttitor et, venenatis id purus. Quisque eget purus ultricies, laoreet augue at, dapibus nibh."
                className="w-full min-h-[120px]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="px-8"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                className="px-8 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadTranscript;
