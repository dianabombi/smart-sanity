-- Create brands table for Smart Sanit project
-- This table stores brand information including logos, descriptions, and images

-- Create the brands table
CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE, -- Make name unique for ON CONFLICT
    description TEXT,
    category VARCHAR(100),
    logo TEXT, -- URL or path to logo image
    website VARCHAR(255), -- Optional website URL
    "order" INTEGER DEFAULT 0, -- Display order (using quotes because 'order' is reserved)
    images JSONB DEFAULT '[]'::jsonb, -- Array of image objects
    logo_size VARCHAR(50) DEFAULT 'max-h-16', -- CSS class for logo sizing
    logo_filter VARCHAR(100) DEFAULT 'none', -- CSS filter for logo
    use_text_logo BOOLEAN DEFAULT false, -- Whether to use text instead of image logo
    use_black_background BOOLEAN DEFAULT false, -- Whether logo needs black background
    is_main BOOLEAN DEFAULT true, -- Whether this is a main brand or "other" brand
    is_active BOOLEAN DEFAULT true, -- Whether brand is active/visible
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_brands_category ON brands(category);
CREATE INDEX IF NOT EXISTS idx_brands_order ON brands("order");
CREATE INDEX IF NOT EXISTS idx_brands_is_main ON brands(is_main);
CREATE INDEX IF NOT EXISTS idx_brands_is_active ON brands(is_active);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_brands_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_brands_updated_at
    BEFORE UPDATE ON brands
    FOR EACH ROW
    EXECUTE FUNCTION update_brands_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Create policies for brands table
-- Allow public read access (for website visitors)
CREATE POLICY "Allow public read access to brands" ON brands
    FOR SELECT USING (is_active = true);

-- Allow authenticated users full access (for admin panel)
CREATE POLICY "Allow authenticated users full access to brands" ON brands
    FOR ALL USING (auth.role() = 'authenticated');

-- Allow anonymous users to read active brands
CREATE POLICY "Allow anonymous read access to active brands" ON brands
    FOR SELECT USING (is_active = true);

-- Insert default brands data
-- This will populate the table with the initial brand data
INSERT INTO brands (name, description, category, logo, website, "order", images, is_main, is_active) VALUES
-- Main brands with descriptions
('Agape', 'Agape – svet plný originality a materiálovej pestrosti z pera tých najlepších svetových dizajnérov - prémiový taliansky dodávateľ kúpeľňových batérií, sanity, nábytku a doplnkov', 'Kúpeľňový nábytok', '/logoWhite.svg', NULL, 1, '[]'::jsonb, true, true),
('Fantini', 'Fantini – symbióza špičkového dizajnu a prvotriednej kvality sú výsledkom talianskeho producenta kúpeľňových a kuchynských batérií, doplnkov a komplexných wellness riešení', 'Batérie a sprchy', '/fantini.png', NULL, 2, '[]'::jsonb, true, true),
('Cielo', 'Cielo – „Hand Made Italy" – dotknite sa raja - ručne vyrábaná kúpeľňová sanita a nábytok', 'Sanitárna keramika', '/logo_cielo_white.png', NULL, 3, '[]'::jsonb, true, true),
('Azzurra', 'Azzurra – elegancia, ktorá zmení vašu kúpeľňu na moderný priestor - špičkový taliansky výrobca kúpeľňovej sanity a nábytku', 'Sanitárna keramika', '/logo Azzurra bianco su fondo nero.png', NULL, 4, '[]'::jsonb, true, true),
('CEA', 'CEA – taliansky výrobca kúpeľňových a kuchynských batérií, elektrických sušiakov a doplnkov', 'Batérie a sprchy', '/cea.svg', NULL, 5, '[]'::jsonb, true, true),
('Antrax', 'Antrax – prémiový taliansky výrobca dizajnových radiátorov', 'Radiátory', '/antraxIt.jpg', NULL, 6, '[]'::jsonb, true, true),
('Zenon', 'Zenon – prémiový španielsky výrobca umývadiel, vaní a sprchových vaničiek', 'Sanitárna keramika', '/logoBlack.webp', NULL, 7, '[]'::jsonb, true, true),
('Fondovalle', 'Fondovalle – prémiový taliansky výrobca keramických obkladov a dlažieb', 'Obklady a dlažby', '/logogf.png', NULL, 8, '[]'::jsonb, true, true),
('Fiandre', 'Fiandre – prémiový taliansky výrobca keramických obkladov a dlažieb', 'Obklady a dlažby', '/elite_logoRGB-11.jpg', NULL, 9, '[]'::jsonb, true, true),

-- Other brands (logos only)
('Tres', NULL, 'Ostatné', '/TRES_logo_W.svg', 'tresgriferia.com', 10, '[]'::jsonb, false, true),
('Axor', NULL, 'Ostatné', '/Axor-logo-white.png', NULL, 11, '[]'::jsonb, false, true),
('Kaldewei', NULL, 'Ostatné', '/kaldewei.png', NULL, 12, '[]'::jsonb, false, true),
('Alca', NULL, 'Ostatné', '/alca.svg', NULL, 13, '[]'::jsonb, false, true),
('Hansgrohe', NULL, 'Ostatné', '/Hansgrohe-Logo-2.svg', NULL, 14, '[]'::jsonb, false, true),
('Huppe', NULL, 'Ostatné', '/logoWhite.svg', NULL, 15, '[]'::jsonb, false, true),
('Dornbracht', NULL, 'Ostatné', '/logoWhite.svg', NULL, 16, '[]'::jsonb, false, true),
('Laufen', NULL, 'Ostatné', '/LAUFEN_White_RGB_big.png', NULL, 17, '[]'::jsonb, false, true),
('Kludi', NULL, 'Ostatné', '/logoWhite.svg', NULL, 18, '[]'::jsonb, false, true)

ON CONFLICT (name) DO NOTHING; -- Prevent duplicate entries if script is run multiple times

-- Grant necessary permissions
GRANT ALL ON brands TO authenticated;
GRANT SELECT ON brands TO anon;
