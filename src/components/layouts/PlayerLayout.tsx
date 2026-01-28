import { Link } from "react-router-dom";
import { Globe, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlayerLayoutProps {
  children: React.ReactNode;
}

const PlayerLayout = ({ children }: PlayerLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b border-border/50 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">Openfield</span>
        </Link>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-xl relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </Button>
          <Link to="/player/requests">
            <Button variant="outline" className="rounded-xl">
              View Requests
            </Button>
          </Link>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success to-success/60 flex items-center justify-center text-success-foreground font-semibold">
            AO
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-8 px-6 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default PlayerLayout;
