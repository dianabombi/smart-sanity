-- Add English translations for all 23 brands
-- Run this in Supabase SQL Editor after adding the English columns

-- 1. Huppe
UPDATE "brands" 
SET 
  name_en = 'Huppe',
  description_en = 'Variability in a thousand ways – premium German manufacturer of shower enclosures, including custom-made enclosures.',
  category_en = 'Shower enclosures'
WHERE id = 23;

-- 2. Hansgrohe
UPDATE "brands" 
SET 
  name_en = 'Hansgrohe',
  description_en = 'Long-standing tradition, quality and reliability at a reasonable price from a German manufacturer of bathroom and kitchen faucets, bathroom accessories and shower drains.',
  category_en = 'Faucets, showers, accessories'
WHERE id = 22;

-- 3. Keuco
UPDATE "brands" 
SET 
  name_en = 'Keuco',
  description_en = 'Wide range of practical bathroom furniture, mirrors, faucets and bathroom accessories from a premium German manufacturer.',
  category_en = 'Furniture, mirrors, accessories'
WHERE id = 21;

-- 4. Kludi
UPDATE "brands" 
SET 
  name_en = 'Kludi',
  description_en = 'Established German manufacturer of bathroom and kitchen faucets.',
  category_en = 'Faucets'
WHERE id = 20;

-- 5. Alca
UPDATE "brands" 
SET 
  name_en = 'Alca',
  description_en = 'A new level of quality, innovation and design sense from a Czech producer of bathroom drainage technology and concealed WC systems.',
  category_en = 'Drainage systems, concealed WC systems'
WHERE id = 18;

-- 6. Tres
UPDATE "brands" 
SET 
  name_en = 'Tres',
  description_en = 'Quality design at a reasonable price from a Spanish manufacturer of bathroom and kitchen faucets.',
  category_en = 'Faucets'
WHERE id = 17;

-- 7. Laufen
UPDATE "brands" 
SET 
  name_en = 'Laufen',
  description_en = 'Long-standing tradition, reliability and elegance at a fair price from a Swiss manufacturer of sanitary ceramics, furniture and accessories.',
  category_en = 'Sanitary ceramics, furniture, accessories'
WHERE id = 16;

-- 8. Dornbracht
UPDATE "brands" 
SET 
  name_en = 'Dornbracht',
  description_en = 'The highest quality and luxury materials come together in the products of this German manufacturer of kitchen faucets, sinks, bathroom faucets, washbasins, accessories and wellness systems.',
  category_en = 'Faucets, washbasins, wellness systems'
WHERE id = 15;

-- 9. Axor
UPDATE "brands" 
SET 
  name_en = 'Axor',
  description_en = 'Premium brand of designer bathroom and kitchen faucets, bathroom equipment and accessories from an established German manufacturer.',
  category_en = 'Faucets, bathroom equipment, accessories'
WHERE id = 14;

-- 10. Fiandre
UPDATE "brands" 
SET 
  name_en = 'Fiandre',
  description_en = 'Surfaces that shape uniqueness - premium Italian manufacturer of porcelain stoneware tiles and flooring.',
  category_en = 'Tiles, flooring'
WHERE id = 13;

-- 11. Kaldewei
UPDATE "brands" 
SET 
  name_en = 'Kaldewei',
  description_en = 'A new level of quality, innovation and design sense from a Czech producer of bathroom drainage technology and concealed WC systems.',
  category_en = 'Bathtubs, shower trays'
WHERE id = 12;

-- 12. Azzurra
UPDATE "brands" 
SET 
  name_en = 'Azzurra',
  description_en = 'Advanced manufacturing technologies and a wide range of designs to bring your sanitary ceramics visions to life - Made in Italy.',
  category_en = 'Sanitary ceramics'
WHERE id = 11;

-- 13. Zenon
UPDATE "brands" 
SET 
  name_en = 'Zenon',
  description_en = 'Experience with us the passion for innovation and originality from a Spanish manufacturer of washbasins, bathtubs and shower trays.',
  category_en = 'Washbasins, bathtubs, shower trays'
WHERE id = 6;

-- 14. Cea
UPDATE "brands" 
SET 
  name_en = 'Cea',
  description_en = 'Feel the luxury – stainless steel as the main material of this Italian manufacturer of premium bathroom sanitary ware, faucets and accessories.',
  category_en = 'Faucets, showers, accessories'
WHERE id = 5;

-- 15. Cielo
UPDATE "brands" 
SET 
  name_en = 'Cielo',
  description_en = 'Touch paradise – handcrafted premium sanitary ceramics and bathroom furniture from top Italian designers.',
  category_en = 'Sanitary ceramics, furniture'
WHERE id = 4;

-- 16. Fantini
UPDATE "brands" 
SET 
  name_en = 'Fantini',
  description_en = 'Symbiosis of top design and first-class quality from a leading Italian faucet manufacturer.',
  category_en = 'Faucets'
WHERE id = 3;

-- 17. Antrax IT
UPDATE "brands" 
SET 
  name_en = 'Antrax IT',
  description_en = 'Come play – top design, originality and uniqueness perfectly characterize this manufacturer of bathroom and residential radiators from Italy.',
  category_en = 'Radiators'
WHERE id = 2;

-- 18. Agape
UPDATE "brands" 
SET 
  name_en = 'Agape',
  description_en = 'A world full of originality and material diversity from the best world designers.',
  category_en = 'Sanitary ceramics, furniture, accessories'
WHERE id = 1;

-- Verify the translations were added
SELECT 
  id,
  name,
  name_en,
  description,
  description_en,
  created_at
FROM "brands"
ORDER BY created_at DESC;
