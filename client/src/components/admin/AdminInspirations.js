import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';

const AdminInspirations = ({ onLogout }) => {
  const [inspirations, setInspirations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingInspiration, setEditingInspiration] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'modern',
    image: '',
    features: [],
    brands: []
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadInspirations();
  }, []);

  const loadInspirations = async () => {
    try {
      setLoading(true);
      
      // Load from localStorage first
      const localInspirations = localStorage.getItem('adminInspirations');
      if (localInspirations) {
        const parsed = JSON.parse(localInspirations);
        setInspirations(parsed);
      } else {
        setInspirations(getDefaultInspirations());
      }
      
      // Try to load from API
      const result = await ApiService.getInspirations();
      if (result.success) {
        setInspirations(result.inspirations);
      }
    } catch (error) {
      console.error('Error loading inspirations:', error);
      setInspirations(getDefaultInspirations());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultInspirations = () => [
    {
      id: 1,
      title: 'Moderná kúpeľňa',
      description: 'Elegantný dizajn s čistými líniami.',
      category: 'modern',
      image: '/photos/ATX_AG0088.jpg',
      features: ['Moderný dizajn', 'Kvalitné materiály', 'Funkčnosť'],
      brands: ['Agape', 'Fantini', 'Cielo']
    }
  ];

  const handleImageUpload = async (file) => {
    try {
      setUploadingImage(true);
      
      // Convert to base64 for storage
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      
      const inspirationData = {
        ...formData,
        id: editingInspiration ? editingInspiration.id : Date.now()
      };
      
      let updatedInspirations;
      if (editingInspiration) {
        updatedInspirations = inspirations.map(insp => 
          insp.id === editingInspiration.id ? inspirationData : insp
        );
      } else {
        updatedInspirations = [...inspirations, inspirationData];
      }
      
      // Save to localStorage
      localStorage.setItem('adminInspirations', JSON.stringify(updatedInspirations));
      setInspirations(updatedInspirations);
      
      // Try to save to API
      try {
        if (editingInspiration) {
          await ApiService.updateInspiration(editingInspiration.id, inspirationData);
        } else {
          await ApiService.createInspiration(inspirationData);
        }
      } catch (apiError) {
        console.log('API save failed, using localStorage');
      }
      
      setSuccess(editingInspiration ? 'Inšpirácia aktualizovaná!' : 'Inšpirácia vytvorená!');
      resetForm();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Chyba pri ukladaní inšpirácie');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Naozaj chcete odstrániť túto inšpiráciu?')) return;
    
    try {
      const updatedInspirations = inspirations.filter(insp => insp.id !== id);
      localStorage.setItem('adminInspirations', JSON.stringify(updatedInspirations));
      setInspirations(updatedInspirations);
      
      try {
        await ApiService.deleteInspiration(id);
      } catch (apiError) {
        console.log('API delete failed, using localStorage');
      }
      
      setSuccess('Inšpirácia odstránená!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Chyba pri odstraňovaní inšpirácie');
      setTimeout(() => setError(''), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'modern',
      image: '',
      features: [],
      brands: []
    });
    setEditingInspiration(null);
    setShowAddModal(false);
  };

  const handleEdit = (inspiration) => {
    setFormData(inspiration);
    setEditingInspiration(inspiration);
    setShowAddModal(true);
  };

  if (loading) {
    return (
      <AdminLayout onLogout={onLogout}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Načítavam inšpirácie...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Správa inšpirácií</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Pridať inšpiráciu
          </button>
        </div>

        {/* Messages */}
        {success && (
          <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Inspirations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inspirations.map((inspiration) => (
            <div key={inspiration.id} className="bg-gray-800 rounded-lg p-6">
              {inspiration.image && (
                <img
                  src={inspiration.image}
                  alt={inspiration.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-white mb-2">{inspiration.title}</h3>
              <p className="text-gray-400 mb-3">{inspiration.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-400 capitalize">{inspiration.category}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(inspiration)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    Upraviť
                  </button>
                  <button
                    onClick={() => handleDelete(inspiration.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                  >
                    Odstrániť
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <InspirationModal
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            onImageUpload={handleImageUpload}
            uploadingImage={uploadingImage}
            isEditing={!!editingInspiration}
          />
        )}
      </div>
    </AdminLayout>
  );
};

// Modal Component
const InspirationModal = ({ formData, setFormData, onSubmit, onCancel, onImageUpload, uploadingImage, isEditing }) => {
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await onImageUpload(file);
        setFormData({...formData, image: imageUrl});
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const addFeature = () => {
    setFormData({...formData, features: [...formData.features, '']});
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({...formData, features: newFeatures});
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({...formData, features: newFeatures});
  };

  const addBrand = () => {
    setFormData({...formData, brands: [...formData.brands, '']});
  };

  const updateBrand = (index, value) => {
    const newBrands = [...formData.brands];
    newBrands[index] = value;
    setFormData({...formData, brands: newBrands});
  };

  const removeBrand = (index) => {
    const newBrands = formData.brands.filter((_, i) => i !== index);
    setFormData({...formData, brands: newBrands});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isEditing ? 'Upraviť inšpiráciu' : 'Pridať inšpiráciu'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-white text-2xl">×</button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Názov</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Popis</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Kategória</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="modern">Moderná</option>
              <option value="classic">Klasická</option>
              <option value="luxury">Luxusná</option>
              <option value="minimalist">Minimalistická</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Obrázok</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              disabled={uploadingImage}
            />
            {uploadingImage && <p className="text-blue-400 text-sm mt-2">Nahrávam obrázok...</p>}
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-300">Vlastnosti</label>
              <button type="button" onClick={addFeature} className="px-2 py-1 bg-green-600 text-white rounded text-sm">
                + Pridať
              </button>
            </div>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Vlastnosť"
                />
                <button type="button" onClick={() => removeFeature(index)} className="px-2 py-2 bg-red-600 text-white rounded">
                  ×
                </button>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-300">Značky</label>
              <button type="button" onClick={addBrand} className="px-2 py-1 bg-green-600 text-white rounded text-sm">
                + Pridať
              </button>
            </div>
            {formData.brands.map((brand, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => updateBrand(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Značka"
                />
                <button type="button" onClick={() => removeBrand(index)} className="px-2 py-2 bg-red-600 text-white rounded">
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Zrušiť
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {isEditing ? 'Aktualizovať' : 'Vytvoriť'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminInspirations;
