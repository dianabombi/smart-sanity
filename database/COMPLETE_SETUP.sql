-- ============================================
-- COMPLETE DATABASE SETUP FOR EDITABLE TEXT
-- Run this ONCE in Supabase SQL Editor
-- ============================================

-- STEP 1: Create RPC functions (to avoid 'page' parameter conflict)
-- ============================================

DROP FUNCTION IF EXISTS get_page_content(TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS update_page_content(TEXT, TEXT, TEXT, TEXT);

CREATE OR REPLACE FUNCTION get_page_content(
    p_page TEXT,
    p_section TEXT,
    p_key TEXT
)
RETURNS TABLE (
    id BIGINT,
    page TEXT,
    section TEXT,
    key TEXT,
    content TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.page,
        t.section,
        t.key,
        t.content,
        t.created_at,
        t.updated_at
    FROM page_content t
    WHERE t.page = p_page
      AND t.section = p_section
      AND t.key = p_key;
END;
$$;

CREATE OR REPLACE FUNCTION update_page_content(
    p_page TEXT,
    p_section TEXT,
    p_key TEXT,
    p_content TEXT
)
RETURNS TABLE (
    id BIGINT,
    page TEXT,
    section TEXT,
    key TEXT,
    content TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE page_content t
    SET content = p_content,
        updated_at = NOW()
    WHERE t.page = p_page 
      AND t.section = p_section 
      AND t.key = p_key;
    
    IF NOT FOUND THEN
        INSERT INTO page_content (page, section, key, content, created_at, updated_at)
        VALUES (p_page, p_section, p_key, p_content, NOW(), NOW());
    END IF;
    
    RETURN QUERY
    SELECT 
        t.id,
        t.page,
        t.section,
        t.key,
        t.content,
        t.created_at,
        t.updated_at
    FROM page_content t
    WHERE t.page = p_page
      AND t.section = p_section
      AND t.key = p_key;
END;
$$;

GRANT EXECUTE ON FUNCTION get_page_content(TEXT, TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION update_page_content(TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;

-- STEP 2: Ensure RLS is disabled
-- ============================================

ALTER TABLE public.page_content DISABLE ROW LEVEL SECURITY;
GRANT ALL PRIVILEGES ON public.page_content TO anon, authenticated;

-- STEP 3: Add editable content entries
-- ============================================

INSERT INTO public.page_content (page, section, key, content) VALUES
-- Public page headers (for /who-we-are page - the only editable texts)
('who-we-are', 'page-headers', 'title', 'O nás'),
('who-we-are', 'page-headers', 'subtitle', 'Smart Sanit s.r.o.')

ON CONFLICT (page, section, key) DO NOTHING;

-- STEP 4: Verify everything works
-- ============================================

SELECT '✅ VERIFICATION RESULTS:' as status;

-- Check RPC functions exist
SELECT 'RPC Functions: ' || COUNT(*)::text || ' created' as check
FROM pg_proc 
WHERE proname IN ('get_page_content', 'update_page_content');

-- Check data was inserted
SELECT 'Data Rows: ' || COUNT(*)::text || ' total' as check
FROM page_content;

-- Test the RPC functions
SELECT '✅ Testing get_page_content:' as test;
SELECT * FROM get_page_content('global', 'company', 'name');

SELECT '✅ Testing update_page_content:' as test;
SELECT * FROM update_page_content('global', 'company', 'name', 'Smart Sanit s.r.o.');

-- Show all editable content
SELECT '✅ All Editable Content:' as test;
SELECT page, section, key, 
       CASE 
         WHEN LENGTH(content) > 40 THEN LEFT(content, 40) || '...'
         ELSE content 
       END as content_preview
FROM page_content
ORDER BY page, section, key;

SELECT '🎉 SETUP COMPLETE! All editable text is now configured.' as final_message;
