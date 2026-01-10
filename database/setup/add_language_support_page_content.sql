-- Add language support to page_content table
-- This allows storing both Slovak and English versions of page content

-- Add language column
ALTER TABLE public.page_content 
ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'sk' CHECK (language IN ('sk', 'en'));

-- Create index for language queries
CREATE INDEX IF NOT EXISTS idx_page_content_language ON public.page_content(language);

-- Update existing records to be Slovak
UPDATE public.page_content SET language = 'sk' WHERE language IS NULL;

-- Insert English translations for "What We Offer" page content
-- First, get the current Slovak content
DO $$
DECLARE
    slovak_content TEXT;
BEGIN
    -- Get the Slovak content for what-we-offer
    SELECT content INTO slovak_content 
    FROM public.page_content 
    WHERE page = 'what-we-offer' AND section = 'main' AND key = 'content' AND language = 'sk'
    LIMIT 1;
    
    -- Insert English version if Slovak content exists
    IF slovak_content IS NOT NULL THEN
        INSERT INTO public.page_content (page, section, key, content, language) VALUES
        ('what-we-offer', 'main', 'content', 
         E'• We trade leading global manufacturers in the field of bathroom equipment, tiles and flooring\n' ||
         E'• According to your requirements, we will assemble bathrooms from specific products from A to Z\n' ||
         E'• We will prepare alternative solutions with different price levels\n' ||
         E'• We will assemble demanding shower or bathtub faucet sets\n' ||
         E'• We will provide technical support for all offered products\n' ||
         E'• We offer long-term cooperation based on expertise, reliability and fair approach',
         'en')
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- Drop the old function first to avoid conflicts
DROP FUNCTION IF EXISTS get_page_content(VARCHAR, VARCHAR, VARCHAR);

-- Create the updated RPC function with language parameter
CREATE OR REPLACE FUNCTION get_page_content(
    p_page VARCHAR,
    p_section VARCHAR,
    p_key VARCHAR,
    p_language VARCHAR DEFAULT 'sk'
)
RETURNS TABLE (
    id BIGINT,
    page VARCHAR,
    section VARCHAR,
    key VARCHAR,
    content TEXT,
    language VARCHAR,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pc.id,
        pc.page,
        pc.section,
        pc.key,
        pc.content,
        pc.language,
        pc.created_at,
        pc.updated_at
    FROM page_content pc
    WHERE pc.page = p_page 
      AND pc.section = p_section 
      AND pc.key = p_key
      AND pc.language = p_language;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a unique constraint to prevent duplicate language entries
DROP INDEX IF EXISTS idx_page_content_unique;
CREATE UNIQUE INDEX idx_page_content_unique 
ON public.page_content(page, section, key, language);

-- Grant permissions
GRANT ALL ON public.page_content TO authenticated;
GRANT ALL ON public.page_content TO anon;
GRANT EXECUTE ON FUNCTION get_page_content TO authenticated;
GRANT EXECUTE ON FUNCTION get_page_content TO anon;
