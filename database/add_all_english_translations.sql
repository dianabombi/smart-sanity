-- Add English translations for all 12 references
-- Run this in Supabase SQL Editor

-- 1. Apartmán Dlhé Diely
UPDATE "references" 
SET 
  title_en = 'Apartment Dlhé Diely',
  description_en = 'Delivery of tiles, flooring and sanitary ware to bathrooms and toilets in a private apartment.',
  location_en = 'Bratislava',
  client_en = 'Pavol Slivovský'
WHERE id = 17;

-- 2. RD Palisády II.
UPDATE "references" 
SET 
  title_en = 'Family House Palisády II.',
  description_en = 'Complete delivery of premium bathroom fittings and accessories to a family house.',
  location_en = 'Bratislava',
  client_en = 'Studio E'
WHERE id = 16;

-- 3. Ap. Tomášikova
UPDATE "references" 
SET 
  title_en = 'Apartment Tomášikova',
  description_en = 'Complete delivery of premium bathroom sanitary ware, fittings and accessories to a duplex apartment in Bratislava.',
  location_en = 'Bratislava',
  client_en = 'Studio E'
WHERE id = 15;

-- 4. RD Palisády
UPDATE "references" 
SET 
  title_en = 'Family House Palisády',
  description_en = 'Complete delivery of premium bathroom sanitary ware, fittings and bathroom accessories to a luxury family house in Palisády.',
  location_en = 'Bratislava',
  client_en = 'Studio E'
WHERE id = 14;

-- 5. RD Záhorská Bystrica
UPDATE "references" 
SET 
  title_en = 'Family House Záhorská Bystrica',
  description_en = 'Complete delivery of premium bathroom sanitary ware, fittings and accessories to a family house in Záhorská Bystrica.',
  location_en = 'Bratislava',
  client_en = 'Identity Architecture'
WHERE id = 13;

-- 6. Apartmán Hausberg
UPDATE "references" 
SET 
  title_en = 'Apartment Hausberg',
  description_en = 'Complete delivery of premium bathroom sanitary ware, fittings and accessories to bathrooms and toilets in a private apartment.',
  location_en = 'Bratislava',
  client_en = 'Identity Architecture'
WHERE id = 12;

-- 7. Rodinný dom Rača
UPDATE "references" 
SET 
  title_en = 'Family House Rača',
  description_en = 'Complete delivery of premium bathroom sanitary ware and fittings to a family house in Rača.',
  location_en = 'Bratislava',
  client_en = 'Studio E'
WHERE id = 9;

-- 8. Bistro The Mill
UPDATE "references" 
SET 
  title_en = 'Bistro The Mill',
  description_en = 'Delivery of large-format flooring to a bistro establishment in Bratislava.',
  location_en = 'Bratislava',
  client_en = 'Pavol Slivovský'
WHERE id = 8;

-- 9. RD Fialkové údolie
UPDATE "references" 
SET 
  title_en = 'Family House Fialkové údolie',
  description_en = 'Complete delivery of tiles, flooring and premium bathroom sanitary ware to all bathrooms and toilets in the house.',
  location_en = 'Bratislava',
  client_en = 'Pavol Slivovský'
WHERE id = 7;

-- 10. RD Vinohrady
UPDATE "references" 
SET 
  title_en = 'Family House Vinohrady',
  description_en = 'Complete delivery of premium bathroom sanitary ware and fittings to a family house in Vinohrady.',
  location_en = 'Bratislava',
  client_en = 'Studio E'
WHERE id = 6;

-- 11. Apartmán Sky Park
UPDATE "references" 
SET 
  title_en = 'Apartment Sky Park',
  description_en = 'Complete design and implementation of bathroom and toilet in dark industrial style. Collaboration with Elite Bath+Kitchen.',
  location_en = 'Bratislava',
  client_en = 'Design 6 - D. Drinka'
WHERE id = 5;

-- 12. RD Banská Štiavnica
UPDATE "references" 
SET 
  title_en = 'Family House Banská Štiavnica',
  description_en = 'Complete delivery of premium sanitary ware, fittings and accessories to a family house in Banská Štiavnica.',
  location_en = 'Banská Štiavnica',
  client_en = 'Identity Architecture'
WHERE id = 1;

-- Verify all translations were added
SELECT 
  id,
  title,
  title_en,
  year,
  location,
  client
FROM "references"
ORDER BY created_at DESC;
