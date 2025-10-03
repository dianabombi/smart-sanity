import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';

const AdminBrands = ({ onLogout }) => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load brands from API
  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const result = await ApiService.getBrands();
      if (result.success) {
        setBrands(result.brands);
      } else {
        // If no brands exist, initialize them
        await ApiService.initializeBrands();
        const retryResult = await ApiService.getBrands();
        if (retryResult.success) {
          setBrands(retryResult.brands);
        }
      }
    } catch (error) {
      console.error('Error loading brands:', error);
      setError('Chyba pri načítavaní značiek');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (brandId, files) => {
    try {
      const result = await ApiService.uploadBrandImages(brandId, files);
      if (result.success) {
        // Reload brands to get updated data
        await loadBrands();
        
        // Update selectedBrand with the new data
        const updatedBrands = await ApiService.getBrands();
        if (updatedBrands.success) {
          const updatedBrand = updatedBrands.brands.find(b => b._id === brandId);
          if (updatedBrand) {
            setSelectedBrand(updatedBrand);
          }
        }
        
        alert('Obrázky boli úspešne nahrané!');
      } else {
        alert('Chyba pri nahrávaní obrázkov: ' + result.message);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Chyba pri nahrávaní obrázkov');
    }
  };

  const removeImage = async (brandId, imageId) => {
    try {
      const result = await ApiService.deleteBrandImage(brandId, imageId);
      if (result.success) {
        // Reload brands to get updated data
        await loadBrands();
        alert('Obrázok bol úspešne odstránený!');
      } else {
        alert('Chyba pri odstraňovaní obrázka: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Chyba pri odstraňovaní obrázka');
    }
  };

  const BrandCard = ({ brand }) => (
    <div className="rounded-lg shadow hover:shadow-md transition-shadow p-6 border border-gray-700">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
          <img 
            src={brand.logo} 
            alt={brand.name}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden items-center justify-center w-full h-full text-gray-400 text-xs">
            {brand.name}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{brand.name}</h3>
          <p className="text-sm text-gray-300">{brand.category}</p>
          <p className="text-xs text-gray-400 mt-1">
            Obrázky: {brand.images?.length || 0}
          </p>
        </div>
      </div>
      
      <button
        onClick={() => setSelectedBrand(brand)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
      >
        Spravovať obrázky
      </button>
    </div>
  );

  const ImageUploadModal = () => {
    if (!selectedBrand) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="p-6 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Spravovať obrázky - {selectedBrand.name}
            </h2>
            <button
              onClick={() => setSelectedBrand(null)}
              className="text-gray-400 hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Pridať nové obrázky
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors bg-gray-700">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(selectedBrand._id, e.target.files)}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-gray-400 mb-2">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-medium text-blue-400">Kliknite pre výber súborov</span> alebo pretiahnite sem
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF do 10MB</p>
                </label>
              </div>
            </div>

            {/* Uploaded Images Grid */}
            {selectedBrand.images?.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-white mb-4">
                  Nahrané obrázky ({selectedBrand.images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedBrand.images.map((image, index) => (
                    <div key={image._id || index} className="relative group">
                      <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                        <img
                          src={process.env.NODE_ENV === 'production' 
                            ? `/${image.path}` 
                            : `http://localhost:5001/${image.path}`}
                          alt={image.originalName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeImage(selectedBrand._id, image._id)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                      <p className="text-xs text-gray-400 mt-1 truncate">{image.originalName}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(!selectedBrand.images || selectedBrand.images.length === 0) && (
              <div className="text-center py-8 text-gray-400">
                <p>Žiadne obrázky zatiaľ neboli nahrané</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
            <button
              onClick={() => setSelectedBrand(null)}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Zavrieť
            </button>
            <button 
              onClick={() => setSelectedBrand(null)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Uložiť zmeny
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout onLogout={onLogout}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-300">Načítavam značky...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout onLogout={onLogout}>
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
          <h3 className="text-red-400 font-medium mb-2">Chyba</h3>
          <p className="text-red-300">{error}</p>
          <button
            onClick={loadBrands}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Skúsiť znovu
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Správa značiek
          </h2>
          <p className="text-gray-300">
            Spravujte obrázky a obsah pre jednotlivé značky
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map(brand => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Štatistiky</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{brands.length}</p>
              <p className="text-sm text-gray-300">Celkom značiek</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                {brands.reduce((acc, brand) => acc + (brand.images?.length || 0), 0)}
              </p>
              <p className="text-sm text-gray-300">Nahrané obrázky</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">
                {brands.filter(brand => brand.images?.length > 0).length}
              </p>
              <p className="text-sm text-gray-300">Značky s obrázkami</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-400">
                {brands.length > 0 ? Math.round((brands.filter(brand => brand.images?.length > 0).length / brands.length) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-300">Pokrytie</p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      <ImageUploadModal />
    </AdminLayout>
  );
};

export default AdminBrands;
