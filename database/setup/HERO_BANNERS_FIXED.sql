-- Create the hero_banners table
CREATE TABLE hero_banners (
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

-- Create indexes for better performance
CREATE INDEX idx_hero_banners_order ON hero_banners("order");
CREATE INDEX idx_hero_banners_active ON hero_banners(active);

-- Enable Row Level Security
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON hero_banners
FOR SELECT USING (true);

-- Insert default hero banners (fixed quotes)
INSERT INTO hero_banners (src, alt, title, description, "order", active) VALUES
('/photos/kaldewei.avif', 'Kaldewei premium bathroom solutions', 'Kaldewei Premium', 'Premiove kupelnove riesenia', 1, true),
('/photos/umyvadlo.jpeg', 'Modern sink installations', 'Moderne umyvadla', 'Instalacie modernych umyvadiel', 2, true),
('/photos/vanaPs.png', 'Premium bathtub design', 'Premiove vane', 'Dizajnove kupelnove vane', 3, true);
