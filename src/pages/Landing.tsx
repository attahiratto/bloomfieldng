import { Link } from "react-router-dom";
import { Shield, Users, Eye, ArrowRight, CheckCircle, AlertTriangle, Globe, BadgeCheck, Sparkles, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
              <Globe className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">Openfield</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/player/dashboard">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Player Login</Button>
            </Link>
            <Link to="/agent/dashboard">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Agent Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 linear-hero" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] linear-glow opacity-50" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8 animate-fade-up">
            <div className="pill-verified inline-flex mx-auto">
              <Sparkles className="w-3.5 h-3.5" />
              Trust-first football platform
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">Opening access.</span>{" "}
              <br className="hidden md:block" />
              <span className="gradient-text-primary">Building trust.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Connecting African football talent with verified agents — safely, transparently, and without exploitation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Link to="/player/dashboard">
                <Button size="lg" className="w-full sm:w-auto rounded-xl h-14 px-8 text-base font-semibold btn-glow">
                  I'm a Player
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/agent/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-xl h-14 px-8 text-base font-semibold border-border hover:bg-secondary/50 hover:border-primary/50 transition-all">
                  I'm an Agent
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            <StatItem value="500+" label="Players Connected" />
            <StatItem value="100%" label="Agents Verified" />
            <StatItem value="12" label="Countries" />
          </div>
        </div>
      </section>

      {/* Trusted By / Social Proof */}
      <section className="py-12 px-6 border-y border-border/50">
        <div className="container mx-auto max-w-6xl">
          <p className="text-center text-sm text-muted-foreground mb-6">TRUSTED BY FOOTBALL PROFESSIONALS ACROSS AFRICA</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            {["Lagos FC Academy", "Cape Town Stars", "Accra United", "Nairobi Elite", "Johannesburg FC"].map((name) => (
              <span key={name} className="font-display font-semibold text-muted-foreground">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="pill-pending inline-flex mx-auto mb-4">
              <AlertTriangle className="w-3.5 h-3.5" />
              The Problem
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 gradient-text">
              African talent faces unique barriers
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Young players are exploited by fake agents, lack exposure to legitimate scouts, and have no trusted pathway to professional football.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ProblemCard
              icon={<AlertTriangle className="w-5 h-5" />}
              title="Fake Agents"
              description="Unverified intermediaries exploit young players with false promises and demand upfront fees."
            />
            <ProblemCard
              icon={<Eye className="w-5 h-5" />}
              title="Zero Visibility"
              description="Talented players remain invisible to legitimate scouts and miss professional opportunities."
            />
            <ProblemCard
              icon={<Lock className="w-5 h-5" />}
              title="No Safe Pathway"
              description="Without verified connections, players risk exploitation and career-ending situations."
            />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 linear-hero opacity-50" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="pill-primary inline-flex mx-auto mb-4">
              <Zap className="w-3.5 h-3.5" />
              The Solution
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 gradient-text">
              A safe bridge to opportunity
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Openfield creates transparent, consent-based connections between verified agents and talented players.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<BadgeCheck className="w-5 h-5" />}
              title="Verified Agents"
              description="Every agent is screened and verified before platform access."
            />
            <FeatureCard
              icon={<Users className="w-5 h-5" />}
              title="Player Profiles"
              description="Showcase skills with video highlights and coach endorsements."
            />
            <FeatureCard
              icon={<Shield className="w-5 h-5" />}
              title="Consent-First"
              description="Players approve all contact. No unsolicited messages ever."
            />
            <FeatureCard
              icon={<Eye className="w-5 h-5" />}
              title="Full Transparency"
              description="Track who views your profile and manage all interactions."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 gradient-text">
              How it works
            </h2>
          </div>
          
          <div className="space-y-8">
            <StepCard 
              number="01" 
              title="Create Your Profile" 
              description="Upload your stats, highlight videos, and get coach endorsements to showcase your talent."
            />
            <StepCard 
              number="02" 
              title="Get Discovered" 
              description="Verified agents browse profiles and can request to connect with players they're interested in."
            />
            <StepCard 
              number="03" 
              title="You Control Contact" 
              description="Review agent requests, check their verification status, and approve only the connections you want."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 linear-hero" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] linear-glow" />
        
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Ready to take the next step?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join the platform that puts trust and player safety first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/player/dashboard">
              <Button size="lg" className="w-full sm:w-auto rounded-xl h-14 px-8 text-base font-semibold btn-glow">
                I'm a Player
              </Button>
            </Link>
            <Link to="/agent/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-xl h-14 px-8 text-base font-semibold border-border hover:bg-secondary/50 hover:border-primary/50">
                I'm an Agent
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Globe className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-foreground">Openfield</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Openfield. Building trust in football.
          </p>
        </div>
      </footer>
    </div>
  );
};

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="font-display text-3xl md:text-4xl font-bold gradient-text-primary">{value}</p>
    <p className="text-sm text-muted-foreground mt-1">{label}</p>
  </div>
);

const ProblemCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="card-glass p-6 group">
    <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center text-destructive mb-4">
      {icon}
    </div>
    <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="feature-card group cursor-default">
    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/30 transition-colors">
      {icon}
    </div>
    <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="card-glass p-6 flex gap-6 items-start group hover:border-primary/30 transition-colors">
    <div className="font-display text-4xl font-bold gradient-text-primary">{number}</div>
    <div>
      <h3 className="font-display font-semibold text-xl mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default Landing;
