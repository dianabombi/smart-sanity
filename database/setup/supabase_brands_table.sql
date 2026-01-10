-- Smart Sanit Brands Table Creation Script for Supabase
-- Run this in Supabase SQL Editor to create the brands table

-- Create the brands table
CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    logo TEXT, -- Will store data URLs for logos
    website VARCHAR(255),
    "order" INTEGER DEFAULT 0,
    images JSONB DEFAULT '[]'::jsonb, -- Array of image objects
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if they don't exist
DO $$ 
BEGIN
    -- Add is_main column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'brands' AND column_name = 'is_main') THEN
        ALTER TABLE brands ADD COLUMN is_main BOOLEAN DEFAULT true;
    END IF;
    
    -- Add is_other column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'brands' AND column_name = 'is_other') THEN
        ALTER TABLE brands ADD COLUMN is_other BOOLEAN DEFAULT false;
    END IF;
    
    -- Add is_partnership column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'brands' AND column_name = 'is_partnership') THEN
        ALTER TABLE brands ADD COLUMN is_partnership BOOLEAN DEFAULT false;
    END IF;
    
    -- Add use_black_background column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'brands' AND column_name = 'use_black_background') THEN
        ALTER TABLE brands ADD COLUMN use_black_background BOOLEAN DEFAULT false;
    END IF;
    
    -- Add use_text_logo column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'brands' AND column_name = 'use_text_logo') THEN
        ALTER TABLE brands ADD COLUMN use_text_logo BOOLEAN DEFAULT false;
    END IF;
    
    -- Add logo_size column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'brands' AND column_name = 'logo_size') THEN
        ALTER TABLE brands ADD COLUMN logo_size VARCHAR(50) DEFAULT 'max-h-16';
    END IF;
    
    -- Add logo_filter column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'brands' AND column_name = 'logo_filter') THEN
        ALTER TABLE brands ADD COLUMN logo_filter VARCHAR(100) DEFAULT 'none';
    END IF;
END $$;

-- Create an index on the order column for sorting
CREATE INDEX IF NOT EXISTS idx_brands_order ON brands("order");

-- Create an index on category for filtering
CREATE INDEX IF NOT EXISTS idx_brands_category ON brands(category);

-- Insert the default brands data
INSERT INTO brands (id, name, description, category, logo, website, "order", is_main, is_other, is_partnership) VALUES
(1, 'Agape', 'Prémiový taliansky dodávateľ kúpeľňových batérií, sanity, nábytku a kúpeľňových doplnkov', 'Kúpeľňový nábytok', '/logoWhite.svg', 'https://www.agapedesign.it', 1, true, false, false),
(2, 'Fantini', 'Prémiový taliansky výrobca kúpeľňových a kuchynských batérií a doplnkov', 'Batérie', '/fantini.png', 'https://www.fantini.it', 2, true, false, false),
(3, 'Cielo', 'Prémiový taliansky výrobca kúpeľňovej sanity, nábytku a kúpeľňových doplnkov', 'Sanitárna keramika', '/logo_cielo_white.png', 'https://www.ceramicacielo.it', 3, true, false, false),
(4, 'Azzurra', 'Prémiový taliansky výrobca kúpeľňovej sanity, nábytku a kúpeľňových doplnkov', 'Sanitárna keramika', '/logo Azzurra bianco su fondo nero.png', 'https://www.azzurra.it', 4, true, false, false),
(5, 'CEA', 'Prémiový taliansky výrobca kúpeľňových a kuchynských batérií, elektrických sušiakov a doplnkov', 'Batérie', '/cea.svg', 'https://www.ceadesign.it', 5, true, false, false),
(6, 'Antrax', 'Prémiový taliansky výrobca dizajnových radiátorov', 'Radiátory', '/antraxIt.jpg', 'https://www.antrax.it', 6, true, false, false),
(7, 'Zenon', 'Prémiový španielsky výrobca umývadiel, vaní a sprchových vaničiek', 'Sanitárna keramika', '/logoBlack.webp', 'https://www.zenon.es', 7, true, false, false),
(8, 'Fondovalle', 'Prémiový taliansky výrobca keramických obkladov a dlažieb', 'Obklady a dlažby', '/logogf.png', 'https://www.fondovalle.it', 8, true, false, false),
(9, 'Fiandre', 'Prémiový taliansky výrobca keramických obkladov a dlažieb', 'Obklady a dlažby', '/elite_logoRGB-11.jpg', 'https://www.granitifiandre.com', 9, true, false, false),
(10, 'Tres', 'tresgriferia.com', 'Ostatné', '/TRES_logo_W.svg', 'https://www.tresgriferia.com', 10, false, true, false),
(11, 'Axor', '', 'Ostatné', '/Axor-logo-white.png', 'https://www.axor-design.com', 11, false, true, false),
(12, 'Kaldewei', '', 'Ostatné', '/kaldewei.png', 'https://www.kaldewei.com', 12, false, true, false),
(13, 'Alca', '', 'Ostatné', '/alca.svg', 'https://www.alca.de', 13, false, true, false),
(14, 'Hansgrohe', '', 'Ostatné', '/Hansgrohe-Logo-2.svg', 'https://www.hansgrohe.com', 14, false, true, false),
(15, 'Huppe', '', 'Ostatné', '/logoWhite.svg', 'https://www.huppe.com', 15, false, true, false),
(16, 'Dornbracht', '', 'Ostatné', '/logoWhite.svg', 'https://www.dornbracht.com', 16, false, true, false),
(17, 'Laufen', '', 'Ostatné', '/LAUFEN_White_RGB_big.png', 'https://www.laufen.com', 17, false, true, false),
(18, 'Kludi', '', 'Ostatné', '/logoWhite.svg', 'https://www.kludi.com', 18, false, true, false),
(19, 'Elite Bath + Kitchen', '', 'Partnerstvo', '/elite_logoRGB-11.jpg', 'https://www.elitebathkitchen.com', 19, true, false, true)
ON CONFLICT (id) DO NOTHING;

-- Reset the sequence to continue from the highest ID
SELECT setval('brands_id_seq', (SELECT MAX(id) FROM brands));

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at on row updates
DROP TRIGGER IF EXISTS update_brands_updated_at ON brands;
CREATE TRIGGER update_brands_updated_at
    BEFORE UPDATE ON brands
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON brands
    FOR SELECT USING (true);

-- Create policies for authenticated users to insert/update/delete
CREATE POLICY "Enable insert for authenticated users only" ON brands
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON brands
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON brands
    FOR DELETE USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT ALL ON brands TO authenticated;
GRANT SELECT ON brands TO anon;
GRANT USAGE, SELECT ON SEQUENCE brands_id_seq TO authenticated;

-- Verify the table was created successfully
SELECT 'Brands table created successfully!' as status;
SELECT COUNT(*) as total_brands FROM brands;
