import { Link, useSearchParams } from "react-router-dom";
import { Home, Users, BarChart3, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Overview", icon: Home, tab: "overview" },
  { label: "Users", icon: Users, tab: "users" },
  { label: "Player Stats", icon: BarChart3, tab: "stats" },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { role, loading, user, signOut } = useAuth();
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const activeTab = searchParams.get("tab") || "overview";

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || (role !== "admin" && !justLoggedIn)) {
    return <AdminLoginForm onSuccess={() => setJustLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <aside className="fixed left-0 top-0 bottom-0 w-60 bg-card border-r border-border flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display font-bold text-xl tracking-wide text-foreground">BLOOMFIELD</span>
            <span className="text-destructive">ADMIN</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setSearchParams({ tab: item.tab })}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                activeTab === item.tab
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4">
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground text-sm font-medium hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 ml-60">
        <header className="sticky top-0 z-40 h-16 bg-muted/50 backdrop-blur-sm border-b border-border/30 px-6 flex items-center">
          <h1 className="font-display text-lg font-bold text-foreground">Admin Panel</h1>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
