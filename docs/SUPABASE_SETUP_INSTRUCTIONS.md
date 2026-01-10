# 🚀 SUPABASE DATABASE SETUP FOR SMART SANIT

## STEP 1: Create Brands Table in Supabase

1. **Go to your Supabase Dashboard**
   - Open https://supabase.com/dashboard
   - Select your Smart Sanit project

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and Execute the SQL**
   - Copy the ENTIRE content from `database/create_brands_table.sql`
   - Paste it into the SQL editor
   - Click "Run" to execute

4. **Verify Table Creation**
   - Go to "Table Editor" in sidebar
   - You should see "brands" table with 18 rows of data

## STEP 2: Test Database Connection

1. **Check API Connection**
   - The app should automatically connect to your Supabase
   - Check browser console for connection messages

2. **Verify Data Loading**
   - Go to your website brands page
   - Should load 18 brands from database (not localStorage)

## STEP 3: Test Logo Upload

1. **Go to Admin Panel**
   - Navigate to `/admin/brands`
   - Select any brand
   - Upload a logo
   - Should save to Supabase database

2. **Verify on Public Page**
   - Go to public brands page
   - Uploaded logo should appear immediately

## TROUBLESHOOTING

### If you see "Supabase error" in console:
1. Check your Supabase URL and API key in environment variables
2. Verify the brands table exists in your database
3. Check RLS policies are set correctly

### If brands don't load:
1. Check browser console for error messages
2. Verify Supabase connection in Network tab
3. Make sure the brands table has data

### If logo upload fails:
1. Check file size (max 5MB)
2. Verify file type (JPG, PNG, SVG, WebP)
3. Check console for upload errors

## CURRENT SUPABASE CONFIG

Your app is configured to connect to:
- **URL**: https://lckbwknxfmbjffjsmahs.supabase.co
- **API Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

The brands table will store:
- ✅ All 18 brand records
- ✅ Logo uploads as data URLs
- ✅ Brand images and descriptions
- ✅ Category and ordering information

After running the SQL script, your app will use the Supabase database instead of localStorage!
