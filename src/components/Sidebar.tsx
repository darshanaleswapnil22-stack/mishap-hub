import { Home, Menu, TrendingUp } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-sidebar flex flex-col items-center py-6 z-50">
      <div className="mb-8">
        <img 
          src="https://www.carrier.com/carrier/en/worldwide/s/f1696155274806/carrier-logo.svg" 
          alt="Carrier" 
          className="w-10 h-10 object-contain brightness-0 invert"
        />
      </div>

      <nav className="flex flex-col gap-6">
        <button
          onClick={() => setActiveTab("home")}
          className={`p-3 rounded-lg transition-colors ${
            activeTab === "home" 
              ? "bg-sidebar-accent text-sidebar-primary" 
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          }`}
          aria-label="Home"
        >
          <Home size={24} />
        </button>

        <button
          onClick={() => setActiveTab("menu")}
          className={`p-3 rounded-lg transition-colors ${
            activeTab === "menu" 
              ? "bg-sidebar-accent text-sidebar-primary" 
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          }`}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`p-3 rounded-lg transition-colors ${
            activeTab === "analytics" 
              ? "bg-sidebar-accent text-sidebar-primary" 
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          }`}
          aria-label="Analytics"
        >
          <TrendingUp size={24} />
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
