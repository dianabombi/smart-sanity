import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';

const AdminWhyChooseUs = ({ onLogout }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    items: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await ApiService.getWhyChooseUs();
      
      if (result.success && result.data) {
        setData(result.data);
        setFormData({
          title: result.data.title || '',
          subtitle: result.data.subtitle || '',
          items: result.data.items || []
        });
      } else {
        // No data exists, set defaults
        setData(null);
        setFormData({
          title: 'Prečo si vybrať SMART SANIT?',
          subtitle: '',
          items: [
            {
              title: 'Kvalita',
              description: 'Všetky naše značky sú synonymom pre najvyššiu kvalitu a spoľahlivosť.',
              icon: 'quality'
            },
            {
              title: 'Inovácia',
              description: 'Najnovšie technológie a dizajnové trendy v sanitárnej technike.',
              icon: 'innovation'
            },
            {
              title: 'Servis',
              description: 'Komplexný servis a poradenstvo pre všetky naše produkty.',
              icon: 'service'
            }
          ]
        });
      }
    } catch (error) {
      console.error('Error loading why choose us data:', error);
      setError('Chyba pri načítavaní údajov');
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

  const handleItemChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { title: '', description: '', icon: '' }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      console.log('🔄 ADMIN: Saving Why Choose Us data...');
      console.log('📊 Current data:', data);
      console.log('📝 Form data to save:', formData);

      let result;
      if (data && data.id) {
        console.log('🔄 Updating existing record with ID:', data.id);
        result = await ApiService.updateWhyChooseUs(data.id, formData);
      } else {
        console.log('🔄 Creating new record');
        result = await ApiService.createWhyChooseUs(formData);
      }
      
      console.log('📊 Save result:', result);
      
      if (result.success) {
        console.log('✅ Save successful!');
        setData(result.data);
        setEditing(false);
        setSuccess('Sekcia bola úspešne uložená!');
        setTimeout(() => setSuccess(''), 3000);
        // Reload data to ensure consistency
        await loadData();
      } else {
        console.error('❌ Save failed:', result.message);
        setError('Chyba pri ukladaní: ' + (result.message || 'Neznáma chyba'));
      }
    } catch (error) {
      console.error('❌ Save error:', error);
      setError('Chyba pri ukladaní sekcie: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    if (data) {
      setFormData({
        title: data.title || '',
        subtitle: data.subtitle || '',
        items: data.items || []
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout onLogout={onLogout}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Načítavam údaje...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Prečo si vybrať SMART SANIT?</h1>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Sekcia obsahu</h2>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                ✏️ Upraviť
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  {saving ? 'Ukladám...' : 'Uložiť'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Zrušiť
                </button>
              </div>
            )}
          </div>

          {editing ? (
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hlavný nadpis
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Prečo si vybrať SMART SANIT?"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Podnadpis (voliteľný)
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Voliteľný podnadpis..."
                />
              </div>

              {/* Items */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Položky (Kvalita, Inovácia, Servis...)
                  </label>
                  <button
                    onClick={addItem}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    ➕ Pridať položku
                  </button>
                </div>
                
                <div className="space-y-4">
                  {formData.items.map((item, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-medium">Položka {index + 1}</h4>
                        <button
                          onClick={() => removeItem(index)}
                          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm transition-colors"
                        >
                          🗑️ Odstrániť
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Nadpis</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-500 bg-gray-600 text-white rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Kvalita"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Ikona</label>
                          <select
                            value={item.icon}
                            onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-500 bg-gray-600 text-white rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="">Vyberte ikonu</option>
                            <option value="quality">🏆 Kvalita</option>
                            <option value="innovation">💡 Inovácia</option>
                            <option value="service">🔧 Servis</option>
                            <option value="design">🎨 Dizajn</option>
                            <option value="experience">⭐ Skúsenosti</option>
                            <option value="support">📞 Podpora</option>
                          </select>
                        </div>
                        <div className="md:col-span-1">
                          <label className="block text-xs text-gray-400 mb-1">Popis</label>
                          <textarea
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            rows={2}
                            className="w-full px-2 py-1 border border-gray-500 bg-gray-600 text-white rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-vertical"
                            placeholder="Popis položky..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-600">
                <h3 className="text-2xl font-bold text-white text-center mb-6">
                  {formData.title || 'Prečo si vybrať SMART SANIT?'}
                </h3>
                {formData.subtitle && (
                  <p className="text-gray-300 text-center mb-8">{formData.subtitle}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {formData.items.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl mb-4">
                        {item.icon === 'quality' && '🏆'}
                        {item.icon === 'innovation' && '💡'}
                        {item.icon === 'service' && '🔧'}
                        {item.icon === 'design' && '🎨'}
                        {item.icon === 'experience' && '⭐'}
                        {item.icon === 'support' && '📞'}
                        {!item.icon && '📋'}
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-3">{item.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminWhyChooseUs;
