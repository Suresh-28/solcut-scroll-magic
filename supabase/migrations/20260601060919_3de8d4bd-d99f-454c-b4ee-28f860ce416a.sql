CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce(
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'admin@solcut.app',
    false
  );
$$;