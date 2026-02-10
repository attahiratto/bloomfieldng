import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Tables } from "@/integrations/supabase/types";

export type PlayerStats = Tables<"player_stats">;
export type CareerHistory = Tables<"career_history">;
export type CoachEndorsement = Tables<"coach_endorsements">;
export type AgentRequest = Tables<"agent_requests">;

// Fetch current player's stats
export const useMyStats = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["player-stats", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("player_stats")
        .select("*")
        .eq("user_id", user.id)
        .order("season", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });
};

// Fetch current player's career history
export const useMyCareerHistory = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["career-history", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("career_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user?.id,
  });
};

// Fetch current player's coach endorsements
export const useMyEndorsements = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["coach-endorsements", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("coach_endorsements")
        .select("*")
        .eq("player_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user?.id,
  });
};

// Fetch agent requests for the current player
export const useMyAgentRequests = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["agent-requests", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("agent_requests")
        .select("*")
        .eq("player_id", user.id)
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user?.id,
  });
};

// Update agent request status (accept/decline)
export const useUpdateAgentRequest = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from("agent_requests")
        .update({ status })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agent-requests", user?.id] });
    },
  });
};

// Fetch all players (for agent browse/discovery)
export const useAllPlayers = () => {
  return useQuery({
    queryKey: ["all-players"],
    queryFn: async () => {
      // Get all profiles that are players (join with user_roles)
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "player");
      if (rolesError) throw rolesError;

      const playerUserIds = roles?.map(r => r.user_id) ?? [];
      if (playerUserIds.length === 0) return [];

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .in("user_id", playerUserIds);
      if (profilesError) throw profilesError;

      // Also fetch stats for all players
      const { data: stats, error: statsError } = await supabase
        .from("player_stats")
        .select("*")
        .in("user_id", playerUserIds);
      if (statsError) throw statsError;

      // Fetch endorsements to check who's endorsed
      const { data: endorsements, error: endError } = await supabase
        .from("coach_endorsements")
        .select("player_id")
        .in("player_id", playerUserIds);
      if (endError) throw endError;

      const endorsedIds = new Set(endorsements?.map(e => e.player_id) ?? []);
      const statsMap = new Map(stats?.map(s => [s.user_id, s]) ?? []);

      return (profiles ?? []).map(p => {
        const s = statsMap.get(p.user_id);
        return {
          id: p.user_id,
          name: p.full_name ?? "Unknown Player",
          age: p.date_of_birth ? Math.floor((Date.now() - new Date(p.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : null,
          position: p.position ?? "Not set",
          country: p.country ?? "Not set",
          city: p.city,
          verified: true, // All signed-up players are "verified" in the MVP
          endorsed: endorsedIds.has(p.user_id),
          image: p.avatar_url,
          availability: p.availability,
          bio: p.bio,
          height: p.height,
          weight: p.weight,
          preferred_foot: p.preferred_foot,
          stats: s ? {
            goals: s.goals,
            assists: s.assists,
            matches: s.matches,
            minutesPlayed: s.minutes_played,
            passAccuracy: Number(s.pass_accuracy),
            shotsOnTarget: s.shots_on_target,
          } : { goals: 0, assists: 0, matches: 0, minutesPlayed: 0, passAccuracy: 0, shotsOnTarget: 0 },
        };
      });
    },
  });
};

// Fetch current player's YouTube videos
export const useMyVideos = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["player-videos", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("player_videos")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user?.id,
  });
};

// Add a YouTube video
export const useAddVideo = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ youtube_url, title }: { youtube_url: string; title?: string }) => {
      if (!user?.id) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("player_videos")
        .insert({ user_id: user.id, youtube_url, title })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player-videos", user?.id] });
    },
  });
};

// Delete a YouTube video
export const useDeleteVideo = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (videoId: string) => {
      const { error } = await supabase
        .from("player_videos")
        .delete()
        .eq("id", videoId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player-videos", user?.id] });
    },
  });
};

// Fetch a single player profile by user_id
export const usePlayerProfile = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["player-profile", userId],
    queryFn: async () => {
      if (!userId) return null;

      const [profileRes, statsRes, endorsementRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle(),
        supabase.from("player_stats").select("*").eq("user_id", userId).order("season", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("coach_endorsements").select("*").eq("player_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle(),
      ]);

      if (profileRes.error) throw profileRes.error;
      const p = profileRes.data;
      if (!p) return null;

      const s = statsRes.data;
      const e = endorsementRes.data;

      return {
        id: p.user_id,
        name: p.full_name ?? "Unknown Player",
        age: p.date_of_birth ? Math.floor((Date.now() - new Date(p.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : null,
        position: p.position ?? "Not set",
        country: p.country ?? "Not set",
        city: p.city,
        height: p.height,
        weight: p.weight,
        preferred_foot: p.preferred_foot,
        verified: true,
        endorsed: !!e,
        availability: p.availability ?? "Open to Trials",
        bio: p.bio ?? "No bio added yet.",
        avatar_url: p.avatar_url,
        stats: s ? {
          goals: s.goals,
          assists: s.assists,
          matches: s.matches,
          minutesPlayed: s.minutes_played,
          passAccuracy: Number(s.pass_accuracy),
          shotsOnTarget: s.shots_on_target,
        } : { goals: 0, assists: 0, matches: 0, minutesPlayed: 0, passAccuracy: 0, shotsOnTarget: 0 },
        seasonStats: s ? {
          goalsPerGame: s.matches > 0 ? Number((s.goals / s.matches).toFixed(2)) : 0,
          assistsPerGame: s.matches > 0 ? Number((s.assists / s.matches).toFixed(2)) : 0,
          rating: s.matches > 0 ? Number(((s.goals + s.assists) / s.matches * 2 + 5).toFixed(1)) : 0,
        } : { goalsPerGame: 0, assistsPerGame: 0, rating: 0 },
        coachEndorsement: e ? {
          coach: e.coach_name,
          academy: e.academy ?? "",
          quote: e.quote ?? "",
        } : null,
      };
    },
    enabled: !!userId,
  });
};
