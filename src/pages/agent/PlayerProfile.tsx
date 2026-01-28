import AgentLayout from "@/components/layouts/AgentLayout";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Ruler, BadgeCheck, Star, Play, Shield, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  },
  bio: "Passionate forward with excellent pace and finishing ability. Trained at Right to Dream Academy since age 14. Looking for opportunities to develop at a professional club in Europe.",
};

const PlayerProfile = () => {
  const { id } = useParams();
  const [showRequestModal, setShowRequestModal] = useState(false);

  return (
    <AgentLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Link to="/agent/browse">
          <Button variant="ghost" className="rounded-xl -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Button>
        </Link>

        {/* Profile Header */}
        <div className="card-float p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar / Video Placeholder */}
            <div className="w-full md:w-48 h-48 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center relative overflow-hidden group cursor-pointer">
              <span className="font-display font-bold text-5xl text-primary">
                {mockPlayerData.name.split(' ').map(n => n[0]).join('')}
              </span>
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-primary-foreground flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary fill-primary" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-display text-3xl font-bold mb-1">{mockPlayerData.name}</h1>
                  <p className="text-xl text-primary font-medium">{mockPlayerData.position}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {mockPlayerData.verified && (
                    <span className="pill-verified">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  )}
                  {mockPlayerData.endorsed && (
                    <span className="pill-primary">
                      <Star className="w-3.5 h-3.5" />
                      Coach Endorsed
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <InfoItem icon={<Calendar className="w-4 h-4" />} label="Age" value={`${mockPlayerData.age} years`} />
                <InfoItem icon={<MapPin className="w-4 h-4" />} label="Location" value={`${mockPlayerData.city}, ${mockPlayerData.country}`} />
                <InfoItem icon={<Ruler className="w-4 h-4" />} label="Height" value={mockPlayerData.height} />
                <InfoItem label="Preferred Foot" value={mockPlayerData.preferredFoot} />
              </div>

              <div className="pill-verified inline-flex text-sm">
                {mockPlayerData.availability}
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="card-float p-6">
          <h2 className="font-display text-lg font-semibold mb-3">About</h2>
          <p className="text-muted-foreground">{mockPlayerData.bio}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="stat-card text-center">
            <p className="font-display text-3xl font-bold text-primary">{mockPlayerData.stats.goals}</p>
            <p className="text-sm text-muted-foreground">Goals</p>
          </div>
          <div className="stat-card text-center">
            <p className="font-display text-3xl font-bold text-primary">{mockPlayerData.stats.assists}</p>
            <p className="text-sm text-muted-foreground">Assists</p>
          </div>
          <div className="stat-card text-center">
            <p className="font-display text-3xl font-bold text-primary">{mockPlayerData.stats.matches}</p>
            <p className="text-sm text-muted-foreground">Matches</p>
          </div>
        </div>

        {/* Coach Endorsement */}
        <div className="card-float p-6 border-success/20 bg-success/5">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-success" />
            <h2 className="font-display text-lg font-semibold">Coach Endorsement</h2>
          </div>
          <blockquote className="text-muted-foreground italic mb-4">
            "{mockPlayerData.coachEndorsement.quote}"
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success font-semibold text-sm">
              {mockPlayerData.coachEndorsement.coach.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-medium">{mockPlayerData.coachEndorsement.coach}</p>
              <p className="text-sm text-muted-foreground">{mockPlayerData.coachEndorsement.academy}</p>
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
              className="rounded-xl w-full md:w-auto"
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
              <Button className="flex-1 rounded-xl" onClick={() => setShowRequestModal(false)}>
                Send Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </AgentLayout>
  );
};

const InfoItem = ({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) => (
  <div>
    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
      {icon}
      {label}
    </p>
    <p className="font-medium">{value}</p>
  </div>
);

export default PlayerProfile;
