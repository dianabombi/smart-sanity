-- Create inspirations table for Smart Sanit
-- Run this in Supabase SQL Editor to fix the inspirations admin error

CREATE TABLE IF NOT EXISTS public.inspirations (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'modern',
    image TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    brands JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.inspirations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed for security)
CREATE POLICY "Allow all operations on inspirations" ON public.inspirations
    FOR ALL USING (true);

-- Insert some sample data
INSERT INTO public.inspirations (title, description, category, image, features, brands) VALUES
('Moderná kúpeľňa', 'Elegantný dizajn s čistými líniami a moderným vybavením.', 'modern', '/photos/compressed/ATX_AG0088.jpg', '["Moderný dizajn", "Kvalitné materiály", "Funkčnosť"]'::jsonb, '["Agape", "Fantini", "Cielo"]'::jsonb),
('Luxusná kúpeľňa', 'Prémiové materiály a vybavenie pre náročných klientov.', 'luxury', '/photos/compressed/ATX_AG0102.jpg', '["Luxusné materiály", "Prémiové vybavenie", "Elegantný dizajn"]'::jsonb, '["AXOR", "Fantini", "Cielo"]'::jsonb),
('Štýlová kúpeľňa', 'Kombinuje praktickosť s estetikou pre každodenné použitie.', 'modern', '/photos/compressed/ATX_AG0103.jpg', '["Štýlový dizajn", "Praktické riešenia", "Kvalitné materiály"]'::jsonb, '["Agape", "CEA", "Cielo"]'::jsonb),
('Minimalistická kúpeľňa', 'Jednoduché a čisté riešenia pre moderný životný štýl.', 'modern', '/photos/compressed/ATX_AG0104.jpg', '["Minimalistický dizajn", "Čisté línie", "Funkčnosť"]'::jsonb, '["Agape", "Fantini"]'::jsonb),
('Industriálna kúpeľňa', 'Surový dizajn s industriálnymi prvkami.', 'industrial', '/photos/compressed/ATX_AG0105.jpg', '["Industriálny štýl", "Surové materiály", "Moderné technológie"]'::jsonb, '["AXOR", "CEA"]'::jsonb),
('Klasická kúpeľňa', 'Nadčasový dizajn s tradičnými prvkami.', 'classic', '/photos/compressed/ATX_AG0106.jpg', '["Klasický dizajn", "Nadčasové riešenia", "Kvalitné materiály"]'::jsonb, '["Fantini", "Cielo", "Azzurra"]'::jsonb)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inspirations_category ON public.inspirations(category);
CREATE INDEX IF NOT EXISTS idx_inspirations_created_at ON public.inspirations(created_at);

-- Add comment
COMMENT ON TABLE public.inspirations IS 'Table storing inspiration images and details for Smart Sanit website';
