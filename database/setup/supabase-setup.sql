-- Create who_we_are_sections table
CREATE TABLE IF NOT EXISTS who_we_are_sections (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  size VARCHAR(50) DEFAULT 'large',
  "order" INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE who_we_are_sections ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this later)
CREATE POLICY "Allow all operations on who_we_are_sections" ON who_we_are_sections
FOR ALL USING (true) WITH CHECK (true);

-- Insert default section
INSERT INTO who_we_are_sections (title, content, size, "order") VALUES 
('O spoločnosti', 'Spoločnosť Smart Sanit s.r.o. vznikla v roku 2024 ako obchodná spoločnosť, ktorej hlavnou náplňou je ponuka dizajnových produktov v oblasti obkladov, dlažieb a kompletného vybavenia kúpeľní.

Ako milovníci dizajnu sledujeme najnovšie trendy v danej oblasti. S nami sa dotknete krásy a pocítite emóciu dizajnu na vlastnej koži.

Našim klientom ponúkame moderné, funkčné a na mieru šité riešenia, ktoré svojim budúcim užívateľom prinášajú každodenný pocit komfortu, pohody a spoľahlivosti.', 'large', 1)
ON CONFLICT DO NOTHING;

-- Create update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_who_we_are_sections_updated_at 
    BEFORE UPDATE ON who_we_are_sections 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
