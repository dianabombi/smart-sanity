-- Create partner_logos table for managing partner logos on Who We Are page
CREATE TABLE IF NOT EXISTS partner_logos (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE partner_logos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since this is admin-managed content)
CREATE POLICY "Allow all operations on partner_logos" ON partner_logos
    FOR ALL USING (true) WITH CHECK (true);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_partner_logos_order ON partner_logos("order");

-- Insert default partner logos
INSERT INTO partner_logos (name, logo, "order", active) VALUES
    ('Elite Bath + Kitchen', '/elite_logoRGB-11.jpg', 1, true),
    ('Bath', '/bath-logo.png', 2, true)
ON CONFLICT DO NOTHING;
