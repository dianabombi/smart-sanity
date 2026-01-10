-- EMERGENCY FIX FOR 406 ERRORS
-- This completely disables Row Level Security on page_content table
-- Use ONLY for development/testing

-- Step 1: Check current RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'page_content';

-- Step 2: Drop ALL policies (force remove)
DO $$ 
DECLARE 
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'page_content'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.page_content', pol.policyname);
    END LOOP;
END $$;

-- Step 3: DISABLE Row Level Security completely
ALTER TABLE public.page_content DISABLE ROW LEVEL SECURITY;

-- Step 4: Grant ALL permissions to public (anon) role
GRANT ALL ON public.page_content TO anon;
GRANT ALL ON public.page_content TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE page_content_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE page_content_id_seq TO authenticated;

-- Step 5: Verify RLS is OFF
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'page_content';

-- Step 6: Test query - should work now!
SELECT * FROM public.page_content LIMIT 3;
