-- Fix: infinite recursion in RLS policies for user_profiles
-- The old policies queried user_profiles to check if user is admin,
-- which triggered the same RLS policies again, causing infinite recursion (error 42P17).
-- Solution: Use a SECURITY DEFINER function that bypasses RLS.

-- Step 1: Create a SECURITY DEFINER function that bypasses RLS
-- to check the current user's role without triggering policy recursion
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role FROM public.user_profiles WHERE id = auth.uid();
$$;

-- Step 2: Drop the old recursive policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.user_profiles;

-- Step 3: Recreate policies using the non-recursive function
CREATE POLICY "Admins can view all profiles"
  ON public.user_profiles
  FOR SELECT
  USING (public.get_my_role() = 'admin');

CREATE POLICY "Admins can update all profiles"
  ON public.user_profiles
  FOR UPDATE
  USING (public.get_my_role() = 'admin');
