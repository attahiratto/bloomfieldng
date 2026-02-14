import { useState, useMemo } from "react";
import AgentLayout from "@/components/layouts/AgentLayout";
import { Bookmark, Trash2, SortDesc, Star, Clock, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ESPNPlayerCard from "@/components/player/ESPNPlayerCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMyShortlist, useRemoveFromShortlist, useAllPlayers } from "@/hooks/usePlayerData";
import { toast } from "sonner";

type PositionFilter = "all" | "Forward" | "Midfielder" | "Defender" | "Goalkeeper";
type SortOption = "recent" | "goals" | "age";

const Shortlist = () => {
  const { data: shortlist, isLoading: shortlistLoading } = useMyShortlist();
  const { data: allPlayers, isLoading: playersLoading } = useAllPlayers();
  const removeFromShortlist = useRemoveFromShortlist();
  const [positionFilter, setPositionFilter] = useState<PositionFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const shortlistedIds = new Set(shortlist?.map(s => s.player_id) ?? []);

  const shortlistedPlayers = useMemo(() => {
    if (!allPlayers || !shortlist) return [];
    const shortlistMap = new Map(shortlist.map(s => [s.player_id, s.created_at]));
    return allPlayers
      .filter(p => shortlistedIds.has(String(p.id)))
      .map(p => ({ ...p, addedAt: shortlistMap.get(String(p.id)) ?? "" }));
  }, [allPlayers, shortlist, shortlistedIds]);

  const filteredPlayers = useMemo(() => {
    return shortlistedPlayers
      .filter(p => positionFilter === "all" || p.position === positionFilter)
      .sort((a, b) => {
        switch (sortBy) {
          case "goals": return (b.stats?.goals ?? 0) - (a.stats?.goals ?? 0);
          case "age": return (a.age ?? 99) - (b.age ?? 99);
          default: return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        }
      });
  }, [shortlistedPlayers, positionFilter, sortBy]);

  const positionCounts = {
    all: shortlistedPlayers.length,
    Forward: shortlistedPlayers.filter(p => p.position === "Forward").length,
    Midfielder: shortlistedPlayers.filter(p => p.position === "Midfielder").length,
    Defender: shortlistedPlayers.filter(p => p.position === "Defender").length,
    Goalkeeper: shortlistedPlayers.filter(p => p.position === "Goalkeeper").length,
  };

  const handleRemove = (playerId: string) => {
    removeFromShortlist.mutate(playerId, {
      onSuccess: () => toast.success("Removed from shortlist"),
      onError: () => toast.error("Failed to remove"),
    });
  };

  const isLoading = shortlistLoading || playersLoading;

  return (
    <AgentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-white" />
            </div>
            My Shortlist
          </h1>
          <p className="text-muted-foreground">Players you've saved for review and outreach.</p>
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
                <p className="font-display text-3xl font-black text-red-400">{positionCounts.Forward}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Forwards</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-black text-blue-400">{positionCounts.Midfielder}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Midfielders</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-black text-green-400">{positionCounts.Defender}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Defenders</p>
              </div>
              <div className="text-center">
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
                Sort by: {sortBy === "recent" ? "Recently Added" : sortBy === "goals" ? "Goals" : "Age"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("recent")}>
                <Clock className="w-4 h-4 mr-2" /> Recently Added
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

        {/* Player Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredPlayers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlayers.map((player) => (
              <div key={player.id} className="relative group">
                <ESPNPlayerCard 
                  player={player} 
                  linkTo={`/agent/player/${player.id}`}
                  isShortlisted={true}
                  onToggleShortlist={() => handleRemove(String(player.id))}
                  shortlistLoading={removeFromShortlist.isPending}
                />
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
