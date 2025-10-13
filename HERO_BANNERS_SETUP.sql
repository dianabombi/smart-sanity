-- Hero Banners Table Setup for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Create the hero_banners table
CREATE TABLE IF NOT EXISTS hero_banners (
  id SERIAL PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  title TEXT,
  description TEXT,
  "order" INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on the order column for better performance
CREATE INDEX IF NOT EXISTS idx_hero_banners_order ON hero_banners("order");

-- Create an index on the active column for filtering
CREATE INDEX IF NOT EXISTS idx_hero_banners_active ON hero_banners(active);

-- Insert default hero banners
INSERT INTO hero_banners (src, alt, title, description, "order", active) VALUES
('/photos/kaldewei.avif', 'Kaldewei premium bathroom solutions', 'Kaldewei Premium', 'Prémiové kúpeľňové riešenia', 1, true),
('/photos/umyvadlo.jpeg', 'Modern sink installations', 'Moderné umývadlá', 'Inštalácie moderných umývadiel', 2, true),
('/photos/vanaPs.png', 'Premium bathtub design', 'Prémiové vane', 'Dizajnové kúpeľňové vane', 3, true)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY IF NOT EXISTS "Allow public read access" ON hero_banners
FOR SELECT USING (true);

-- Create policies for authenticated users (admin) to manage banners
CREATE POLICY IF NOT EXISTS "Allow authenticated users to insert" ON hero_banners
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Allow authenticated users to update" ON hero_banners
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Allow authenticated users to delete" ON hero_banners
FOR DELETE USING (auth.role() = 'authenticated');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_hero_banners_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER IF NOT EXISTS update_hero_banners_updated_at
  BEFORE UPDATE ON hero_banners
  FOR EACH ROW
  EXECUTE FUNCTION update_hero_banners_updated_at();
