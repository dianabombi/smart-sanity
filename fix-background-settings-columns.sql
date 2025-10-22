-- Fix background_settings table by adding missing columns
-- Run this in Supabase SQL Editor

-- First, check if the table exists and create it if it doesn't
CREATE TABLE IF NOT EXISTS public.background_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  "entrancePagePattern" BOOLEAN DEFAULT true,
  "patternType" VARCHAR(50) DEFAULT 'tiles',
  "patternOpacity" DECIMAL(3,2) DEFAULT 0.05,
  "entrancePageBackgroundImage" TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add the missing positioning and sizing columns
ALTER TABLE public.background_settings 
ADD COLUMN IF NOT EXISTS "backgroundImageSize" VARCHAR(50) DEFAULT 'cover';

ALTER TABLE public.background_settings 
ADD COLUMN IF NOT EXISTS "backgroundImagePositionX" VARCHAR(20) DEFAULT 'center';

ALTER TABLE public.background_settings 
ADD COLUMN IF NOT EXISTS "backgroundImagePositionY" VARCHAR(20) DEFAULT 'center';

ALTER TABLE public.background_settings 
ADD COLUMN IF NOT EXISTS "backgroundImageOpacity" DECIMAL(3,2) DEFAULT 1.0;

ALTER TABLE public.background_settings 
ADD COLUMN IF NOT EXISTS "backgroundImageBlur" INTEGER DEFAULT 0;

-- Insert default record if it doesn't exist
INSERT INTO public.background_settings (
  id,
  "entrancePagePattern",
  "patternType",
  "patternOpacity",
  "backgroundImageSize",
  "backgroundImagePositionX", 
  "backgroundImagePositionY",
  "backgroundImageOpacity",
  "backgroundImageBlur"
) 
SELECT 1, true, 'tiles', 0.05, 'cover', 'center', 'center', 1.0, 0
WHERE NOT EXISTS (SELECT 1 FROM public.background_settings WHERE id = 1);

-- Update existing record with default values for new columns
UPDATE public.background_settings 
SET 
  "backgroundImageSize" = COALESCE("backgroundImageSize", 'cover'),
  "backgroundImagePositionX" = COALESCE("backgroundImagePositionX", 'center'),
  "backgroundImagePositionY" = COALESCE("backgroundImagePositionY", 'center'),
  "backgroundImageOpacity" = COALESCE("backgroundImageOpacity", 1.0),
  "backgroundImageBlur" = COALESCE("backgroundImageBlur", 0),
  updated_at = NOW()
WHERE id = 1;

-- Verify the table structure
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns 
WHERE table_name = 'background_settings' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Show current data
SELECT * FROM public.background_settings;
