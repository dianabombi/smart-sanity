-- Add language support to page_content table
-- Run this in Supabase SQL Editor

-- Add language column if it doesn't exist
ALTER TABLE page_content ADD COLUMN IF NOT EXISTS language VARCHAR(5) NOT NULL DEFAULT 'sk';

-- Create index on language for better performance
CREATE INDEX IF NOT EXISTS idx_page_content_language ON page_content(language);

-- Update unique constraint to include language
-- First drop the old constraint if it exists
ALTER TABLE page_content DROP CONSTRAINT IF EXISTS page_content_page_section_key_key;

-- Create new unique constraint including language
ALTER TABLE page_content ADD CONSTRAINT page_content_page_section_key_language_key 
  UNIQUE (page, section, key, language);

-- Update existing records to have Slovak language
UPDATE page_content SET language = 'sk' WHERE language IS NULL OR language = '';

-- Insert English versions for existing pages (if not exists)
INSERT INTO page_content (page, section, key, content, language)
SELECT page, section, key, 
  CASE 
    WHEN page = 'references' AND section = 'main' AND key = 'description' 
      THEN 'Our successfully completed projects and satisfied clients are our best business card.'
    WHEN page = 'inspirations' AND section = 'main' AND key = 'description'
      THEN 'Discover the most beautiful bathrooms and get inspired for your home.'
    WHEN page = 'brands' AND section = 'main' AND key = 'description'
      THEN 'We collaborate with premium global brands in sanitary technology and bathroom equipment.'
    WHEN page = 'who-we-are' AND section = 'page-headers' AND key = 'title'
      THEN 'About Us'
    WHEN page = 'who-we-are' AND section = 'page-headers' AND key = 'subtitle'
      THEN 'Smart Sanit s.r.o.'
    WHEN page = 'what-we-offer' AND section = 'main' AND key = 'content'
      THEN 'We trade leading global manufacturers in the field of bathroom equipment, tiles and flooring
According to your requirements, we will assemble bathrooms from specific products from A to Z
We will prepare alternative solutions with different price levels
We will assemble demanding shower or bathtub faucet sets
We will provide technical support for all offered products
We offer long-term cooperation based on expertise, reliability and fair approach'
    ELSE content
  END,
  'en'
FROM page_content 
WHERE language = 'sk'
ON CONFLICT (page, section, key, language) DO NOTHING;

-- Verify the changes
SELECT page, section, key, language, LEFT(content, 50) as content_preview 
FROM page_content 
ORDER BY page, section, key, language;
