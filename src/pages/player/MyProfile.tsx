import PlayerLayout from "@/components/layouts/PlayerLayout";
import { BadgeCheck, Star, Play, Edit, Trophy, Target, Users, Timer, TrendingUp, Footprints, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import ESPNStatBlock from "@/components/player/ESPNStatBlock";

const myProfileData = {
  name: "Adeola Okonkwo",
  age: 20,
  position: "Forward",
  country: "Nigeria",
  city: "Lagos",
  height: "1.78m",
  weight: "72kg",
  preferredFoot: "Right",
  verified: true,
  endorsed: true,
  availability: "Open to Trials",
  coachEndorsement: {
    coach: "Coach Sunday Oliseh",
    academy: "Lagos Football Academy",
    quote: "Adeola has incredible pace and a natural goal-scoring instinct. One of the most promising talents I've coached in years."
  },
  stats: {
    goals: 23,
    assists: 11,
    matches: 32,
    minutesPlayed: 2560,
    passAccuracy: 78,
    shotsOnTarget: 56,
  },
  seasonStats: {
    goalsPerGame: 0.72,
    assistsPerGame: 0.34,
    rating: 8.2,
  },
  bio: "Dynamic forward with explosive pace and clinical finishing. Product of Lagos Football Academy with experience in national youth teams. Seeking opportunities to develop at a professional club in Europe.",
};

const MyProfile = () => {
  return (
    <PlayerLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ESPN-Style Hero Section */}
        <div className="espn-hero rounded-2xl overflow-hidden relative">
          {/* Top Accent */}
          <div className="h-2 espn-hero-accent" />
          
          {/* Edit Button */}
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
              {/* Player Avatar / Video */}
              <div className="relative group">
                <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-500/20 flex items-center justify-center border-2 border-white/10">
                  <span className="font-display font-black text-6xl text-white">
                    {myProfileData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
                {/* Upload overlay */}
                <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center border-4 border-slate-900 hover:bg-primary/80 transition-colors">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Player Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="pill-espn text-xs">{myProfileData.position}</span>
                      <span className="pill-espn-gold text-xs">Top Prospect</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-2">
                      {myProfileData.name}
                    </h1>
                    <div className="flex items-center gap-4 text-white/60 text-sm">
                      <span>{myProfileData.city}, {myProfileData.country}</span>
                      <span>•</span>
                      <span>{myProfileData.age} Years Old</span>
                      <span>•</span>
                      <span>{myProfileData.height}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                    <p className="text-2xl font-black text-white">{myProfileData.seasonStats.rating}</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Avg Rating</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                    <p className="text-2xl font-black text-red-400">{myProfileData.seasonStats.goalsPerGame}</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Goals/Game</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                    <p className="text-2xl font-black text-orange-400">{myProfileData.seasonStats.assistsPerGame}</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Assists/Game</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  {myProfileData.verified && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                      <BadgeCheck className="w-3 h-3" />
                      Verified Player
                    </span>
                  )}
                  {myProfileData.endorsed && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <Star className="w-3 h-3" />
                      Coach Endorsed
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    {myProfileData.availability}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Season Statistics - ESPN Style Grid */}
        <div className="espn-card rounded-2xl overflow-hidden">
          <div className="h-1 espn-hero-accent" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-red-400" />
                2024/25 Season Stats
              </h2>
              <Button variant="ghost" size="sm" className="text-white/50 hover:text-white">
                <Edit className="w-4 h-4 mr-2" />
                Update Stats
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <ESPNStatBlock value={myProfileData.stats.goals} label="Goals" icon={Target} trend="up" size="md" />
              <ESPNStatBlock value={myProfileData.stats.assists} label="Assists" icon={Users} trend="up" size="md" />
              <ESPNStatBlock value={myProfileData.stats.matches} label="Matches" icon={Trophy} size="md" />
              <ESPNStatBlock value={myProfileData.stats.minutesPlayed} label="Minutes" icon={Timer} size="md" />
              <ESPNStatBlock value={`${myProfileData.stats.passAccuracy}%`} label="Pass Acc" icon={TrendingUp} size="md" />
              <ESPNStatBlock value={myProfileData.stats.shotsOnTarget} label="Shots OT" icon={Footprints} size="md" />
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="card-float p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold">About Me</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
          <p className="text-muted-foreground leading-relaxed">{myProfileData.bio}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/50">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Height</p>
              <p className="font-semibold">{myProfileData.height}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Weight</p>
              <p className="font-semibold">{myProfileData.weight}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Preferred Foot</p>
              <p className="font-semibold">{myProfileData.preferredFoot}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Position</p>
              <p className="font-semibold">{myProfileData.position}</p>
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
            <blockquote className="text-white/70 italic text-lg mb-4 border-l-4 border-amber-500 pl-4">
              "{myProfileData.coachEndorsement.quote}"
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                {myProfileData.coachEndorsement.coach.split(' ').slice(1).map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-white">{myProfileData.coachEndorsement.coach}</p>
                <p className="text-sm text-white/50">{myProfileData.coachEndorsement.academy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Video Section */}
        <div className="card-float p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Highlight Video</h2>
            <Button variant="outline" size="sm" className="rounded-xl">
              <Camera className="w-4 h-4 mr-2" />
              Upload Video
            </Button>
          </div>
          <div className="aspect-video rounded-xl bg-secondary/50 flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <Play className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No highlight video uploaded yet</p>
              <p className="text-sm text-muted-foreground/70">Upload a video to showcase your skills to agents</p>
            </div>
          </div>
        </div>
      </div>
    </PlayerLayout>
  );
};

export default MyProfile;
