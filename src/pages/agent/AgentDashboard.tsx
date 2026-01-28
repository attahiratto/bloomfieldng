import AgentLayout from "@/components/layouts/AgentLayout";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const mockPlayers = [
  { id: 1, name: "James Parker", position: "Striker", age: 23, image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=250&fit=crop&crop=face" },
  { id: 2, name: "Luis Gomez", position: "Midfielder", age: 21, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=250&fit=crop&crop=face" },
  { id: 3, name: "Daniel Martins", position: "Defender", age: 25, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=250&fit=crop&crop=face" },
  { id: 4, name: "Eric Johnson", position: "Winger", age: 20, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=250&fit=crop&crop=face" },
  { id: 5, name: "Marco Rossi", position: "Striker", age: 22, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=250&fit=crop&crop=face" },
  { id: 6, name: "Alex Tanaka", position: "Midfielder", age: 19, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=250&fit=crop&crop=face" },
];

const AgentDashboard = () => {
  return (
    <AgentLayout>
      <div className="space-y-6">
        {/* Warning Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span className="text-sm font-medium text-amber-800">Account Pending Verification</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-5 bg-background border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Total Players</p>
            <p className="font-display text-3xl font-bold text-foreground">12,450</p>
          </Card>
          <Card className="p-5 bg-background border-border/50">
            <p className="text-sm text-muted-foreground mb-1">New Today</p>
            <p className="font-display text-3xl font-bold text-foreground">36</p>
          </Card>
          <Card className="p-5 bg-background border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Shortlisted</p>
            <p className="font-display text-3xl font-bold text-foreground">18</p>
          </Card>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-3 gap-4">
          {mockPlayers.map((player) => (
            <Link key={player.id} to={`/agent/player/${player.id}`}>
              <Card className="p-4 bg-background border-border/50 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-28 h-36 rounded-lg overflow-hidden bg-muted flex-shrink-0 border-2 border-primary/20">
                    <img 
                      src={player.image} 
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{player.name}</h3>
                    <p className="text-sm text-muted-foreground">{player.position} | Age {player.age}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AgentLayout>
  );
};

export default AgentDashboard;
