-- Create page_content table for Smart Sanit
-- Run this in Supabase SQL Editor to enable text editing in admin

CREATE TABLE IF NOT EXISTS public.page_content (
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

-- Create policy to allow all operations (adjust as needed for security)
CREATE POLICY "Allow all operations on page_content" ON public.page_content
    FOR ALL USING (true);

-- Insert default content for pages
INSERT INTO public.page_content (page, section, key, content) VALUES
('inspirations', 'main', 'description', 'Objavte najkrajšie kúpeľne a nechajte sa inšpirovať pre váš domov. Od moderných minimalistických riešení až po luxusné wellness priestory.'),
('references', 'main', 'description', 'Naše úspešne realizované projekty a spokojní klienti sú našou najlepšou vizitkou.'),
('brands', 'main', 'description', 'Ponúkame vám produkty od popredných svetových výrobcov sanitárnej techniky a kúpeľňového vybavenia.'),
('what-we-offer', 'main', 'content', '• Obchodujeme popredných svetových výrobcov v oblasti vybavenia kúpeľní, obkladov a dlažieb
• Podľa vašich požiadaviek vám vyskladáme kúpeľne z konkrétnych produktov od A po Z
• Spracujeme vám alternatívne riešenia s rôznymi cenovými hladinami
• Vyskladáme vám náročné sprchové, či vaňové zostavy batérií
• Zabezpečíme vám technickú podporu ku všetkým ponúkaným produktom
• Ponúkame vám dlhodobú spoluprácu založenú na odbornosti, spoľahlivosti a férovom prístupe'),
('who-we-are', 'partnership', 'text', 'Partnersky spolupracujeme s interiérovým štúdiom')
ON CONFLICT (page, section, key) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_page_content_lookup ON public.page_content(page, section, key);
CREATE INDEX IF NOT EXISTS idx_page_content_updated_at ON public.page_content(updated_at);

-- Add comment
COMMENT ON TABLE public.page_content IS 'Table storing editable page content for Smart Sanit website admin';
