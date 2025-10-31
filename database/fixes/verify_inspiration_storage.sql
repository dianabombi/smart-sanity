-- Verify inspiration-images storage bucket setup
-- Run this in Supabase SQL Editor

-- 1. Check if bucket exists
SELECT id, name, public, created_at 
FROM storage.buckets 
WHERE id = 'inspiration-images';

-- 2. Check policies for the bucket
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%inspiration%';

-- 3. Count files in bucket (if any)
SELECT COUNT(*) as file_count
FROM storage.objects
WHERE bucket_id = 'inspiration-images';
