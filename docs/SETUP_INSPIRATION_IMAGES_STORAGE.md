# Setup Inspiration Images Storage

This guide will help you set up Supabase Storage for inspiration images, which removes the 9-item limitation caused by base64 encoding.

## Why This Update?

**Before:** Images were stored as base64 text in the database
- ❌ Large payload sizes (base64 is ~33% larger)
- ❌ Database row size limits (~8MB)
- ❌ Limited to ~9 inspirations before hitting limits
- ❌ Slower page loads

**After:** Images are stored in Supabase Storage buckets
- ✅ No practical limit on number of inspirations
- ✅ Smaller database entries (only URLs)
- ✅ Faster page loads
- ✅ Better image management

## Setup Instructions

### Option 1: Using Supabase Dashboard (Easiest)

1. **Go to Supabase Dashboard**
   - Open your Supabase project: https://supabase.com/dashboard
   - Navigate to **Storage** section in left sidebar

2. **Create New Bucket**
   - Click "New bucket" button
   - Bucket name: `inspiration-images`
   - **Make it PUBLIC** (check the "Public bucket" checkbox)
   - Click "Create bucket"

3. **Configure Policies**
   - Click on the `inspiration-images` bucket
   - Go to "Policies" tab
   - Click "New Policy"
   - Select "For full customization" template
   - Add these policies:

   **Policy 1: Public Read**
   - Policy name: `Public Access`
   - Allowed operation: `SELECT`
   - Policy definition: `true`

   **Policy 2: Authenticated Upload**
   - Policy name: `Authenticated Upload`
   - Allowed operation: `INSERT`
   - Policy definition: `(bucket_id = 'inspiration-images')`

   **Policy 3: Authenticated Delete**
   - Policy name: `Authenticated Delete`
   - Allowed operation: `DELETE`
   - Policy definition: `(bucket_id = 'inspiration-images')`

### Option 2: Using SQL (Advanced)

1. **Go to Supabase Dashboard**
   - Navigate to **SQL Editor** section

2. **Run the Setup Script**
   - Copy the contents of `database/setup/create_inspiration_images_bucket.sql`
   - Paste into SQL Editor
   - Click "Run"

## How It Works

### Automatic Fallback System

The system is designed to work gracefully whether or not you set up the storage bucket:

1. **If storage bucket exists:**
   - ✅ Images upload to Supabase Storage
   - ✅ Only URL is stored in database
   - ✅ Unlimited inspirations

2. **If storage bucket doesn't exist:**
   - ⚠️ Automatically falls back to base64
   - ⚠️ Still works but limited to ~9 inspirations
   - ⚠️ Console shows fallback message

### Testing the Setup

1. **Go to Admin Panel**
   - Navigate to `/admin/inspirations`

2. **Upload a Test Image**
   - Add new inspiration
   - Upload an image
   - Check browser console:
     - `☁️ Image uploaded to Supabase Storage` = Storage working ✅
     - `📦 Image stored as base64` = Fallback mode ⚠️

3. **Verify in Supabase**
   - Go to Storage > inspiration-images
   - You should see uploaded images in `inspirations/` folder

## Troubleshooting

### Images Still Using Base64

**Check console for:**
- `⚠️ Storage bucket not found, falling back to base64`
- `⚠️ Supabase not available, falling back to base64`

**Solutions:**
1. Verify bucket name is exactly `inspiration-images`
2. Ensure bucket is set to PUBLIC
3. Check that policies are configured
4. Verify Supabase credentials in `.env`

### Upload Errors

**Error: "Bucket does not exist"**
- Solution: Create the bucket using instructions above

**Error: "new row violates row-level security policy"**
- Solution: Add the storage policies as shown above

**Error: "Authentication required"**
- Solution: Make sure you're logged into admin panel

## Migration Notes

### Existing Base64 Images

- Old inspirations with base64 images will continue to work
- New uploads will use Storage (if configured)
- You can manually re-upload old images to migrate them to Storage

### Database Size

After migrating to Storage:
- Database will be much smaller
- Faster queries
- Better performance overall

## Support

If you encounter issues:
1. Check browser console for error messages
2. Verify Supabase Dashboard > Storage shows the bucket
3. Ensure all policies are configured
4. The system will always fall back to base64 if Storage fails
