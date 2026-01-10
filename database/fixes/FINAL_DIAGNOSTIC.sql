-- FINAL DIAGNOSTIC - Run this and send me ALL the output
-- This will tell us exactly what's wrong

-- ============================================
-- SECTION 1: Does the table exist?
-- ============================================
SELECT 'TEST 1: Table Existence' as test_name;
SELECT EXISTS (
    SELECT FROM pg_tables 
    WHERE schemaname = 'public' AND tablename = 'page_content'
) as table_exists;

-- ============================================
-- SECTION 2: What is RLS status RIGHT NOW?
-- ============================================
SELECT 'TEST 2: RLS Status' as test_name;
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled,
    CASE WHEN rowsecurity THEN 'RLS IS ON (BAD!)' ELSE 'RLS IS OFF (GOOD!)' END as status
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'page_content';

-- ============================================
-- SECTION 3: Force disable RLS RIGHT NOW
-- ============================================
SELECT 'TEST 3: Forcing RLS OFF' as test_name;
ALTER TABLE public.page_content DISABLE ROW LEVEL SECURITY;

-- ============================================
-- SECTION 4: Verify it's now OFF
-- ============================================
SELECT 'TEST 4: Verify RLS is OFF' as test_name;
SELECT rowsecurity as rls_still_enabled FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'page_content';

-- ============================================
-- SECTION 5: What policies exist?
-- ============================================
SELECT 'TEST 5: Current Policies' as test_name;
SELECT 
    policyname,
    CASE WHEN permissive = 'PERMISSIVE' THEN 'Permissive' ELSE 'Restrictive' END as type,
    cmd as applies_to
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'page_content';

-- ============================================
-- SECTION 6: Delete ALL policies
-- ============================================
SELECT 'TEST 6: Deleting all policies' as test_name;
DO $$ 
DECLARE 
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'page_content'
    LOOP
        EXECUTE format('DROP POLICY %I ON public.page_content', pol.policyname);
        RAISE NOTICE 'Dropped policy: %', pol.policyname;
    END LOOP;
END $$;

-- ============================================
-- SECTION 7: Grant ALL permissions to anon
-- ============================================
SELECT 'TEST 7: Granting permissions' as test_name;
GRANT ALL PRIVILEGES ON public.page_content TO anon;
GRANT ALL PRIVILEGES ON public.page_content TO authenticated;
GRANT ALL PRIVILEGES ON public.page_content TO postgres;
GRANT USAGE ON SEQUENCE page_content_id_seq TO anon;
GRANT USAGE ON SEQUENCE page_content_id_seq TO authenticated;

-- ============================================
-- SECTION 8: Check current permissions
-- ============================================
SELECT 'TEST 8: Current Permissions' as test_name;
SELECT 
    grantee,
    string_agg(privilege_type, ', ') as privileges
FROM information_schema.table_privileges 
WHERE table_schema = 'public' 
  AND table_name = 'page_content'
  AND grantee IN ('anon', 'authenticated', 'postgres', 'public')
GROUP BY grantee;

-- ============================================
-- SECTION 9: Try to read data
-- ============================================
SELECT 'TEST 9: Can we read the data?' as test_name;
SELECT COUNT(*) as total_rows FROM public.page_content;

-- ============================================
-- SECTION 10: Show actual data
-- ============================================
SELECT 'TEST 10: Actual Data' as test_name;
SELECT 
    id,
    page,
    section,
    key,
    CASE 
        WHEN LENGTH(content) > 40 THEN LEFT(content, 40) || '...'
        ELSE content 
    END as content_preview
FROM public.page_content
ORDER BY page, section, key;

-- ============================================
-- FINAL RESULT
-- ============================================
SELECT 'FINAL CHECK: Everything should work now!' as final_message;
SELECT 
    'Table exists: ' || CASE WHEN EXISTS(SELECT FROM pg_tables WHERE tablename='page_content') THEN 'YES' ELSE 'NO' END ||
    ' | RLS enabled: ' || CASE WHEN (SELECT rowsecurity FROM pg_tables WHERE tablename='page_content') THEN 'YES (BAD)' ELSE 'NO (GOOD)' END ||
    ' | Row count: ' || (SELECT COUNT(*)::text FROM page_content) as status;
