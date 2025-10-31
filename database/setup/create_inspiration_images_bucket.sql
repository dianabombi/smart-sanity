-- Create Supabase Storage bucket for inspiration images

-- Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('inspiration-images', 'inspiration-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies to allow public read access
CREATE POLICY "Public Access for Inspiration Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'inspiration-images');

-- Allow authenticated users to upload (admin panel)
CREATE POLICY "Authenticated users can upload inspiration images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'inspiration-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update inspiration images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'inspiration-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete inspiration images"
ON storage.objects FOR DELETE
USING (bucket_id = 'inspiration-images' AND auth.role() = 'authenticated');

-- Note: If you want to allow unauthenticated uploads (for development), use:
-- CREATE POLICY "Allow all uploads for development"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'inspiration-images');
