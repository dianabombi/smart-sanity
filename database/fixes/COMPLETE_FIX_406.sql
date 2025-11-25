-- COMPLETE FIX FOR 406 ERROR
-- Problem: Column name 'page' conflicts with PostgREST's pagination parameter
-- Solution: Rename 'page' to 'page_name'

-- ===========================================
-- STEP 1: Rename the column
-- ===========================================
ALTER TABLE public.page_content 
RENAME COLUMN page TO page_name;

-- ===========================================
-- STEP 2: Update constraints
-- ===========================================
ALTER TABLE public.page_content 
DROP CONSTRAINT IF EXISTS page_content_page_section_key_key;

ALTER TABLE public.page_content 
ADD CONSTRAINT page_content_page_name_section_key_key 
UNIQUE (page_name, section, key);

-- ===========================================
-- STEP 3: Recreate indexes
-- ===========================================
DROP INDEX IF EXISTS idx_page_content_lookup;
CREATE INDEX idx_page_content_lookup ON public.page_content(page_name, section, key);

-- ===========================================
-- STEP 4: Ensure RLS is OFF and permissions granted
-- ===========================================
ALTER TABLE public.page_content DISABLE ROW LEVEL SECURITY;
GRANT ALL PRIVILEGES ON public.page_content TO anon;
GRANT ALL PRIVILEGES ON public.page_content TO authenticated;

-- ===========================================
-- STEP 5: Verify everything is correct
-- ===========================================
SELECT '✅ VERIFICATION RESULTS:' as status;

SELECT 
    'Column renamed: ' || 
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'page_content' 
        AND column_name = 'page_name'
    ) THEN 'YES ✅' ELSE 'NO ❌' END as column_check;

SELECT 
    'RLS disabled: ' || 
    CASE WHEN NOT rowsecurity THEN 'YES ✅' ELSE 'NO ❌' END as rls_check
FROM pg_tables 
WHERE tablename = 'page_content';

-- ===========================================
-- STEP 6: Show current data
-- ===========================================
SELECT '📊 Current Data:' as info;
SELECT 
    page_name,
    section,
    key,
    CASE 
        WHEN LENGTH(content) > 40 THEN LEFT(content, 40) || '...'
        ELSE content 
    END as content_preview
FROM public.page_content
ORDER BY page_name, section, key;

-- ===========================================
-- FINAL MESSAGE
-- ===========================================
SELECT '🎉 FIX COMPLETE! Now restart your React app and the 406 error should be gone!' as final_message;
