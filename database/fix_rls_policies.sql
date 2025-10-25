-- FIX RLS POLICIES FOR EXISTING TABLES
-- Run this if you already have tables but need to fix RLS policies

-- Drop existing policies if they exist (ignore errors if they don't exist)
DROP POLICY IF EXISTS "Enable read access for all users" ON public.brands;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.brands;
DROP POLICY IF EXISTS "Enable update for all users" ON public.brands;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.brands;

DROP POLICY IF EXISTS "public_read_brands" ON public.brands;
DROP POLICY IF EXISTS "auth_write_brands" ON public.brands;

-- Enable RLS for brands (if not already enabled)
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Create simple RLS policies for brands (allow all operations for everyone)
CREATE POLICY "Enable read access for all users" ON public.brands
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.brands
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON public.brands
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON public.brands
    FOR DELETE USING (true);

-- =====================================================
-- FIX INSPIRATIONS TABLE RLS POLICIES
-- =====================================================
DROP POLICY IF EXISTS "Enable read access for all users" ON public.inspirations;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.inspirations;
DROP POLICY IF EXISTS "Enable update for all users" ON public.inspirations;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.inspirations;

ALTER TABLE public.inspirations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.inspirations
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.inspirations
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.inspirations
    FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.inspirations
    FOR DELETE USING (true);

-- REFERENCES
DROP POLICY IF EXISTS "Enable read access for all users" ON public.references;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.references;
DROP POLICY IF EXISTS "Enable update for all users" ON public.references;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.references;

ALTER TABLE public.references ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.references
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.references
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.references
    FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.references
    FOR DELETE USING (true);

-- PAGE CONTENT
DROP POLICY IF EXISTS "Enable read access for all users" ON public.page_content;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.page_content;
DROP POLICY IF EXISTS "Enable update for all users" ON public.page_content;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.page_content;

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.page_content
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.page_content
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.page_content
    FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.page_content
    FOR DELETE USING (true);

-- MESSAGES
DROP POLICY IF EXISTS "Enable read access for all users" ON public.messages;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.messages;
DROP POLICY IF EXISTS "Enable update for all users" ON public.messages;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.messages;

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.messages
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.messages
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.messages
    FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.messages
    FOR DELETE USING (true);
