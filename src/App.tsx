import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import AgentDashboard from "./pages/agent/AgentDashboard";
import BrowsePlayers from "./pages/agent/BrowsePlayers";
import PlayerProfile from "./pages/agent/PlayerProfile";
import Shortlist from "./pages/agent/Shortlist";
import PlayerDashboard from "./pages/player/PlayerDashboard";
import AgentRequests from "./pages/player/AgentRequests";
import MyProfile from "./pages/player/MyProfile";
import PlayerSettings from "./pages/player/PlayerSettings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            {/* Agent Routes */}
            <Route path="/agent/dashboard" element={<AgentDashboard />} />
            <Route path="/agent/browse" element={<BrowsePlayers />} />
            <Route path="/agent/player/:id" element={<PlayerProfile />} />
            <Route path="/agent/shortlist" element={<Shortlist />} />
            {/* Player Routes */}
            <Route path="/player/dashboard" element={<PlayerDashboard />} />
            <Route path="/player/requests" element={<AgentRequests />} />
            <Route path="/player/profile" element={<MyProfile />} />
            <Route path="/player/settings" element={<PlayerSettings />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
