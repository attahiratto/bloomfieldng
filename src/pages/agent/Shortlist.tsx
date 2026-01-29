import AgentLayout from "@/components/layouts/AgentLayout";
import { Bookmark, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ESPNPlayerCard from "@/components/player/ESPNPlayerCard";

const shortlistedPlayers = [
  { id: 1, name: "Kwame Mensah", age: 19, position: "Forward", country: "Ghana", verified: true, endorsed: true, image: null, stats: { goals: 15, assists: 8, matches: 24 } },
  { id: 3, name: "Amadou Diallo", age: 18, position: "Defender", country: "Senegal", verified: true, endorsed: true, image: null, stats: { goals: 2, assists: 5, matches: 22 } },
  { id: 4, name: "Samuel Eto'o Jr", age: 20, position: "Forward", country: "Cameroon", verified: true, endorsed: true, image: null, stats: { goals: 22, assists: 11, matches: 30 } },
  { id: 6, name: "Yusuf Ibrahim", age: 17, position: "Midfielder", country: "Nigeria", verified: true, endorsed: true, image: null, stats: { goals: 9, assists: 12, matches: 20 } },
];

const Shortlist = () => {
  return (
    <AgentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-3">
              <Bookmark className="w-8 h-8 text-amber-500" />
              My Shortlist
            </h1>
            <p className="text-muted-foreground">Players you've saved for later review.</p>
          </div>
          <Button variant="outline" className="rounded-xl">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Stats Banner */}
        <div className="espn-card rounded-xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-amber-500 to-yellow-400" />
          <div className="p-6">
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <p className="font-display text-3xl font-black text-white">{shortlistedPlayers.length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Total Saved</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-black text-red-400">
                  {shortlistedPlayers.filter(p => p.position === "Forward").length}
                </p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Forwards</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-black text-blue-400">
                  {shortlistedPlayers.filter(p => p.position === "Midfielder").length}
                </p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Midfielders</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-black text-green-400">
                  {shortlistedPlayers.filter(p => p.position === "Defender").length}
                </p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Defenders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{shortlistedPlayers.length}</span> shortlisted players
          </p>
        </div>

        {/* ESPN-Style Player Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortlistedPlayers.map((player) => (
            <div key={player.id} className="relative group">
              <ESPNPlayerCard 
                player={player} 
                linkTo={`/agent/player/${player.id}`}
              />
              {/* Remove from shortlist button */}
              <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white/60 hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center z-10">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Empty State (hidden when there are players) */}
        {shortlistedPlayers.length === 0 && (
          <div className="espn-card rounded-2xl p-12 text-center">
            <Bookmark className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-white mb-2">No players shortlisted yet</h3>
            <p className="text-white/50 mb-6">Browse players and save your favorites for later review.</p>
            <Button className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              Browse Players
            </Button>
          </div>
        )}
      </div>
    </AgentLayout>
  );
};

export default Shortlist;
