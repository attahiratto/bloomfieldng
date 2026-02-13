import { Link, useLocation } from "react-router-dom";
import { Home, Search, CheckSquare, BadgeCheck, ChevronDown, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";

interface AgentLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Dashboard", icon: Home, path: "/agent/dashboard" },
  { label: "Discovery", icon: Search, path: "/agent/browse" },
  { label: "Shortlist", icon: CheckSquare, path: "/agent/shortlist" },
  { label: "Get Verified", icon: BadgeCheck, path: "/agent/dashboard", hasCheck: true },
];

const AgentLayout = ({ children }: AgentLayoutProps) => {
  const location = useLocation();
  const { data: profile } = useProfile();
  const { signOut } = useAuth();

  const displayName = profile?.full_name || "Agent";
  const initials = displayName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Dark Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-60 bg-slate-800 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display font-bold text-xl tracking-wide">BLOOMFIELD</span>
            <span className="text-primary">°</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-slate-700/50 text-white"
                  : "text-slate-300 hover:bg-slate-700/30 hover:text-white"
              )}
            >
              {item.hasCheck ? (
                <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center">
                  <BadgeCheck className="w-3.5 h-3.5 text-white" />
                </div>
              ) : (
                <item.icon className="w-5 h-5" />
              )}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-700/50 text-white text-sm font-medium hover:bg-slate-700 transition-colors">
            <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center">
              <BadgeCheck className="w-3.5 h-3.5 text-white" />
            </div>
            Get Verified
          </button>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 text-sm font-medium hover:bg-slate-700/30 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 ml-60">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 h-16 bg-muted/50 backdrop-blur-sm border-b border-border/30 px-6 flex items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search players..." 
                className="pl-10 bg-background border-border/50 rounded-lg"
              />
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {profile?.avatar_url ? (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={profile.avatar_url} alt={displayName} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm">
                {initials}
              </div>
            )}
            <button className="flex items-center gap-1 text-sm font-medium text-foreground">
              {displayName}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AgentLayout;
