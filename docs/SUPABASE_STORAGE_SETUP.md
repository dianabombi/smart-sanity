# Supabase Storage Setup Guide

This guide will help you set up Supabase Storage for brand images and migrate existing base64 images from the database.

## Why This Matters

**Current Problem:**
- Images stored as base64 in database (5-50MB per image)
- Every `getBrands()` query downloads 100-500MB of data
- Causing €78/day in Supabase costs

**After Migration:**
- Images stored in Supabase Storage (separate from database)
- Database only stores small URLs (~100 bytes per image)
- **Expected cost reduction: 95-98%** (€78/day → €1-5/day)

---

## Step 1: Create Storage Bucket in Supabase

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `lckbwknxfmbjffjsmahs`

2. **Navigate to Storage**
   - Click "Storage" in the left sidebar
   - Click "Create a new bucket"

3. **Create the Bucket**
   - **Bucket name:** `brand-images`
   - **Public bucket:** ✅ YES (check this box)
   - **File size limit:** 10MB (recommended)
   - **Allowed MIME types:** Leave empty (allows all image types)
   - Click "Create bucket"

4. **Verify Bucket Settings**
   - Click on the `brand-images` bucket
   - Go to "Configuration" tab
   - Ensure "Public" is enabled
   - Public URL should be: `https://lckbwknxfmbjffjsmahs.supabase.co/storage/v1/object/public/brand-images/`

---

## Step 2: Set Up Storage Policies (Optional but Recommended)

For better security, you can set up RLS policies for the storage bucket:

1. **Go to Storage Policies**
   - In Storage, click on `brand-images` bucket
   - Click "Policies" tab

2. **Add Upload Policy (for authenticated users only)**
   ```sql
   CREATE POLICY "Allow authenticated uploads"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'brand-images');
   ```

3. **Add Public Read Policy**
   ```sql
   CREATE POLICY "Allow public reads"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'brand-images');
   ```

4. **Add Delete Policy (for authenticated users only)**
   ```sql
   CREATE POLICY "Allow authenticated deletes"
   ON storage.objects FOR DELETE
   TO authenticated
   USING (bucket_id = 'brand-images');
   ```

---

## Step 3: Migrate Existing Images

### Option A: Automatic Migration (Recommended)

We've created a migration script that will automatically move all base64 images to storage.

1. **Install dependencies** (if not already installed)
   ```bash
   cd /Users/diana/Desktop/SMART\ SANIT/CascadeProjects/windsurf-project
   npm install @supabase/supabase-js
   ```

2. **Run the migration script**
   ```bash
   node database/migrate_images_to_storage.js
   ```

3. **Monitor the output**
   - The script will show progress for each brand
   - It will upload images to storage
   - It will update database records with new URLs
   - At the end, you'll see a summary

4. **Verify migration**
   - Check Supabase Storage dashboard to see uploaded images
   - Visit your website and verify images load correctly
   - Check admin panel to ensure image management still works

### Option B: Manual Migration

If you prefer to migrate manually or the script fails:

1. **Download existing images from database**
   - Use Supabase SQL Editor to export image data
   - Save base64 strings to files

2. **Upload to Storage manually**
   - Use Supabase Dashboard > Storage > Upload
   - Or use the admin panel's new upload feature (already updated)

3. **Update database records**
   - Replace base64 URLs with storage URLs
   - Format: `https://lckbwknxfmbjffjsmahs.supabase.co/storage/v1/object/public/brand-images/{filename}`

---

## Step 4: Test the New System

1. **Test Image Upload**
   - Go to admin panel: `/admin/brands`
   - Select a brand
   - Upload a new image
   - Verify it appears in Supabase Storage
   - Verify it displays on the website

2. **Test Image Display**
   - Visit public brands page: `/brands`
   - Click "Zobraziť obrázky" on a brand with images
   - Verify images load correctly
   - Check browser console for any errors

3. **Test Image Deletion**
   - In admin panel, delete an image
   - Verify it's removed from both database and storage
   - Verify it no longer appears on website

---

## Step 5: Monitor Costs

After migration, monitor your Supabase usage:

1. **Check Database Size**
   - Go to Supabase Dashboard > Database
   - Check database size - should be much smaller
   - `brands` table should be <1MB instead of 100-500MB

2. **Check Storage Usage**
   - Go to Storage dashboard
   - `brand-images` bucket should show your images
   - Total storage should be reasonable (10-100MB)

3. **Check Billing**
   - Go to Settings > Billing
   - Monitor daily costs
   - Should drop from €78/day to €1-5/day within 24-48 hours

---

## Troubleshooting

### Images not loading after migration

**Problem:** Images show as broken on website

**Solution:**
1. Check browser console for 404 errors
2. Verify bucket is public: Storage > brand-images > Configuration
3. Check image URLs in database match storage URLs
4. Verify storage policies allow public reads

### Upload fails with "Bucket not found"

**Problem:** Admin panel upload fails

**Solution:**
1. Verify bucket name is exactly `brand-images`
2. Check bucket exists in Supabase Dashboard
3. Ensure bucket is public
4. Clear browser cache and try again

### Migration script fails

**Problem:** Script throws errors during migration

**Solution:**
1. Check Supabase credentials are correct
2. Verify bucket exists and is public
3. Check network connection
4. Review error messages for specific issues
5. Try migrating brands one at a time

### Costs still high after migration

**Problem:** Supabase costs haven't decreased

**Solution:**
1. Verify migration completed successfully
2. Check that database no longer contains base64 images
3. Run this SQL to check database size:
   ```sql
   SELECT 
     pg_size_pretty(pg_total_relation_size('brands')) as brands_table_size;
   ```
4. If still large, old base64 data may still be in database
5. Contact Supabase support if issue persists

---

## Expected Results

### Before Migration
- Database size: 100-500MB
- Query response time: 5-60 seconds
- Data transfer per query: 100-500MB
- Daily cost: €78

### After Migration
- Database size: <1MB
- Query response time: <1 second
- Data transfer per query: <100KB
- Daily cost: €1-5

---

## Additional Optimizations

After completing the migration, consider these additional optimizations:

1. **Enable CDN** (if available in your Supabase plan)
   - Faster image loading worldwide
   - Reduced bandwidth costs

2. **Image Optimization**
   - Compress images before upload (already implemented)
   - Use WebP format for better compression
   - Implement lazy loading on website

3. **Caching**
   - Already implemented: 5-minute cache for brands data
   - Consider longer cache times for images (1 hour+)

4. **Monitoring**
   - Set up alerts for high database usage
   - Monitor query performance regularly
   - Review costs weekly

---

## Need Help?

If you encounter any issues during setup or migration:

1. Check the error messages carefully
2. Review this guide step-by-step
3. Check Supabase documentation: https://supabase.com/docs/guides/storage
4. Contact Supabase support if needed

The migration is designed to be safe and reversible. Your original data remains in the database until you manually clean it up after verifying everything works correctly.
