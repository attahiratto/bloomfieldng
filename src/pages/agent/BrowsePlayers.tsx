import AgentLayout from "@/components/layouts/AgentLayout";
import { Search, Filter, ChevronDown, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import ESPNPlayerCard from "@/components/player/ESPNPlayerCard";
import { useAllPlayers, useMyShortlist, useAddToShortlist, useRemoveFromShortlist } from "@/hooks/usePlayerData";
import { toast } from "sonner";

const positions = ["All Positions", "Forward", "Midfielder", "Defender", "Goalkeeper"];
const countries = ["All Countries", "Nigeria", "Ghana", "Senegal", "Cameroon", "Kenya"];

const BrowsePlayers = () => {
  const { data: players, isLoading } = useAllPlayers();
  const { data: shortlist } = useMyShortlist();
  const addToShortlist = useAddToShortlist();
  const removeFromShortlist = useRemoveFromShortlist();
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    position: "All Positions",
    country: "All Countries",
  });

  const shortlistedIds = new Set(shortlist?.map(s => s.player_id) ?? []);

  const handleToggleShortlist = (playerId: string) => {
    if (shortlistedIds.has(playerId)) {
      removeFromShortlist.mutate(playerId, {
        onSuccess: () => toast.success("Removed from shortlist"),
      });
    } else {
      addToShortlist.mutate(playerId, {
        onSuccess: () => toast.success("Added to shortlist!"),
        onError: (e: any) => toast.error(e?.message?.includes("duplicate") ? "Already in shortlist" : "Failed to add"),
      });
    }
  };

  const filteredPlayers = useMemo(() => {
    if (!players) return [];
    return players.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (activeFilters.position !== "All Positions" && p.position !== activeFilters.position) return false;
      if (activeFilters.country !== "All Countries" && p.country !== activeFilters.country) return false;
      return true;
    });
  }, [players, search, activeFilters]);

  return (
    <AgentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Browse Players</h1>
          <p className="text-muted-foreground">Discover verified talent from across Africa.</p>
        </div>

        {/* Search & Filters */}
        <div className="card-float p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search players by name..." 
                className="pl-12 h-12 rounded-xl border-border/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterChip 
                label={activeFilters.position} 
                options={positions}
                onSelect={(val) => setActiveFilters({ ...activeFilters, position: val })}
              />
              <FilterChip 
                label={activeFilters.country} 
                options={countries}
                onSelect={(val) => setActiveFilters({ ...activeFilters, country: val })}
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredPlayers.length}</span> players
          </p>
        </div>

        {/* Player Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredPlayers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlayers.map((player) => (
              <ESPNPlayerCard 
                key={player.id} 
                player={player} 
                linkTo={`/agent/player/${player.id}`}
                isShortlisted={shortlistedIds.has(String(player.id))}
                onToggleShortlist={handleToggleShortlist}
                shortlistLoading={addToShortlist.isPending || removeFromShortlist.isPending}
              />
            ))}
          </div>
        ) : (
          <div className="espn-card rounded-2xl p-12 text-center">
            <p className="text-white/50">No players match your search criteria.</p>
          </div>
        )}
      </div>
    </AgentLayout>
  );
};

const FilterChip = ({ 
  label, options, onSelect 
}: { 
  label: string; options: string[]; onSelect: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors"
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-2 z-50 bg-card rounded-xl shadow-lg border border-border/50 py-2 min-w-[160px]">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => { onSelect(option); setOpen(false); }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors ${label === option ? 'text-primary font-medium' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BrowsePlayers;
