
-- Extend profiles with player-specific fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS position TEXT,
  ADD COLUMN IF NOT EXISTS date_of_birth DATE,
  ADD COLUMN IF NOT EXISTS height TEXT,
  ADD COLUMN IF NOT EXISTS weight TEXT,
  ADD COLUMN IF NOT EXISTS preferred_foot TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS availability TEXT DEFAULT 'Open to Trials';

-- Player stats table
CREATE TABLE public.player_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  season TEXT NOT NULL DEFAULT '2024/25',
  goals INTEGER NOT NULL DEFAULT 0,
  assists INTEGER NOT NULL DEFAULT 0,
  matches INTEGER NOT NULL DEFAULT 0,
  minutes_played INTEGER NOT NULL DEFAULT 0,
  pass_accuracy NUMERIC(5,2) NOT NULL DEFAULT 0,
  shots_on_target INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, season)
);

ALTER TABLE public.player_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Player stats are viewable by everyone"
  ON public.player_stats FOR SELECT USING (true);

CREATE POLICY "Users can insert their own stats"
  ON public.player_stats FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats"
  ON public.player_stats FOR UPDATE USING (auth.uid() = user_id);

-- Agent requests table
CREATE TABLE public.agent_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL,
  player_id UUID NOT NULL,
  request_type TEXT NOT NULL DEFAULT 'Trial',
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.agent_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Players can view requests sent to them"
  ON public.agent_requests FOR SELECT USING (auth.uid() = player_id);

CREATE POLICY "Agents can view their own sent requests"
  ON public.agent_requests FOR SELECT USING (auth.uid() = agent_id);

CREATE POLICY "Agents can create requests"
  ON public.agent_requests FOR INSERT WITH CHECK (auth.uid() = agent_id);

CREATE POLICY "Players can update requests sent to them"
  ON public.agent_requests FOR UPDATE USING (auth.uid() = player_id);

-- Coach endorsements table
CREATE TABLE public.coach_endorsements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID NOT NULL,
  coach_name TEXT NOT NULL,
  academy TEXT,
  quote TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.coach_endorsements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Coach endorsements are viewable by everyone"
  ON public.coach_endorsements FOR SELECT USING (true);

CREATE POLICY "Players can manage their endorsements"
  ON public.coach_endorsements FOR INSERT WITH CHECK (auth.uid() = player_id);

-- Career history table
CREATE TABLE public.career_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  team TEXT NOT NULL,
  role TEXT,
  period TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.career_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Career history is viewable by everyone"
  ON public.career_history FOR SELECT USING (true);

CREATE POLICY "Users can manage their career history"
  ON public.career_history FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their career history"
  ON public.career_history FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their career history"
  ON public.career_history FOR DELETE USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_player_stats_updated_at
  BEFORE UPDATE ON public.player_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agent_requests_updated_at
  BEFORE UPDATE ON public.agent_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for agent_requests so players see new requests live
ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_requests;
