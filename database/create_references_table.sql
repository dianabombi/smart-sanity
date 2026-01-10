-- Create references table for Smart Sanit project references
CREATE TABLE IF NOT EXISTS public.references (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    year TEXT NOT NULL,
    location TEXT,
    client TEXT,
    images JSONB DEFAULT '[]'::jsonb,
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
DROP TRIGGER IF EXISTS update_references_updated_at ON public.references;
CREATE TRIGGER update_references_updated_at
    BEFORE UPDATE ON public.references
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.references ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
-- (You can make this more restrictive based on your needs)
CREATE POLICY "Allow all operations for authenticated users" ON public.references
    FOR ALL USING (auth.role() = 'authenticated');

-- Alternative: Allow all operations for everyone (less secure but simpler for development)
-- Uncomment the line below if you want to allow anonymous access
-- CREATE POLICY "Allow all operations for everyone" ON public.references FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_references_created_at ON public.references(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_references_year ON public.references(year);
CREATE INDEX IF NOT EXISTS idx_references_title ON public.references(title);

-- Insert some sample data (optional)
INSERT INTO public.references (title, description, year, location, client, images) VALUES
('Hotel Grandezza Bratislava', '120 hotelových kúpeľní', '2023', 'Bratislava', 'Hotel Group s.r.o.', '[]'::jsonb),
('Wellness AquaRelax', 'Kompletné wellness vybavenie', '2023', 'Košice', 'AquaRelax s.r.o.', '[]'::jsonb),
('Rezidencia Zlaté Piesky', '8 luxusných kúpeľní', '2022', 'Bratislava', 'Rezidencia s.r.o.', '[]'::jsonb),
('Bytový dom Slnečnica', '45 bytových kúpeľní', '2022', 'Nitra', 'Slnečnica Development', '[]'::jsonb),
('Reštaurácia U Tomáša', 'Komerčné sanitárne zariadenia', '2023', 'Trnava', 'Gastro Group s.r.o.', '[]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON public.references TO authenticated;
GRANT ALL ON public.references TO anon;
GRANT USAGE, SELECT ON SEQUENCE references_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE references_id_seq TO anon;
