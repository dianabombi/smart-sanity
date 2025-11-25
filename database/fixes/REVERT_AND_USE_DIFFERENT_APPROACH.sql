-- DIFFERENT APPROACH: Instead of renaming, use PostgREST's column alias feature
-- This avoids the 'page' conflict without changing the database structure

-- Step 1: First, let's check what column name we actually have
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'page_content' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- Step 2: If column is still named 'page', let's verify we can query it
SELECT COUNT(*) as total_rows,
       COUNT(DISTINCT page) as distinct_pages
FROM public.page_content;

-- Step 3: Show current data
SELECT * FROM public.page_content LIMIT 5;
