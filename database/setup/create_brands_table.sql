-- Create brands table for Smart Sanit
-- Run this in Supabase SQL Editor to enable brand management with categories

CREATE TABLE IF NOT EXISTS public.brands (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    logo TEXT,
    logo_size TEXT DEFAULT 'max-h-16',
    logo_filter TEXT DEFAULT 'none',
    images JSONB DEFAULT '[]'::jsonb,
    is_main BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed for security)
CREATE POLICY "Allow all operations on brands" ON public.brands
    FOR ALL USING (true);

-- Insert sample brands with categories
INSERT INTO public.brands (name, category, description, logo, is_main, "order") VALUES
('Agape', 'Kúpeľňový nábytok', 'Agape – svet plný originality a materiálovej pestrosti z pera tých najlepších svetových dizajnérov - prémiový taliansky dodávateľ kúpeľňových batérií, sanity, nábytku a doplnkov', '/logoWhite.svg', true, 1),
('Fantini', 'Batérie a sprchy', 'Fantini – symbióza špičkového dizajnu a prvotriednej kvality sú výsledkom talianskeho producenta kúpeľňových a kuchynských batérií, doplnkov a komplexných wellness riešení', '/fantini.png', true, 2),
('Cielo', 'Sanitárna keramika', 'Cielo – „Hand Made Italy" – dotknite sa raja - ručne vyrábaná kúpeľňová sanita a nábytok', '/logo_cielo_white.png', true, 3),
('CEA', 'Batérie a sprchy', 'CEA – taliansky výrobca prémiových kúpeľňových a kuchynských batérií s jedinečným dizajnom', '/cea-logo.svg', true, 4),
('AXOR', 'Batérie a sprchy', 'AXOR – luxusná značka od Hansgrohe, špičkový nemecký dizajn a kvalita', '/axor-logo.svg', true, 5),
('Elite Bath + Kitchen', 'Kúpeľňový nábytok', 'Elite Bath + Kitchen – náš partnerský interiérový štúdio', '/elite_logoRGB-11.jpg', false, 6),
('Azzurra', 'Sanitárna keramika', 'Azzurra – taliansky výrobca sanitárnej keramiky s moderným dizajnom', '/azzurra-logo.svg', false, 7)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_brands_category ON public.brands(category);
CREATE INDEX IF NOT EXISTS idx_brands_is_main ON public.brands(is_main);
CREATE INDEX IF NOT EXISTS idx_brands_order ON public.brands("order");

-- Add comment
COMMENT ON TABLE public.brands IS 'Table storing brand information with categories for Smart Sanit website';
COMMENT ON COLUMN public.brands.category IS 'Brand category as free text (e.g., Kúpeľňový nábytok, Batérie a sprchy, etc.)';
