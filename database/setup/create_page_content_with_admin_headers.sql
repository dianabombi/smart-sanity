-- Create page_content table for Smart Sanit with Admin Headers and Company Name
-- Run this in Supabase SQL Editor to enable all text editing in admin

-- Drop and recreate table to ensure clean state
DROP TABLE IF EXISTS public.page_content CASCADE;

CREATE TABLE public.page_content (
    id BIGSERIAL PRIMARY KEY,
    page TEXT NOT NULL,
    section TEXT NOT NULL,
    key TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(page, section, key)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations on page_content" ON public.page_content
    FOR ALL USING (true) WITH CHECK (true);

-- Insert all default content including admin headers and company name
INSERT INTO public.page_content (page, section, key, content) VALUES
-- Page descriptions
('inspirations', 'main', 'description', 'Objavte najkrajšie kúpeľne a nechajte sa inšpirovať pre váš domov. Od moderných minimalistických riešení až po luxusné wellness priestory.'),
('references', 'main', 'description', 'Naše úspešne realizované projekty a spokojní klienti sú našou najlepšou vizitkou.'),
('brands', 'main', 'description', 'Ponúkame vám produkty od popredných svetových výrobcov sanitárnej techniky a kúpeľňového vybavenia.'),
('what-we-offer', 'main', 'content', '• Obchodujeme popredných svetových výrobcov v oblasti vybavenia kúpeľní, obkladov a dlažieb
• Podľa vašich požiadaviek vám vyskladáme kúpeľne z konkrétnych produktov od A po Z
• Spracujeme vám alternatívne riešenia s rôznymi cenovými hladinami
• Vyskladáme vám náročné sprchové, či vaňové zostavy batérií
• Zabezpečíme vám technickú podporu ku všetkým ponúkaným produktom
• Ponúkame vám dlhodobú spoluprácu založenú na odbornosti, spoľahlivosti a férovom prístupe'),
('who-we-are', 'partnership', 'text', 'Partnersky spolupracujeme s interiérovým štúdiom'),

-- Admin page headers (NEW)
('admin-who-we-are', 'headers', 'title', 'Správa sekcií - O nás'),
('admin-who-we-are', 'headers', 'subtitle', 'Spravujte sekcie na stránke "O nás"'),

-- Global company name (NEW)
('global', 'company', 'name', 'Smart Sanit s.r.o.')
ON CONFLICT (page, section, key) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_page_content_lookup ON public.page_content(page, section, key);
CREATE INDEX IF NOT EXISTS idx_page_content_updated_at ON public.page_content(updated_at);

-- Add comment
COMMENT ON TABLE public.page_content IS 'Table storing editable page content for Smart Sanit website admin including headers and company info';

-- Verify the data was inserted
SELECT page, section, key, content FROM public.page_content ORDER BY page, section, key;
