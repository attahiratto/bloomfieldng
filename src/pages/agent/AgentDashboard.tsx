import AgentLayout from "@/components/layouts/AgentLayout";
import { AlertTriangle, TrendingUp, Users, Bookmark, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import ESPNPlayerCard from "@/components/player/ESPNPlayerCard";
import { useAllPlayers } from "@/hooks/usePlayerData";

const AgentDashboard = () => {
  const { data: players, isLoading } = useAllPlayers();

  const featuredPlayers = (players ?? []).slice(0, 6);
  const totalPlayers = players?.length ?? 0;

  return (
    <AgentLayout>
      <div className="space-y-6">
        {/* Warning Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span className="text-sm font-medium text-amber-800">Account Pending Verification</span>
        </div>

        {/* ESPN-Style Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="espn-card rounded-xl overflow-hidden">
            <div className="h-1 espn-hero-accent" />
            <div className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-white/60 uppercase tracking-wider">Total Players</p>
              </div>
              <p className="font-display text-4xl font-black text-white">{totalPlayers}</p>
              <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Available for discovery
              </p>
            </div>
          </div>
          <div className="espn-card rounded-xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
            <div className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-white/60 uppercase tracking-wider">Verified</p>
              </div>
              <p className="font-display text-4xl font-black text-white">{totalPlayers}</p>
              <p className="text-xs text-green-400 mt-1">All players verified</p>
            </div>
          </div>
          <Link to="/agent/shortlist">
            <div className="espn-card rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="h-1 bg-gradient-to-r from-amber-500 to-yellow-400" />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Bookmark className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm text-white/60 uppercase tracking-wider">Shortlisted</p>
                </div>
                <p className="font-display text-4xl font-black text-white">0</p>
                <p className="text-xs text-amber-400 mt-1">View your picks →</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Featured Players</h2>
          <Link to="/agent/browse" className="text-sm text-primary font-medium hover:underline">
            View All →
          </Link>
        </div>

        {/* ESPN-Style Players Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : featuredPlayers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlayers.map((player) => (
              <ESPNPlayerCard 
                key={player.id} 
                player={player} 
                linkTo={`/agent/player/${player.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="espn-card rounded-2xl p-12 text-center">
            <p className="text-white/50">No players registered yet. Check back soon!</p>
          </div>
        )}
      </div>
    </AgentLayout>
  );
};

export default AgentDashboard;
