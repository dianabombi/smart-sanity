-- Add English translation columns to references table
-- Run this in Supabase SQL Editor

ALTER TABLE "references" 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS location_en TEXT,
ADD COLUMN IF NOT EXISTS client_en TEXT;

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'references' 
ORDER BY ordinal_position;
