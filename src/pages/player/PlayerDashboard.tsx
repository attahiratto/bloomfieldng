import PlayerLayout from "@/components/layouts/PlayerLayout";
import { BadgeCheck, Star, Inbox, Eye, ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PlayerDashboard = () => {
  return (
    <PlayerLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="card-float p-8 hero-gradient">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">Welcome, Adeola! 👋</h1>
              <p className="text-muted-foreground">Your profile is looking great. Here's your latest activity.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="pill-verified">
                <BadgeCheck className="w-3.5 h-3.5" />
                Profile Verified
              </span>
              <span className="pill-primary">
                <Star className="w-3.5 h-3.5" />
                Coach Endorsed
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            icon={<BadgeCheck className="w-6 h-6" />}
            label="Profile Status"
            value="Verified & Endorsed"
            description="Your profile is fully complete"
            color="success"
          />
          <StatCard
            icon={<Inbox className="w-6 h-6" />}
            label="Agent Requests"
            value="3"
            description="2 new this week"
            color="primary"
            link="/player/requests"
          />
          <StatCard
            icon={<Eye className="w-6 h-6" />}
            label="Profile Views"
            value="47"
            description="Last 30 days"
            color="warning"
          />
        </div>

        {/* Recent Activity */}
        <div className="card-float p-6">
          <h2 className="font-display text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              title="New request from James Davies"
              description="Trial opportunity request"
              time="2 hours ago"
              type="request"
            />
            <ActivityItem
              title="Profile viewed by Scout Network Ltd"
              description="Verified scout from England"
              time="1 day ago"
              type="view"
            />
            <ActivityItem
              title="Request accepted"
              description="Connected with Marcus Sterling"
              time="3 days ago"
              type="accepted"
            />
          </div>
        </div>

        {/* CTA - View Requests */}
        <div className="card-float p-6 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Inbox className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-1">You have 3 pending requests</h3>
                <p className="text-muted-foreground">Review and respond to agent requests to take the next step.</p>
              </div>
            </div>
            <Link to="/player/requests">
              <Button size="lg" className="rounded-xl w-full md:w-auto">
                View Requests
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Safety Note */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
          <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Your Safety Matters:</strong> Only connect with agents you're comfortable with. 
              Openfield never asks for upfront fees. Report any suspicious activity immediately.
            </p>
          </div>
        </div>
      </div>
    </PlayerLayout>
  );
};

const StatCard = ({ 
  icon, 
  label, 
  value, 
  description,
  color,
  link,
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  description: string;
  color: 'primary' | 'warning' | 'success';
  link?: string;
}) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    warning: 'bg-warning/10 text-warning',
    success: 'bg-success/10 text-success',
  };

  const content = (
    <div className={`stat-card ${link ? 'hover:shadow-card-hover cursor-pointer transition-shadow' : ''}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]} mb-4`}>
        {icon}
      </div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="font-display text-2xl font-bold mb-1">{value}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );

  return link ? <Link to={link}>{content}</Link> : content;
};

const ActivityItem = ({ 
  title, 
  description, 
  time, 
  type 
}: { 
  title: string; 
  description: string; 
  time: string;
  type: 'request' | 'view' | 'accepted';
}) => {
  const icons = {
    request: <Inbox className="w-5 h-5" />,
    view: <Eye className="w-5 h-5" />,
    accepted: <BadgeCheck className="w-5 h-5" />,
  };

  const colors = {
    request: 'bg-primary/10 text-primary',
    view: 'bg-warning/10 text-warning',
    accepted: 'bg-success/10 text-success',
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[type]}`}>
        {icons[type]}
      </div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  );
};

export default PlayerDashboard;
