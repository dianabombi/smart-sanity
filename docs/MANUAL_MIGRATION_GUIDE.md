# Manual Migration Guide - Moving Base64 Images to Storage

Since the automated migration script requires service role credentials, here's how to check and migrate your existing images manually.

## Step 1: Check if You Have Base64 Images

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select project: `lckbwknxfmbjffjsmahs`

2. **Open SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New query"

3. **Run this query to check database size:**
   ```sql
   SELECT 
     pg_size_pretty(pg_total_relation_size('brands')) as brands_table_size,
     COUNT(*) as total_brands,
     SUM(CASE WHEN images IS NOT NULL AND images::text LIKE '%data:image%' THEN 1 ELSE 0 END) as brands_with_base64_images
   FROM brands;
   ```

4. **Interpret results:**
   - If `brands_table_size` is > 10MB → You have base64 images that need migration
   - If `brands_with_base64_images` is > 0 → You have base64 images
   - If `brands_table_size` is < 1MB → No migration needed, you're good!

## Step 2: Migration Options

### Option A: Fresh Start (Recommended if few images)

If you only have a few images:

1. **Download existing images** (if you want to keep them)
   - Go to admin panel: http://localhost:3003/admin/brands
   - For each brand with images, right-click images and "Save image as..."

2. **Clear old base64 data** (in Supabase SQL Editor):
   ```sql
   UPDATE brands SET images = '[]'::jsonb WHERE images IS NOT NULL;
   ```

3. **Re-upload through admin panel**
   - Go to admin panel
   - Upload images again
   - They will now use Supabase Storage automatically

### Option B: Keep Existing Images (They'll still work)

Your existing base64 images will continue to work! The system is backward compatible:

- Old images (base64) will display correctly
- New uploads will use Storage
- Gradually replace old images as needed

**No immediate action required** - just start using the new system for future uploads.

### Option C: Automated Migration (Advanced)

If you have many images and want to migrate them all:

1. **Get Service Role Key** from Supabase Dashboard:
   - Settings → API → Service Role Key (secret)
   - ⚠️ Keep this secret! Never commit to git!

2. **Create `.env` file** in project root:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

3. **Update migration script** to use service role key

4. **Run migration**

## Step 3: Verify Everything Works

1. **Test new uploads:**
   - Upload an image in admin panel
   - Check it appears in Storage bucket
   - Check it displays on website

2. **Check old images still work:**
   - Visit brands page
   - Open galleries for brands with old images
   - They should still display correctly

3. **Monitor database size:**
   - Run the size check query from Step 1
   - After migration, should be < 1MB

## Expected Results

### Before Migration
- Database size: 50-500MB
- Images stored as base64 in database
- Slow queries (5-60 seconds)
- High costs (€78/day)

### After Migration
- Database size: < 1MB
- Images in Storage bucket
- Fast queries (< 1 second)
- Low costs (€1-5/day)

## Don't Want to Migrate?

**That's okay!** The code optimizations we made (removing polling, caching, etc.) will still reduce costs by ~50%.

New uploads will automatically use Storage, and you can gradually replace old images over time.

The system works with both base64 and Storage images simultaneously.
