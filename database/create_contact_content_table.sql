-- Create contact_content table for Smart Sanit contact page management
-- Supports multiple languages (SK, EN)
CREATE TABLE IF NOT EXISTS public.contact_content (
    id BIGSERIAL PRIMARY KEY,
    language VARCHAR(5) NOT NULL DEFAULT 'sk',
    content JSONB NOT NULL,
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
DROP TRIGGER IF EXISTS update_contact_content_updated_at ON public.contact_content;
CREATE TRIGGER update_contact_content_updated_at
    BEFORE UPDATE ON public.contact_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_content ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (needed for public page access)
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON public.contact_content;
DROP POLICY IF EXISTS "Allow all operations" ON public.contact_content;
CREATE POLICY "Allow all operations" ON public.contact_content FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_content_updated_at ON public.contact_content(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_content_language ON public.contact_content(language);

-- Insert default Slovak contact content
INSERT INTO public.contact_content (id, language, content) VALUES (
    1,
    'sk',
    '{
        "title": "Kontakt",
        "subtitle": "Máte otázky alebo potrebujete poradenstvo? Kontaktujte nás a radi vám pomôžeme s výberom správnych riešení pre vašu kúpeľňu.",
        "formTitle": "Napíšte nám",
        "contactInfoTitle": "Kontaktné údaje",
        "servicesTitle": "Naše služby",
        "contactDetails": {
            "manager": "Ing. Dušan Drinka, PhD.",
            "phone": "+421 948 882 376",
            "email": "dusan.drinka@smartsanit.sk",
            "address": "Továrenská 14\n811 09 Bratislava"
        },
        "services": [
            "Poradenstvo a návrh kúpeľní",
            "Dodávka sanitárnych zariadení",
            "Inštalácia a montáž",
            "Servis a údržba",
            "Technická podpora"
        ]
    }'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Insert default English contact content
INSERT INTO public.contact_content (id, language, content) VALUES (
    2,
    'en',
    '{
        "title": "Contact",
        "subtitle": "Have questions or need advice? Contact us and we will be happy to help you choose the right solutions for your bathroom.",
        "formTitle": "Write to Us",
        "contactInfoTitle": "Contact Information",
        "servicesTitle": "Our Services",
        "contactDetails": {
            "manager": "Ing. Dušan Drinka, PhD.",
            "phone": "+421 948 882 376",
            "email": "dusan.drinka@smartsanit.sk",
            "address": "Továrenská 14\n811 09 Bratislava"
        },
        "services": [
            "Bathroom design and consulting",
            "Sanitary equipment supply",
            "Installation and assembly",
            "Service and maintenance",
            "Technical support"
        ]
    }'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON public.contact_content TO authenticated;
GRANT ALL ON public.contact_content TO anon;
GRANT USAGE, SELECT ON SEQUENCE contact_content_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE contact_content_id_seq TO anon;
