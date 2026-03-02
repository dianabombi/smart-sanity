-- View all brands with their categories
-- Run this in Supabase SQL Editor to see brand categories

SELECT 
  id,
  name,
  category,
  description
FROM brands
ORDER BY "order" ASC;
