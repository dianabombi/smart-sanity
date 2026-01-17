/**
 * Migration Script: Move Base64 Images from Database to Supabase Storage
 * 
 * This script will:
 * 1. Fetch all brands with base64-encoded images
 * 2. Upload each image to Supabase Storage
 * 3. Update database records with storage URLs instead of base64 data
 * 
 * IMPORTANT: Run this AFTER creating the 'brand-images' storage bucket in Supabase
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lckbwknxfmbjffjsmahs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxja2J3a254ZmJqZmZqc21haHMiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1OTY4NTk5MSwiZXhwIjoyMDc1MjYxOTkxfQ.NxHuviT07Wv2WfIHfHEHiLcMQiWWImK7VREF2pgZjJk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to convert base64 to blob
function base64ToBlob(base64String) {
  const parts = base64String.split(',');
  const contentType = parts[0].match(/:(.*?);/)[1];
  const raw = atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

async function migrateBrandImages() {
  console.log('🚀 Starting migration of base64 images to Supabase Storage...\n');

  try {
    // 1. Fetch all brands
    console.log('📥 Fetching all brands from database...');
    const { data: brands, error: fetchError } = await supabase
      .from('brands')
      .select('*')
      .order('id', { ascending: true });

    if (fetchError) {
      throw new Error(`Failed to fetch brands: ${fetchError.message}`);
    }

    console.log(`✅ Found ${brands.length} brands\n`);

    let totalMigrated = 0;
    let totalSkipped = 0;
    let totalErrors = 0;

    // 2. Process each brand
    for (const brand of brands) {
      console.log(`\n📦 Processing brand: ${brand.name} (ID: ${brand.id})`);

      // Parse images
      let images = [];
      try {
        if (Array.isArray(brand.images)) {
          images = brand.images;
        } else if (typeof brand.images === 'string') {
          images = JSON.parse(brand.images);
        }
      } catch (e) {
        console.log(`   ⚠️  No valid images to migrate`);
        continue;
      }

      if (!images || images.length === 0) {
        console.log(`   ⚠️  No images to migrate`);
        totalSkipped++;
        continue;
      }

      console.log(`   Found ${images.length} images`);

      const migratedImages = [];
      let brandMigrated = 0;
      let brandErrors = 0;

      // 3. Process each image
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        
        // Skip if already using storage URL
        if (image.url && !image.url.startsWith('data:')) {
          console.log(`   ✓ Image ${i + 1}/${images.length}: Already using storage URL`);
          migratedImages.push(image);
          totalSkipped++;
          continue;
        }

        // Skip if no base64 data
        if (!image.url || !image.url.startsWith('data:')) {
          console.log(`   ⚠️  Image ${i + 1}/${images.length}: No valid data URL, skipping`);
          totalSkipped++;
          continue;
        }

        try {
          // Convert base64 to blob
          const blob = base64ToBlob(image.url);
          
          // Generate filename
          const timestamp = Date.now();
          const randomStr = Math.random().toString(36).substring(7);
          const extension = image.originalName ? image.originalName.split('.').pop() : 'jpg';
          const filename = `${brand.id}/${timestamp}-${randomStr}-${image.originalName || `image-${i}.${extension}`}`;

          console.log(`   📤 Uploading image ${i + 1}/${images.length}: ${image.originalName || 'unnamed'}...`);

          // Upload to Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from('brand-images')
            .upload(filename, blob, {
              contentType: blob.type,
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            console.error(`   ❌ Upload failed: ${uploadError.message}`);
            brandErrors++;
            totalErrors++;
            continue;
          }

          // Create new image object with storage URL
          const migratedImage = {
            url: `https://lckbwknxfmbjffjsmahs.supabase.co/storage/v1/object/public/brand-images/${filename}`,
            path: filename,
            originalName: image.originalName || `image-${i}.${extension}`,
            filename: filename,
            size: blob.size,
            title: image.title || ''
          };

          migratedImages.push(migratedImage);
          brandMigrated++;
          totalMigrated++;

          console.log(`   ✅ Image ${i + 1}/${images.length}: Uploaded successfully`);

        } catch (error) {
          console.error(`   ❌ Error processing image ${i + 1}/${images.length}:`, error.message);
          brandErrors++;
          totalErrors++;
        }
      }

      // 4. Update brand in database with new image URLs
      if (migratedImages.length > 0) {
        console.log(`   💾 Updating database with ${migratedImages.length} migrated images...`);
        
        const { error: updateError } = await supabase
          .from('brands')
          .update({ images: migratedImages })
          .eq('id', brand.id);

        if (updateError) {
          console.error(`   ❌ Failed to update database: ${updateError.message}`);
          totalErrors++;
        } else {
          console.log(`   ✅ Database updated successfully`);
          console.log(`   📊 Brand summary: ${brandMigrated} migrated, ${brandErrors} errors`);
        }
      }
    }

    // 5. Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total brands processed: ${brands.length}`);
    console.log(`Total images migrated: ${totalMigrated}`);
    console.log(`Total images skipped: ${totalSkipped}`);
    console.log(`Total errors: ${totalErrors}`);
    console.log('='.repeat(60));

    if (totalErrors === 0) {
      console.log('\n✅ Migration completed successfully!');
      console.log('\n💡 Next steps:');
      console.log('   1. Verify images are accessible on your website');
      console.log('   2. Monitor Supabase costs - should drop dramatically');
      console.log('   3. Consider deleting old base64 backups if everything works');
    } else {
      console.log(`\n⚠️  Migration completed with ${totalErrors} errors`);
      console.log('   Review the errors above and retry if needed');
    }

  } catch (error) {
    console.error('\n❌ MIGRATION FAILED:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run migration
migrateBrandImages();
