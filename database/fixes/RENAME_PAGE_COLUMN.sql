-- FIX 406 ERROR: Rename 'page' column to avoid PostgREST conflict
-- The column name 'page' conflicts with PostgREST's pagination parameter

-- Step 1: Rename the column from 'page' to 'page_name'
ALTER TABLE public.page_content 
RENAME COLUMN page TO page_name;

-- Step 2: Update the unique constraint
ALTER TABLE public.page_content 
DROP CONSTRAINT IF EXISTS page_content_page_section_key_key;

ALTER TABLE public.page_content 
ADD CONSTRAINT page_content_page_name_section_key_key 
UNIQUE (page_name, section, key);

-- Step 3: Recreate the index with new column name
DROP INDEX IF EXISTS idx_page_content_lookup;
CREATE INDEX idx_page_content_lookup ON public.page_content(page_name, section, key);

-- Step 4: Verify the change
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'page_content' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- Step 5: Show the data with new column name
SELECT page_name, section, key, 
       CASE 
         WHEN LENGTH(content) > 40 THEN LEFT(content, 40) || '...'
         ELSE content 
       END as content_preview
FROM public.page_content
ORDER BY page_name, section, key;
