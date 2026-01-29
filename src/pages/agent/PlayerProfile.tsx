import AgentLayout from "@/components/layouts/AgentLayout";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, BadgeCheck, Star, Shield, MessageCircle, Target, Users, Trophy, TrendingUp, Footprints, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ESPNStatBlock from "@/components/player/ESPNStatBlock";

const mockPlayerData = {
  id: 1,
  name: "Kwame Mensah",
  age: 19,
  position: "Forward",
  country: "Ghana",
  city: "Accra",
  height: "1.82m",
  weight: "75kg",
  preferredFoot: "Right",
  verified: true,
  endorsed: true,
  availability: "Open to Trials",
  coachEndorsement: {
    coach: "Emmanuel Asante",
    academy: "Right to Dream Academy",
    quote: "Kwame is an exceptional talent with great technical skills and football intelligence. He has the potential to play at the highest level."
  },
  stats: {
    goals: 15,
    assists: 8,
    matches: 24,
    minutesPlayed: 1920,
    passAccuracy: 84,
    shotsOnTarget: 42,
  },
  seasonStats: {
    goalsPerGame: 0.63,
    assistsPerGame: 0.33,
    rating: 7.8,
  },
  bio: "Passionate forward with excellent pace and finishing ability. Trained at Right to Dream Academy since age 14. Looking for opportunities to develop at a professional club in Europe.",
};

const PlayerProfile = () => {
  const { id } = useParams();
  const [showRequestModal, setShowRequestModal] = useState(false);

  return (
    <AgentLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Button */}
        <Link to="/agent/browse">
          <Button variant="ghost" className="rounded-xl -ml-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Button>
        </Link>

        {/* ESPN-Style Hero Section */}
        <div className="espn-hero rounded-2xl overflow-hidden">
          {/* Top Accent */}
          <div className="h-2 espn-hero-accent" />
          
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Player Avatar / Video */}
              <div className="relative group">
                <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-red-500/30 to-orange-500/20 flex items-center justify-center border-2 border-white/10">
                  <span className="font-display font-black text-6xl text-white">
                    {mockPlayerData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
                {mockPlayerData.verified && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center border-4 border-slate-900">
                    <BadgeCheck className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* Player Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="pill-espn text-xs">{mockPlayerData.position}</span>
                      <span className="pill-espn-gold text-xs">#{mockPlayerData.id}</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-2">
                      {mockPlayerData.name}
                    </h1>
                    <div className="flex items-center gap-4 text-white/60 text-sm">
                      <span>{mockPlayerData.city}, {mockPlayerData.country}</span>
                      <span>•</span>
                      <span>{mockPlayerData.age} Years Old</span>
                      <span>•</span>
                      <span>{mockPlayerData.height}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                    <p className="text-2xl font-black text-white">{mockPlayerData.seasonStats.rating}</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Avg Rating</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                    <p className="text-2xl font-black text-red-400">{mockPlayerData.seasonStats.goalsPerGame}</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Goals/Game</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                    <p className="text-2xl font-black text-orange-400">{mockPlayerData.seasonStats.assistsPerGame}</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Assists/Game</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  {mockPlayerData.verified && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                      <BadgeCheck className="w-3 h-3" />
                      Verified Player
                    </span>
                  )}
                  {mockPlayerData.endorsed && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <Star className="w-3 h-3" />
                      Coach Endorsed
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    {mockPlayerData.availability}
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
            <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-red-400" />
              2024/25 Season Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <ESPNStatBlock value={mockPlayerData.stats.goals} label="Goals" icon={Target} trend="up" size="md" />
              <ESPNStatBlock value={mockPlayerData.stats.assists} label="Assists" icon={Users} trend="up" size="md" />
              <ESPNStatBlock value={mockPlayerData.stats.matches} label="Matches" icon={Trophy} size="md" />
              <ESPNStatBlock value={mockPlayerData.stats.minutesPlayed} label="Minutes" icon={Timer} size="md" />
              <ESPNStatBlock value={`${mockPlayerData.stats.passAccuracy}%`} label="Pass Acc" icon={TrendingUp} size="md" />
              <ESPNStatBlock value={mockPlayerData.stats.shotsOnTarget} label="Shots OT" icon={Footprints} size="md" />
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="card-float p-6">
          <h2 className="font-display text-lg font-semibold mb-3">About</h2>
          <p className="text-muted-foreground leading-relaxed">{mockPlayerData.bio}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/50">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Height</p>
              <p className="font-semibold">{mockPlayerData.height}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Weight</p>
              <p className="font-semibold">{mockPlayerData.weight}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Preferred Foot</p>
              <p className="font-semibold">{mockPlayerData.preferredFoot}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Position</p>
              <p className="font-semibold">{mockPlayerData.position}</p>
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
              "{mockPlayerData.coachEndorsement.quote}"
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                {mockPlayerData.coachEndorsement.coach.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-white">{mockPlayerData.coachEndorsement.coach}</p>
                <p className="text-sm text-white/50">{mockPlayerData.coachEndorsement.academy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Request Contact CTA */}
        <div className="card-float p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">Interested in this player?</h3>
                <p className="text-sm text-muted-foreground">
                  Send a contact request. The player will review and decide whether to connect.
                </p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="rounded-xl w-full md:w-auto bg-red-500 hover:bg-red-600 text-white"
              onClick={() => setShowRequestModal(true)}
            >
              Request Contact
            </Button>
          </div>
        </div>

        {/* Safety Note */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
          <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Openfield Safety:</strong> All interactions are consent-based. 
              Players approve contact requests before any communication. We never ask players for upfront fees.
            </p>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setShowRequestModal(false)} />
          <div className="relative card-float p-8 max-w-md w-full animate-scale-in">
            <h2 className="font-display text-xl font-bold mb-2">Request Contact</h2>
            <p className="text-muted-foreground mb-6">
              Select the type of opportunity you'd like to discuss with {mockPlayerData.name}.
            </p>
            
            <div className="space-y-3 mb-6">
              <button className="w-full p-4 rounded-xl border border-border/50 text-left hover:border-primary hover:bg-primary/5 transition-colors">
                <p className="font-semibold">Trial Opportunity</p>
                <p className="text-sm text-muted-foreground">Invite for a trial at a club</p>
              </button>
              <button className="w-full p-4 rounded-xl border border-border/50 text-left hover:border-primary hover:bg-primary/5 transition-colors">
                <p className="font-semibold">Representation</p>
                <p className="text-sm text-muted-foreground">Discuss agent representation</p>
              </button>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setShowRequestModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1 rounded-xl bg-red-500 hover:bg-red-600" onClick={() => setShowRequestModal(false)}>
                Send Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </AgentLayout>
  );
};

export default PlayerProfile;
