-- Create who_we_are_sections table for Smart Sanit project
-- This table stores the "O nás" page content sections

-- Drop table if it exists (for clean setup)
DROP TABLE IF EXISTS who_we_are_sections CASCADE;

-- Create the who_we_are_sections table
CREATE TABLE who_we_are_sections (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    size VARCHAR(50) DEFAULT 'large',
    "order" INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_who_we_are_order ON who_we_are_sections("order");
CREATE INDEX IF NOT EXISTS idx_who_we_are_active ON who_we_are_sections(is_active);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_who_we_are_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_who_we_are_updated_at
    BEFORE UPDATE ON who_we_are_sections
    FOR EACH ROW
    EXECUTE FUNCTION update_who_we_are_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE who_we_are_sections ENABLE ROW LEVEL SECURITY;

-- Create policies for who_we_are_sections table
-- Allow public read access (for website visitors)
CREATE POLICY "Allow public read access to who_we_are_sections" ON who_we_are_sections
    FOR SELECT USING (is_active = true);

-- Allow authenticated users full access (for admin panel)
CREATE POLICY "Allow authenticated users full access to who_we_are_sections" ON who_we_are_sections
    FOR ALL USING (auth.role() = 'authenticated');

-- Allow anonymous users to read active sections
CREATE POLICY "Allow anonymous read access to active who_we_are_sections" ON who_we_are_sections
    FOR SELECT USING (is_active = true);

-- Insert default "O nás" content
INSERT INTO who_we_are_sections (title, content, size, "order", is_active) VALUES
('O spoločnosti', 'Spoločnosť Smart Sanit s.r.o. vznikla v roku 2024 ako obchodná spoločnosť, ktorej hlavnou náplňou je ponuka dizajnových produktov v oblasti obkladov, dlažieb a kompletného vybavenia kúpeľní.', 'large', 1, true),
('Naša vízia', 'Ako milovníci dizajnu sledujeme najnovšie trendy v danej oblasti. S nami sa dotknete krásy a pocítite emóciu dizajnu na vlastnej koži.', 'large', 2, true),
('Pre našich klientov', 'Našim klientom ponúkame moderné, funkčné a na mieru šité riešenia, ktoré svojím budúcim užívateľom prinášajú každodenný pocit komfortu, pohody a luxusu.', 'large', 3, true),
('Partnerstvo', 'Partnersky spolupracujeme so štúdiom Elite Bath + Kitchen (EB+K).', 'small', 4, true);

-- Grant necessary permissions
GRANT ALL ON who_we_are_sections TO authenticated;
GRANT SELECT ON who_we_are_sections TO anon;
