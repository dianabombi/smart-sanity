# Brands Database Setup Guide

## Issue
The brands are not showing data from the admin panel because the `brands` table doesn't exist in Supabase yet.

## Solution
You need to create the `brands` table in your Supabase database.

## Steps to Fix:

### 1. Access Supabase Dashboard
- Go to: https://supabase.com/dashboard
- Login to your account
- Select your project: `lckbwknxfmbjffjsmahs`

### 2. Create the Brands Table
- Go to **SQL Editor** in the left sidebar
- Click **New Query**
- Copy and paste the entire content from: `database/create_brands_table.sql`
- Click **Run** to execute the SQL script

### 3. Verify Table Creation
- Go to **Table Editor** in the left sidebar
- You should see a new table called `brands`
- It should contain 18 rows of brand data (9 main brands + 9 "other" brands)

### 4. Test the Website
- Refresh your website
- Go to the Brands page
- You should now see the brands from the database instead of fallback data
- Check browser console - you should see: "✅ Loaded brands from database: 18 brands"

## What This Fixes:
- ✅ Brands page will show database data instead of fallback data
- ✅ Admin panel brand uploads will persist and show on public page
- ✅ Brand descriptions and logos can be edited through admin panel
- ✅ Image uploads for brands will work properly

## Database Table Structure:
The `brands` table includes:
- Basic info: name, description, category, logo, website
- Display settings: order, is_main, is_active
- Images: JSONB array for uploaded brand images
- Timestamps: created_at, updated_at
- Proper indexes and RLS policies for security

## After Setup:
Once the table is created, your brands will load from the database and any changes made in the admin panel will immediately appear on the public website.
