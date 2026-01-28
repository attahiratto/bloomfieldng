import PlayerLayout from "@/components/layouts/PlayerLayout";
import { ArrowLeft, BadgeCheck, MapPin, Building2, MessageCircle, Check, X, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const mockRequests = [
  {
    id: 1,
    agent: "James Davies",
    agency: "Elite Sports Management",
    country: "England",
    verified: true,
    type: "Trial",
    message: "Hi Adeola, I represent several clubs in the English Championship and was very impressed by your highlight videos. I'd love to discuss a potential trial opportunity with one of my partner clubs. Would you be open to a conversation?",
    date: "2 hours ago",
  },
  {
    id: 2,
    agent: "Carlos Martinez",
    agency: "Global Football Partners",
    country: "Spain",
    verified: true,
    type: "Representation",
    message: "Your technical skills and game intelligence caught my attention. I work with young African talents and have successfully placed players in La Liga academies. I believe you have great potential.",
    date: "1 day ago",
  },
  {
    id: 3,
    agent: "Michael Osei",
    agency: "African Talent Bridge",
    country: "Ghana",
    verified: true,
    type: "Trial",
    message: "I'm organizing trials for several Portuguese clubs next month and I think you'd be a perfect fit. Would love to discuss this opportunity with you.",
    date: "3 days ago",
  },
];

const AgentRequests = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<typeof mockRequests[0] | null>(null);

  const handleAccept = (id: number) => {
    setRequests(requests.filter(r => r.id !== id));
    setSelectedRequest(null);
  };

  const handleDecline = (id: number) => {
    setRequests(requests.filter(r => r.id !== id));
    setSelectedRequest(null);
  };

  return (
    <PlayerLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link to="/player/dashboard">
              <Button variant="ghost" className="rounded-xl -ml-2 mb-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="font-display text-3xl font-bold">Agent Requests</h1>
            <p className="text-muted-foreground">Review and respond to interest from verified agents.</p>
          </div>
          <div className="pill-primary text-sm">
            {requests.length} pending
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <Shield className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm">
              <strong>You're in control.</strong> Only accept requests from agents you want to connect with. 
              Agents cannot contact you until you accept their request.
            </p>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {requests.map((request) => (
            <div 
              key={request.id}
              className="card-float p-6 hover:shadow-card-hover transition-shadow cursor-pointer"
              onClick={() => setSelectedRequest(request)}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Agent Avatar */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-display font-bold">
                    {request.agent.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold text-lg">{request.agent}</h3>
                      {request.verified && (
                        <span className="pill-verified py-0.5 px-2 text-xs">
                          <BadgeCheck className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        {request.agency}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {request.country}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {request.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:flex-col md:items-end">
                  <span className="pill-primary text-xs">{request.type}</span>
                  <span className="text-xs text-muted-foreground">{request.date}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
                <Button 
                  className="flex-1 rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAccept(request.id);
                  }}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Accept
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDecline(request.id);
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Decline
                </Button>
              </div>
            </div>
          ))}

          {requests.length === 0 && (
            <div className="card-float p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">No pending requests</h3>
              <p className="text-muted-foreground">
                When verified agents are interested in your profile, their requests will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setSelectedRequest(null)} />
          <div className="relative card-float p-8 max-w-lg w-full animate-scale-in max-h-[80vh] overflow-y-auto">
            {/* Agent Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-display font-bold text-xl">
                {selectedRequest.agent.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-semibold text-xl">{selectedRequest.agent}</h3>
                  {selectedRequest.verified && (
                    <span className="pill-verified py-0.5 px-2 text-xs">
                      <BadgeCheck className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {selectedRequest.agency}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedRequest.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Request Type */}
            <div className="mb-4">
              <span className="text-sm text-muted-foreground">Request Type</span>
              <p className="font-semibold">{selectedRequest.type} Opportunity</p>
            </div>

            {/* Message */}
            <div className="mb-6">
              <span className="text-sm text-muted-foreground">Message</span>
              <p className="mt-1 text-foreground">{selectedRequest.message}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 rounded-xl"
                onClick={() => {
                  handleDecline(selectedRequest.id);
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
              <Button 
                className="flex-1 rounded-xl"
                onClick={() => {
                  handleAccept(selectedRequest.id);
                }}
              >
                <Check className="w-4 h-4 mr-2" />
                Accept
              </Button>
            </div>

            {/* Safety Note */}
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Accepting will allow this agent to view your contact details.
            </p>
          </div>
        </div>
      )}
    </PlayerLayout>
  );
};

export default AgentRequests;
