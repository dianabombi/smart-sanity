-- SAFE UPDATE: Add missing page_content entries WITHOUT dropping existing data
-- This will only INSERT new rows if they don't already exist
-- It will NOT delete your background settings or other existing data
-- NOTE: Using page_name column (renamed from 'page' to avoid PostgREST conflict)

-- Insert admin headers and company name (only if they don't exist)
INSERT INTO public.page_content (page_name, section, key, content) VALUES
('admin-who-we-are', 'headers', 'title', 'Správa sekcií - O nás'),
('admin-who-we-are', 'headers', 'subtitle', 'Spravujte sekcie na stránke "O nás"'),
('global', 'company', 'name', 'Smart Sanit s.r.o.')
ON CONFLICT (page_name, section, key) DO NOTHING;

-- Verify all entries
SELECT page_name, section, key, 
       CASE 
         WHEN LENGTH(content) > 50 THEN LEFT(content, 50) || '...'
         ELSE content 
       END as content_preview
FROM public.page_content 
ORDER BY page_name, section, key;
