-- Create why_choose_us table for "Prečo si vybrať SMART SANIT?" section
CREATE TABLE IF NOT EXISTS why_choose_us (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS for development (you can enable later if needed)
ALTER TABLE why_choose_us DISABLE ROW LEVEL SECURITY;

-- Insert default "Prečo si vybrať SMART SANIT?" content
INSERT INTO why_choose_us (title, subtitle, items) VALUES 
(
  'Prečo si vybrať SMART SANIT?',
  '',
  '[
    {
      "title": "Kvalita",
      "description": "Všetky naše značky sú synonymom pre najvyššiu kvalitu a spoľahlivosť.",
      "icon": "quality"
    },
    {
      "title": "Inovácia", 
      "description": "Najnovšie technológie a dizajnové trendy v sanitárnej technike.",
      "icon": "innovation"
    },
    {
      "title": "Servis",
      "description": "Komplexný servis a poradenstvo pre všetky naše produkty.",
      "icon": "service"
    }
  ]'::jsonb
)
ON CONFLICT DO NOTHING;

-- Create update trigger for updated_at
CREATE OR REPLACE FUNCTION update_why_choose_us_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_why_choose_us_updated_at 
    BEFORE UPDATE ON why_choose_us 
    FOR EACH ROW EXECUTE FUNCTION update_why_choose_us_updated_at();

-- Optional: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_why_choose_us_active ON why_choose_us(active);
CREATE INDEX IF NOT EXISTS idx_why_choose_us_created_at ON why_choose_us(created_at);
