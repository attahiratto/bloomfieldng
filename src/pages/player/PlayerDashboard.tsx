import PlayerLayout from "@/components/layouts/PlayerLayout";
import { BadgeCheck, Inbox, Eye, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const recentActivity = [
  { id: 1, agent: "James Davies", type: "Trial Request", time: "2 hours ago", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 2, agent: "Scout Network Ltd", type: "Profile View", time: "1 day ago", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 3, agent: "Marcus Sterling", type: "Connected", time: "3 days ago", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
];

const PlayerDashboard = () => {
  return (
    <PlayerLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 flex items-center gap-3">
          <BadgeCheck className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-800">Profile Verified & Coach Endorsed</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-5 bg-background border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Profile Status</p>
            <p className="font-display text-2xl font-bold text-foreground">Verified</p>
          </Card>
          <Card className="p-5 bg-background border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Agent Requests</p>
            <p className="font-display text-3xl font-bold text-foreground">3</p>
          </Card>
          <Card className="p-5 bg-background border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Profile Views</p>
            <p className="font-display text-3xl font-bold text-foreground">47</p>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-3 gap-4">
          {recentActivity.map((activity) => (
            <Link key={activity.id} to="/player/requests">
              <Card className="p-4 bg-background border-border/50 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0 border-2 border-primary/20">
                    <img 
                      src={activity.image} 
                      alt={activity.agent}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{activity.agent}</h3>
                    <p className="text-sm text-muted-foreground">{activity.type}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pending Requests CTA */}
        <Card className="p-5 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Inbox className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">3 Pending Requests</h3>
                <p className="text-sm text-muted-foreground">Review and respond to agent requests</p>
              </div>
            </div>
            <Link to="/player/requests" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              View Requests
            </Link>
          </div>
        </Card>

        {/* Safety Note */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
          <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Your Safety Matters:</strong> Only connect with verified agents. Openfield never asks for upfront fees.
          </p>
        </div>
      </div>
    </PlayerLayout>
  );
};

export default PlayerDashboard;
