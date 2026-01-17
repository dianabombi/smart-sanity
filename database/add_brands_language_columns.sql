-- Add language-specific columns to brands table for full translation support
-- This migration adds separate columns for Slovak and English content

-- Add new language-specific columns
ALTER TABLE public.brands 
ADD COLUMN IF NOT EXISTS category_sk TEXT,
ADD COLUMN IF NOT EXISTS category_en TEXT,
ADD COLUMN IF NOT EXISTS description_sk TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT;

-- Migrate existing data to Slovak columns
UPDATE public.brands 
SET category_sk = category,
    description_sk = description
WHERE category_sk IS NULL OR description_sk IS NULL;

-- Add comments
COMMENT ON COLUMN public.brands.category_sk IS 'Brand category in Slovak';
COMMENT ON COLUMN public.brands.category_en IS 'Brand category in English';
COMMENT ON COLUMN public.brands.description_sk IS 'Brand description in Slovak';
COMMENT ON COLUMN public.brands.description_en IS 'Brand description in English';

-- Optional: You can keep the old columns for backward compatibility
-- or drop them after verifying the migration worked
-- ALTER TABLE public.brands DROP COLUMN category;
-- ALTER TABLE public.brands DROP COLUMN description;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_brands_category_sk ON public.brands(category_sk);
CREATE INDEX IF NOT EXISTS idx_brands_category_en ON public.brands(category_en);
