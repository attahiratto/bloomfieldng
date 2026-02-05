import PlayerLayout from "@/components/layouts/PlayerLayout";
import { BadgeCheck, Star, Play, Edit, Trophy, Target, Users, Timer, TrendingUp, Footprints, Camera, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ESPNStatBlock from "@/components/player/ESPNStatBlock";
import { useProfile } from "@/hooks/useProfile";
import { useMyStats, useMyCareerHistory, useMyEndorsements } from "@/hooks/usePlayerData";

const MyProfile = () => {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: stats, isLoading: statsLoading } = useMyStats();
  const { data: careerHistory, isLoading: careerLoading } = useMyCareerHistory();
  const { data: endorsements, isLoading: endorseLoading } = useMyEndorsements();

  const isLoading = profileLoading || statsLoading || careerLoading || endorseLoading;

  if (isLoading) {
    return (
      <PlayerLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PlayerLayout>
    );
  }

  const displayName = profile?.full_name || "Player Name";
  const initials = displayName.split(' ').map(n => n[0]).join('');
  const country = profile?.country || "Not set";
  const city = profile?.city || "";
  const bio = profile?.bio || "No bio added yet. Tell agents about yourself!";
  const position = profile?.position || "Not set";
  const height = profile?.height || "Not set";
  const weight = profile?.weight || "Not set";
  const preferredFoot = profile?.preferred_foot || "Not set";

  const goalsPerGame = stats && stats.matches > 0 ? (stats.goals / stats.matches).toFixed(2) : "0";
  const assistsPerGame = stats && stats.matches > 0 ? (stats.assists / stats.matches).toFixed(2) : "0";
  const rating = stats && stats.matches > 0 ? ((stats.goals + stats.assists) / stats.matches * 2 + 5).toFixed(1) : "0";

  return (
    <PlayerLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ESPN-Style Hero Section */}
        <div className="espn-hero rounded-2xl overflow-hidden relative">
          <div className="h-2 espn-hero-accent" />
          
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute top-6 right-6 rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20 z-10"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Player Avatar */}
              <div className="relative group">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt={displayName} className="w-48 h-48 rounded-xl object-cover border-2 border-white/10" />
                ) : (
                  <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center border-2 border-white/10">
                    <span className="font-display font-black text-6xl text-white">{initials}</span>
                  </div>
                )}
                <div className="absolute inset-0 rounded-xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-destructive flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center border-4 border-background hover:bg-primary/80 transition-colors">
                  <Camera className="w-5 h-5 text-primary-foreground" />
                </button>
              </div>

              {/* Player Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="pill-espn text-xs">{position}</span>
                      <span className="pill-espn-gold text-xs">Top Prospect</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-2">{displayName}</h1>
                    <div className="flex items-center gap-4 text-white/60 text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {city ? `${city}, ${country}` : country}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                    <p className="text-2xl font-black text-white">{rating}</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Avg Rating</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                    <p className="text-2xl font-black text-destructive">{goalsPerGame}</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Goals/Game</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                    <p className="text-2xl font-black text-orange-400">{assistsPerGame}</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Assists/Game</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                    <BadgeCheck className="w-3 h-3" /> Verified Player
                  </span>
                  {endorsements && endorsements.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <Star className="w-3 h-3" /> Coach Endorsed
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    {profile?.availability || "Open to Trials"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="espn-card rounded-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary to-blue-400" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> Personal Information
              </h2>
              <Button variant="ghost" size="sm" className="text-white/50 hover:text-white">
                <Edit className="w-4 h-4 mr-2" /> Edit
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Full Name</p>
                <p className="font-semibold text-white">{displayName}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Country</p>
                <p className="font-semibold text-white">{country}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Height</p>
                <p className="font-semibold text-white">{height}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Preferred Foot</p>
                <p className="font-semibold text-white">{preferredFoot}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Season Statistics */}
        <div className="espn-card rounded-2xl overflow-hidden">
          <div className="h-1 espn-hero-accent" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-destructive" /> Season Stats
              </h2>
              <Button variant="ghost" size="sm" className="text-white/50 hover:text-white">
                <Edit className="w-4 h-4 mr-2" /> Update Stats
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <ESPNStatBlock value={stats?.goals ?? 0} label="Goals" icon={Target} trend="up" size="md" />
              <ESPNStatBlock value={stats?.assists ?? 0} label="Assists" icon={Users} trend="up" size="md" />
              <ESPNStatBlock value={stats?.matches ?? 0} label="Matches" icon={Trophy} size="md" />
              <ESPNStatBlock value={stats?.minutes_played ?? 0} label="Minutes" icon={Timer} size="md" />
              <ESPNStatBlock value={`${stats?.pass_accuracy ?? 0}%`} label="Pass Acc" icon={TrendingUp} size="md" />
              <ESPNStatBlock value={stats?.shots_on_target ?? 0} label="Shots OT" icon={Footprints} size="md" />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="espn-card rounded-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary to-emerald-400" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-xl font-bold text-white">About Me</h2>
              <Button variant="ghost" size="sm" className="text-white/50 hover:text-white">
                <Edit className="w-4 h-4 mr-2" /> Edit
              </Button>
            </div>
            <p className="text-white/70 leading-relaxed">{bio}</p>
          </div>
        </div>

        {/* Career History */}
        <div className="espn-card rounded-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-muted to-muted-foreground" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-white">Career History</h2>
              <Button variant="ghost" size="sm" className="text-white/50 hover:text-white">
                <Edit className="w-4 h-4 mr-2" /> Add
              </Button>
            </div>
            <div className="space-y-4">
              {careerHistory && careerHistory.length > 0 ? (
                careerHistory.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{item.team}</p>
                      <p className="text-sm text-white/50">{item.role}</p>
                    </div>
                    {item.period && <p className="text-sm text-white/40">{item.period}</p>}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-white/40">
                  <p>No career history added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Coach Endorsement */}
        <div className="espn-card rounded-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-amber-500 to-yellow-400" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-400" />
              <h2 className="font-display text-lg font-bold text-white">Coach Endorsement</h2>
            </div>
            {endorsements && endorsements.length > 0 ? (
              endorsements.map((e) => (
                <div key={e.id} className="mb-4">
                  <blockquote className="text-white/70 italic text-lg mb-4 border-l-4 border-amber-500 pl-4">
                    "{e.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                      {e.coach_name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{e.coach_name}</p>
                      {e.academy && <p className="text-sm text-white/50">{e.academy}</p>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-white/50">
                <p>No coach endorsement yet</p>
                <p className="text-sm mt-1">Request an endorsement from your coach</p>
              </div>
            )}
          </div>
        </div>

        {/* Highlight Video */}
        <div className="espn-card rounded-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-destructive to-orange-400" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Play className="w-5 h-5 text-destructive" /> Highlight Video
              </h2>
              <Button variant="outline" size="sm" className="rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Camera className="w-4 h-4 mr-2" /> Upload Video
              </Button>
            </div>
            <div className="aspect-video rounded-xl bg-white/5 flex items-center justify-center border-2 border-dashed border-white/20">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-3">
                  <Play className="w-8 h-8 text-destructive" />
                </div>
                <p className="text-white/70 font-medium">No highlight video uploaded yet</p>
                <p className="text-sm text-white/40">Upload a video to showcase your skills to agents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PlayerLayout>
  );
};

export default MyProfile;
