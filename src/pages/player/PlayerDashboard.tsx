import PlayerLayout from "@/components/layouts/PlayerLayout";
import { BadgeCheck, Inbox, Eye, Shield, TrendingUp, Star, User } from "lucide-react";
import { Link } from "react-router-dom";

const recentActivity = [
  { id: 1, agent: "James Davies", type: "Trial Request", time: "2 hours ago", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 2, agent: "Scout Network Ltd", type: "Profile View", time: "1 day ago", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 3, agent: "Marcus Sterling", type: "Connected", time: "3 days ago", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
];

const PlayerDashboard = () => {
  return (
    <PlayerLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 flex items-center gap-3">
          <BadgeCheck className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-800">Profile Verified & Coach Endorsed</span>
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
                <p className="font-display text-4xl font-black text-white">3</p>
                <p className="text-xs text-red-400 mt-1">Review requests →</p>
              </div>
            </div>
          </Link>
          <div className="espn-card rounded-xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-amber-500 to-yellow-400" />
            <div className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-white/60 uppercase tracking-wider">Profile Views</p>
              </div>
              <p className="font-display text-4xl font-black text-white">47</p>
              <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12 this week
              </p>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Recent Activity</h2>
          <Link to="/player/requests" className="text-sm text-primary font-medium hover:underline">
            View All →
          </Link>
        </div>

        {/* Recent Activity - ESPN Style Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {recentActivity.map((activity) => (
            <Link key={activity.id} to="/player/requests">
              <div className="espn-card rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-white/10 flex-shrink-0 border-2 border-white/20">
                      <img 
                        src={activity.image} 
                        alt={activity.agent}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white">{activity.agent}</h3>
                      <p className="text-sm text-red-400 font-medium">{activity.type}</p>
                      <p className="text-xs text-white/40 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pending Requests CTA - ESPN Style */}
        <div className="espn-card rounded-xl overflow-hidden">
          <div className="h-1.5 espn-hero-accent" />
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                  <Inbox className="w-7 h-7 text-red-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">3 Pending Requests</h3>
                  <p className="text-sm text-white/50">Review and respond to agent requests</p>
                </div>
              </div>
              <Link to="/player/requests" className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-bold hover:from-red-600 hover:to-orange-600 transition-all">
                View Requests
              </Link>
            </div>
          </div>
        </div>

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
