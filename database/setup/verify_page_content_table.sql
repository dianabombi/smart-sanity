-- Verify and create page_content table if it doesn't exist
-- This table stores various page content including background settings

-- Create the table
CREATE TABLE IF NOT EXISTS page_content (
    id BIGSERIAL PRIMARY KEY,
    page VARCHAR(50) NOT NULL,
    section VARCHAR(50) NOT NULL,
    key VARCHAR(50) NOT NULL,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(page, section, key)
);

-- Enable Row Level Security
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Allow all operations on page_content" ON page_content;

-- Create policy to allow all operations (since this is admin-managed content)
CREATE POLICY "Allow all operations on page_content" ON page_content
    FOR ALL USING (true) WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_page_content_lookup ON page_content(page, section, key);

-- Insert default content entries if they don't exist
INSERT INTO page_content (page, section, key, content) VALUES
    ('who-we-are', 'background', 'settings', '{"whoWeArePattern":true,"patternOpacity":0.05,"patternType":"tiles","whoWeAreBackgroundImages":[],"backgroundImageOpacity":1.0,"backgroundImageBlur":0,"backgroundImageSize":"cover","backgroundImagePositionX":"center","backgroundImagePositionY":"center"}'),
    ('references', 'main', 'description', 'Naše úspešne realizované projekty a spokojní klienti sú našou najlepšou vizitkou.'),
    ('who-we-are', 'partnership', 'text', 'Partnersky spolupracujeme s interiérovým štúdiom')
ON CONFLICT (page, section, key) DO NOTHING;

-- Verify the table was created
SELECT 'page_content table created/verified successfully' AS status;

-- Show existing entries
SELECT * FROM page_content ORDER BY page, section, key;
