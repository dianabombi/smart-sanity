# Reference Gallery Background Feature

## What Was Added

A new admin page has been created to manage background images specifically for individual reference gallery pages (the pages that display photos for each reference project).

## New Components

### 1. **AdminReferenceGallery.js**
- Located: `/client/src/components/admin/AdminReferenceGallery.js`
- Dedicated admin page for managing reference gallery backgrounds
- Allows uploading and configuring background images for gallery pages
- Includes preview, opacity, blur, size, and positioning controls

### 2. **Database Column**
- Column: `referenceGalleryBackgroundImage`
- Table: `background_settings`
- Type: TEXT (stores base64 image data)

### 3. **Menu Item**
- Added "Referencie - Galéria" to admin navigation
- Icon: 🖼️
- Route: `/admin/references-gallery`

## How It Works

### For Administrators:
1. Login to admin panel
2. Navigate to **"Referencie - Galéria"** in the sidebar
3. Upload a background image (max 5MB, JPG/PNG/WebP)
4. Adjust settings:
   - Image size (cover, contain, auto, 100%)
   - Position (horizontal and vertical)
   - Opacity (0-1)
   - Blur (0-10px)
5. Preview the background
6. Click **"💾 Uložiť pozadie"** to save

### For Visitors:
- When clicking "Galéria" button on any reference
- The page shows the reference title, description, metadata, and photos
- Background image (if configured) displays behind the content
- Clean, professional look with configurable opacity and blur

## Database Setup

Run this SQL script in your Supabase SQL Editor:

```sql
-- File: database/fixes/add_reference_gallery_background.sql
```

Or manually:

```sql
ALTER TABLE background_settings 
ADD COLUMN "referenceGalleryBackgroundImage" TEXT;
```

## Key Differences

| Feature | Referencie (Main Page) | Referencie - Galéria (Individual Pages) |
|---------|----------------------|------------------------------------------|
| Background Setting | `referencesPageBackgroundImage` | `referenceGalleryBackgroundImage` |
| Applies To | List of all references | Individual reference photo galleries |
| Route | `/references` | `/references/:referenceId` |
| Admin Page | Admin References | Admin Reference Gallery |

## Files Modified

1. **Created:**
   - `client/src/components/admin/AdminReferenceGallery.js` - New admin page
   - `database/fixes/add_reference_gallery_background.sql` - Database migration

2. **Updated:**
   - `client/src/components/Admin.js` - Added route
   - `client/src/components/admin/AdminLayout.js` - Added menu item
   - `client/src/components/ReferenceGallery.js` - Uses new background setting
   - `client/src/hooks/useBackgroundSettings.js` - Added new field to state

## Testing

1. **Run SQL script** to add the database column
2. **Restart the app** (if needed)
3. **Login to admin** panel
4. **Navigate** to "Referencie - Galéria"
5. **Upload** a test background image
6. **Save** the settings
7. **View** a reference gallery page (click "Galéria" on any reference with images)
8. **Verify** the background displays correctly

## Recommendations

- **Image Size:** 1920x1080px recommended
- **Format:** JPG or WebP for best performance
- **Style:** Use subtle, low-contrast images
- **Opacity:** 0.3 works well for readability
- **File Size:** Keep under 2MB for fast loading

## Troubleshooting

**Background not showing?**
- Ensure SQL script was run successfully
- Check that image was saved in admin panel
- Verify opacity is not set to 0
- Clear browser cache

**Column already exists error?**
- The SQL script has a check to prevent duplicate columns
- You can safely re-run it

**Images too large?**
- Compress images before uploading
- Max size: 5MB
- Consider using WebP format for better compression
