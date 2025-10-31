-- Fix Row Level Security policies for inspirations table
-- This ensures all operations work properly

-- First, drop ALL existing policies
DROP POLICY IF EXISTS "Allow all operations on inspirations" ON public.inspirations;
DROP POLICY IF EXISTS "Public Access for Inspirations" ON public.inspirations;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.inspirations;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.inspirations;
DROP POLICY IF EXISTS "Enable update for all users" ON public.inspirations;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.inspirations;

-- Enable RLS
ALTER TABLE public.inspirations ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies

-- Allow SELECT for everyone (public read)
CREATE POLICY "Enable read access for all users" 
ON public.inspirations FOR SELECT 
USING (true);

-- Allow INSERT for everyone (for now - you can restrict this later)
CREATE POLICY "Enable insert for all users" 
ON public.inspirations FOR INSERT 
WITH CHECK (true);

-- Allow UPDATE for everyone
CREATE POLICY "Enable update for all users" 
ON public.inspirations FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- Allow DELETE for everyone
CREATE POLICY "Enable delete for all users" 
ON public.inspirations FOR DELETE 
USING (true);

-- Verify the table exists
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE tablename = 'inspirations';

-- Check if there's data
SELECT COUNT(*) as inspiration_count FROM public.inspirations;
