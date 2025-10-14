import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';
import EmergencyBrands from '../../services/emergencyBrands';

const AdminBrands = ({ onLogout }) => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingDescription, setEditingDescription] = useState(false);
  const [tempDescription, setTempDescription] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [editingCategory, setEditingCategory] = useState(false);
  const [tempCategory, setTempCategory] = useState('');
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Load brands from API
  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      
      console.log('🚨 ADMIN EMERGENCY: Loading brands instantly...');
      
      // Use emergency service for instant loading
      const result = EmergencyBrands.getBrands();
      
      if (result.success) {
        console.log('✅ ADMIN EMERGENCY: Loaded', result.brands.length, 'brands');
        setBrands(result.brands);
      } else {
        console.log('⚠️ ADMIN EMERGENCY: Using fallback');
        const fallbackBrands = ApiService.getFallbackBrands();
        setBrands(fallbackBrands);
      }
      
    } catch (error) {
      console.error('❌ ADMIN EMERGENCY: Error loading brands:', error);
      setError('Chyba pri načítavaní značiek');
      const fallbackBrands = ApiService.getFallbackBrands();
      setBrands(fallbackBrands);
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
          const updatedBrand = updatedBrands.brands.find(b => b.id === brandId || b._id === brandId);
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
        
        // Update selectedBrand with the new data
        const updatedBrands = await ApiService.getBrands();
        if (updatedBrands.success) {
          const updatedBrand = updatedBrands.brands.find(b => b.id === brandId || b._id === brandId);
          if (updatedBrand) {
            setSelectedBrand(updatedBrand);
          }
        }
        
        alert('Obrázok bol úspešne odstránený!');
      } else {
        alert('Chyba pri odstraňovaní obrázka: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Chyba pri odstraňovaní obrázka');
    }
  };

  const handleDescriptionEdit = () => {
    setTempDescription(selectedBrand.description || '');
    setEditingDescription(true);
  };

  const handleDescriptionSave = async () => {
    try {
      console.log('🚨 ADMIN EMERGENCY: Updating description using emergency service...');
      const result = EmergencyBrands.updateBrand(selectedBrand.id, { description: tempDescription });
      
      if (result.success) {
        console.log('✅ EMERGENCY: Description update successful!');
        
        // Update selectedBrand immediately with the new description
        const updatedBrand = { ...selectedBrand, description: tempDescription };
        setSelectedBrand(updatedBrand);
        
        // Reload brands to get updated data from emergency service
        const brandsResult = EmergencyBrands.getBrands();
        if (brandsResult.success) {
          setBrands(brandsResult.brands);
          console.log('✅ EMERGENCY: Brands updated in admin');
        }
        
        setEditingDescription(false);
        alert('Popis značky bol úspešne aktualizovaný!');
      } else {
        alert('Chyba pri aktualizácii popisu: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating description:', error);
      alert('Chyba pri aktualizácii popisu');
    }
  };

  const handleDescriptionCancel = () => {
    setEditingDescription(false);
    setTempDescription('');
  };

  const handleNameEdit = () => {
    console.log('Starting name edit for:', selectedBrand.name);
    setTempName(selectedBrand.name || '');
    setEditingName(true);
  };

  const handleNameSave = async () => {
    try {
      console.log('🚨 ADMIN EMERGENCY: Updating name using emergency service...');
      const result = EmergencyBrands.updateBrand(selectedBrand.id, { name: tempName });
      
      if (result.success) {
        console.log('✅ EMERGENCY: Name update successful!');
        
        // Update selectedBrand immediately with the new name
        const updatedBrand = { ...selectedBrand, name: tempName };
        setSelectedBrand(updatedBrand);
        
        // Reload brands to get updated data from emergency service
        const brandsResult = EmergencyBrands.getBrands();
        if (brandsResult.success) {
          setBrands(brandsResult.brands);
          console.log('✅ EMERGENCY: Brands updated in admin');
        }
        
        setEditingName(false);
        alert('Názov značky bol úspešne aktualizovaný!');
      } else {
        alert('Chyba pri aktualizácii názvu: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating name:', error);
      alert('Chyba pri aktualizácii názvu');
    }
  };

  const handleNameCancel = () => {
    setEditingName(false);
    setTempName('');
  };

  const handleCategoryEdit = () => {
    console.log('Starting category edit for:', selectedBrand.category);
    setTempCategory(selectedBrand.category || '');
    setEditingCategory(true);
  };

  const handleCategorySave = async () => {
    try {
      console.log('🚨 ADMIN EMERGENCY: Updating category using emergency service...');
      const result = EmergencyBrands.updateBrand(selectedBrand.id, { category: tempCategory });
      
      if (result.success) {
        console.log('✅ EMERGENCY: Category update successful!');
        
        // Update selectedBrand immediately with the new category
        const updatedBrand = { ...selectedBrand, category: tempCategory };
        setSelectedBrand(updatedBrand);
        
        // Reload brands to get updated data from emergency service
        const brandsResult = EmergencyBrands.getBrands();
        if (brandsResult.success) {
          setBrands(brandsResult.brands);
          console.log('✅ EMERGENCY: Brands updated in admin');
        }
        
        setEditingCategory(false);
        alert('Kategória značky bola úspešne aktualizovaná!');
      } else {
        alert('Chyba pri aktualizácii kategórie: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Chyba pri aktualizácii kategórie');
    }
  };

  const handleCategoryCancel = () => {
    setEditingCategory(false);
    setTempCategory('');
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Podporované sú iba obrázky (JPG, PNG, SVG, WebP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Súbor je príliš veľký. Maximálna veľkosť je 5MB.');
      return;
    }

    try {
      setUploadingLogo(true);
      
      console.log('🚨 ADMIN EMERGENCY: Uploading logo using emergency service...');
      const result = await EmergencyBrands.updateBrandLogo(selectedBrand.id, file);
      
      if (result.success) {
        console.log('✅ EMERGENCY: Logo upload successful!');
        
        // Update selectedBrand immediately with the new logo URL
        const updatedBrand = { ...selectedBrand, logo: result.logoUrl };
        setSelectedBrand(updatedBrand);
        
        // Reload brands to get updated data from emergency service
        const brandsResult = EmergencyBrands.getBrands();
        if (brandsResult.success) {
          setBrands(brandsResult.brands);
          console.log('✅ EMERGENCY: Brands updated in admin');
        }
        
        alert('Logo značky bol úspešne aktualizovaný!');
      } else {
        alert('Chyba pri aktualizácii loga: ' + result.message);
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Chyba pri nahrávaní loga');
    } finally {
      setUploadingLogo(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleLogoDelete = async () => {
    if (!selectedBrand) return;
    
    if (!window.confirm('Ste si istí, že chcete odstrániť logo značky? Vráti sa pôvodné logo.')) {
      return;
    }

    try {
      setUploadingLogo(true);
      
      // Get original logo from fallback brands
      const fallbackBrands = ApiService.getFallbackBrands();
      const originalBrand = fallbackBrands.find(b => b.name === selectedBrand.name);
      const originalLogo = originalBrand ? originalBrand.logo : '/logoWhite.svg';
      
      const result = await ApiService.deleteBrandLogo(selectedBrand.id, originalLogo);
      
      if (result.success) {
        console.log('✅ Logo delete successful, reloading brands...');
        
        // Reload brands to get updated data
        await loadBrands();
        
        // Update selectedBrand with the new data
        const updatedBrands = await ApiService.getBrands();
        if (updatedBrands.success) {
          const updatedBrand = updatedBrands.brands.find(b => b.id === selectedBrand.id || b._id === selectedBrand.id);
          if (updatedBrand) {
            console.log('🔄 Reset to original logo:', updatedBrand.logo);
            setSelectedBrand(updatedBrand);
          }
        }
        
        alert('Logo značky bol úspešne odstránený!');
      } else {
        alert('Chyba pri odstraňovaní loga: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting logo:', error);
      alert('Chyba pri odstraňovaní loga');
    } finally {
      setUploadingLogo(false);
    }
  };

  const BrandCard = ({ brand }) => (
    <div className="rounded-lg shadow hover:shadow-md transition-shadow p-6 border border-gray-700">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
          <img 
            key={brand.logo} // Force re-render when logo changes
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
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{brand.name}</h3>
          <p className="text-sm text-gray-300">{brand.category}</p>
          <p className="text-xs text-gray-400 mt-1">
            Obrázky: {brand.images?.length || 0}
          </p>
          {/* Debug info */}
          {brand.images?.length > 0 && (
            <p className="text-xs text-green-400">
              ✅ Má obrázky: {brand.images[0]?.filename || 'no filename'}
            </p>
          )}
        </div>
      </div>
      
      <button
        onClick={() => setSelectedBrand(brand)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
      >
        Spravovať značku
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
              Spravovať značku - {selectedBrand.name}
            </h2>
            <button
              onClick={() => {
                setSelectedBrand(null);
                setEditingDescription(false);
                setTempDescription('');
                setEditingName(false);
                setTempName('');
                setEditingCategory(false);
                setTempCategory('');
              }}
              className="text-gray-400 hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Brand Name Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Názov značky
                </label>
                {!editingName && (
                  <button
                    onClick={handleNameEdit}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Upraviť
                  </button>
                )}
              </div>
              
              {editingName ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => {
                      console.log('Name input changed to:', e.target.value);
                      setTempName(e.target.value);
                    }}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Zadajte názov značky"
                    autoFocus
                    maxLength={100}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleNameSave}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Uložiť
                    </button>
                    <button
                      onClick={handleNameCancel}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Zrušiť
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-700 border border-gray-600 rounded-lg">
                  <p className="text-white">{selectedBrand.name}</p>
                </div>
              )}
            </div>

            {/* Brand Category Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Kategória značky
                </label>
                {!editingCategory && (
                  <button
                    onClick={handleCategoryEdit}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Upraviť
                  </button>
                )}
              </div>
              
              {editingCategory ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={tempCategory}
                    onChange={(e) => {
                      console.log('Category input changed to:', e.target.value);
                      setTempCategory(e.target.value);
                    }}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Zadajte kategóriu značky (napr. KÚPEĽŇOVÝ NÁBYTOK)"
                    autoFocus
                    maxLength={100}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCategorySave}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Uložiť
                    </button>
                    <button
                      onClick={handleCategoryCancel}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Zrušiť
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-700 border border-gray-600 rounded-lg">
                  <p className="text-white font-medium text-sm tracking-wider">
                    {selectedBrand.category || 'Žiadna kategória nie je zadaná'}
                  </p>
                </div>
              )}
            </div>

            {/* Brand Description Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Popis značky
                </label>
                {!editingDescription && (
                  <button
                    onClick={handleDescriptionEdit}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Upraviť
                  </button>
                )}
              </div>
              
              {editingDescription ? (
                <div className="space-y-3">
                  <textarea
                    value={tempDescription}
                    onChange={(e) => setTempDescription(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    placeholder="Zadajte popis značky..."
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleDescriptionSave}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                    >
                      Uložiť
                    </button>
                    <button
                      onClick={handleDescriptionCancel}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                    >
                      Zrušiť
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-700 border border-gray-600 rounded-lg">
                  <p className="text-gray-300 text-sm">
                    {selectedBrand.description || 'Žiadny popis nie je zadaný'}
                  </p>
                </div>
              )}
            </div>

            {/* Brand Logo Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Logo značky
              </label>
              
              <div className="flex items-center space-x-4">
                {/* Current Logo Display */}
                <div className="w-20 h-20 bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center">
                  <img 
                    key={selectedBrand.logo} // Force re-render when logo changes
                    src={selectedBrand.logo} 
                    alt={`${selectedBrand.name} Logo`}
                    className="max-w-full max-h-full object-contain"
                    style={{
                      filter: selectedBrand.logoFilter || 'none'
                    }}
                    onError={(e) => {
                      console.log('❌ Logo failed to load:', selectedBrand.logo?.substring(0, 50) + '...');
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    onLoad={() => {
                      console.log('✅ Logo loaded successfully');
                    }}
                  />
                  <div 
                    className="text-gray-400 text-xs text-center"
                    style={{display: 'none'}}
                  >
                    Žiadne logo
                  </div>
                </div>
                
                {/* Logo Upload */}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    disabled={uploadingLogo}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className={`inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors ${
                      uploadingLogo ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {uploadingLogo ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Nahrávam...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Zmeniť logo
                      </>
                    )}
                  </label>
                  
                  {/* Delete Logo Button */}
                  <button
                    onClick={handleLogoDelete}
                    disabled={uploadingLogo}
                    className={`ml-3 inline-flex items-center px-4 py-2 border border-red-600 rounded-lg text-sm font-medium text-red-400 bg-transparent hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer transition-colors ${
                      uploadingLogo ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Odstrániť logo
                  </button>
                  
                  <p className="text-xs text-gray-400 mt-2">
                    Podporované formáty: JPG, PNG, SVG, WebP (max 5MB)
                  </p>
                </div>
              </div>
            </div>

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
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleImageUpload(selectedBrand.id, e.target.files);
                    }
                  }}
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
                    <div key={image.filename || index} className="relative group">
                      <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                        <img
                          src={image.url || image.dataUrl || image.path || 'data:image/svg+xml,%3Csvg width="300" height="300" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="100%25" height="100%25" fill="%234A5568"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E'}
                          alt={image.originalName || 'Uploaded image'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.log('Admin image load error:', image);
                            console.log('Failed source:', e.target.src);
                            
                            // Try alternative sources
                            if (!e.target.dataset.retried) {
                              e.target.dataset.retried = 'true';
                              
                              if (image.dataUrl && e.target.src !== image.dataUrl) {
                                e.target.src = image.dataUrl;
                                return;
                              }
                              
                              if (image.filename && image.filename.startsWith('data:')) {
                                e.target.src = image.filename;
                                return;
                              }
                            }
                            
                            // Final fallback
                            e.target.src = 'data:image/svg+xml,%3Csvg width="300" height="300" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="100%25" height="100%25" fill="%23DC2626"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="white" text-anchor="middle" dy=".3em"%3EError Loading%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                      <button
                        onClick={() => removeImage(selectedBrand.id, image.filename)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                      <p className="text-xs text-gray-400 mt-1 truncate">{image.originalName || 'No name'}</p>
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
          <div className="p-6 border-t border-gray-700 flex justify-between">
            <button
              onClick={async () => {
                await loadBrands();
                const updatedBrands = await ApiService.getBrands();
                if (updatedBrands.success) {
                  const updatedBrand = updatedBrands.brands.find(b => b.id === selectedBrand.id);
                  if (updatedBrand) {
                    setSelectedBrand(updatedBrand);
                  }
                }
              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
            >
              🔄 Obnoviť
            </button>
            <div className="space-x-3">
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
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Správa značiek
              </h2>
              <p className="text-gray-300">
                Spravujte obrázky a obsah pre jednotlivé značky
              </p>
            </div>
            <button
              onClick={async () => {
                const result = await ApiService.initializeBrands();
                alert(result.success ? '✅ ' + result.message : '❌ ' + result.message);
                if (result.success) await loadBrands();
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              🔄 Inicializovať značky
            </button>
          </div>
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
