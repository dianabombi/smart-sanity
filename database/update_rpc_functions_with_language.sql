-- Update RPC functions to support language parameter
-- Run this in Supabase SQL Editor

-- Drop existing functions first
DROP FUNCTION IF EXISTS get_page_content(VARCHAR, VARCHAR, VARCHAR);
DROP FUNCTION IF EXISTS get_page_content(VARCHAR, VARCHAR, VARCHAR, VARCHAR);
DROP FUNCTION IF EXISTS update_page_content(VARCHAR, VARCHAR, VARCHAR, TEXT);
DROP FUNCTION IF EXISTS update_page_content(VARCHAR, VARCHAR, VARCHAR, TEXT, VARCHAR);

-- Create get_page_content function with language support
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
)
LANGUAGE plpgsql
AS $$
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
$$;

-- Create update_page_content function with language support
CREATE OR REPLACE FUNCTION update_page_content(
  p_page VARCHAR,
  p_section VARCHAR,
  p_key VARCHAR,
  p_content TEXT,
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
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert or update the content
  INSERT INTO page_content (page, section, key, content, language, updated_at)
  VALUES (p_page, p_section, p_key, p_content, p_language, NOW())
  ON CONFLICT (page, section, key, language) 
  DO UPDATE SET 
    content = EXCLUDED.content,
    updated_at = NOW();
  
  -- Return the updated row
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
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_page_content(VARCHAR, VARCHAR, VARCHAR, VARCHAR) TO anon;
GRANT EXECUTE ON FUNCTION get_page_content(VARCHAR, VARCHAR, VARCHAR, VARCHAR) TO authenticated;
GRANT EXECUTE ON FUNCTION update_page_content(VARCHAR, VARCHAR, VARCHAR, TEXT, VARCHAR) TO anon;
GRANT EXECUTE ON FUNCTION update_page_content(VARCHAR, VARCHAR, VARCHAR, TEXT, VARCHAR) TO authenticated;

-- Test the functions
SELECT * FROM get_page_content('references', 'main', 'description', 'sk');
SELECT * FROM get_page_content('references', 'main', 'description', 'en');
