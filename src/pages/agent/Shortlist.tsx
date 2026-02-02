import { useState } from "react";
import AgentLayout from "@/components/layouts/AgentLayout";
import { Bookmark, Trash2, Filter, SortDesc, Star, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ESPNPlayerCard from "@/components/player/ESPNPlayerCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const shortlistedPlayers = [
  { id: 1, name: "Kwame Mensah", age: 19, position: "Forward", country: "Ghana", verified: true, endorsed: true, image: null, stats: { goals: 15, assists: 8, matches: 24 }, addedAt: "2024-01-15", rating: 4.8 },
  { id: 3, name: "Amadou Diallo", age: 18, position: "Defender", country: "Senegal", verified: true, endorsed: true, image: null, stats: { goals: 2, assists: 5, matches: 22 }, addedAt: "2024-01-12", rating: 4.5 },
  { id: 4, name: "Samuel Eto'o Jr", age: 20, position: "Forward", country: "Cameroon", verified: true, endorsed: true, image: null, stats: { goals: 22, assists: 11, matches: 30 }, addedAt: "2024-01-18", rating: 4.9 },
  { id: 6, name: "Yusuf Ibrahim", age: 17, position: "Midfielder", country: "Nigeria", verified: true, endorsed: true, image: null, stats: { goals: 9, assists: 12, matches: 20 }, addedAt: "2024-01-10", rating: 4.6 },
  { id: 7, name: "Kofi Adu", age: 21, position: "Goalkeeper", country: "Ghana", verified: true, endorsed: true, image: null, stats: { goals: 0, assists: 1, matches: 28 }, addedAt: "2024-01-20", rating: 4.7 },
  { id: 8, name: "Moussa Koné", age: 18, position: "Midfielder", country: "Mali", verified: true, endorsed: false, image: null, stats: { goals: 7, assists: 14, matches: 25 }, addedAt: "2024-01-08", rating: 4.4 },
];

type PositionFilter = "all" | "Forward" | "Midfielder" | "Defender" | "Goalkeeper";
type SortOption = "recent" | "rating" | "goals" | "age";

const Shortlist = () => {
  const [positionFilter, setPositionFilter] = useState<PositionFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [removedIds, setRemovedIds] = useState<number[]>([]);

  const filteredPlayers = shortlistedPlayers
    .filter((p) => !removedIds.includes(p.id))
    .filter((p) => positionFilter === "all" || p.position === positionFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case "rating": return b.rating - a.rating;
        case "goals": return b.stats.goals - a.stats.goals;
        case "age": return a.age - b.age;
        default: return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      }
    });

  const positionCounts = {
    all: shortlistedPlayers.filter((p) => !removedIds.includes(p.id)).length,
    Forward: shortlistedPlayers.filter((p) => !removedIds.includes(p.id) && p.position === "Forward").length,
    Midfielder: shortlistedPlayers.filter((p) => !removedIds.includes(p.id) && p.position === "Midfielder").length,
    Defender: shortlistedPlayers.filter((p) => !removedIds.includes(p.id) && p.position === "Defender").length,
    Goalkeeper: shortlistedPlayers.filter((p) => !removedIds.includes(p.id) && p.position === "Goalkeeper").length,
  };

  const handleRemove = (id: number) => {
    setRemovedIds([...removedIds, id]);
  };

  const handleClearAll = () => {
    setRemovedIds(shortlistedPlayers.map((p) => p.id));
  };

  return (
    <AgentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-white" />
              </div>
              My Shortlist
            </h1>
            <p className="text-muted-foreground">Players you've saved for review and outreach.</p>
          </div>
          <Button 
            variant="outline" 
            className="rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={handleClearAll}
            disabled={positionCounts.all === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="espn-card rounded-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-amber-400" />
                </div>
                <p className="font-display text-3xl font-black text-white">{positionCounts.all}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Total Saved</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg">⚽</span>
                </div>
                <p className="font-display text-3xl font-black text-red-400">{positionCounts.Forward}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Forwards</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg">🎯</span>
                </div>
                <p className="font-display text-3xl font-black text-blue-400">{positionCounts.Midfielder}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Midfielders</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg">🛡️</span>
                </div>
                <p className="font-display text-3xl font-black text-green-400">{positionCounts.Defender}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Defenders</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg">🧤</span>
                </div>
                <p className="font-display text-3xl font-black text-purple-400">{positionCounts.Goalkeeper}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Goalkeepers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Tabs value={positionFilter} onValueChange={(v) => setPositionFilter(v as PositionFilter)}>
            <TabsList className="bg-slate-800/50 border border-white/10">
              <TabsTrigger value="all" className="data-[state=active]:bg-white/10">All ({positionCounts.all})</TabsTrigger>
              <TabsTrigger value="Forward" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">Forwards</TabsTrigger>
              <TabsTrigger value="Midfielder" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">Midfielders</TabsTrigger>
              <TabsTrigger value="Defender" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">Defenders</TabsTrigger>
              <TabsTrigger value="Goalkeeper" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">Goalkeepers</TabsTrigger>
            </TabsList>
          </Tabs>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-xl gap-2">
                <SortDesc className="w-4 h-4" />
                Sort by: {sortBy === "recent" ? "Recently Added" : sortBy === "rating" ? "Rating" : sortBy === "goals" ? "Goals" : "Age"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("recent")}>
                <Clock className="w-4 h-4 mr-2" /> Recently Added
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("rating")}>
                <Star className="w-4 h-4 mr-2" /> Highest Rating
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("goals")}>
                ⚽ <span className="ml-2">Most Goals</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("age")}>
                <Users className="w-4 h-4 mr-2" /> Youngest First
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredPlayers.length}</span> 
            {positionFilter !== "all" && ` ${positionFilter.toLowerCase()}`} player{filteredPlayers.length !== 1 && "s"}
          </p>
        </div>

        {/* ESPN-Style Player Grid */}
        {filteredPlayers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlayers.map((player) => (
              <div key={player.id} className="relative group">
                <ESPNPlayerCard 
                  player={player} 
                  linkTo={`/agent/player/${player.id}`}
                />
                {/* Remove from shortlist button */}
                <button 
                  onClick={() => handleRemove(player.id)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white/60 hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {/* Rating badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/90 text-white text-xs font-bold z-10">
                  <Star className="w-3 h-3 fill-white" />
                  {player.rating}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="espn-card rounded-2xl p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">
              {positionCounts.all === 0 ? "No players shortlisted yet" : "No players match this filter"}
            </h3>
            <p className="text-white/50 mb-6 max-w-md mx-auto">
              {positionCounts.all === 0 
                ? "Browse players and save your favorites for later review." 
                : "Try adjusting your filters to see more players."}
            </p>
            <Button 
              className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              onClick={() => positionCounts.all === 0 ? window.location.href = "/agent/browse" : setPositionFilter("all")}
            >
              {positionCounts.all === 0 ? "Browse Players" : "Show All Players"}
            </Button>
          </div>
        )}
      </div>
    </AgentLayout>
  );
};

export default Shortlist;
