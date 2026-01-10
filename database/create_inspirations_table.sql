-- Create inspirations table for Smart Sanit inspirations management
CREATE TABLE IF NOT EXISTS public.inspirations (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'modern',
    image TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    brands JSONB DEFAULT '[]'::jsonb,
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
DROP TRIGGER IF EXISTS update_inspirations_updated_at ON public.inspirations;
CREATE TRIGGER update_inspirations_updated_at
    BEFORE UPDATE ON public.inspirations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.inspirations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users" ON public.inspirations
    FOR ALL USING (auth.role() = 'authenticated');

-- Alternative: Allow all operations for everyone (less secure but simpler for development)
-- Uncomment the line below if you want to allow anonymous access
-- CREATE POLICY "Allow all operations for everyone" ON public.inspirations FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inspirations_created_at ON public.inspirations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inspirations_category ON public.inspirations(category);
CREATE INDEX IF NOT EXISTS idx_inspirations_title ON public.inspirations(title);

-- Insert sample inspirations data
INSERT INTO public.inspirations (title, description, category, image, features, brands) VALUES
('Moderná kúpeľňa', 'Elegantný dizajn s čistými líniami.', 'modern', '/photos/ATX_AG0088.jpg', '["Moderný dizajn", "Kvalitné materiály", "Funkčnosť"]'::jsonb, '["Agape", "Fantini", "Cielo"]'::jsonb),
('Luxusná kúpeľňa', 'Prémiové materiály a vybavenie.', 'luxury', '/photos/ATX_AG0102.jpg', '["Luxusné materiály", "Prémiové vybavenie", "Elegantný dizajn"]'::jsonb, '["AXOR", "Fantini", "Cielo"]'::jsonb),
('Štýlová kúpeľňa', 'Kombinácia funkčnosti a estetiky.', 'modern', '/photos/ATX_AG0088.jpg', '["Štýlový dizajn", "Praktické riešenia", "Kvalitné materiály"]'::jsonb, '["CEA Design", "Azzurra", "Hansgrohe"]'::jsonb),
('Minimalistická kúpeľňa', 'Čisté línie a jednoduché riešenia.', 'minimalist', '/photos/ATX_AG0102.jpg', '["Minimalizmus", "Čisté línie", "Funkčnosť"]'::jsonb, '["Agape", "Kaldewei", "Hansgrohe"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON public.inspirations TO authenticated;
GRANT ALL ON public.inspirations TO anon;
GRANT USAGE, SELECT ON SEQUENCE inspirations_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE inspirations_id_seq TO anon;
