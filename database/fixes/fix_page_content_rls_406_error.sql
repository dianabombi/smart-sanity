-- FIX 406 ERROR: Row Level Security Policy Issue
-- This error happens when RLS is enabled but policies don't allow access
-- Run this in Supabase SQL Editor NOW

-- Step 1: Drop all existing policies on page_content
DROP POLICY IF EXISTS "Allow all operations on page_content" ON public.page_content;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.page_content;
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.page_content;
DROP POLICY IF EXISTS "Enable update access for all users" ON public.page_content;
DROP POLICY IF EXISTS "Enable delete access for all users" ON public.page_content;

-- Step 2: Disable RLS temporarily to test
ALTER TABLE public.page_content DISABLE ROW LEVEL SECURITY;

-- Step 3: Re-enable RLS with permissive policy
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- Step 4: Create a single permissive policy that allows ALL operations
CREATE POLICY "Allow all operations for everyone" ON public.page_content
    FOR ALL 
    TO public
    USING (true) 
    WITH CHECK (true);

-- Step 5: Verify the policy was created
SELECT schemaname, tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE tablename = 'page_content';

-- Step 6: Test query - should return data now
SELECT page, section, key, 
       CASE 
         WHEN LENGTH(content) > 50 THEN LEFT(content, 50) || '...'
         ELSE content 
       END as content_preview
FROM public.page_content 
ORDER BY page, section, key;
