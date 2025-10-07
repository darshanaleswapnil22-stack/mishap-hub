import { Search, Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-16 right-0 h-16 bg-primary border-b border-primary/20 flex items-center justify-between px-6 z-40">
      <div className="flex items-center gap-4">
        <img 
          src="https://www.carrier.com/carrier/en/worldwide/s/f1696155274806/carrier-logo.svg" 
          alt="Carrier" 
          className="h-8 brightness-0 invert"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors">
          <Search size={20} />
        </button>
        <button className="p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors">
          <Bell size={20} />
        </button>
        <button className="p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
