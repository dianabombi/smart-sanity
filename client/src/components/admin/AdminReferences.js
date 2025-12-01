import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';
import EmergencyReferences from '../../utils/EmergencyReferences';
import BackgroundControls from './shared/BackgroundControls';

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
  
  // Individual image editing
  const [editingImage, setEditingImage] = useState(null);
  const [tempImageTitle, setTempImageTitle] = useState('');
  
  // Background settings
  const [backgroundSettings, setBackgroundSettings] = useState({
    referencesPageBackgroundImage: null,
    backgroundImageSize: 'cover',
    backgroundImagePositionX: 'center',
    backgroundImagePositionY: 'center',
    backgroundImageOpacity: 0.3,
    backgroundImageBlur: 0,
    customPositionX: '50',
    customPositionY: '50'
  });
  const [backgroundLoading, setBackgroundLoading] = useState(false);
  const [backgroundMessage, setBackgroundMessage] = useState('');
  const [showCustomPosition, setShowCustomPosition] = useState(false);

  useEffect(() => {
    loadReferences();
    loadBackgroundSettings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const loadBackgroundSettings = async () => {
    try {
      console.log('📥 ADMIN REFERENCES: Loading background settings from database...');
      const response = await ApiService.getBackgroundSettings();
      console.log('📥 ADMIN REFERENCES: API response:', response);
      
      if (response.success && response.settings) {
        console.log('📥 ADMIN REFERENCES: Settings from DB:', {
          hasReferencesImage: !!response.settings.referencesPageBackgroundImage,
          imageLength: response.settings.referencesPageBackgroundImage?.length || 0,
          allKeys: Object.keys(response.settings)
        });
        
        setBackgroundSettings(prev => ({
          ...prev,
          referencesPageBackgroundImage: response.settings.referencesPageBackgroundImage,
          backgroundImageSize: response.settings.backgroundImageSize || 'cover',
          backgroundImagePositionX: response.settings.backgroundImagePositionX || 'center',
          backgroundImagePositionY: response.settings.backgroundImagePositionY || 'center',
          backgroundImageOpacity: response.settings.backgroundImageOpacity !== undefined ? response.settings.backgroundImageOpacity : 0.3,
          backgroundImageBlur: response.settings.backgroundImageBlur || 0
        }));
        
        console.log('📥 ADMIN REFERENCES: Settings state updated');
      } else {
        console.warn('⚠️ ADMIN REFERENCES: No settings returned from API');
      }
    } catch (error) {
      console.error('❌ ADMIN REFERENCES: Error loading background settings:', error);
    }
  };
  
  const handleBgImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('📤 ADMIN REFERENCES: File selected:', file.name, file.size, file.type);

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('📤 ADMIN REFERENCES: Image converted to base64, length:', reader.result.length);
        setBackgroundSettings(prev => {
          const newSettings = {
            ...prev,
            referencesPageBackgroundImage: reader.result
          };
          console.log('📤 ADMIN REFERENCES: Updated settings state:', {
            hasImage: !!newSettings.referencesPageBackgroundImage,
            imageLength: newSettings.referencesPageBackgroundImage?.length || 0
          });
          return newSettings;
        });
        setBackgroundMessage('Obrázok nahraný! Kliknite na "💾 Uložiť pozadie" pre uloženie.');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading background image:', error);
      setBackgroundMessage('Chyba pri nahrávaní obrázka');
    }
  };

  const saveBackgroundSettings = async () => {
    try {
      setBackgroundLoading(true);
      localStorage.removeItem('backgroundSettings');
      
      // Remove customPositionX/Y if not using custom positions (they're not in database schema)
      const { customPositionX, customPositionY, ...settingsToSave } = backgroundSettings;
      
      // Debug: Log what we're saving
      console.log('💾 ADMIN REFERENCES: Saving background settings:', settingsToSave);
      console.log('💾 ADMIN REFERENCES: Image key check:', {
        hasImage: !!settingsToSave.referencesPageBackgroundImage,
        imageLength: settingsToSave.referencesPageBackgroundImage?.length || 0
      });
      
      const response = await ApiService.updateBackgroundSettings(settingsToSave);
      console.log('💾 ADMIN REFERENCES: Save response:', response);
      
      if (response.success) {
        setBackgroundMessage('✅ Nastavenia uložené! Zmeny sa prejavia na stránke do 2 sekúnd.');
        setTimeout(() => setBackgroundMessage(''), 5000);
      } else {
        setBackgroundMessage('Chyba pri ukladaní nastavení pozadia');
      }
    } catch (error) {
      console.error('Error saving background settings:', error);
      setBackgroundMessage('Chyba pri ukladaní nastavení pozadia: ' + error.message);
    } finally {
      setBackgroundLoading(false);
    }
  };

  const loadReferences = async () => {
    try {
      setLoading(true);
      
      // Load from API (database)
      console.log('🔍 DEBUG: Loading references from database...');
      const result = await ApiService.getReferences();
      
      if (result.success) {
        console.log(`✅ SUCCESS: Loaded ${result.references.length} references from database:`, result.references);
        setReferences(result.references);
        console.log('✅ State updated: setReferences called with', result.references.length, 'items');
        
        // Don't save to localStorage - data is too large with images
        // localStorage.setItem('adminReferences', JSON.stringify(result.references));
      } else {
        console.error('❌ DATABASE FAILED:', result.message);
        setReferences([]);
      }
    } catch (error) {
      console.error('💥 EXCEPTION in loadReferences:', error);
      console.error('💥 Error details:', error.message, error.stack);
      setReferences([]);
    } finally {
      setLoading(false);
      console.log('🏁 loadReferences FINISHED - loading set to false');
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
        console.log('✅ Reference saved successfully to database');
        await loadReferences();
        resetForm();
        setShowAddModal(false);
        setEditingReference(null);
        alert('Referencia bola úspešne uložená!');
      } else {
        console.error('❌ DATABASE UPDATE FAILED');
        console.error('Error message:', result.message);
        console.error('Form data that failed:', formData);
        console.error('Reference ID:', editingReference?.id);
        
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
          alert(`⚠️ CHYBA DATABÁZY: ${result.message}\n\nReferencia bola dočasne uložená lokálne, ale ZMIZNE po obnovení stránky!\n\nSkontrolujte konzolu (F12) pre viac detailov.`);
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
        console.log('Deleting reference with ID:', id);
        
        const result = await ApiService.deleteReference(id);
        
        if (result.success) {
          console.log('Reference deleted successfully from database');
          await loadReferences();
          alert('Referencia bola úspešne vymazaná!');
        } else {
          console.error('API delete failed:', result.message);
          
          // Try to delete using EmergencyReferences as fallback
          console.log('Attempting to delete using EmergencyReferences fallback...');
          try {
            const deleteResult = EmergencyReferences.deleteReference(id);
            if (deleteResult.success) {
              await loadReferences();
              alert('Referencia vymazaná lokálne (databáza nedostupná)');
            } else {
              alert('Chyba pri mazaní referencie');
            }
          } catch (localError) {
            console.error('EmergencyReferences delete failed:', localError);
            alert('Chyba pri mazaní referencie');
          }
        }
      } catch (error) {
        console.error('Error deleting reference:', error);
        
        // Try EmergencyReferences as final fallback
        try {
          const deleteResult = EmergencyReferences.deleteReference(id);
          if (deleteResult.success) {
            await loadReferences();
            alert('Referencia vymazaná lokálne (databáza nedostupná)');
          } else {
            alert('Chyba pri mazaní referencie');
          }
        } catch (localError) {
          console.error('Final fallback failed:', localError);
          alert('Chyba pri mazaní referencie');
        }
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

        // Validate file size (max 32MB)
        if (file.size > 32 * 1024 * 1024) {
          alert(`${file.name} je príliš veľký (max 32MB)`);
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

  const handleEditImage = (image) => {
    setEditingImage(image);
    setTempImageTitle(image.title || '');
  };

  const handleImageTitleSave = async () => {
    if (!editingImage || !editingReference) {
      console.error('Missing editingImage or editingReference:', { editingImage, editingReference });
      alert('Chyba: Chýbajú potrebné údaje');
      return;
    }
    
    try {
      console.log('Attempting to update image title:', {
        referenceId: editingReference.id,
        imageId: editingImage.id,
        newTitle: tempImageTitle
      });
      
      const result = await ApiService.updateReferenceImageTitle(
        editingReference.id,
        editingImage.id,
        tempImageTitle
      );
      
      console.log('API result:', result);
      
      if (result.success) {
        // Update local formData
        const updatedImages = formData.images.map(img => 
          img.id === editingImage.id ? { ...img, title: tempImageTitle } : img
        );
        setFormData({ ...formData, images: updatedImages });
        
        // Reload references
        await loadReferences();
        
        setEditingImage(null);
        setTempImageTitle('');
        alert('Názov obrázka bol úspešne aktualizovaný!');
      } else {
        console.error('Update failed:', result.message);
        alert('Chyba pri aktualizácii názvu: ' + result.message);
      }
    } catch (error) {
      console.error('Exception while updating image title:', error);
      alert('Chyba pri aktualizácii názvu obrázka: ' + error.message);
    }
  };

  const handleImageTitleCancel = () => {
    setEditingImage(null);
    setTempImageTitle('');
  };

  const handleAddNew = () => {
    resetForm();
    setEditingReference(null);
    setShowAddModal(true);
  };

  console.log('🎨 RENDER: AdminReferences rendering with', references.length, 'references');
  console.log('🎨 RENDER: Loading state:', loading);
  console.log('🎨 RENDER: References array:', references);

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
          <p className="text-sm text-blue-400 mt-1">
            📊 Aktuálne zobrazených: {references.length} referencií
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              console.log('🔄 Manual refresh triggered');
              loadReferences();
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            🔄 Obnoviť
          </button>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <span className="text-xl">+</span>
            Pridať referenciu
          </button>
        </div>
      </div>

      {/* Background Settings */}
      <BackgroundControls
        backgroundSettings={backgroundSettings}
        setBackgroundSettings={setBackgroundSettings}
        backgroundLoading={backgroundLoading}
        backgroundMessage={backgroundMessage}
        onSave={saveBackgroundSettings}
        onImageUpload={handleBgImageUpload}
        showCustomPosition={showCustomPosition}
        setShowCustomPosition={setShowCustomPosition}
        pageKey="referencesPage"
      />

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
                <p className="text-sm text-gray-500 mt-1">Architekt: {reference.client}</p>
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
                className="hover:opacity-70 transition-all duration-200"
              >
                <img src="/icons/close.png" alt="Close" className="w-6 h-6" />
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
                  Architekt
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="napr. Studio E, Identity Architecture, ZADESIGN..."
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
                      <div key={image.id} className="relative group bg-gray-700 rounded-lg p-2">
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden mb-2">
                          <img
                            src={image.url}
                            alt={image.title || image.originalName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex gap-1 mb-1">
                          <button
                            type="button"
                            onClick={() => handleEditImage(image)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded px-2 py-1 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                            title="Upraviť názov"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Upraviť
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(image.id)}
                            className="bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-xs font-medium transition-colors"
                            title="Odstrániť obrázok"
                          >
                            ×
                          </button>
                        </div>
                        
                        {/* Image title or filename */}
                        <p className="text-xs text-gray-300 font-medium truncate" title={image.title || image.originalName}>
                          {image.title || image.originalName || 'Bez názvu'}
                        </p>
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

      {/* Edit Image Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full border border-gray-700">
            {/* Header */}
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Upraviť názov obrázka
              </h2>
              <button
                onClick={handleImageTitleCancel}
                className="hover:opacity-70 transition-all duration-200"
              >
                <img src="/icons/close.png" alt="Close" className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Image Preview */}
              <div className="mb-6">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={editingImage.url}
                    alt={editingImage.title || 'Image'}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>

              {/* Title Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Názov obrázka
                </label>
                <input
                  type="text"
                  value={tempImageTitle}
                  onChange={(e) => setTempImageTitle(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="napr. Recepcia - dizajnový nábytok"
                  maxLength={200}
                  autoFocus
                />
                <p className="text-xs text-gray-400 mt-1">
                  Tento názov sa zobrazí pri maximalizovanom obrázku na verejnej stránke
                </p>
              </div>

              {/* Original filename info */}
              <div className="mb-6 p-3 bg-gray-900 rounded-lg border border-gray-700">
                <p className="text-xs text-gray-400">
                  <span className="font-medium">Pôvodný názov súboru:</span> {editingImage.originalName || 'N/A'}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
              <button
                onClick={handleImageTitleCancel}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Zrušiť
              </button>
              <button
                onClick={handleImageTitleSave}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                Uložiť názov
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </AdminLayout>
  );
};

export default AdminReferences;
