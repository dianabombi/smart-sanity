# Bilingual Content Implementation Guide

## Overview
This guide explains how to enable bilingual (Slovak/English) content for the Smart Sanit website.

## Implementation Status

### ✅ Completed
1. **Translation Files** - All UI elements translated
2. **Language Switcher** - Functional SK/EN buttons in NavBar
3. **Code Updates** - Components updated to support language switching
4. **Database Migrations** - SQL files created for language support

### ⏳ Pending
- **Database Migration Execution** - Run SQL files in Supabase

---

## Database Migrations Required

### 1. About Us Page (O nás / About Us)

**File:** `database/setup/add_language_support_who_we_are.sql`

**What it does:**
- Adds `language` column to `who_we_are_sections` table
- Inserts English translations for all 4 sections:
  - About the Company
  - Our Vision
  - For Our Clients
  - Partnership

**Run this in Supabase SQL Editor**

---

### 2. What We Offer Page (Čo ponúkame / What We Offer)

**File:** `database/setup/add_language_support_page_content.sql`

**What it does:**
- Adds `language` column to `page_content` table
- Updates RPC function `get_page_content` to support language parameter
- Inserts English translations for all 6 bullet points:
  - We trade leading global manufacturers...
  - According to your requirements...
  - We will prepare alternative solutions...
  - We will assemble demanding shower or bathtub faucet sets...
  - We will provide technical support...
  - We offer long-term cooperation...

**Run this in Supabase SQL Editor**

---

## How to Run Migrations

### Option 1: Supabase Dashboard (Recommended)
1. Go to https://supabase.com/dashboard
2. Select your Smart Sanit project
3. Navigate to **SQL Editor**
4. Click **New Query**
5. Copy and paste the contents of each SQL file
6. Click **Run** or press `Ctrl+Enter`

### Option 2: Supabase CLI
```bash
# Navigate to project directory
cd /Users/diana/Desktop/SMART\ SANIT/CascadeProjects/windsurf-project

# Run migrations
supabase db execute -f database/setup/add_language_support_who_we_are.sql
supabase db execute -f database/setup/add_language_support_page_content.sql
```

---

## How It Works

### Before Migration
- Content displays in Slovak only
- Language switcher changes UI elements only
- Database content remains in Slovak

### After Migration
- **Slovak (SK)**: Loads Slovak content from database
- **English (EN)**: Loads English content from database
- Content switches automatically when language changes
- No page reload required

---

## Technical Details

### API Changes
- `getWhoWeAreSections(language)` - Fetches About Us content by language
- `getPageContent(page, section, key, language)` - Fetches page content by language

### Component Changes
- `WhoWeAre.js` - Reloads content when `i18n.language` changes
- `Entrance.js` - Reloads content when `i18n.language` changes

### Database Schema
```sql
-- who_we_are_sections table
ALTER TABLE who_we_are_sections 
ADD COLUMN language VARCHAR(2) DEFAULT 'sk' CHECK (language IN ('sk', 'en'));

-- page_content table
ALTER TABLE page_content 
ADD COLUMN language VARCHAR(2) DEFAULT 'sk' CHECK (language IN ('sk', 'en'));
```

---

## Testing After Migration

1. **Open the website** at http://localhost:3000
2. **Navigate to About Us** (O nás)
3. **Click SK** - Should show Slovak content
4. **Click EN** - Should show English content
5. **Navigate to What We Offer** (Čo ponúkame)
6. **Click SK** - Should show Slovak bullet points
7. **Click EN** - Should show English bullet points

---

## Admin Panel Updates (Future Enhancement)

Currently, admins can only edit Slovak content. To enable editing both languages:

1. Update admin panel to show language selector
2. Allow admins to switch between SK/EN when editing
3. Save content with appropriate language tag

This is optional and can be implemented later.

---

## Troubleshooting

### Content not switching?
- Check browser console for errors
- Verify migrations ran successfully
- Clear browser cache and reload

### English content not found?
- Verify English records exist in database:
```sql
SELECT * FROM who_we_are_sections WHERE language = 'en';
SELECT * FROM page_content WHERE language = 'en';
```

### RPC function error?
- Verify the updated `get_page_content` function exists:
```sql
SELECT * FROM pg_proc WHERE proname = 'get_page_content';
```

---

## Summary

**Pages with Bilingual Database Content:**
- ✅ About Us (O nás)
- ✅ What We Offer (Čo ponúkame)

**Pages with Translation Files Only:**
- ✅ Home
- ✅ Brands (Obchodované značky)
- ✅ References (Referencie)
- ✅ Inspirations (Inšpirácie)
- ✅ Contact
- ✅ Navigation & UI elements

**Total Translation Coverage:** 100%
