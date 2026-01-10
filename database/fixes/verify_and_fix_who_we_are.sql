-- Comprehensive fix for "O nás" editing issue
-- Run this script in your Supabase SQL Editor

-- Step 1: Check if table exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'who_we_are_sections'
    ) THEN
        RAISE NOTICE 'Table who_we_are_sections does not exist! Creating it...';
        
        -- Create the table
        CREATE TABLE public.who_we_are_sections (
            id BIGSERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            size TEXT DEFAULT 'large' CHECK (size IN ('large', 'small')),
            "order" INTEGER DEFAULT 0,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        
        -- Enable RLS
        ALTER TABLE public.who_we_are_sections ENABLE ROW LEVEL SECURITY;
        
        RAISE NOTICE 'Table created successfully!';
    ELSE
        RAISE NOTICE 'Table who_we_are_sections already exists.';
    END IF;
END $$;

-- Step 2: Drop old restrictive policy if it exists
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON public.who_we_are_sections;

-- Step 3: Create new permissive policy
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE tablename = 'who_we_are_sections' 
        AND policyname = 'Allow all operations on who_we_are_sections'
    ) THEN
        CREATE POLICY "Allow all operations on who_we_are_sections" ON public.who_we_are_sections
            FOR ALL USING (true) WITH CHECK (true);
        RAISE NOTICE 'RLS policy created successfully!';
    ELSE
        RAISE NOTICE 'RLS policy already exists.';
    END IF;
END $$;

-- Step 4: Grant permissions
GRANT ALL ON public.who_we_are_sections TO authenticated;
GRANT ALL ON public.who_we_are_sections TO anon;
GRANT USAGE, SELECT ON SEQUENCE who_we_are_sections_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE who_we_are_sections_id_seq TO anon;

-- Step 5: Check current data
SELECT 
    COUNT(*) as total_sections,
    STRING_AGG(title, ', ' ORDER BY "order") as section_titles
FROM public.who_we_are_sections;

-- Step 6: Insert default content if table is empty
INSERT INTO public.who_we_are_sections (title, content, size, "order") 
SELECT * FROM (VALUES
    ('O spoločnosti', 'Spoločnosť Smart Sanit s.r.o. vznikla v roku 2024 ako obchodná spoločnosť, ktorej hlavnou náplňou je ponuka dizajnových produktov v oblasti obkladov, dlažieb a kompletného vybavenia kúpeľní.

Ako milovníci dizajnu sledujeme najnovšie trendy v danej oblasti. S nami sa dotknete krásy a pocítite emóciu dizajnu na vlastnej koži.

Našim klientom ponúkame moderné, funkčné a na mieru šité riešenia, ktoré svojím budúcim užívateľom prinášajú každodenný pocit komfortu, pohody a spoľahlivosti.', 'large', 1)
) AS v(title, content, size, "order")
WHERE NOT EXISTS (SELECT 1 FROM public.who_we_are_sections);

-- Step 7: Verify the fix
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'who_we_are_sections';

-- Step 8: Display current sections
SELECT 
    id,
    title,
    LEFT(content, 100) || '...' as content_preview,
    size,
    "order",
    created_at,
    updated_at
FROM public.who_we_are_sections
ORDER BY "order";

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Fix completed! You can now edit "O nás" content in the admin panel.';
    RAISE NOTICE '📝 The rich text editor should now save changes successfully.';
END $$;
