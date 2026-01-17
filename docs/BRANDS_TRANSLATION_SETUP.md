# Brands Translation Setup Guide

This guide explains how to enable full translation support for brand content (categories and descriptions).

## Overview

The brands system now supports language-specific content for:
- Brand categories (e.g., "Kúpeľňový nábytok" / "Bathroom Furniture")
- Brand descriptions

## Step 1: Run Database Migration

Run the SQL migration to add language-specific columns to the brands table:

```sql
-- In Supabase SQL Editor, run:
-- File: database/add_brands_language_columns.sql
```

This will:
1. Add `category_sk`, `category_en`, `description_sk`, `description_en` columns
2. Migrate existing Slovak data to the `_sk` columns
3. Create indexes for performance

## Step 2: Add English Translations

After running the migration, you need to add English translations for each brand:

### Option A: Via Supabase Dashboard

1. Go to Supabase Dashboard → Table Editor → brands
2. For each brand, fill in:
   - `category_en`: English category name
   - `description_en`: English description

### Option B: Via SQL

```sql
-- Example: Update Agape brand with English content
UPDATE public.brands 
SET 
  category_en = 'Bathroom Furniture',
  description_en = 'Agape – a world full of originality and material diversity from the best world designers - premium Italian supplier of bathroom faucets, sanitary ware, furniture and accessories'
WHERE name = 'Agape';

-- Repeat for each brand...
```

## Step 3: Verify Translation

1. Switch to English on the website
2. Visit the Brands page
3. Verify that brand categories and descriptions appear in English

## How It Works

### Frontend
- `Brands.js` component detects current language via `i18n.language`
- Passes language parameter to `ApiService.getBrandsLight(language)`
- Automatically reloads brands when language changes

### API
- `getBrandsLight(language)` method in `api.js`
- Selects appropriate language columns based on parameter
- Falls back to old columns if language-specific ones are empty

### Caching
- Brands are cached for 5 minutes
- Cache is invalidated when language changes
- Each language version is cached separately

## Admin Panel Updates (Future)

To make it easier to manage translations, the admin panel should be updated to:
1. Show language tabs (SK / EN)
2. Allow editing both versions side-by-side
3. Validate that both languages are filled in

## Fallback Behavior

If English translation is not available:
- System falls back to Slovak content
- No errors are shown
- Ensures graceful degradation

## Example Translations

### Categories
- SK: "Kúpeľňový nábytok" → EN: "Bathroom Furniture"
- SK: "Batérie a sprchy" → EN: "Faucets and Showers"
- SK: "Sanitárna keramika" → EN: "Sanitary Ceramics"

### Descriptions
Keep the brand essence while translating professionally. Include:
- Brand origin (Italian, German, etc.)
- Product categories
- Key differentiators (premium, design-focused, etc.)

## Testing Checklist

- [ ] Run database migration
- [ ] Add English translations for all brands
- [ ] Test language switching on Brands page
- [ ] Verify cache invalidation works
- [ ] Check that fallback to Slovak works if English is missing
- [ ] Test on mobile and desktop

## Notes

- Brand names are not translated (they remain as-is)
- Logo images are language-neutral
- The same migration pattern can be applied to references if needed
