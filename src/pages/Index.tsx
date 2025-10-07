import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import IncidentPortal from "@/components/IncidentPortal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      
      <main className="ml-16 pt-16">
        <IncidentPortal />
      </main>
    </div>
  );
};

export default Index;
