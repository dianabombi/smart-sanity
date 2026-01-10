-- Create who_we_are_sections table for Smart Sanit "O nás" page sections
CREATE TABLE IF NOT EXISTS public.who_we_are_sections (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    size TEXT DEFAULT 'large' CHECK (size IN ('large', 'small')),
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_who_we_are_sections_updated_at ON public.who_we_are_sections;
CREATE TRIGGER update_who_we_are_sections_updated_at
    BEFORE UPDATE ON public.who_we_are_sections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.who_we_are_sections ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users" ON public.who_we_are_sections
    FOR ALL USING (auth.role() = 'authenticated');

-- Alternative: Allow all operations for everyone (less secure but simpler for development)
-- Uncomment the line below if you want to allow anonymous access
-- CREATE POLICY "Allow all operations for everyone" ON public.who_we_are_sections FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_who_we_are_sections_order ON public.who_we_are_sections("order");
CREATE INDEX IF NOT EXISTS idx_who_we_are_sections_created_at ON public.who_we_are_sections(created_at DESC);

-- Insert default sections
INSERT INTO public.who_we_are_sections (title, content, size, "order") VALUES
('O spoločnosti', 'Spoločnosť Smart Sanit s.r.o. vznikla v roku 2024 ako obchodná spoločnosť, ktorej hlavnou náplňou je ponuka dizajnových produktov v oblasti obkladov, dlažieb a kompletného vybavenia kúpeľní.', 'large', 1),
('Naša vízia', 'Ako milovníci dizajnu sledujeme najnovšie trendy v danej oblasti. S nami sa dotknete krásy a pocítite emóciu dizajnu na vlastnej koži.', 'large', 2),
('Pre našich klientov', 'Našim klientom ponúkame moderné, funkčné a na mieru šité riešenia, ktoré svojím budúcim užívateľom prinášajú každodenný pocit komfortu, pohody a spoľahlivosti.', 'large', 3),
('Partnerstvo', 'Partnersky spolupracujeme so štúdiom EB+K.', 'small', 4)
ON CONFLICT (id) DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON public.who_we_are_sections TO authenticated;
GRANT ALL ON public.who_we_are_sections TO anon;
GRANT USAGE, SELECT ON SEQUENCE who_we_are_sections_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE who_we_are_sections_id_seq TO anon;
