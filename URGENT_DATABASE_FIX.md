# 🚨 URGENT DATABASE FIX - BRANDS TABLE

## CRITICAL ISSUE
The brands table doesn't exist in Supabase, causing logo uploads to not appear on the public page.

## IMMEDIATE FIX (2 minutes)

### Step 1: Go to Supabase Dashboard
1. Open: https://supabase.com/dashboard
2. Login to your account
3. Select project: `lckbwknxfmbjffjsmahs`

### Step 2: Create Table Manually
1. Go to **Table Editor** (left sidebar)
2. Click **"New Table"**
3. Table name: `brands`
4. Click **"Save"**

### Step 3: Add Columns
Click **"Add Column"** for each:

1. **id** (already exists as primary key)
2. **name** - Type: `text`, Required: ✓, Unique: ✓
3. **description** - Type: `text`
4. **category** - Type: `text`
5. **logo** - Type: `text`
6. **website** - Type: `text`
7. **order** - Type: `int4`, Default: `0`
8. **images** - Type: `jsonb`, Default: `[]`
9. **is_main** - Type: `bool`, Default: `true`
10. **is_active** - Type: `bool`, Default: `true`
11. **created_at** - Type: `timestamptz`, Default: `now()`
12. **updated_at** - Type: `timestamptz`, Default: `now()`

### Step 4: Set RLS Policies
1. Go to **Authentication** → **Policies**
2. Find `brands` table
3. Click **"New Policy"**
4. Policy name: `Allow all access`
5. Allowed operation: `All`
6. Target roles: `public, authenticated`
7. Policy definition: `true`
8. Click **"Save"**

### Step 5: Test
1. Refresh your website
2. Go to Brands page
3. Check console - should see: "✅ CRITICAL: Loaded brands from database"
4. Upload logo in admin - should appear on public page

## Alternative: Run SQL Script
If manual steps don't work, go to **SQL Editor** and run:

```sql
-- Copy the ENTIRE content from database/create_brands_table.sql
-- Paste it here and click "Run"
```

## Expected Result
- Console shows: "✅ CRITICAL: Loaded brands from database: 18 brands"
- Logo uploads in admin appear immediately on public page
- No more "Supabase error, using fallback" messages

## If Still Not Working
The console will show the exact error. Most likely:
- Table permissions issue
- RLS policy blocking access
- Column type mismatch

**This should fix the critical brands issue in 2-3 minutes!**
