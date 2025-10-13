import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';

const AdminReferences = ({ onLogout }) => {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingReference, setEditingReference] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    location: '',
    client: '',
    images: []
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    loadReferences();
  }, []);

  const loadReferences = async () => {
    try {
      setLoading(true);
      
      // Try to load from localStorage first (for offline functionality)
      const localReferences = localStorage.getItem('adminReferences');
      if (localReferences) {
        const parsed = JSON.parse(localReferences);
        setReferences(parsed);
        console.log('Loaded references from localStorage:', parsed);
      }
      
      // Then try to load from API
      const result = await ApiService.getReferences();
      if (result.success) {
        setReferences(result.references);
        console.log('Loaded references from API:', result.references);
      } else {
        console.log('API failed, using localStorage or fallback');
        if (!localReferences) {
          setReferences([]);
        }
      }
    } catch (error) {
      console.error('Error loading references:', error);
      // Try localStorage as fallback
      const localReferences = localStorage.getItem('adminReferences');
      if (localReferences) {
        setReferences(JSON.parse(localReferences));
      } else {
        setReferences([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Saving reference with data:', formData);
      
      let result;
      if (editingReference) {
        result = await ApiService.updateReference(editingReference.id, formData);
      } else {
        result = await ApiService.createReference(formData);
      }

      console.log('API result:', result);

      if (result.success) {
        console.log('Reference saved successfully');
        await loadReferences();
        resetForm();
        setShowAddModal(false);
        setEditingReference(null);
        alert('Referencia bola úspešne uložená!');
      } else {
        console.error('API returned error:', result.message);
        
        // Try to save locally as fallback
        console.log('Attempting to save locally as fallback...');
        try {
          const localReferences = JSON.parse(localStorage.getItem('adminReferences') || '[]');
          const newReference = {
            id: Date.now(),
            ...formData,
            created_at: new Date().toISOString()
          };
          
          if (editingReference) {
            const index = localReferences.findIndex(ref => ref.id === editingReference.id);
            if (index !== -1) {
              localReferences[index] = { ...editingReference, ...formData };
            }
          } else {
            localReferences.push(newReference);
          }
          
          localStorage.setItem('adminReferences', JSON.stringify(localReferences));
          setReferences(localReferences);
          resetForm();
          setShowAddModal(false);
          setEditingReference(null);
          alert('Referencia uložená lokálne (databáza nedostupná)');
        } catch (localError) {
          console.error('Local save failed:', localError);
          alert(result.message || 'Chyba pri ukladaní referencie');
        }
      }
    } catch (error) {
      console.error('Error saving reference:', error);
      alert('Chyba pri ukladaní referencie: ' + error.message);
    }
  };

  const handleEdit = (reference) => {
    setEditingReference(reference);
    setFormData({
      title: reference.title || '',
      description: reference.description || '',
      year: reference.year || '',
      location: reference.location || '',
      client: reference.client || '',
      images: reference.images || []
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Naozaj chcete vymazať túto referenciu?')) {
      try {
        const result = await ApiService.deleteReference(id);
        if (result.success) {
          await loadReferences();
        } else {
          alert('Chyba pri mazaní referencie');
        }
      } catch (error) {
        console.error('Error deleting reference:', error);
        alert('Chyba pri mazaní referencie');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      year: '',
      location: '',
      client: '',
      images: []
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImage(true);
    try {
      const uploadedImages = [];
      
      for (const file of files) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} nie je obrázok`);
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} je príliš veľký (max 5MB)`);
          continue;
        }

        // Convert to data URL for storage
        const dataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });

        uploadedImages.push({
          id: Date.now() + Math.random(),
          filename: file.name,
          originalName: file.name,
          url: dataUrl,
          size: file.size
        });
      }

      // Add uploaded images to form data
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));

    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Chyba pri nahrávaní obrázkov');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const handleAddNew = () => {
    resetForm();
    setEditingReference(null);
    setShowAddModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Načítavam referencie...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Správa referencií</h1>
          <p className="text-gray-400">Spravujte vaše referencie a projekty</p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
        >
          <span className="text-xl">+</span>
          Pridať referenciu
        </button>
      </div>

      {/* References Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {references.map((reference) => (
          <div key={reference.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">{reference.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{reference.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{reference.year}</span>
                {reference.location && <span>{reference.location}</span>}
              </div>
              {reference.client && (
                <p className="text-sm text-gray-500 mt-1">Klient: {reference.client}</p>
              )}
              {reference.images && reference.images.length > 0 && (
                <p className="text-sm text-blue-400 mt-1">📷 {reference.images.length} obrázkov</p>
              )}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(reference)}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Upraviť
              </button>
              <button
                onClick={() => handleDelete(reference.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Vymazať
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {references.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-400 mb-2">Žiadne referencie</h3>
            <p className="text-gray-500 mb-6">Začnite pridaním vašej prvej referencie</p>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <span className="text-xl">+</span>
              Pridať prvú referenciu
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingReference ? 'Upraviť referenciu' : 'Pridať novú referenciu'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingReference(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Názov projektu *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="napr. Hotel Grandezza Bratislava"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Popis *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="napr. 120 hotelových kúpeľní"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rok *
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="napr. 2023 alebo 2021-2023"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Lokalita
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="napr. Bratislava"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Klient
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="napr. Hotel Group s.r.o."
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Obrázky projektu
                </label>
                
                {/* Upload Button */}
                <div className="mb-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={uploadingImage}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg cursor-pointer transition-colors ${
                      uploadingImage 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    {uploadingImage ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Nahráva sa...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Pridať obrázky
                      </>
                    )}
                  </label>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP (max 5MB každý)</p>
                </div>

                {/* Image Preview Grid */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <img
                            src={image.url}
                            alt={image.originalName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(image.id)}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm transition-colors opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                        <p className="text-xs text-gray-400 mt-1 truncate">{image.originalName}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingReference(null);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Zrušiť
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  {editingReference ? 'Uložiť zmeny' : 'Pridať referenciu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </AdminLayout>
  );
};

export default AdminReferences;
