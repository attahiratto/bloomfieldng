
-- Create table for player YouTube videos
CREATE TABLE public.player_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  youtube_url TEXT NOT NULL,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.player_videos ENABLE ROW LEVEL SECURITY;

-- Players can manage their own videos
CREATE POLICY "Users can view their own videos"
ON public.player_videos FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Agents can view all player videos"
ON public.player_videos FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'agent'));

CREATE POLICY "Users can insert their own videos"
ON public.player_videos FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own videos"
ON public.player_videos FOR DELETE TO authenticated
USING (auth.uid() = user_id);
