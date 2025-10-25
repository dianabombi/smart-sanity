-- SQL Script to create Inspirations and References tables for Smart Sanit
-- Run this in your Supabase SQL Editor

-- =====================================================
-- CREATE INSPIRATIONS TABLE
-- =====================================================

-- Drop table if exists (be careful in production!)
DROP TABLE IF EXISTS public.inspirations;

-- Create inspirations table
CREATE TABLE public.inspirations (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) DEFAULT 'modern',
    image TEXT, -- Base64 encoded image or URL
    features JSONB DEFAULT '[]'::jsonb, -- Array of features
    brands JSONB DEFAULT '[]'::jsonb, -- Array of brand names
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_inspirations_category ON public.inspirations(category);
CREATE INDEX idx_inspirations_created_at ON public.inspirations(created_at DESC);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.inspirations ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access
CREATE POLICY "Allow public read access on inspirations" 
ON public.inspirations FOR SELECT 
USING (true);

-- Policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert on inspirations" 
ON public.inspirations FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update on inspirations" 
ON public.inspirations FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete on inspirations" 
ON public.inspirations FOR DELETE 
USING (auth.role() = 'authenticated');

-- =====================================================
-- CREATE REFERENCES TABLE
-- =====================================================

-- Drop table if exists (be careful in production!)
DROP TABLE IF EXISTS public.references;

-- Create references table
CREATE TABLE public.references (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    year VARCHAR(4), -- Year as string (e.g., "2024")
    location VARCHAR(255), -- City or location
    client VARCHAR(255), -- Client name
    images JSONB DEFAULT '[]'::jsonb, -- Array of base64 images or URLs
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_references_year ON public.references(year);
CREATE INDEX idx_references_location ON public.references(location);
CREATE INDEX idx_references_created_at ON public.references(created_at DESC);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.references ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access
CREATE POLICY "Allow public read access on references" 
ON public.references FOR SELECT 
USING (true);

-- Policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert on references" 
ON public.references FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update on references" 
ON public.references FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete on references" 
ON public.references FOR DELETE 
USING (auth.role() = 'authenticated');

-- =====================================================
-- INSERT SAMPLE DATA
-- =====================================================

-- Insert sample inspirations
INSERT INTO public.inspirations (title, description, category, image, features, brands) VALUES
('Luxusný priestor', 'Prémiové materiály a sofistikované riešenia.', 'luxury', '/photos/compressed/ATX_AG0065.jpg', '["Luxusné materiály", "Prémiové vybavenie", "Elegantný dizajn"]', '["AXOR", "Fantini", "Cielo"]'),
('Štýlová kúpeľňa', 'Kombinácia funkčnosti a estetiky.', 'modern', '/photos/compressed/ATX_AG0088.jpg', '["Štýlový dizajn", "Praktické riešenia", "Kvalitné materiály"]', '["CEA Design", "Azzurra", "Hansgrohe"]'),
('Minimalistický štýl', 'Čisté línie a jednoduché riešenia.', 'modern', '/photos/compressed/ATX_AG0102.jpg', '["Minimalizmus", "Čisté línie", "Funkčnosť"]', '["Agape", "Kaldewei", "Hansgrohe"]'),
('Elegantná kúpeľňa', 'Sofistikované riešenie s dôrazom na detail.', 'luxury', '/photos/compressed/ATX_AG0114.jpg', '["Elegancia", "Detailné riešenia", "Kvalita"]', '["Fantini", "AXOR", "Cielo"]'),
('Klasický štýl', 'Nadčasový dizajn s tradičnými prvkami.', 'classic', '/photos/compressed/ATX_AG0120.jpg', '["Klasický dizajn", "Tradičné prvky", "Nadčasovosť"]', '["Azzurra", "Hansgrohe", "Kaldewei"]'),
('Moderný komfort', 'Pohodlné a praktické riešenia.', 'modern', '/photos/compressed/ATX_AG0129.jpg', '["Komfort", "Praktickosť", "Modernosť"]', '["CEA Design", "Agape", "Fantini"]');

-- Insert sample references
INSERT INTO public.references (title, description, year, location, client, images) VALUES
('Luxusná kúpeľňa v rodinnom dome', 'Kompletná rekonštrukcia kúpeľne s použitím prémiových materiálov a moderných technológií.', '2024', 'Bratislava', 'Súkromný klient', '["/photos/compressed/ATX_AG0065.jpg", "/photos/compressed/ATX_AG0088.jpg"]'),
('Moderná kúpeľňa v byte', 'Štýlové riešenie malého priestoru s dôrazom na funkčnosť a estetiku.', '2024', 'Košice', 'Súkromný klient', '["/photos/compressed/ATX_AG0102.jpg", "/photos/compressed/ATX_AG0114.jpg"]'),
('Wellness kúpeľňa', 'Priestranná kúpeľňa s wellness prvkami a relaxačnou zónou.', '2023', 'Žilina', 'Súkromný klient', '["/photos/compressed/ATX_AG0120.jpg", "/photos/compressed/ATX_AG0129.jpg"]'),
('Minimalistická kúpeľňa', 'Čisté línie a jednoduché riešenia pre moderný životný štýl.', '2023', 'Trenčín', 'Súkromný klient', '["/photos/compressed/ATX_AG0134.jpg", "/photos/compressed/ATX_AG0142.jpg"]');

-- =====================================================
-- VERIFY TABLES CREATED
-- =====================================================

-- Check if tables exist and show structure
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('inspirations', 'references')
ORDER BY table_name, ordinal_position;

-- Show row counts
SELECT 
    'inspirations' as table_name, 
    COUNT(*) as row_count 
FROM public.inspirations
UNION ALL
SELECT 
    'references' as table_name, 
    COUNT(*) as row_count 
FROM public.references;

-- =====================================================
-- NOTES
-- =====================================================

/*
IMPORTANT NOTES:

1. RLS POLICIES:
   - Tables have Row Level Security enabled
   - Public can read (SELECT) data
   - Only authenticated users can INSERT/UPDATE/DELETE
   - This prevents unauthorized modifications while allowing public access

2. DATA TYPES:
   - images: JSONB array for multiple base64 images or URLs
   - features: JSONB array for inspiration features
   - brands: JSONB array for brand names
   - TIMESTAMPTZ for proper timezone handling

3. INDEXES:
   - Performance indexes on commonly queried fields
   - created_at DESC for newest-first ordering

4. SAMPLE DATA:
   - Includes realistic Slovak content
   - Uses existing image paths from the project
   - Proper JSONB formatting for arrays

5. AFTER RUNNING THIS SCRIPT:
   - Your Inspirations page should load from database
   - Your References page should load from database
   - Admin panels should be able to create/edit/delete
   - No more "databáza nedostupná" errors

6. TO RUN:
   - Copy this entire script
   - Go to Supabase Dashboard > SQL Editor
   - Paste and run the script
   - Check for any errors in the output
*/
