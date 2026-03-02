-- Add English translation columns to brands table
-- Run this in Supabase SQL Editor

ALTER TABLE "brands" 
ADD COLUMN IF NOT EXISTS name_en TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS category_en TEXT;

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'brands' 
ORDER BY ordinal_position;
