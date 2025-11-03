-- Fix RLS policy for who_we_are_sections table to allow editing in admin panel
-- This changes the policy from requiring authenticated users to allowing all operations
-- Similar to how page_content table works

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON public.who_we_are_sections;

-- Create new permissive policy that allows all operations
CREATE POLICY "Allow all operations on who_we_are_sections" ON public.who_we_are_sections
    FOR ALL USING (true) WITH CHECK (true);

-- Verify the policy was created
SELECT * FROM pg_policies WHERE tablename = 'who_we_are_sections';
