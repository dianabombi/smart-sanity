import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const DatabaseFix = () => {
  const [serviceKey, setServiceKey] = useState('');
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    console.log(message);
    setLogs(prev => [...prev, message]);
  };

  const handleFix = async () => {
    if (!serviceKey) {
      alert('Please enter the Supabase service_role key.');
      return;
    }

    setStatus('processing');
    addLog('Starting database fix process...');

    try {
      const supabase_admin = createClient(
        'https://lckbwknxfmbjffjsmahs.supabase.co',
        serviceKey
      );
      addLog('Admin Supabase client created.');

      addLog('Fetching all brands...');
      const { data: brands, error: brandsError } = await supabase_admin.from('brands').select('id, name');
      if (brandsError) throw brandsError;
      addLog(`Found ${brands.length} brands.`);

      addLog('Scanning `brand-images` storage bucket...');
      const { data: files, error: filesError } = await supabase_admin.storage.from('brand-images').list('', { limit: 1000 });
      if (filesError) throw filesError;
      addLog(`Found ${files.length} files in storage.`);

      const updates = brands.map(async (brand) => {
        const brandId = brand.id;
        const brandFiles = files.filter(file => file.name.startsWith(`${brandId}/`));

        if (brandFiles.length > 0) {
          const newImagesArray = brandFiles.map(file => ({
            filename: file.name,
            originalName: file.name.split('/').pop(),
            path: file.name, // The crucial path
            id: file.id,
            url: `https://lckbwknxfmbjffjsmahs.supabase.co/storage/v1/object/public/brand-images/${file.name}`
          }));

          addLog(`Updating brand '${brand.name}' (ID: ${brandId}) with ${newImagesArray.length} correct image paths.`);
          const { error: updateError } = await supabase_admin
            .from('brands')
            .update({ images: newImagesArray })
            .eq('id', brandId);

          if (updateError) {
            addLog(`-> FAILED to update brand ${brand.name}: ${updateError.message}`);
            throw updateError;
          }
          addLog(`-> SUCCESS for brand ${brand.name}.`);
        } else {
            addLog(`No images found in storage for brand '${brand.name}' (ID: ${brandId}). Skipping.`);
        }
      });

      await Promise.all(updates);

      addLog('DATABASE FIX COMPLETE. All brands have been updated with correct image paths.');
      setStatus('success');
    } catch (error) {
      addLog(`CRITICAL ERROR: ${error.message}`);
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg max-w-2xl mx-auto my-10">
      <h1 className="text-2xl font-bold mb-4 text-yellow-400">Database Image Path Restore</h1>
      <p className="mb-4">This tool will scan your Supabase storage and fix the corrupted image data in your `brands` table. It will not delete any files. Use this only once.</p>
      
      <div className="mb-4">
        <label htmlFor="serviceKey" className="block mb-2 font-medium">Supabase Service Role Key</label>
        <input
          type="password"
          id="serviceKey"
          value={serviceKey}
          onChange={(e) => setServiceKey(e.target.value)}
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded-lg"
          placeholder="Paste your service_role key here"
        />
      </div>

      <button
        onClick={handleFix}
        disabled={status === 'processing'}
        className={`w-full py-3 rounded-lg font-bold transition-colors ${status === 'processing' ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}>
        {status === 'processing' ? 'Processing...' : 'Clean and Restore Image Paths'}
      </button>

      {logs.length > 0 && (
        <div className="mt-6 p-4 bg-black rounded-lg max-h-80 overflow-y-auto font-mono text-sm">
          {logs.map((log, i) => (
            <p key={i} className={log.includes('ERROR') || log.includes('FAILED') ? 'text-red-500' : log.includes('SUCCESS') ? 'text-green-500' : ''}>{`> ${log}`}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DatabaseFix;
