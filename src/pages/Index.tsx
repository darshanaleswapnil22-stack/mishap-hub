import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import UploadTranscript from "@/components/UploadTranscript";
import StoriesTable from "@/components/StoriesTable";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      
      <main className="ml-16 pt-16">
        <div className="p-6">
          <div className="bg-card border-b border-border py-4 px-6 mb-6 rounded-t-lg">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Home size={20} />
              <span className="font-semibold text-foreground">Home</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <div className="lg:col-span-2">
              <UploadTranscript />
            </div>
            <div className="lg:col-span-3">
              <StoriesTable />
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-12">
              Submit
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
