-- View all brands to prepare English translations
-- Run this in Supabase SQL Editor to see all your brands

SELECT 
  id,
  name,
  description,
  created_at
FROM brands
ORDER BY created_at DESC;
