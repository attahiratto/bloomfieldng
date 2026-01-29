import AgentLayout from "@/components/layouts/AgentLayout";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ESPNPlayerCard from "@/components/player/ESPNPlayerCard";

const positions = ["All Positions", "Forward", "Midfielder", "Defender", "Goalkeeper"];
const ages = ["All Ages", "16-18", "19-21", "22-25", "26+"];
const countries = ["All Countries", "Nigeria", "Ghana", "Senegal", "Cameroon", "Kenya"];
const availability = ["All", "Available Now", "Open to Trials", "Seeking Agent"];

const mockPlayers = [
  { id: 1, name: "Kwame Mensah", age: 19, position: "Forward", country: "Ghana", verified: true, endorsed: true, image: null, stats: { goals: 15, assists: 8, matches: 24 } },
  { id: 2, name: "Chinedu Okafor", age: 21, position: "Midfielder", country: "Nigeria", verified: true, endorsed: false, image: null, stats: { goals: 6, assists: 14, matches: 28 } },
  { id: 3, name: "Amadou Diallo", age: 18, position: "Defender", country: "Senegal", verified: true, endorsed: true, image: null, stats: { goals: 2, assists: 5, matches: 22 } },
  { id: 4, name: "Samuel Eto'o Jr", age: 20, position: "Forward", country: "Cameroon", verified: true, endorsed: true, image: null, stats: { goals: 22, assists: 11, matches: 30 } },
  { id: 5, name: "Brian Ochieng", age: 22, position: "Goalkeeper", country: "Kenya", verified: true, endorsed: false, image: null, stats: { goals: 0, assists: 1, matches: 26 } },
  { id: 6, name: "Yusuf Ibrahim", age: 17, position: "Midfielder", country: "Nigeria", verified: true, endorsed: true, image: null, stats: { goals: 9, assists: 12, matches: 20 } },
];

const BrowsePlayers = () => {
  const [activeFilters, setActiveFilters] = useState({
    position: "All Positions",
    age: "All Ages",
    country: "All Countries",
    availability: "All",
  });

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
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search players by name..." 
                className="pl-12 h-12 rounded-xl border-border/50"
              />
            </div>
            
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              <FilterChip 
                label={activeFilters.position} 
                options={positions}
                onSelect={(val) => setActiveFilters({ ...activeFilters, position: val })}
              />
              <FilterChip 
                label={activeFilters.age} 
                options={ages}
                onSelect={(val) => setActiveFilters({ ...activeFilters, age: val })}
              />
              <FilterChip 
                label={activeFilters.country} 
                options={countries}
                onSelect={(val) => setActiveFilters({ ...activeFilters, country: val })}
              />
              <FilterChip 
                label={activeFilters.availability} 
                options={availability}
                onSelect={(val) => setActiveFilters({ ...activeFilters, availability: val })}
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{mockPlayers.length}</span> players
          </p>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Player Grid - ESPN Style */}
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

const FilterChip = ({ 
  label, 
  options, 
  onSelect 
}: { 
  label: string; 
  options: string[];
  onSelect: (value: string) => void;
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
                onClick={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors ${
                  label === option ? 'text-primary font-medium' : ''
                }`}
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
