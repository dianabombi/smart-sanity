-- Add missing background image columns to background_settings table
-- Run this in Supabase SQL Editor

-- Add referencesPageBackgroundImage column
ALTER TABLE background_settings 
ADD COLUMN IF NOT EXISTS "referencesPageBackgroundImage" TEXT DEFAULT NULL;

-- Add contactPageBackgroundImage column
ALTER TABLE background_settings 
ADD COLUMN IF NOT EXISTS "contactPageBackgroundImage" TEXT DEFAULT NULL;

-- Add inspirationsPageBackgroundImage column
ALTER TABLE background_settings 
ADD COLUMN IF NOT EXISTS "inspirationsPageBackgroundImage" TEXT DEFAULT NULL;

-- Verify columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'background_settings'
ORDER BY ordinal_position;
