
-- Allow all authenticated users to read roles (role is not sensitive data)
CREATE POLICY "Authenticated users can view roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (true);
