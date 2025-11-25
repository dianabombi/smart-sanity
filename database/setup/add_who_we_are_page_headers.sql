-- Add editable page title and subtitle for public "O nás" page
-- These will appear on http://localhost:3000/who-we-are

INSERT INTO public.page_content (page, section, key, content) VALUES
('who-we-are', 'page-headers', 'title', 'O nás'),
('who-we-are', 'page-headers', 'subtitle', 'Smart Sanit s.r.o.')
ON CONFLICT (page, section, key) DO NOTHING;

-- Verify
SELECT * FROM page_content 
WHERE page = 'who-we-are' AND section = 'page-headers'
ORDER BY key;
