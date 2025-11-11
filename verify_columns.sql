-- Quick verification: Check if the new columns exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'background_settings'
AND column_name IN (
  'referencesPageBackgroundImage',
  'contactPageBackgroundImage', 
  'inspirationsPageBackgroundImage'
)
ORDER BY column_name;
