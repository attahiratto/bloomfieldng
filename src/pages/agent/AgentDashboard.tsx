import AgentLayout from "@/components/layouts/AgentLayout";
import { Users, Inbox, Bookmark, TrendingUp, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const mockRequests = [
  { id: 1, player: "Kwame Mensah", type: "Trial", status: "pending", date: "2 hours ago" },
  { id: 2, player: "Chinedu Okafor", type: "Representation", status: "accepted", date: "1 day ago" },
  { id: 3, player: "Amadou Diallo", type: "Trial", status: "pending", date: "2 days ago" },
];

const AgentDashboard = () => {
  return (
    <AgentLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Welcome back, James</h1>
          <p className="text-muted-foreground">Here's what's happening with your talent search.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            icon={<Users className="w-6 h-6" />}
            label="New Player Profiles"
            value="24"
            trend="+12% this week"
            color="primary"
          />
          <StatCard
            icon={<Inbox className="w-6 h-6" />}
            label="Pending Requests"
            value="3"
            trend="2 awaiting response"
            color="warning"
          />
          <StatCard
            icon={<Bookmark className="w-6 h-6" />}
            label="Saved Players"
            value="18"
            trend="5 recently active"
            color="success"
          />
        </div>

        {/* Recent Requests */}
        <div className="card-float p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold">Recent Requests</h2>
            <Button variant="ghost" className="text-primary">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockRequests.map((request) => (
              <div 
                key={request.id}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {request.player.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{request.player}</p>
                    <p className="text-sm text-muted-foreground">{request.type} Request</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {request.date}
                    </p>
                  </div>
                  <span className={request.status === 'accepted' ? 'pill-verified' : 'pill-pending'}>
                    {request.status === 'accepted' ? 'Accepted' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card-float p-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-semibold mb-1">Discover New Talent</h3>
              <p className="text-muted-foreground">Browse verified player profiles from across Africa.</p>
            </div>
            <Link to="/agent/browse">
              <Button size="lg" className="rounded-xl">
                Browse Players
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AgentLayout>
  );
};

const StatCard = ({ 
  icon, 
  label, 
  value, 
  trend, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  trend: string;
  color: 'primary' | 'warning' | 'success';
}) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    warning: 'bg-warning/10 text-warning',
    success: 'bg-success/10 text-success',
  };

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
        <TrendingUp className="w-4 h-4 text-success" />
      </div>
      <p className="font-display text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-xs text-muted-foreground">{trend}</p>
    </div>
  );
};

export default AgentDashboard;
