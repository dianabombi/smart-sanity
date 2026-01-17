# Add Storage Policy to Allow Uploads

Since there's no "Disable RLS" button, we need to add a permissive policy instead.

## Steps to Add Policy

1. **Go to Supabase Dashboard:**
   - https://supabase.com/dashboard/project/lckbwknxfmbjffjsmahs/storage/buckets

2. **Click on `brand-images` bucket**

3. **Click "Policies" tab**

4. **Click "New Policy" button**

5. **Choose "For full customization"** (or "Create a policy from scratch")

6. **Fill in the policy details:**

   **Policy Name:**
   ```
   Allow all operations on brand-images
   ```

   **Allowed operation:** Check ALL boxes
   - ☑ SELECT (read)
   - ☑ INSERT (upload)
   - ☑ UPDATE (modify)
   - ☑ DELETE (remove)

   **Target roles:** Select both
   - ☑ `public`
   - ☑ `authenticated`

   **USING expression (for SELECT/UPDATE/DELETE):**
   ```sql
   bucket_id = 'brand-images'
   ```

   **WITH CHECK expression (for INSERT/UPDATE):**
   ```sql
   bucket_id = 'brand-images'
   ```

7. **Click "Save" or "Create Policy"**

8. **Verify the policy was created:**
   - You should see it listed in the Policies tab
   - Name: "Allow all operations on brand-images"

9. **Re-run the migration:**
   - Go to http://localhost:3003/admin/migrate-images
   - Click "Start Migration"
   - Should work now!

## Alternative: Simpler Policy

If the above is too complex, try this simpler approach:

**Policy Name:** `Allow public access`

**For operation:** `INSERT`

**Target roles:** `public`, `authenticated`

**Policy definition:** Just enter `true`

This will allow all uploads without restrictions.

## After Adding Policy

The migration should complete successfully and:
- Upload all 47+ images to Storage
- Update database records
- Reduce database size from 54MB to <1MB
- Drop costs to €1-5/day

The policy allows your admin panel (and the migration script) to upload files to the storage bucket.
