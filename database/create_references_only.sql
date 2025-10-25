-- SQL Script to create References table for Smart Sanit
-- Run this in your Supabase SQL Editor

-- =====================================================
-- CREATE REFERENCES TABLE ONLY
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
-- INSERT SAMPLE REFERENCES DATA
-- =====================================================

-- Insert sample references with Slovak content
INSERT INTO public.references (title, description, year, location, client, images) VALUES
('Luxusná kúpeľňa v rodinnom dome', 'Kompletná rekonštrukcia kúpeľne s použitím prémiových materiálov a moderných technológií. Projekt zahŕňal inštaláciu moderných sanitárnych zariadení, kvalitných obkladov a dlažieb.', '2024', 'Bratislava', 'Súkromný klient', '["/photos/compressed/ATX_AG0065.jpg", "/photos/compressed/ATX_AG0088.jpg"]'),

('Moderná kúpeľňa v byte', 'Štýlové riešenie malého priestoru s dôrazom na funkčnosť a estetiku. Optimalizácia priestoru pre maximálne využitie každého centimetra.', '2024', 'Košice', 'Súkromný klient', '["/photos/compressed/ATX_AG0102.jpg", "/photos/compressed/ATX_AG0114.jpg"]'),

('Wellness kúpeľňa s relaxačnou zónou', 'Priestranná kúpeľňa s wellness prvkami a relaxačnou zónou. Projekt zahŕňal inštaláciu vírivky, sauny a moderného osvetlenia.', '2023', 'Žilina', 'Súkromný klient', '["/photos/compressed/ATX_AG0120.jpg", "/photos/compressed/ATX_AG0129.jpg"]'),

('Minimalistická kúpeľňa', 'Čisté línie a jednoduché riešenia pre moderný životný štýl. Dôraz na kvalitné materiály a nadčasový dizajn.', '2023', 'Trenčín', 'Súkromný klient', '["/photos/compressed/ATX_AG0134.jpg", "/photos/compressed/ATX_AG0142.jpg"]'),

('Industriálna kúpeľňa v loft byte', 'Moderný industriálny štýl s kovovými prvkami a betónovými povrchmi. Unikátne riešenie pre mladú rodinu.', '2023', 'Nitra', 'Súkromný klient', '["/photos/compressed/ATX_AG0065.jpg"]'),

('Klasická kúpeľňa s mramorovými prvkami', 'Elegantné klasické riešenie s použitím prírodných materiálov. Nadčasový dizajn s dôrazom na detail.', '2022', 'Prešov', 'Súkromný klient', '["/photos/compressed/ATX_AG0088.jpg", "/photos/compressed/ATX_AG0102.jpg"]');

-- =====================================================
-- VERIFY TABLE CREATED
-- =====================================================

-- Check if table exists and show structure
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'references'
ORDER BY ordinal_position;

-- Show row count
SELECT 
    'references' as table_name, 
    COUNT(*) as row_count 
FROM public.references;

-- Show sample data
SELECT 
    id,
    title,
    year,
    location,
    client,
    created_at
FROM public.references
ORDER BY created_at DESC
LIMIT 5;

-- =====================================================
-- NOTES FOR REFERENCES TABLE
-- =====================================================

/*
REFERENCES TABLE STRUCTURE:

1. COLUMNS:
   - id: Auto-incrementing primary key
   - title: Project title (required)
   - description: Detailed project description
   - year: Project completion year (string format)
   - location: City or location of project
   - client: Client name or type
   - images: JSONB array of image URLs or base64 data
   - created_at: Automatic timestamp
   - updated_at: Automatic timestamp

2. SECURITY:
   - Row Level Security (RLS) enabled
   - Public can read all references
   - Only authenticated users can modify data
   - Prevents unauthorized changes

3. PERFORMANCE:
   - Indexes on year, location, and created_at
   - Optimized for common queries

4. SAMPLE DATA:
   - 6 realistic Slovak project references
   - Various locations across Slovakia
   - Different years and project types
   - Uses existing image paths

5. USAGE:
   - Admin can add/edit/delete references
   - Public page displays all references
   - Auto-refresh every 30 seconds
   - Fallback to EmergencyReferences if needed

6. AFTER RUNNING:
   - References page will load from database
   - No more "databáza nedostupná" errors
   - Admin panel fully functional
   - Emergency fallback system still available
*/
