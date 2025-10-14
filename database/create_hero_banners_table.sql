-- Create hero_banners table for Smart Sanit project
-- This table stores the hero banner images for the homepage carousel

-- Drop table if it exists (for clean setup)
DROP TABLE IF EXISTS hero_banners CASCADE;

-- Create the hero_banners table
CREATE TABLE hero_banners (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    description TEXT,
    alt VARCHAR(200),
    src TEXT NOT NULL,
    "order" INTEGER DEFAULT 1,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hero_banners_order ON hero_banners("order");
CREATE INDEX IF NOT EXISTS idx_hero_banners_active ON hero_banners(active);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_hero_banners_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_hero_banners_updated_at
    BEFORE UPDATE ON hero_banners
    FOR EACH ROW
    EXECUTE FUNCTION update_hero_banners_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;

-- Create policies for hero_banners table
-- Allow public read access (for website visitors)
CREATE POLICY "Allow public read access to hero_banners" ON hero_banners
    FOR SELECT USING (active = true);

-- Allow authenticated users full access (for admin panel)
CREATE POLICY "Allow authenticated users full access to hero_banners" ON hero_banners
    FOR ALL USING (auth.role() = 'authenticated');

-- Allow anonymous users to read active banners
CREATE POLICY "Allow anonymous read access to active hero_banners" ON hero_banners
    FOR SELECT USING (active = true);

-- Insert default hero banners (fallback images from public folder)
INSERT INTO hero_banners (title, description, alt, src, "order", active) VALUES
('Kaldewei Premium Solutions', 'Prémiové kúpeľňové riešenia od Kaldewei', 'Kaldewei premium bathroom solutions', '/photos/kaldewei.avif', 1, true),
('Agape Design Excellence', 'Taliansky dizajn a kvalita od Agape', 'Agape Italian design and quality', '/photos/agape.avif', 2, true),
('Fantini Innovation', 'Inovatívne batérie a doplnky od Fantini', 'Fantini innovative faucets and accessories', '/photos/fantini.avif', 3, true);

-- Grant necessary permissions
GRANT ALL ON hero_banners TO authenticated;
GRANT SELECT ON hero_banners TO anon;
