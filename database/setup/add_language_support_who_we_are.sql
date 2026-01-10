-- Add language support to who_we_are_sections table
-- This allows storing both Slovak and English versions of content

-- Add language column
ALTER TABLE public.who_we_are_sections 
ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'sk' CHECK (language IN ('sk', 'en'));

-- Create index for language queries
CREATE INDEX IF NOT EXISTS idx_who_we_are_sections_language ON public.who_we_are_sections(language);

-- Update existing records to be Slovak
UPDATE public.who_we_are_sections SET language = 'sk' WHERE language IS NULL;

-- Insert English translations for existing content
-- Note: These are translations of the default Slovak content
INSERT INTO public.who_we_are_sections (title, content, size, "order", language) VALUES
('About the Company', 'Smart Sanit s.r.o. was established in 2024 as a trading company whose main focus is offering design products in the field of tiles, flooring and complete bathroom equipment.', 'large', 1, 'en'),
('Our Vision', 'As design enthusiasts, we follow the latest trends in the field. With us, you will touch beauty and feel the emotion of design on your own skin.', 'large', 2, 'en'),
('For Our Clients', 'We offer our clients modern, functional and tailor-made solutions that bring their future users an everyday feeling of comfort, convenience and reliability.', 'large', 3, 'en'),
('Partnership', 'We partner with EB+K studio.', 'small', 4, 'en')
ON CONFLICT DO NOTHING;

-- Create a unique constraint to prevent duplicate language entries for the same order
CREATE UNIQUE INDEX IF NOT EXISTS idx_who_we_are_sections_order_language 
ON public.who_we_are_sections("order", language);

-- Grant permissions
GRANT ALL ON public.who_we_are_sections TO authenticated;
GRANT ALL ON public.who_we_are_sections TO anon;
