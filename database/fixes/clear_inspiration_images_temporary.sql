-- TEMPORARY FIX: Clear base64 images from inspirations to fix timeout
-- This allows you to load and manage inspirations again
-- After creating Supabase Storage bucket, you can re-upload images properly

-- WARNING: This will remove image data from the database!
-- Only run this if you:
-- 1. Have timeout errors loading inspirations
-- 2. Plan to re-upload images using Supabase Storage
-- 3. Have backed up your images elsewhere

-- Clear the image column (set to NULL or placeholder)
UPDATE public.inspirations 
SET image = '/photos/placeholder.jpg'
WHERE image LIKE 'data:image%';

-- Check how many were updated
SELECT 
    COUNT(*) FILTER (WHERE image LIKE 'data:image%') as base64_images,
    COUNT(*) FILTER (WHERE image NOT LIKE 'data:image%') as url_images,
    COUNT(*) as total
FROM public.inspirations;

-- After running this:
-- 1. Refresh admin panel - inspirations should load instantly
-- 2. Create Supabase Storage bucket "inspiration-images" 
-- 3. Re-upload images through admin panel (they'll use Storage)
