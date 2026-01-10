-- ALTERNATIVE FIX: Create PostgreSQL RPC function to bypass PostgREST 'page' parameter conflict
-- This allows us to query page_content without URL parameter issues

-- Function to get page content
CREATE OR REPLACE FUNCTION get_page_content(
    p_page TEXT,
    p_section TEXT,
    p_key TEXT
)
RETURNS TABLE (
    id BIGINT,
    page TEXT,
    section TEXT,
    key TEXT,
    content TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pc.id,
        pc.page,
        pc.section,
        pc.key,
        pc.content,
        pc.created_at,
        pc.updated_at
    FROM page_content pc
    WHERE pc.page = p_page
      AND pc.section = p_section
      AND pc.key = p_key;
END;
$$;

-- Function to update page content
CREATE OR REPLACE FUNCTION update_page_content(
    p_page TEXT,
    p_section TEXT,
    p_key TEXT,
    p_content TEXT
)
RETURNS TABLE (
    id BIGINT,
    page TEXT,
    section TEXT,
    key TEXT,
    content TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_exists BOOLEAN;
BEGIN
    -- Check if record exists
    SELECT EXISTS(
        SELECT 1 FROM page_content 
        WHERE page = p_page AND section = p_section AND key = p_key
    ) INTO v_exists;
    
    IF v_exists THEN
        -- Update existing
        UPDATE page_content 
        SET content = p_content,
            updated_at = NOW()
        WHERE page = p_page 
          AND section = p_section 
          AND key = p_key;
    ELSE
        -- Insert new
        INSERT INTO page_content (page, section, key, content, created_at, updated_at)
        VALUES (p_page, p_section, p_key, p_content, NOW(), NOW());
    END IF;
    
    -- Return the record
    RETURN QUERY
    SELECT 
        pc.id,
        pc.page,
        pc.section,
        pc.key,
        pc.content,
        pc.created_at,
        pc.updated_at
    FROM page_content pc
    WHERE pc.page = p_page
      AND pc.section = p_section
      AND pc.key = p_key;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_page_content(TEXT, TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION update_page_content(TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;

-- Test the functions
SELECT * FROM get_page_content('global', 'company', 'name');
SELECT * FROM update_page_content('global', 'company', 'name', 'TEST COMPANY');
SELECT * FROM get_page_content('global', 'company', 'name');
