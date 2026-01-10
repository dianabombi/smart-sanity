-- Cleanup duplicate RLS policies on page_content table
-- Run this in Supabase SQL Editor

-- Drop all the duplicate/old policies
DROP POLICY IF EXISTS "Enable delete for all users" ON public.page_content;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.page_content;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.page_content;
DROP POLICY IF EXISTS "Enable update for all users" ON public.page_content;
DROP POLICY IF EXISTS "auth_write_page_content" ON public.page_content;
DROP POLICY IF EXISTS "public_read_page_content" ON public.page_content;

-- Keep only the comprehensive policy
-- (This one should already exist from the previous script)
-- "Allow all operations on page_content" - already exists

-- Verify we now have only one clean policy
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    cmd,
    with_check
FROM pg_policies 
WHERE tablename = 'page_content'
ORDER BY policyname;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Cleaned up duplicate policies!';
    RAISE NOTICE '📝 Only "Allow all operations on page_content" policy remains.';
END $$;
