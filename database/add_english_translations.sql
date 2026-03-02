-- Add English translations to existing references
-- Run this in Supabase SQL Editor after adding the English columns

-- Update Apartmán Dlhé Diely
UPDATE "references" 
SET 
  title_en = 'Apartment Dlhé Diely',
  description_en = 'Delivery of tiles, flooring and sanitary ware to bathrooms and toilets in a private apartment.',
  location_en = 'Bratislava',
  client_en = 'Pavol Slivovsky'
WHERE title = 'Apartmán Dlhé Diely';

-- Update RD Palisády II.
UPDATE "references" 
SET 
  title_en = 'Family House Palisády II.',
  description_en = 'Complete delivery of premium bathroom fittings and accessories to a family house.',
  location_en = 'Bratislava',
  client_en = 'Studio E'
WHERE title = 'RD Palisády II.';

-- Update Ap. Tomášikova
UPDATE "references" 
SET 
  title_en = 'Apartment Tomášikova',
  description_en = 'Complete delivery of premium bathroom sanitary ware, fittings and accessories to a duplex apartment in Bratislava.',
  location_en = 'Bratislava',
  client_en = 'Studio E'
WHERE title = 'Ap. Tomášikova';

-- Update RD Palisády
UPDATE "references" 
SET 
  title_en = 'Family House Palisády',
  description_en = 'Complete delivery of premium bathroom sanitary ware, fittings and bathroom accessories to a luxury family house in Palisády.',
  location_en = 'Bratislava',
  client_en = 'Studio E'
WHERE title = 'RD Palisády';

-- Verify the translations were added
SELECT 
  id,
  title,
  title_en,
  description,
  description_en,
  year,
  location,
  location_en,
  client,
  client_en
FROM "references"
ORDER BY created_at DESC;
