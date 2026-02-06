
-- Update the handle_new_user trigger to populate additional profile fields from signup metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Insert profile with all available metadata
  INSERT INTO public.profiles (
    user_id,
    full_name,
    position,
    height,
    weight,
    preferred_foot,
    country,
    city,
    date_of_birth,
    bio
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'position',
    NEW.raw_user_meta_data->>'height',
    NEW.raw_user_meta_data->>'weight',
    NEW.raw_user_meta_data->>'preferred_foot',
    NEW.raw_user_meta_data->>'country',
    NEW.raw_user_meta_data->>'city',
    CASE 
      WHEN NEW.raw_user_meta_data->>'date_of_birth' IS NOT NULL 
        AND NEW.raw_user_meta_data->>'date_of_birth' != ''
      THEN (NEW.raw_user_meta_data->>'date_of_birth')::date
      ELSE NULL
    END,
    NEW.raw_user_meta_data->>'bio'
  );
  
  -- Insert role from metadata
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, (NEW.raw_user_meta_data->>'role')::app_role);
  
  RETURN NEW;
END;
$function$;
