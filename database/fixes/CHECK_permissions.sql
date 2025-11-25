-- DIAGNOSTIC: Check all permissions on page_content table

-- 1. Does table exist?
SELECT EXISTS (
    SELECT FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'page_content'
) as table_exists;

-- 2. What's the RLS status?
SELECT schemaname, tablename, rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'page_content';

-- 3. What policies exist?
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'page_content';

-- 4. What permissions does anon role have?
SELECT grantee, privilege_type 
FROM information_schema.table_privileges 
WHERE table_name = 'page_content' 
AND grantee IN ('anon', 'authenticated', 'public');

-- 5. Can we SELECT from it?
SELECT COUNT(*) as row_count FROM public.page_content;

-- 6. Show first few rows
SELECT * FROM public.page_content LIMIT 3;
