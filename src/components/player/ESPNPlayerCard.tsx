import { BadgeCheck, Star, TrendingUp, Bookmark, BookmarkCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface Player {
  id: string | number;
  name: string;
  age?: number | null;
  position: string;
  country: string;
  verified: boolean;
  endorsed: boolean;
  image?: string | null;
  stats?: {
    goals?: number;
    assists?: number;
    matches?: number;
  };
}

interface ESPNPlayerCardProps {
  player: Player;
  linkTo?: string;
  isShortlisted?: boolean;
  onToggleShortlist?: (playerId: string) => void;
  shortlistLoading?: boolean;
}

const ESPNPlayerCard = ({ player, linkTo, isShortlisted, onToggleShortlist, shortlistLoading }: ESPNPlayerCardProps) => {
  const initials = player.name.split(' ').map(n => n[0]).join('');
  
  const CardContent = () => (
    <div className="espn-card group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
      {/* Top Accent Bar */}
      <div className="h-1.5 espn-hero-accent" />
      
      {/* Main Content */}
      <div className="p-5">
        {/* Header with Avatar and Badges */}
        <div className="flex items-start gap-4 mb-4">
          {/* Player Avatar */}
          <div className="relative">
            {player.image ? (
              <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-white/10">
                <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-red-500/30 to-orange-500/20 flex items-center justify-center border-2 border-white/10">
                <span className="font-display font-bold text-3xl text-white">{initials}</span>
              </div>
            )}
            {player.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-2 border-slate-900">
                <BadgeCheck className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>
          
          {/* Player Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-lg text-white truncate group-hover:text-red-400 transition-colors">
              {player.name}
            </h3>
            <p className="text-red-400 font-bold text-sm uppercase tracking-wider">{player.position}</p>
            <div className="flex items-center gap-2 mt-1 text-white/50 text-sm">
              {player.age && <span>{player.age} YRS</span>}
              {player.age && <span>•</span>}
              <span className="uppercase">{player.country}</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        {player.stats && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="espn-stat-block">
              <span className="espn-stat-value">{player.stats.goals ?? '-'}</span>
              <span className="espn-stat-label">Goals</span>
            </div>
            <div className="espn-stat-block">
              <span className="espn-stat-value">{player.stats.assists ?? '-'}</span>
              <span className="espn-stat-label">Assists</span>
            </div>
            <div className="espn-stat-block">
              <span className="espn-stat-value">{player.stats.matches ?? '-'}</span>
              <span className="espn-stat-label">Games</span>
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {player.verified && (
            <span className="pill-espn">
              <BadgeCheck className="w-3 h-3" /> Verified
            </span>
          )}
          {player.endorsed && (
            <span className="pill-espn-gold">
              <Star className="w-3 h-3" /> Coach Pick
            </span>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="px-5 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-white/50 text-xs">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>High Potential</span>
        </div>
        <span className="text-red-400 font-bold text-xs uppercase tracking-wider group-hover:text-red-300 transition-colors">
          View Profile →
        </span>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {onToggleShortlist && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleShortlist(String(player.id));
          }}
          disabled={shortlistLoading}
          className={`absolute top-6 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isShortlisted
              ? 'bg-amber-500 text-white'
              : 'bg-black/60 text-white/60 hover:bg-amber-500 hover:text-white'
          }`}
          title={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
        >
          {isShortlisted ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>
      )}
      {linkTo ? (
        <Link to={linkTo}>
          <CardContent />
        </Link>
      ) : (
        <CardContent />
      )}
    </div>
  );
};

export default ESPNPlayerCard;
