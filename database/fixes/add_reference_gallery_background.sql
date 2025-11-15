-- Add referenceGalleryBackgroundImage column to background_settings table
-- This column stores the background image for individual reference gallery pages

-- Check if column exists, if not add it
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'background_settings' 
        AND column_name = 'referencegallerybackgroundimage'
    ) THEN
        ALTER TABLE background_settings 
        ADD COLUMN "referenceGalleryBackgroundImage" TEXT;
        
        RAISE NOTICE 'Column referenceGalleryBackgroundImage added successfully';
    ELSE
        RAISE NOTICE 'Column referenceGalleryBackgroundImage already exists';
    END IF;
END $$;

-- Verify the column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'background_settings'
AND column_name = 'referenceGalleryBackgroundImage';

-- Show current background_settings table structure
SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'background_settings'
ORDER BY ordinal_position;
