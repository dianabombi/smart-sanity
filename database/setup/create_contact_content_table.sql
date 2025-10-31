-- Create contact_content table for Smart Sanit
-- Run this in Supabase SQL Editor to enable contact content editing

CREATE TABLE IF NOT EXISTS public.contact_content (
    id BIGINT PRIMARY KEY DEFAULT 1,
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_content ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed for security)
CREATE POLICY "Allow all operations on contact_content" ON public.contact_content
    FOR ALL USING (true) WITH CHECK (true);

-- Insert default contact content
INSERT INTO public.contact_content (id, content) VALUES (
    1,
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
            "address": "Továrenská 14\\n811 09 Bratislava"
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

-- Add comment
COMMENT ON TABLE public.contact_content IS 'Table storing contact page content for Smart Sanit website';
