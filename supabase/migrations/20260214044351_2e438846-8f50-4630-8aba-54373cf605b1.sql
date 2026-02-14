
-- Create shortlist table for agents to save players
CREATE TABLE public.shortlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL,
  player_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(agent_id, player_id)
);

ALTER TABLE public.shortlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents can view their own shortlist"
ON public.shortlist FOR SELECT
USING (auth.uid() = agent_id);

CREATE POLICY "Agents can add to their shortlist"
ON public.shortlist FOR INSERT
WITH CHECK (auth.uid() = agent_id);

CREATE POLICY "Agents can remove from their shortlist"
ON public.shortlist FOR DELETE
USING (auth.uid() = agent_id);
