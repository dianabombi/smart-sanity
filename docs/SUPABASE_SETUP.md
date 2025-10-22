# Supabase Storage Setup for Smart Sanit

## 1. Create Storage Bucket
1. Go to https://supabase.com/dashboard/project/lckbwknxfmbjffjsmahs
2. Navigate to **Storage** in the left sidebar
3. Click **New Bucket**
4. Name: `brand-images`
5. Set as **Public bucket** ✅
6. Click **Create bucket**

## 2. Set Up Storage Policies
Go to **Storage** → **Policies** and create these policies:

### Policy 1: Public Read Access
```sql
CREATE POLICY "Public read access for brand images" ON storage.objects
FOR SELECT USING (bucket_id = 'brand-images');
```

### Policy 2: Authenticated Upload Access
```sql
CREATE POLICY "Authenticated users can upload brand images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'brand-images' AND auth.role() = 'authenticated');
```

### Policy 3: Authenticated Delete Access
```sql
CREATE POLICY "Authenticated users can delete brand images" ON storage.objects
FOR DELETE USING (bucket_id = 'brand-images' AND auth.role() = 'authenticated');
```

## 3. Database Tables
Create these tables in **SQL Editor**:

### Brands Table
```sql
CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(255),
  logo TEXT,
  logo_filter VARCHAR(255) DEFAULT 'none',
  logo_size VARCHAR(255) DEFAULT 'max-h-16',
  is_main BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Brand Images Table (separate table for better performance)
```sql
CREATE TABLE brand_images (
  id SERIAL PRIMARY KEY,
  brand_id INTEGER REFERENCES brands(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255),
  url TEXT NOT NULL,
  size INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 4. Environment Variables
Add to your deployment platform:
```
REACT_APP_SUPABASE_URL=https://lckbwknxfmbjffjsmahs.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxja2J3a254Zm1iamZmanNtYWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2ODU5OTEsImV4cCI6MjA3NTI2MTk5MX0.NxHuviT07Wv2WfIHfHEHiLcMQiWWImK7VREF2pgZjJk
```

## 5. Test Storage
After setup, test by:
1. Going to admin panel
2. Uploading a small image
3. Check if it appears on public page
4. Check Storage bucket in Supabase dashboard

## Benefits of Proper Storage:
- ✅ Unlimited image sizes
- ✅ Fast loading from CDN
- ✅ Works for all users regardless of IP
- ✅ Better performance
- ✅ Automatic image optimization
