import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import DatabaseSetup from './DatabaseSetup';
import apiService from '../../services/api';

const AdminHeroBanners = ({ onLogout }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showDatabaseSetup, setShowDatabaseSetup] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    alt: '',
    src: '',
    order: 1,
    active: true
  });

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      setLoading(true);
      setError(''); // Clear any previous errors
      console.log('🚨 ADMIN: Loading hero banners...');
      
      const response = await apiService.getAllHeroBanners();
      console.log('🚨 ADMIN: Load banners response:', response);
      
      if (response && response.success) {
        console.log('🚨 ADMIN: Loaded banners:', response.banners);
        setBanners(response.banners || []);
      } else {
        console.error('🚨 ADMIN: Failed to load banners:', response);
        setBanners([]); // Set empty array to prevent undefined issues
        
        if (response && response.error === 'TABLE_NOT_EXISTS') {
          setError(response.message + ' Kliknite na "Inicializovať" pre vytvorenie tabuľky.');
        } else {
          setError('Chyba pri načítavaní hero bannerov. Skúste obnoviť stránku.');
        }
      }
    } catch (error) {
      console.error('🚨 ADMIN: Load banners error:', error);
      setBanners([]); // Set empty array to prevent crashes
      setError('Kritická chyba pri načítavaní hero bannerov: ' + error.message);
    } finally {
      console.log('🚨 ADMIN: Setting loading to false');
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return null;

    try {
      setUploading(true);
      const response = await apiService.uploadHeroBannerImage(file);
      if (response.success) {
        return response.url;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setError(`Chyba pri nahrávaní obrázka: ${error.message}`);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      let imageUrl = formData.src;

      // Handle file upload if a new file is selected
      const fileInput = document.getElementById('bannerImage');
      if (fileInput && fileInput.files[0]) {
        imageUrl = await handleFileUpload(fileInput.files[0]);
        if (!imageUrl) return; // Upload failed
      }

      // Validation: Check if image URL exists
      if (!imageUrl || imageUrl.trim() === '') {
        setError('Chýba obrázok! Musíte nahrať obrázok alebo zadať URL.');
        return;
      }

      // Check if we're adding too many banners (max 10)
      if (!editingBanner && banners.length >= 10) {
        setError('Maximálny počet hero bannerov je 10. Odstráňte existujúci banner pred pridaním nového.');
        return;
      }

      const bannerData = {
        ...formData,
        src: imageUrl,
        order: parseInt(formData.order)
      };

      let response;
      if (editingBanner) {
        response = await apiService.updateHeroBanner(editingBanner.id, bannerData);
      } else {
        response = await apiService.createHeroBanner(bannerData);
      }

      if (response.success) {
        setSuccess(editingBanner ? 'Hero banner aktualizovaný!' : 'Hero banner vytvorený!');
        await loadBanners();
        resetForm();
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Chyba pri ukladaní hero banneru');
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title || '',
      description: banner.description || '',
      alt: banner.alt || '',
      src: banner.src || '',
      order: banner.order || 1,
      active: banner.active !== false
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    console.log('🚨 DELETE: Attempting to delete banner with ID:', id);
    
    if (!window.confirm('Ste si istí, že chcete odstrániť tento hero banner?')) {
      console.log('🚨 DELETE: User cancelled deletion');
      return;
    }

    try {
      setError(''); // Clear any previous errors
      setDeletingId(id); // Set loading state for this specific banner
      console.log('🚨 DELETE: Calling API to delete banner with ID:', id);
      const response = await apiService.deleteHeroBanner(id);
      console.log('🚨 DELETE: API response:', response);
      
      if (response.success) {
        console.log('🚨 DELETE: Success response received');
        
        // Check if any rows were actually deleted
        if (response.deletedRows === 0) {
          console.log('⚠️ DELETE: No rows deleted, treating as simulation');
          setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
          setSuccess('Hero banner odstránený! (simulácia - žiadne riadky)');
        } else {
          console.log('✅ DELETE: Database delete successful, reloading banners');
          setSuccess('Hero banner úspešne odstránený!');
          
          // Immediately update local state to prevent crashes
          setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
          
          // Then reload from database to ensure consistency
          try {
            await loadBanners();
          } catch (reloadError) {
            console.error('🚨 DELETE: Error reloading banners:', reloadError);
            // Don't crash - we already updated local state
          }
        }
      } else {
        console.error('Delete failed:', response.message);
        setError(response.message);
      }
    } catch (error) {
      console.error('🚨 DELETE: Error occurred:', error);
      setError('Chyba pri odstraňovaní hero banneru: ' + error.message);
    } finally {
      setDeletingId(null); // Clear loading state
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      alt: '',
      src: '',
      order: 1,
      active: true
    });
    setEditingBanner(null);
    setShowAddModal(false);
    // Reset file input
    const fileInput = document.getElementById('bannerImage');
    if (fileInput) fileInput.value = '';
  };

  const handleInitialize = async () => {
    try {
      const response = await apiService.initializeHeroBanners();
      if (response.success) {
        setSuccess(response.message);
        await loadBanners();
      } else {
        // If initialization failed due to missing table, show database setup
        if (response.message && response.message.includes('hero_banners')) {
          setShowDatabaseSetup(true);
        } else {
          setError(response.message);
        }
      }
    } catch (error) {
      setError('Chyba pri inicializácii hero bannerov');
    }
  };

  const handleDatabaseSetupSuccess = () => {
    setShowDatabaseSetup(false);
    setSuccess('Databáza úspešne nastavená!');
    loadBanners();
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Hero Bannery</h1>
            <p className="text-gray-400 mt-1">
              {banners.length} / 10 bannerov • Maximálne 10 obrázkov v carousel
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleInitialize}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Inicializovať
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              disabled={banners.length >= 10}
              className={`px-4 py-2 text-white rounded-lg transition-colors ${
                banners.length >= 10 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              + Pridať Hero Banner
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500 text-white p-4 rounded-lg">
            {success}
          </div>
        )}

        {/* Banners List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="text-white text-lg">Načítavam hero bannery...</div>
          </div>
        ) : (
          <div className="grid gap-6">
            {banners && banners.length > 0 ? banners.map((banner) => (
              <div key={banner.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex gap-6">
                  {/* Image Preview */}
                  <div className="flex-shrink-0">
                    <img
                      src={banner.src}
                      alt={banner.alt}
                      className="w-48 h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"%3E%3Crect width="200" height="150" fill="%23374151"/%3E%3Ctext x="100" y="75" text-anchor="middle" fill="%23fff" font-size="14"%3EChyba obrázka%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>

                  {/* Banner Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {banner.title || 'Bez názvu'}
                        </h3>
                        <p className="text-gray-300 mb-2">
                          {banner.description || 'Bez popisu'}
                        </p>
                        <p className="text-sm text-gray-400">
                          Alt text: {banner.alt || 'Nie je nastavený'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(banner)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                        >
                          Upraviť
                        </button>
                        <button
                          onClick={() => handleDelete(banner.id)}
                          disabled={deletingId === banner.id}
                          className={`px-3 py-1 text-white rounded transition-colors text-sm ${
                            deletingId === banner.id
                              ? 'bg-gray-600 cursor-not-allowed'
                              : 'bg-red-600 hover:bg-red-700'
                          }`}
                        >
                          {deletingId === banner.id ? 'Odstraňujem...' : 'Odstrániť'}
                        </button>
                      </div>
                    </div>

                    {/* Banner Details */}
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>Poradie: {banner.order}</span>
                      <span className={`px-2 py-1 rounded ${
                        banner.active ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                      }`}>
                        {banner.active ? 'Aktívny' : 'Neaktívny'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-400">
                <p>Žiadne hero bannery nenájdené.</p>
                <p className="text-sm mt-2">Kliknite na "Inicializovať" pre vytvorenie predvolených bannerov.</p>
              </div>
            )}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingBanner ? 'Upraviť Hero Banner' : 'Pridať Hero Banner'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Názov</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Popis</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Alt text (pre SEO)</label>
                  <input
                    type="text"
                    value={formData.alt}
                    onChange={(e) => setFormData({...formData, alt: e.target.value})}
                    className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Obrázok</label>
                  <input
                    type="file"
                    id="bannerImage"
                    accept="image/*"
                    className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                  {editingBanner && (
                    <p className="text-sm text-gray-400 mt-1">
                      Nechajte prázdne pre zachovanie aktuálneho obrázka
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Poradie</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({...formData, order: e.target.value})}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Stav</label>
                    <select
                      value={formData.active}
                      onChange={(e) => setFormData({...formData, active: e.target.value === 'true'})}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="true">Aktívny</option>
                      <option value="false">Neaktívny</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {uploading ? 'Nahráva sa...' : (editingBanner ? 'Aktualizovať' : 'Vytvoriť')}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Zrušiť
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Database Setup Modal */}
        {showDatabaseSetup && (
          <DatabaseSetup
            onClose={() => setShowDatabaseSetup(false)}
            onSuccess={handleDatabaseSetupSuccess}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminHeroBanners;
