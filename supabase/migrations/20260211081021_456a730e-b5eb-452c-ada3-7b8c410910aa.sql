
-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update any profile
CREATE POLICY "Admins can update any profile"
ON public.profiles FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view all player stats
CREATE POLICY "Admins can view all player stats"
ON public.player_stats FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update any player stats
CREATE POLICY "Admins can update any player stats"
ON public.player_stats FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to insert player stats for any user
CREATE POLICY "Admins can insert player stats"
ON public.player_stats FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view all user roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update any user role
CREATE POLICY "Admins can update roles"
ON public.user_roles FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view all videos
CREATE POLICY "Admins can view all videos"
ON public.player_videos FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view all career history
CREATE POLICY "Admins can view all career history"
ON public.career_history FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view all coach endorsements
CREATE POLICY "Admins can view all endorsements"
ON public.coach_endorsements FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view all agent requests
CREATE POLICY "Admins can view all requests"
ON public.agent_requests FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
