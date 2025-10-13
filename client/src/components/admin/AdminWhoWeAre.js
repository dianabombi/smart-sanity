import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';

const AdminWhoWeAre = ({ onLogout }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    size: 'large'
  });

  useEffect(() => {
    loadSections();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadSections = async () => {
    try {
      setLoading(true);
      
      // Try to load from localStorage first (for offline functionality)
      const localSections = localStorage.getItem('adminWhoWeAreSections');
      if (localSections) {
        const parsed = JSON.parse(localSections);
        setSections(parsed);
      }
      
      // Then try to load from API
      const result = await ApiService.getWhoWeAreSections();
      if (result.success) {
        setSections(result.sections);
      } else {
        if (!localSections) {
          // Load default sections
          const defaultSections = getDefaultSections();
          setSections(defaultSections);
          localStorage.setItem('adminWhoWeAreSections', JSON.stringify(defaultSections));
        }
      }
    } catch (error) {
      console.error('Error loading sections:', error);
      const localSections = localStorage.getItem('adminWhoWeAreSections');
      if (localSections) {
        setSections(JSON.parse(localSections));
      } else {
        const defaultSections = getDefaultSections();
        setSections(defaultSections);
      }
    } finally {
      setLoading(false);
    }
  };

  const getDefaultSections = () => [
    {
      id: 1,
      title: "O spoločnosti",
      content: "Spoločnosť Smart Sanit s.r.o. vznikla v roku 2024 ako obchodná spoločnosť, ktorej hlavnou náplňou je ponuka dizajnových produktov v oblasti obkladov, dlažieb a kompletného vybavenia kúpeľní.",
      order: 1,
      size: "large"
    },
    {
      id: 2,
      title: "Naša vízia",
      content: "Ako milovníci dizajnu sledujeme najnovšie trendy v danej oblasti. S nami sa dotknete krásy a pocítite emóciu dizajnu na vlastnej koži.",
      order: 2,
      size: "large"
    },
    {
      id: 3,
      title: "Pre našich klientov",
      content: "Našim klientom ponúkame moderné, funkčné a na mieru šité riešenia, ktoré svojím budúcim užívateľom prinášajú každodenný pocit komfortu, pohody a spoľahlivosti.",
      order: 3,
      size: "large"
    },
    {
      id: 4,
      title: "Partnerstvo",
      content: "Partnersky spolupracujeme so štúdiom EB+K.",
      order: 4,
      size: "small"
    }
  ];

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
      let result;
      if (editingSection) {
        result = await ApiService.updateWhoWeAreSection(editingSection.id, formData);
      } else {
        result = await ApiService.createWhoWeAreSection(formData);
      }

      if (result.success) {
        await loadSections();
        resetForm();
        setShowAddModal(false);
        setEditingSection(null);
        setSuccess('Sekcia bola úspešne uložená!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        // Try to save locally as fallback
        try {
          const localSections = JSON.parse(localStorage.getItem('adminWhoWeAreSections') || '[]');
          const newSection = {
            id: Date.now(),
            ...formData,
            order: localSections.length + 1,
            created_at: new Date().toISOString()
          };
          
          if (editingSection) {
            const index = localSections.findIndex(sec => sec.id === editingSection.id);
            if (index !== -1) {
              localSections[index] = { ...editingSection, ...formData };
            }
          } else {
            localSections.push(newSection);
          }
          
          localStorage.setItem('adminWhoWeAreSections', JSON.stringify(localSections));
          setSections(localSections);
          resetForm();
          setShowAddModal(false);
          setEditingSection(null);
          setSuccess('Sekcia uložená lokálne (databáza nedostupná)');
          setTimeout(() => setSuccess(''), 3000);
        } catch (localError) {
          setError(result.message || 'Chyba pri ukladaní sekcie');
        }
      }
    } catch (error) {
      console.error('Error saving section:', error);
      setError('Chyba pri ukladaní sekcie: ' + error.message);
    }
  };

  const handleEdit = (section) => {
    setEditingSection(section);
    setFormData({
      title: section.title || '',
      content: section.content || '',
      size: section.size || 'large'
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Naozaj chcete vymazať túto sekciu?')) {
      try {
        const result = await ApiService.deleteWhoWeAreSection(id);
        if (result.success) {
          await loadSections();
          setSuccess('Sekcia bola vymazaná');
          setTimeout(() => setSuccess(''), 3000);
        } else {
          // Try local delete
          const localSections = JSON.parse(localStorage.getItem('adminWhoWeAreSections') || '[]');
          const filteredSections = localSections.filter(sec => sec.id !== id);
          localStorage.setItem('adminWhoWeAreSections', JSON.stringify(filteredSections));
          setSections(filteredSections);
          setSuccess('Sekcia vymazaná lokálne');
          setTimeout(() => setSuccess(''), 3000);
        }
      } catch (error) {
        console.error('Error deleting section:', error);
        setError('Chyba pri mazaní sekcie');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      size: 'large'
    });
  };

  const handleAddNew = () => {
    resetForm();
    setEditingSection(null);
    setShowAddModal(true);
  };

  if (loading) {
    return (
      <AdminLayout onLogout={onLogout}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Načítavam sekcie...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Správa sekcií - O nás</h1>
            <p className="text-gray-400">Spravujte sekcie na stránke "O nás"</p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <span className="text-xl">+</span>
            Pridať sekciu
          </button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mb-6">
            <p className="text-green-400">{success}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div key={section.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
                <p className="text-gray-400 text-sm mb-2 line-clamp-3">{section.content}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded text-xs ${
                    section.size === 'large' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                  }`}>
                    {section.size === 'large' ? 'Veľká' : 'Malá'}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(section)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Upraviť
                </button>
                <button
                  onClick={() => handleDelete(section.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Vymazať
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {sections.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-400 mb-2">Žiadne sekcie</h3>
              <p className="text-gray-500 mb-6">Začnite pridaním vašej prvej sekcie</p>
              <button
                onClick={handleAddNew}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
              >
                <span className="text-xl">+</span>
                Pridať prvú sekciu
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
                  {editingSection ? 'Upraviť sekciu' : 'Pridať novú sekciu'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingSection(null);
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
                    Nadpis sekcie *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="napr. O spoločnosti"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Obsah *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Zadajte obsah sekcie..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Veľkosť sekcie
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="large">Veľká (široká)</option>
                    <option value="small">Malá (úzka)</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingSection(null);
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
                    {editingSection ? 'Uložiť zmeny' : 'Pridať sekciu'}
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

export default AdminWhoWeAre;
