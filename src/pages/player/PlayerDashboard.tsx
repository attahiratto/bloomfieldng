import PlayerLayout from "@/components/layouts/PlayerLayout";
import { BadgeCheck, Inbox, Eye, Shield, TrendingUp, Star, User, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useMyStats, useMyAgentRequests } from "@/hooks/usePlayerData";

const PlayerDashboard = () => {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: stats, isLoading: statsLoading } = useMyStats();
  const { data: requests, isLoading: requestsLoading } = useMyAgentRequests();

  const isLoading = profileLoading || statsLoading || requestsLoading;
  const pendingCount = requests?.length ?? 0;
  const displayName = profile?.full_name || "Player";

  if (isLoading) {
    return (
      <PlayerLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PlayerLayout>
    );
  }

  return (
    <PlayerLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 flex items-center gap-3">
          <BadgeCheck className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-800">
            Welcome back, {displayName}! Your profile is verified.
          </span>
        </div>

        {/* ESPN-Style Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <Link to="/player/profile">
            <div className="espn-card rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm text-white/60 uppercase tracking-wider">Profile Status</p>
                </div>
                <p className="font-display text-2xl font-black text-green-400">Verified</p>
                <p className="text-xs text-white/50 mt-1">View your profile →</p>
              </div>
            </div>
          </Link>
          <Link to="/player/requests">
            <div className="espn-card rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="h-1 espn-hero-accent" />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Inbox className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm text-white/60 uppercase tracking-wider">Agent Requests</p>
                </div>
                <p className="font-display text-4xl font-black text-white">{pendingCount}</p>
                <p className="text-xs text-red-400 mt-1">Review requests →</p>
              </div>
            </div>
          </Link>
          <div className="espn-card rounded-xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-amber-500 to-yellow-400" />
            <div className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-white/60 uppercase tracking-wider">Season Goals</p>
              </div>
              <p className="font-display text-4xl font-black text-white">{stats?.goals ?? 0}</p>
              <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {stats?.matches ?? 0} matches played
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="espn-card rounded-2xl overflow-hidden">
          <div className="h-1.5 espn-hero-accent" />
          <div className="p-6">
            <h2 className="font-display text-xl font-bold text-white mb-4">Your Season Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="text-center">
                <p className="font-display text-3xl font-black text-white">{stats?.goals ?? 0}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Goals</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-black text-white">{stats?.assists ?? 0}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Assists</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-black text-white">{stats?.matches ?? 0}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Matches</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-black text-white">{stats?.minutes_played ?? 0}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Minutes</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-black text-white">{stats?.pass_accuracy ?? 0}%</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Pass Acc</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-black text-white">{stats?.shots_on_target ?? 0}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Shots OT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Requests CTA */}
        {pendingCount > 0 && (
          <div className="espn-card rounded-xl overflow-hidden">
            <div className="h-1.5 espn-hero-accent" />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                    <Inbox className="w-7 h-7 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-white">{pendingCount} Pending Request{pendingCount !== 1 ? 's' : ''}</h3>
                    <p className="text-sm text-white/50">Review and respond to agent requests</p>
                  </div>
                </div>
                <Link to="/player/requests" className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-bold hover:from-red-600 hover:to-orange-600 transition-all">
                  View Requests
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Safety Note */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
          <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Your Safety Matters:</strong> Only connect with verified agents. Openfield never asks for upfront fees.
          </p>
        </div>
      </div>
    </PlayerLayout>
  );
};

export default PlayerDashboard;
