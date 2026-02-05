import PlayerLayout from "@/components/layouts/PlayerLayout";
import { ArrowLeft, BadgeCheck, MapPin, Building2, MessageCircle, Check, X, Shield, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useMyAgentRequests, useUpdateAgentRequest } from "@/hooks/usePlayerData";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type AgentRequest = Tables<"agent_requests">;

interface AgentInfo {
  full_name: string | null;
  country: string | null;
}

const AgentRequests = () => {
  const { data: requests, isLoading } = useMyAgentRequests();
  const updateRequest = useUpdateAgentRequest();
  const [selectedRequest, setSelectedRequest] = useState<AgentRequest | null>(null);
  const [agentProfiles, setAgentProfiles] = useState<Record<string, AgentInfo>>({});

  // Fetch agent profiles for all requests
  useEffect(() => {
    const fetchAgentProfiles = async () => {
      if (!requests || requests.length === 0) return;
      const agentIds = [...new Set(requests.map(r => r.agent_id))];
      const { data } = await supabase
        .from("profiles")
        .select("user_id, full_name, country")
        .in("user_id", agentIds);
      if (data) {
        const map: Record<string, AgentInfo> = {};
        data.forEach(p => { map[p.user_id] = { full_name: p.full_name, country: p.country }; });
        setAgentProfiles(map);
      }
    };
    fetchAgentProfiles();
  }, [requests]);

  const handleAccept = (id: string) => {
    updateRequest.mutate({ id, status: "accepted" });
    setSelectedRequest(null);
  };

  const handleDecline = (id: string) => {
    updateRequest.mutate({ id, status: "declined" });
    setSelectedRequest(null);
  };

  if (isLoading) {
    return (
      <PlayerLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PlayerLayout>
    );
  }

  const pendingRequests = requests ?? [];

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
            {pendingRequests.length} pending
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
          {pendingRequests.map((request) => {
            const agent = agentProfiles[request.agent_id];
            const agentName = agent?.full_name || "Unknown Agent";
            const agentCountry = agent?.country || "Unknown";
            const agentInitials = agentName.split(' ').map(n => n[0]).join('');

            return (
              <div 
                key={request.id}
                className="card-float p-6 hover:shadow-card-hover transition-shadow cursor-pointer"
                onClick={() => setSelectedRequest(request)}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-display font-bold">
                      {agentInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-lg">{agentName}</h3>
                        <span className="pill-verified py-0.5 px-2 text-xs">
                          <BadgeCheck className="w-3 h-3" /> Verified
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {agentCountry}
                        </span>
                      </div>
                      {request.message && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{request.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:flex-col md:items-end">
                    <span className="pill-primary text-xs">{request.request_type}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(request.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
                  <Button 
                    className="flex-1 rounded-xl"
                    onClick={(e) => { e.stopPropagation(); handleAccept(request.id); }}
                  >
                    <Check className="w-4 h-4 mr-2" /> Accept
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 rounded-xl"
                    onClick={(e) => { e.stopPropagation(); handleDecline(request.id); }}
                  >
                    <X className="w-4 h-4 mr-2" /> Decline
                  </Button>
                </div>
              </div>
            );
          })}

          {pendingRequests.length === 0 && (
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
      {selectedRequest && (() => {
        const agent = agentProfiles[selectedRequest.agent_id];
        const agentName = agent?.full_name || "Unknown Agent";
        const agentCountry = agent?.country || "Unknown";
        const agentInitials = agentName.split(' ').map(n => n[0]).join('');

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setSelectedRequest(null)} />
            <div className="relative card-float p-8 max-w-lg w-full animate-scale-in max-h-[80vh] overflow-y-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-display font-bold text-xl">
                  {agentInitials}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-xl">{agentName}</h3>
                    <span className="pill-verified py-0.5 px-2 text-xs">
                      <BadgeCheck className="w-3 h-3" /> Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {agentCountry}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-sm text-muted-foreground">Request Type</span>
                <p className="font-semibold">{selectedRequest.request_type} Opportunity</p>
              </div>

              {selectedRequest.message && (
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground">Message</span>
                  <p className="mt-1 text-foreground">{selectedRequest.message}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => handleDecline(selectedRequest.id)}>
                  <X className="w-4 h-4 mr-2" /> Decline
                </Button>
                <Button className="flex-1 rounded-xl" onClick={() => handleAccept(selectedRequest.id)}>
                  <Check className="w-4 h-4 mr-2" /> Accept
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Accepting will allow this agent to view your contact details.
              </p>
            </div>
          </div>
        );
      })()}
    </PlayerLayout>
  );
};

export default AgentRequests;
