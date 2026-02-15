import { Link, useLocation } from "react-router-dom";
import { Home, User, Inbox, Settings, BadgeCheck, ChevronDown, Search, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";

interface PlayerLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Dashboard", icon: Home, path: "/player/dashboard" },
  { label: "My Profile", icon: User, path: "/player/profile" },
  { label: "Agent Requests", icon: Inbox, path: "/player/requests" },
  { label: "Settings", icon: Settings, path: "/player/settings" },
];

const PlayerLayout = ({ children }: PlayerLayoutProps) => {
  const location = useLocation();
  const { data: profile } = useProfile();
  const { signOut } = useAuth();

  const displayName = profile?.full_name || "Player";
  const initials = displayName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Dark Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-60 bg-slate-800 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Bloomfield" className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-display font-bold text-xl tracking-wide">BLOOMFIELD</span>
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
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Status */}
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-600/20 text-emerald-400 text-sm font-medium">
            <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center">
              <BadgeCheck className="w-3.5 h-3.5 text-white" />
            </div>
            Profile Verified
          </div>
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
                placeholder="Search opportunities..." 
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
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

export default PlayerLayout;
