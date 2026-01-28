import { Link } from "react-router-dom";
import { Shield, Users, Eye, ArrowRight, CheckCircle, AlertTriangle, Globe, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">Openfield</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/player/dashboard">
              <Button variant="ghost" size="sm">Player Login</Button>
            </Link>
            <Link to="/agent/dashboard">
              <Button variant="ghost" size="sm">Agent Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-up">
              <div className="pill-verified inline-flex">
                <Shield className="w-3.5 h-3.5" />
                Trust-first platform
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Opening access.{" "}
                <span className="text-primary">Building trust.</span>{" "}
                Unlocking football potential.
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Connecting African football talent with verified agents — safely and transparently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/player/dashboard">
                  <Button size="lg" className="w-full sm:w-auto rounded-xl h-14 px-8 text-base font-semibold shadow-float hover:shadow-xl transition-all">
                    I'm a Player
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/agent/dashboard">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-xl h-14 px-8 text-base font-semibold border-2 hover:bg-primary/5 transition-all">
                    I'm an Agent
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Hero Illustration */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-primary/10 rounded-[3rem] blur-3xl animate-float"></div>
              <div className="relative card-float p-8 space-y-4" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-lg">250+ Players</p>
                    <p className="text-sm text-muted-foreground">Connected this month</p>
                  </div>
                </div>
                <div className="h-px bg-border/50"></div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center">
                    <BadgeCheck className="w-8 h-8 text-success" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-lg">100% Verified</p>
                    <p className="text-sm text-muted-foreground">All agents screened</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">The Problem</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              African football talent faces unique challenges that prevent them from reaching their potential.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ProblemCard
              icon={<AlertTriangle className="w-6 h-6" />}
              title="Fake Agents"
              description="Unverified intermediaries exploit young players with false promises and upfront fees."
            />
            <ProblemCard
              icon={<Eye className="w-6 h-6" />}
              title="Lack of Exposure"
              description="Talented players remain invisible to legitimate scouts and professional opportunities."
            />
            <ProblemCard
              icon={<Shield className="w-6 h-6" />}
              title="No Trusted Pathway"
              description="Without proper connections, players risk exploitation and missed opportunities."
            />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">The Solution</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Openfield creates a safe, transparent bridge between talent and opportunity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SolutionCard
              icon={<BadgeCheck className="w-6 h-6" />}
              title="Verified Agents"
              description="Every agent is screened and verified before accessing the platform."
            />
            <SolutionCard
              icon={<Users className="w-6 h-6" />}
              title="Player Profiles"
              description="Showcase skills with video highlights and coach endorsements."
            />
            <SolutionCard
              icon={<Shield className="w-6 h-6" />}
              title="Controlled Contact"
              description="Players approve all contact requests. No unsolicited messages."
            />
            <SolutionCard
              icon={<Eye className="w-6 h-6" />}
              title="Full Transparency"
              description="Track who views your profile and manages all interactions."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 hero-gradient">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join the platform that puts trust and safety first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/player/dashboard">
              <Button size="lg" className="w-full sm:w-auto rounded-xl h-14 px-8 text-base font-semibold">
                I'm a Player
              </Button>
            </Link>
            <Link to="/agent/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-xl h-14 px-8 text-base font-semibold border-2">
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
            <span className="font-display font-semibold">Openfield</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Openfield. Building trust in football.
          </p>
        </div>
      </footer>
    </div>
  );
};

const ProblemCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="card-float p-6 border-destructive/20">
    <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive mb-4">
      {icon}
    </div>
    <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

const SolutionCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="card-float-hover p-6">
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
      {icon}
    </div>
    <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export default Landing;
