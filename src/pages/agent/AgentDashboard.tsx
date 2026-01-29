import AgentLayout from "@/components/layouts/AgentLayout";
import { AlertTriangle, TrendingUp, Users, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import ESPNPlayerCard from "@/components/player/ESPNPlayerCard";

const mockPlayers = [
  { id: 1, name: "James Parker", position: "Striker", age: 23, country: "England", verified: true, endorsed: true, image: null, stats: { goals: 18, assists: 7, matches: 28 } },
  { id: 2, name: "Luis Gomez", position: "Midfielder", age: 21, country: "Spain", verified: true, endorsed: false, image: null, stats: { goals: 5, assists: 12, matches: 25 } },
  { id: 3, name: "Daniel Martins", position: "Defender", age: 25, country: "Brazil", verified: true, endorsed: true, image: null, stats: { goals: 2, assists: 4, matches: 30 } },
  { id: 4, name: "Eric Johnson", position: "Winger", age: 20, country: "USA", verified: true, endorsed: false, image: null, stats: { goals: 11, assists: 9, matches: 24 } },
  { id: 5, name: "Marco Rossi", position: "Striker", age: 22, country: "Italy", verified: true, endorsed: true, image: null, stats: { goals: 15, assists: 5, matches: 26 } },
  { id: 6, name: "Alex Tanaka", position: "Midfielder", age: 19, country: "Japan", verified: true, endorsed: true, image: null, stats: { goals: 7, assists: 14, matches: 22 } },
];

const AgentDashboard = () => {
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
              <p className="font-display text-4xl font-black text-white">12,450</p>
              <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +234 this week
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
                <p className="text-sm text-white/60 uppercase tracking-wider">New Today</p>
              </div>
              <p className="font-display text-4xl font-black text-white">36</p>
              <p className="text-xs text-green-400 mt-1">Fresh talent available</p>
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
                <p className="font-display text-4xl font-black text-white">18</p>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPlayers.map((player) => (
            <ESPNPlayerCard 
              key={player.id} 
              player={player} 
              linkTo={`/agent/player/${player.id}`}
            />
          ))}
        </div>
      </div>
    </AgentLayout>
  );
};

export default AgentDashboard;
