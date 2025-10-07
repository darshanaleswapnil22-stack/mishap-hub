import { Edit, Home, Cloud } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface Story {
  id: string;
  shortDescription: string;
  acceptanceCriteria: string;
  status: "new" | "updated" | "pending";
}

const IncidentPortal = () => {
  // Upload Transcript State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [shortDescription, setShortDescription] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stories Table State
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editCriteria, setEditCriteria] = useState("");

  const [stories] = useState<Story[]>([
    {
      id: "1",
      shortDescription: "Story 16677ABC",
      acceptanceCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi velit, laoreet ut porttitor et, venenatis id purus.",
      status: "new",
    },
    {
      id: "2",
      shortDescription: "Story 16677ABC",
      acceptanceCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi velit, laoreet ut porttitor et, venenatis id purus.",
      status: "new",
    },
    {
      id: "3",
      shortDescription: "Story 16677ABC",
      acceptanceCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi velit, laoreet ut porttitor et, venenatis id purus.",
      status: "updated",
    },
    {
      id: "4",
      shortDescription: "Story 16677ABC",
      acceptanceCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi velit, laoreet ut porttitor et, venenatis id purus.",
      status: "new",
    },
    {
      id: "5",
      shortDescription: "Story 16677ABC",
      acceptanceCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi velit, laoreet ut porttitor et, venenatis id purus.",
      status: "new",
    },
  ]);

  // Upload Transcript Handlers
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
    setIsUploadDialogOpen(true);
  };

  const handleUploadSubmit = () => {
    if (!shortDescription || !acceptanceCriteria) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Story created successfully");
    setSelectedFile(null);
    setShortDescription("");
    setAcceptanceCriteria("");
    setIsUploadDialogOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadCancel = () => {
    setIsUploadDialogOpen(false);
    setShortDescription("");
    setAcceptanceCriteria("");
  };

  // Stories Table Handlers
  const handleEditClick = (story: Story) => {
    setSelectedStory(story);
    setEditDescription(story.shortDescription);
    setEditCriteria(story.acceptanceCriteria);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    console.log("Updated:", { editDescription, editCriteria });
    setIsEditDialogOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditDialogOpen(false);
    setEditDescription("");
    setEditCriteria("");
  };

  const getStatusVariant = (status: Story["status"]) => {
    switch (status) {
      case "new":
        return "status-new";
      case "updated":
        return "status-updated";
      case "pending":
        return "status-pending";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: Story["status"]) => {
    switch (status) {
      case "new":
        return "New";
      case "updated":
        return "Updated";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  return (
    <div className="p-6">
      <div className="bg-card border-b border-border py-4 px-6 mb-6 rounded-t-lg">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Home size={20} />
          <span className="font-semibold text-foreground">Home</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        {/* Upload Transcript Section */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-2">Upload Transcript</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Add your documents here, and you can upload up to...
            </p>

            <div 
              className="border border-dashed border-border rounded-lg p-3 text-center mb-4 flex flex-col items-center justify-center gap-3 mx-auto"
              style={{ 
                width: '335px', 
                height: '144px',
                borderWidth: '1px',
                strokeDasharray: '6 6'
              }}
            >
              <FontAwesomeIcon icon={faCloudArrowUp} className="w-12 h-12 text-primary" />
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
          </div>
        </div>

        {/* Stories Table Section */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-lg shadow-sm">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">All Stories</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Short Description
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Acceptance Criteria
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stories.map((story, index) => (
                    <tr 
                      key={story.id} 
                      className={index !== stories.length - 1 ? "border-b border-border" : ""}
                    >
                      <td className="py-4 px-4 font-medium text-foreground">
                        {story.shortDescription}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground max-w-md truncate">
                        {story.acceptanceCriteria}
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={getStatusVariant(story.status) as any}>
                          {getStatusLabel(story.status)}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <button 
                          onClick={() => handleEditClick(story)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Edit size={20} className="text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-12">
          Submit
        </Button>
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
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
                onClick={handleUploadCancel}
                className="px-8"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUploadSubmit}
                className="px-8 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">Short Description</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Story 16677ABC"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-foreground">Acceptance Criteria</Label>
              <Textarea
                value={editCriteria}
                onChange={(e) => setEditCriteria(e.target.value)}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                className="w-full min-h-[120px]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={handleEditCancel}
                className="px-8"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleEditSubmit}
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

export default IncidentPortal;
