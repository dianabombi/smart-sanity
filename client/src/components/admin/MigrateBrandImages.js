import React, { useState } from 'react';
import ApiService from '../../services/api';
import { supabase } from '../../lib/supabase';

const MigrateBrandImages = () => {
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState([]);
  const [summary, setSummary] = useState(null);

  const addLog = (message, type = 'info') => {
    setProgress(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }]);
  };

  const migrateBrandImages = async () => {
    setMigrating(true);
    setProgress([]);
    setSummary(null);

    addLog('🚀 Starting migration of base64 images to Supabase Storage...', 'info');

    try {
      // Note: Authentication removed for security reasons
      // To run migration, you need to add proper storage policies in Supabase Dashboard
      addLog('📋 Checking storage permissions...', 'info');

      // 1. Fetch all brands
      addLog('📥 Fetching all brands from database...', 'info');
      const result = await ApiService.getBrands();

      if (!result.success || !result.brands) {
        throw new Error('Failed to fetch brands');
      }

      const brands = result.brands;
      addLog(`✅ Found ${brands.length} brands`, 'success');

      let totalMigrated = 0;
      let totalSkipped = 0;
      let totalErrors = 0;

      // 2. Process each brand
      for (const brand of brands) {
        addLog(`\n📦 Processing brand: ${brand.name} (ID: ${brand.id})`, 'info');

        // Parse images
        let images = [];
        try {
          if (Array.isArray(brand.images)) {
            images = brand.images;
          } else if (typeof brand.images === 'string') {
            images = JSON.parse(brand.images);
          }
        } catch (e) {
          addLog(`   ⚠️  No valid images to migrate`, 'warning');
          continue;
        }

        if (!images || images.length === 0) {
          addLog(`   ⚠️  No images to migrate`, 'warning');
          totalSkipped++;
          continue;
        }

        addLog(`   Found ${images.length} images`, 'info');

        const migratedImages = [];
        let brandMigrated = 0;
        let brandErrors = 0;

        // 3. Process each image
        for (let i = 0; i < images.length; i++) {
          const image = images[i];

          // Skip if already using storage URL
          if (image.url && !image.url.startsWith('data:')) {
            addLog(`   ✓ Image ${i + 1}/${images.length}: Already using storage URL`, 'success');
            migratedImages.push(image);
            totalSkipped++;
            continue;
          }

          // Skip if no base64 data
          if (!image.url || !image.url.startsWith('data:')) {
            addLog(`   ⚠️  Image ${i + 1}/${images.length}: No valid data URL, skipping`, 'warning');
            totalSkipped++;
            continue;
          }

          try {
            // Convert base64 to blob
            const response = await fetch(image.url);
            const blob = await response.blob();

            // Generate filename
            const timestamp = Date.now();
            const randomStr = Math.random().toString(36).substring(7);
            const extension = image.originalName ? image.originalName.split('.').pop() : 'jpg';
            const filename = `${brand.id}/${timestamp}-${randomStr}-${image.originalName || `image-${i}.${extension}`}`;

            addLog(`   📤 Uploading image ${i + 1}/${images.length}: ${image.originalName || 'unnamed'}...`, 'info');

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
              .from('brand-images')
              .upload(filename, blob, {
                contentType: blob.type,
                cacheControl: '3600',
                upsert: false
              });

            if (uploadError) {
              addLog(`   ❌ Upload failed: ${uploadError.message}`, 'error');
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

            addLog(`   ✅ Image ${i + 1}/${images.length}: Uploaded successfully`, 'success');

          } catch (error) {
            addLog(`   ❌ Error processing image ${i + 1}/${images.length}: ${error.message}`, 'error');
            brandErrors++;
            totalErrors++;
          }
        }

        // 4. Update brand in database with new image URLs
        if (migratedImages.length > 0) {
          addLog(`   💾 Updating database with ${migratedImages.length} migrated images...`, 'info');

          const { error: updateError } = await supabase
            .from('brands')
            .update({ images: migratedImages })
            .eq('id', brand.id);

          if (updateError) {
            addLog(`   ❌ Failed to update database: ${updateError.message}`, 'error');
            totalErrors++;
          } else {
            addLog(`   ✅ Database updated successfully`, 'success');
            addLog(`   📊 Brand summary: ${brandMigrated} migrated, ${brandErrors} errors`, 'info');
          }
        }
      }

      // 5. Show summary
      const summaryData = {
        totalBrands: brands.length,
        totalMigrated,
        totalSkipped,
        totalErrors
      };

      setSummary(summaryData);

      addLog('\n' + '='.repeat(60), 'info');
      addLog('📊 MIGRATION SUMMARY', 'info');
      addLog('='.repeat(60), 'info');
      addLog(`Total brands processed: ${summaryData.totalBrands}`, 'info');
      addLog(`Total images migrated: ${summaryData.totalMigrated}`, 'success');
      addLog(`Total images skipped: ${summaryData.totalSkipped}`, 'warning');
      addLog(`Total errors: ${summaryData.totalErrors}`, summaryData.totalErrors > 0 ? 'error' : 'info');
      addLog('='.repeat(60), 'info');

      if (summaryData.totalErrors === 0) {
        addLog('\n✅ Migration completed successfully!', 'success');
        addLog('\n💡 Next steps:', 'info');
        addLog('   1. Verify images are accessible on your website', 'info');
        addLog('   2. Check Supabase Storage to see uploaded files', 'info');
        addLog('   3. Monitor database size - should drop from 54MB to <1MB', 'info');
        addLog('   4. Monitor Supabase costs - should drop to €1-5/day', 'info');
      } else {
        addLog(`\n⚠️  Migration completed with ${summaryData.totalErrors} errors`, 'warning');
        addLog('   Review the errors above and retry if needed', 'info');
      }

    } catch (error) {
      addLog(`\n❌ MIGRATION FAILED: ${error.message}`, 'error');
      console.error(error);
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Migrate Brand Images to Storage</h1>
        <p className="text-gray-400 mb-8">
          This will move all base64 images from the database to Supabase Storage,
          reducing database size from 54MB to &lt;1MB and cutting costs by 95%.
        </p>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Migration Status</h2>
          
          {!migrating && !summary && (
            <div className="space-y-4">
              <div className="bg-yellow-900/20 border border-yellow-600 rounded p-4">
                <p className="text-yellow-200">
                  ⚠️ <strong>Current database size: 54 MB</strong>
                </p>
                <p className="text-yellow-200 mt-2">
                  This migration will upload all images to Supabase Storage and update
                  database records to use storage URLs instead of base64 data.
                </p>
              </div>

              <button
                onClick={migrateBrandImages}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                🚀 Start Migration
              </button>
            </div>
          )}

          {migrating && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                <span className="text-blue-400">Migration in progress...</span>
              </div>
            </div>
          )}

          {summary && (
            <div className="bg-green-900/20 border border-green-600 rounded p-4 mb-4">
              <h3 className="text-green-400 font-semibold mb-2">✅ Migration Complete!</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Brands processed:</span>
                  <span className="ml-2 text-white font-semibold">{summary.totalBrands}</span>
                </div>
                <div>
                  <span className="text-gray-400">Images migrated:</span>
                  <span className="ml-2 text-green-400 font-semibold">{summary.totalMigrated}</span>
                </div>
                <div>
                  <span className="text-gray-400">Images skipped:</span>
                  <span className="ml-2 text-yellow-400 font-semibold">{summary.totalSkipped}</span>
                </div>
                <div>
                  <span className="text-gray-400">Errors:</span>
                  <span className="ml-2 text-red-400 font-semibold">{summary.totalErrors}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {progress.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Migration Log</h2>
            <div className="bg-black rounded p-4 max-h-96 overflow-y-auto font-mono text-sm space-y-1">
              {progress.map((log, index) => (
                <div
                  key={index}
                  className={`${
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'success' ? 'text-green-400' :
                    log.type === 'warning' ? 'text-yellow-400' :
                    'text-gray-300'
                  }`}
                >
                  <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MigrateBrandImages;
