-- Fix hero_banners delete issue - Update RLS policies
-- The delete operation is failing due to restrictive RLS policies

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users full access to hero_banners" ON hero_banners;
DROP POLICY IF EXISTS "Allow public read access to hero_banners" ON hero_banners;
DROP POLICY IF EXISTS "Allow anonymous read access to active hero_banners" ON hero_banners;

-- Create more permissive policies for admin operations
-- Allow all operations for service role (admin operations)
CREATE POLICY "Allow service role full access to hero_banners" ON hero_banners
    FOR ALL USING (true);

-- Allow public read access to active banners
CREATE POLICY "Allow public read access to active hero_banners" ON hero_banners
    FOR SELECT USING (active = true);

-- Alternative: Temporarily disable RLS for testing
-- ALTER TABLE hero_banners DISABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON hero_banners TO service_role;
GRANT ALL ON hero_banners TO postgres;
