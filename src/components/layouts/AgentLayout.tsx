import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Inbox, Bookmark, BadgeCheck, Globe, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AgentLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/agent/dashboard" },
  { label: "Browse Players", icon: Users, path: "/agent/browse" },
  { label: "Requests", icon: Inbox, path: "/agent/dashboard" },
  { label: "Saved Players", icon: Bookmark, path: "/agent/dashboard" },
  { label: "Verification", icon: BadgeCheck, path: "/agent/dashboard" },
];

const AgentLayout = ({ children }: AgentLayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b border-border/50 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg hidden sm:block">Openfield</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/agent/browse">
            <Button className="rounded-xl hidden sm:flex">
              <Users className="w-4 h-4 mr-2" />
              Browse Players
            </Button>
          </Link>
          <div className="pill-verified">
            <BadgeCheck className="w-3.5 h-3.5" />
            Verified Agent
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-semibold">
            JD
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-16 bottom-0 z-40 transition-all duration-300",
          sidebarOpen ? "w-64" : "w-0 -translate-x-full"
        )}
      >
        <div className="sidebar-float p-4 mt-0 ml-4 h-[calc(100vh-5rem)]">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="absolute bottom-6 left-4 right-4">
            <Link to="/">
              <Button variant="ghost" className="w-full rounded-xl justify-start text-muted-foreground">
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={cn(
          "pt-20 pb-8 px-6 transition-all duration-300",
          sidebarOpen ? "ml-72" : "ml-4"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default AgentLayout;
