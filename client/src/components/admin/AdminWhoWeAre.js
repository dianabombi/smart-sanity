import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';
import EmergencyBrands from '../../services/emergencyBrands';

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
  const [ebkLogo, setEbkLogo] = useState('/ebk-logo.svg');
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [partnershipText, setPartnershipText] = useState('Partnersky spolupracujeme s interiérovým štúdiom');
  const [editingPartnershipText, setEditingPartnershipText] = useState(false);
  const [tempPartnershipText, setTempPartnershipText] = useState('');

  useEffect(() => {
    loadSections();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadSections = async () => {
    try {
      setLoading(true);
      
      // CRITICAL FIX: Load EB+K logo from Supabase database (not localStorage)
      try {
        console.log('🚨 ADMIN: Loading EB+K logo from Supabase database...');
        const brandsResult = await ApiService.getBrands();
        if (brandsResult.success && brandsResult.brands) {
          const ebkBrand = brandsResult.brands.find(brand => 
            brand.name.includes('Elite Bath + Kitchen') || brand.name.includes('EB+K')
          );
          if (ebkBrand && ebkBrand.logo) {
            console.log('✅ ADMIN: Found EB+K logo in database:', ebkBrand.logo.substring(0, 50) + '...');
            setEbkLogo(ebkBrand.logo);
          } else {
            console.log('⚠️ ADMIN: No EB+K logo found in database');
          }
        }
      } catch (error) {
        console.error('🚨 ADMIN: Database error loading EB+K logo:', error);
        // Fallback to emergency brands only if database fails
        const brandsResult = EmergencyBrands.getBrands();
        if (brandsResult.success) {
          const ebkBrand = brandsResult.brands.find(brand => 
            brand.name.includes('Elite Bath + Kitchen') || brand.name.includes('EB+K')
          );
          if (ebkBrand && ebkBrand.logo) {
            setEbkLogo(ebkBrand.logo);
          }
        }
      }
      
      // EMERGENCY: Always load default sections first to ensure they exist
      const defaultSections = getDefaultSections();
      console.log('🚨 ADMIN: Loading simplified default sections:', defaultSections);
      
      // FORCE RESET: Clear everything and use new simplified sections
      console.log('🔄 ADMIN: FORCE RESET - Clearing all cached data...');
      localStorage.removeItem('adminWhoWeAreSections');
      setSections(defaultSections);
      localStorage.setItem('adminWhoWeAreSections', JSON.stringify(defaultSections));
      
      // Skip API loading to prevent overriding the simplified structure
      console.log('✅ ADMIN: Using simplified sections only (API skipped)');

      // Load partnership text
      try {
        const partnershipResult = await ApiService.getPageContent('who-we-are', 'partnership', 'text');
        if (partnershipResult.success && partnershipResult.content) {
          setPartnershipText(partnershipResult.content);
        }
      } catch (error) {
        console.log('⚠️ ADMIN: Failed to load partnership text, using default');
      }
      
    } catch (error) {
      console.error('🚨 ADMIN: Critical error loading sections:', error);
      const defaultSections = getDefaultSections();
      setSections(defaultSections);
      localStorage.setItem('adminWhoWeAreSections', JSON.stringify(defaultSections));
    } finally {
      setLoading(false);
    }
  };

  const getDefaultSections = () => [
    {
      id: 1,
      title: "O spoločnosti",
      content: "Spoločnosť Smart Sanit s.r.o. vznikla v roku 2024 ako obchodná spoločnosť, ktorej hlavnou náplňou je ponuka dizajnových produktov v oblasti obkladov, dlažieb a kompletného vybavenia kúpeľní.\n\nAko milovníci dizajnu sledujeme najnovšie trendy v danej oblasti. S nami sa dotknete krásy a pocítite emóciu dizajnu na vlastnej koži.\n\nNašim klientom ponúkame moderné, funkčné a na mieru šité riešenia, ktoré svojím budúcim užívateľom prinášajú každodenný pocit komfortu, pohody a spoľahlivosti.",
      order: 1,
      size: "large"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEbkLogoUpload = async (event) => {
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
      
      console.log('🚨 ADMIN: Uploading EB+K logo to Supabase database...');
      
      // Convert file to data URL
      const reader = new FileReader();
      reader.onload = async (e) => {
        const logoDataUrl = e.target.result;
        
        try {
          // Update EB+K brand in Supabase database
          const result = await ApiService.updateBrandLogo('Elite Bath + Kitchen (EB+K)', logoDataUrl);
          
          if (result.success) {
            console.log('✅ ADMIN: EB+K logo uploaded to database successfully!');
            setEbkLogo(logoDataUrl);
            setSuccess('EB+K logo bol úspešne aktualizovaný v databáze!');
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
          } else {
            console.error('❌ ADMIN: Database upload failed:', result.message);
            setError('Chyba pri ukladaní do databázy: ' + result.message);
          }
        } catch (error) {
          console.error('🚨 ADMIN: Critical database error:', error);
          setError('Kritická chyba databázy: ' + error.message);
        } finally {
          setUploadingLogo(false);
        }
      };
      
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error('🚨 ADMIN: Error uploading EB+K logo:', error);
      setError('Chyba pri nahrávaní EB+K loga');
      setUploadingLogo(false);
    }
    
    // Clear file input
    event.target.value = '';
  };

  // Partnership Text Management Functions
  const handlePartnershipTextEdit = () => {
    setTempPartnershipText(partnershipText);
    setEditingPartnershipText(true);
  };

  const handlePartnershipTextSave = async () => {
    try {
      // Save to page content system
      const result = await ApiService.updatePageContent('who-we-are', 'partnership', 'text', tempPartnershipText);
      
      if (result.success) {
        setPartnershipText(tempPartnershipText);
        setEditingPartnershipText(false);
        setTempPartnershipText('');
        setSuccess('Text partnerstva bol úspešne aktualizovaný!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Chyba pri aktualizácii textu: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating partnership text:', error);
      setError('Chyba pri aktualizácii textu partnerstva');
    }
  };

  const handlePartnershipTextCancel = () => {
    setEditingPartnershipText(false);
    setTempPartnershipText('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('🚨 ADMIN: Saving section to emergency localStorage...');
      
      // EMERGENCY: Save directly to localStorage for immediate updates
      const localSections = JSON.parse(localStorage.getItem('adminWhoWeAreSections') || '[]');
      
      if (editingSection) {
        // Update existing section
        const updatedSections = localSections.map(section => 
          section.id === editingSection.id ? { ...section, ...formData } : section
        );
        localStorage.setItem('adminWhoWeAreSections', JSON.stringify(updatedSections));
        setSections(updatedSections);
        console.log('✅ ADMIN: Section updated in localStorage');
      } else {
        // Add new section
        const newSection = {
          id: Date.now(),
          ...formData,
          order: localSections.length + 1,
          created_at: new Date().toISOString()
        };
        const updatedSections = [...localSections, newSection];
        localStorage.setItem('adminWhoWeAreSections', JSON.stringify(updatedSections));
        setSections(updatedSections);
        console.log('✅ ADMIN: New section added to localStorage');
      }

      resetForm();
      setShowAddModal(false);
      setEditingSection(null);
      setSuccess('Sekcia bola úspešne uložená do emergency systému!');
      setTimeout(() => setSuccess(''), 3000);

      // Try API save in background (optional)
      try {
        let result;
        if (editingSection) {
          result = await ApiService.updateWhoWeAreSection(editingSection.id, formData);
        } else {
          result = await ApiService.createWhoWeAreSection(formData);
        }
        if (result.success) {
          console.log('✅ ADMIN: Also saved to API successfully');
        }
      } catch (apiError) {
        console.log('⚠️ ADMIN: API save failed, but localStorage save succeeded');
      }

    } catch (error) {
      console.error('🚨 ADMIN: Critical save error:', error);
      setError('Chyba pri ukladaní sekcie');
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

  const handleForceReset = () => {
    if (window.confirm('Naozaj chcete resetovať všetky sekcie na predvolené nastavenia? Táto akcia sa nedá vrátiť späť.')) {
      console.log('🔄 ADMIN: Manual force reset triggered...');
      localStorage.removeItem('adminWhoWeAreSections');
      const defaultSections = getDefaultSections();
      setSections(defaultSections);
      localStorage.setItem('adminWhoWeAreSections', JSON.stringify(defaultSections));
      setSuccess('Sekcie boli resetované na predvolené nastavenia!');
      setTimeout(() => setSuccess(''), 3000);
    }
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
        </div>

        {/* EB+K Logo Management */}
        <div className="bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">EB+K Logo Management</h2>
          <div className="flex items-center space-x-6">
            {/* Current Logo Preview */}
            <div className="flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <img 
                  src={ebkLogo} 
                  alt="Elite Bath + Kitchen (EB+K)"
                  className="h-16 w-auto object-contain filter brightness-0 invert"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-white font-semibold text-center hidden">
                  EB+K
                </div>
              </div>
            </div>

            {/* Upload Controls */}
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <label 
                  htmlFor="ebk-logo-upload"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                    uploadingLogo 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {uploadingLogo ? 'Nahrávam...' : 'Nahrať EB+K Logo'}
                </label>
                <input
                  type="file"
                  id="ebk-logo-upload"
                  accept="image/*"
                  onChange={handleEbkLogoUpload}
                  disabled={uploadingLogo}
                  className="hidden"
                />
                <span className="text-gray-400 text-sm">
                  JPG, PNG, SVG, WebP (max 5MB)
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Logo sa zobrazí na stránke "O nás" v sekcii partnerstva a na stránke značiek.
              </p>
            </div>
          </div>
        </div>

        {/* Partnership Text Management */}
        <div className="bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Text partnerstva</h2>
              <p className="text-gray-400 text-sm">Text zobrazený v sekcii partnerstva na stránke "O nás"</p>
            </div>
            {!editingPartnershipText && (
              <button
                onClick={handlePartnershipTextEdit}
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Upraviť
              </button>
            )}
          </div>
          
          {editingPartnershipText ? (
            <div className="space-y-3">
              <textarea
                value={tempPartnershipText}
                onChange={(e) => setTempPartnershipText(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Zadajte text partnerstva..."
                maxLength={200}
              />
              <div className="flex gap-2">
                <button
                  onClick={handlePartnershipTextSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Uložiť
                </button>
                <button
                  onClick={handlePartnershipTextCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Zrušiť
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-gray-700 border border-gray-600 rounded-lg">
              <p className="text-white leading-relaxed">{partnershipText || 'Žiadny text nie je nastavený'}</p>
            </div>
          )}
        </div>

        {/* Add Section Button */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleForceReset}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            🔄 Resetovať sekcie
          </button>
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
