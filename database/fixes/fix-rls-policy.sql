-- Fix RLS policy for who_we_are_sections table

-- Option 1: Disable RLS completely (simplest for development)
ALTER TABLE who_we_are_sections DISABLE ROW LEVEL SECURITY;

-- OR Option 2: Update the policy to be more permissive
-- DROP POLICY IF EXISTS "Allow all operations on who_we_are_sections" ON who_we_are_sections;
-- CREATE POLICY "Allow all operations on who_we_are_sections" ON who_we_are_sections
-- FOR ALL USING (true) WITH CHECK (true);

-- OR Option 3: Allow anonymous access (if you want to keep RLS enabled)
-- DROP POLICY IF EXISTS "Allow all operations on who_we_are_sections" ON who_we_are_sections;
-- CREATE POLICY "Allow anonymous access" ON who_we_are_sections
-- FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
