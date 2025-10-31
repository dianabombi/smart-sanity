-- Verify inspiration-images bucket exists and has correct policies
-- Run this in Supabase SQL Editor

-- 1. Check if bucket exists
SELECT id, name, public 
FROM storage.buckets 
WHERE id = 'inspiration-images';

-- 2. Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage';

-- 3. Drop all existing policies for this bucket (clean slate)
DROP POLICY IF EXISTS "Public Access for Inspiration Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload inspiration images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update inspiration images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete inspiration images" ON storage.objects;
DROP POLICY IF EXISTS "Give users access to own folder" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;

-- 4. Create new comprehensive policies

-- Allow anyone to read/view images (public access)
CREATE POLICY "Public read access for inspiration images"
ON storage.objects FOR SELECT
USING (bucket_id = 'inspiration-images');

-- Allow anyone to upload (you can restrict this later if needed)
CREATE POLICY "Public upload access for inspiration images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'inspiration-images');

-- Allow anyone to update
CREATE POLICY "Public update access for inspiration images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'inspiration-images');

-- Allow anyone to delete
CREATE POLICY "Public delete access for inspiration images"
ON storage.objects FOR DELETE
USING (bucket_id = 'inspiration-images');

-- 5. Verify policies were created
SELECT policyname, cmd
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%inspiration%';
