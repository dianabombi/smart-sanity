-- View all references to prepare English translations
-- Run this in Supabase SQL Editor to see all your references

SELECT 
  id,
  title,
  description,
  year,
  location,
  client,
  created_at
FROM "references"
ORDER BY created_at DESC;
