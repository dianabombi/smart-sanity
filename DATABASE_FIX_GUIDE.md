# Fix Guide: Make Admin Editable Text Work

## Problem
When you edit text in the admin panel (page titles, company name), the changes save successfully but don't appear on the website.

## Root Cause
The `page_content` table doesn't exist in your Supabase database.

## Solution

### Step 1: Access Supabase SQL Editor
1. Go to https://supabase.com/dashboard
2. Select your project: **lckbwknxfmbjffjsmahs**
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Run the SQL Script
Copy and paste the entire contents of this file:
```
database/setup/create_page_content_with_admin_headers.sql
```

Then click **Run** or press `Ctrl+Enter` (Windows) / `Cmd+Return` (Mac)

### Step 3: Verify Success
At the bottom of the SQL Editor, you should see:
- ✅ Success message
- A table showing all the inserted content with columns: page, section, key, content

### Step 4: Test the Changes
1. Go back to your admin panel
2. Edit the company name or page title
3. Click Save
4. Refresh your website homepage
5. Scroll to the footer - you should now see your updated company name!

## What This Creates

The SQL script creates a `page_content` table that stores:
- **Page descriptions** (for Inspirations, References, Brands, etc.)
- **Admin page headers** (titles and subtitles)
- **Company name** (displayed in footer)
- **Partnership text** (O nás page)

## Troubleshooting

### If you see an error about the table already existing:
The script includes `DROP TABLE IF EXISTS` to handle this, but if you get an error:
1. Go to **Table Editor** in Supabase
2. Find `page_content` table
3. Delete it
4. Run the SQL script again

### If changes still don't appear after running SQL:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for messages like:
   - `✅ Loaded page content for global.company.name`
   - `🔄 Loading page content: ...`
4. If you see errors, copy them and let me know

### Clear browser cache:
Sometimes the browser caches old data:
- Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac) to hard refresh
- Or clear your browser cache completely

## Expected Result

After running the SQL script:
- ✅ Admin page title editing works
- ✅ Admin page subtitle editing works  
- ✅ Company name editing works
- ✅ Changes appear immediately on the website
- ✅ Footer displays the editable company name
- ✅ All other page content editing continues to work

## Files Involved
- `/database/setup/create_page_content_with_admin_headers.sql` - SQL to create table
- `/client/src/services/api.js` - API methods (getPageContent, updatePageContent)
- `/client/src/components/admin/AdminWhoWeAre.js` - Admin editing interface
- `/client/src/components/layout/Footer.js` - Footer that displays company name
