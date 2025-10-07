import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Story {
  id: string;
  shortDescription: string;
  acceptanceCriteria: string;
  status: "new" | "updated" | "pending";
}

const mockStories: Story[] = [
  {
    id: "Story 16677ABC",
    shortDescription: "Story 16677ABC",
    acceptanceCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing...",
    status: "new",
  },
  {
    id: "Story 16677ABC-2",
    shortDescription: "Story 16677ABC",
    acceptanceCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing...",
    status: "new",
  },
  {
    id: "Story 16677ABC-3",
    shortDescription: "Story 16677ABC",
    acceptanceCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing...",
    status: "updated",
  },
  {
    id: "Story 16677ABC-4",
    shortDescription: "Story 16677ABC",
    acceptanceCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing...",
    status: "new",
  },
  {
    id: "Story 16677ABC-5",
    shortDescription: "Story 16677ABC",
    acceptanceCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing...",
    status: "new",
  },
];

const StoriesTable = () => {
  const getStatusVariant = (status: Story["status"]) => {
    switch (status) {
      case "new":
        return "bg-status-new text-status-new-foreground";
      case "updated":
        return "bg-status-updated text-status-updated-foreground";
      case "pending":
        return "bg-status-pending text-status-pending-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm h-full">
      <h2 className="text-xl font-bold text-foreground mb-6">All Stories</h2>

      <div className="overflow-auto max-h-[calc(100vh-250px)]">
        <table className="w-full">
          <thead className="border-b border-border">
            <tr>
              <th className="text-left py-4 px-4 font-semibold text-foreground">
                Short Description
              </th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">
                Acceptance Criteria
              </th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">
                Status
              </th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {mockStories.map((story) => (
              <tr key={story.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="py-4 px-4 text-foreground">{story.shortDescription}</td>
                <td className="py-4 px-4 text-muted-foreground">{story.acceptanceCriteria}</td>
                <td className="py-4 px-4">
                  <Badge className={`${getStatusVariant(story.status)} capitalize font-medium`}>
                    {story.status}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Edit size={20} className="text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoriesTable;
