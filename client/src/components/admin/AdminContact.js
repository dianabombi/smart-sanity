import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';
import BackgroundControls from './shared/BackgroundControls';

const AdminContact = ({ onLogout }) => {
  const [contactContent, setContactContent] = useState({
    title: '',
    subtitle: '',
    formTitle: '',
    contactInfoTitle: '',
    servicesTitle: '',
    contactDetails: {
      manager: '',
      phone: '',
      email: '',
      address: ''
    },
    services: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [editingSection, setEditingSection] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('sk');
  
  // Background settings
  const [backgroundSettings, setBackgroundSettings] = useState({
    contactPageBackgroundImage: null,
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
    loadContactContent(selectedLanguage);
    loadBackgroundSettings();
  }, [selectedLanguage]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
  };
  
  const loadBackgroundSettings = async () => {
    try {
      const response = await ApiService.getBackgroundSettings();
      if (response.success && response.settings) {
        setBackgroundSettings(prev => ({
          ...prev,
          contactPageBackgroundImage: response.settings.contactPageBackgroundImage,
          backgroundImageSize: response.settings.backgroundImageSize || 'cover',
          backgroundImagePositionX: response.settings.backgroundImagePositionX || 'center',
          backgroundImagePositionY: response.settings.backgroundImagePositionY || 'center',
          backgroundImageOpacity: response.settings.backgroundImageOpacity !== undefined ? response.settings.backgroundImageOpacity : 0.3,
          backgroundImageBlur: response.settings.backgroundImageBlur || 0
        }));
      }
    } catch (error) {
      console.error('Error loading background settings:', error);
    }
  };
  
  const handleBgImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundSettings(prev => ({
          ...prev,
          contactPageBackgroundImage: reader.result
        }));
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
      
      // Remove customPositionX/Y (not in database schema)
      const { customPositionX, customPositionY, ...settingsToSave } = backgroundSettings;
      
      const response = await ApiService.updateBackgroundSettings(settingsToSave);
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

  const loadContactContent = async (language = 'sk') => {
    try {
      setLoading(true);
      
      // Set default content immediately for selected language
      setContactContent(getDefaultContent(language));
      
      // Try to load from API first (priority over localStorage)
      const result = await ApiService.getContactContent(language);
      if (result.success && result.content) {
        setContactContent(result.content);
        // Also save to localStorage for offline use
        const localKey = `adminContactContent_${language}`;
        localStorage.setItem(localKey, JSON.stringify(result.content));
        console.log(`Loaded contact content from API (${language}):`, result.content);
      } else {
        // Fallback to localStorage if API fails
        const localKey = `adminContactContent_${language}`;
        const localContent = localStorage.getItem(localKey);
        if (localContent) {
          const parsed = JSON.parse(localContent);
          setContactContent(parsed);
          console.log(`Loaded contact content from localStorage (${language}):`, parsed);
        }
      }
    } catch (error) {
      console.error('Error loading contact content:', error);
      setContactContent(getDefaultContent(language));
    } finally {
      setLoading(false);
    }
  };

  const getDefaultContent = (language = 'sk') => {
    if (language === 'en') {
      return {
        title: 'Contact',
        subtitle: 'Have questions or need advice? Contact us and we will be happy to help you choose the right solutions for your bathroom.',
        formTitle: 'Write to Us',
        contactInfoTitle: 'Contact Information',
        servicesTitle: 'Our Services',
        contactDetails: {
          manager: 'Ing. Dušan Drinka, PhD.',
          phone: '+421 948 882 376',
          email: 'dusan.drinka@smartsanit.sk',
          address: 'Továrenská 14\n811 09 Bratislava'
        },
        services: [
          'Bathroom design and consulting',
          'Sanitary equipment supply',
          'Installation and assembly',
          'Service and maintenance',
          'Technical support'
        ]
      };
    }
    return {
      title: 'Kontakt',
      subtitle: 'Máte otázky alebo potrebujete poradenstvo? Kontaktujte nás a radi vám pomôžeme s výberom správnych riešení pre vašu kúpeľňu.',
      formTitle: 'Napíšte nám',
      contactInfoTitle: 'Kontaktné údaje',
      servicesTitle: 'Naše služby',
      contactDetails: {
        manager: 'Ing. Dušan Drinka, PhD.',
        phone: '+421 948 882 376',
        email: 'dusan.drinka@smartsanit.sk',
        address: 'Továrenská 14\n811 09 Bratislava'
      },
      services: [
        'Poradenstvo a návrh kúpeľní',
        'Dodávka sanitárnych zariadení',
        'Inštalácia a montáž',
        'Servis a údržba',
        'Technická podpora'
      ]
    };
  };

  const handleSave = async (section, data) => {
    try {
      setSaving(true);
      setError('');
      
      const updatedContent = { ...contactContent };
      
      if (section === 'basic') {
        updatedContent.title = data.title;
        updatedContent.subtitle = data.subtitle;
      } else if (section === 'titles') {
        updatedContent.formTitle = data.formTitle;
        updatedContent.contactInfoTitle = data.contactInfoTitle;
        updatedContent.servicesTitle = data.servicesTitle;
      } else if (section === 'contactDetails') {
        updatedContent.contactDetails = data;
      } else if (section === 'services') {
        updatedContent.services = data;
      }
      
      // Save to localStorage immediately
      const localKey = `adminContactContent_${selectedLanguage}`;
      localStorage.setItem(localKey, JSON.stringify(updatedContent));
      setContactContent(updatedContent);
      
      // Try to save to API
      const result = await ApiService.updateContactContent(updatedContent, selectedLanguage);
      if (result.success) {
        setSuccess(`Obsah kontaktu (${selectedLanguage.toUpperCase()}) úspešne aktualizovaný!`);
      } else {
        setSuccess(`Obsah kontaktu (${selectedLanguage.toUpperCase()}) uložený lokálne (API nedostupné)`);
      }
      
      setEditingSection(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving contact content:', error);
      setError('Chyba pri ukladaní obsahu');
      setTimeout(() => setError(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout onLogout={onLogout}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Načítavam obsah kontaktu...</p>
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
          <h1 className="text-3xl font-bold text-white">
            {selectedLanguage === 'en' ? '🇬🇧 Contact Management (EN)' : '🇸🇰 Správa kontaktu (SK)'}
          </h1>
          
          {/* Language Toggle */}
          <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-1">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLanguageChange('sk');
              }}
              className={`px-4 py-2 rounded-md font-medium transition-all cursor-pointer ${
                selectedLanguage === 'sk'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:text-white hover:bg-gray-500'
              }`}
            >
              🇸🇰 SK
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLanguageChange('en');
              }}
              className={`px-4 py-2 rounded-md font-medium transition-all cursor-pointer ${
                selectedLanguage === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:text-white hover:bg-gray-500'
              }`}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>
        
        {/* Language Info */}
        <div className={`${selectedLanguage === 'en' ? 'bg-green-900/30 border-green-700' : 'bg-blue-900/30 border-blue-700'} border rounded-lg p-3`}>
          <p className={`${selectedLanguage === 'en' ? 'text-green-300' : 'text-blue-300'} text-sm`}>
            📝 Upravujete obsah pre: <strong>{selectedLanguage === 'sk' ? 'Slovenčinu 🇸🇰' : 'Angličtinu 🇬🇧'}</strong>
            {selectedLanguage === 'en' && <span className="ml-2">(English mode active)</span>}
          </p>
        </div>

        {/* Success/Error Messages */}
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
          pageKey="contactPage"
        />

        {/* Basic Content Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Základný obsah</h2>
            <button
              onClick={() => setEditingSection('basic')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upraviť
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nadpis</label>
              <p className="text-gray-400 bg-gray-700 p-3 rounded">{contactContent.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Popis</label>
              <p className="text-gray-400 bg-gray-700 p-3 rounded">{contactContent.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Section Titles */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Názvy sekcií</h2>
            <button
              onClick={() => setEditingSection('titles')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upraviť
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Formulár</label>
              <p className="text-gray-400 bg-gray-700 p-3 rounded">{contactContent.formTitle}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Kontaktné údaje</label>
              <p className="text-gray-400 bg-gray-700 p-3 rounded">{contactContent.contactInfoTitle}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Služby</label>
              <p className="text-gray-400 bg-gray-700 p-3 rounded">{contactContent.servicesTitle}</p>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Kontaktné údaje</h2>
            <button
              onClick={() => setEditingSection('contactDetails')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upraviť
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Konatelia</label>
              <p className="text-gray-400 bg-gray-700 p-3 rounded">{contactContent.contactDetails.manager}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Telefón</label>
              <p className="text-gray-400 bg-gray-700 p-3 rounded">{contactContent.contactDetails.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <p className="text-gray-400 bg-gray-700 p-3 rounded">{contactContent.contactDetails.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Adresa</label>
              <p className="text-gray-400 bg-gray-700 p-3 rounded whitespace-pre-line">{contactContent.contactDetails.address}</p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Služby</h2>
            <button
              onClick={() => setEditingSection('services')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upraviť
            </button>
          </div>
          
          <div className="space-y-2">
            {Array.isArray(contactContent.services) && contactContent.services.map((service, index) => (
              <p key={index} className="text-gray-400 bg-gray-700 p-3 rounded">
                ✓ {service}
              </p>
            ))}
          </div>
        </div>

        {/* Edit Modals */}
        {editingSection && (
          <EditModal
            section={editingSection}
            content={contactContent}
            onSave={handleSave}
            onCancel={() => setEditingSection(null)}
            saving={saving}
          />
        )}
      </div>
    </AdminLayout>
  );
};

// Edit Modal Component
const EditModal = ({ section, content, onSave, onCancel, saving }) => {
  const [formData, setFormData] = useState(section === 'services' ? [] : {});

  useEffect(() => {
    if (section === 'basic') {
      setFormData({
        title: content.title,
        subtitle: content.subtitle
      });
    } else if (section === 'titles') {
      setFormData({
        formTitle: content.formTitle,
        contactInfoTitle: content.contactInfoTitle,
        servicesTitle: content.servicesTitle
      });
    } else if (section === 'contactDetails') {
      setFormData({ ...content.contactDetails });
    } else if (section === 'services') {
      setFormData(Array.isArray(content.services) ? content.services : []);
    }
  }, [section, content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(section, formData);
  };

  const addService = () => {
    setFormData([...formData, '']);
  };

  const removeService = (index) => {
    const newServices = formData.filter((_, i) => i !== index);
    setFormData(newServices);
  };

  const updateService = (index, value) => {
    const newServices = [...formData];
    newServices[index] = value;
    setFormData(newServices);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Upraviť {section === 'basic' ? 'základný obsah' : 
                     section === 'titles' ? 'názvy sekcií' :
                     section === 'contactDetails' ? 'kontaktné údaje' : 'služby'}
          </h2>
          <button
            onClick={onCancel}
            className="hover:opacity-70 transition-all duration-200"
          >
            <img src="/icons/close.png" alt="Close" className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {section === 'basic' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nadpis</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Popis</label>
                <textarea
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </>
          )}

          {section === 'titles' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Názov formulára</label>
                <input
                  type="text"
                  value={formData.formTitle || ''}
                  onChange={(e) => setFormData({...formData, formTitle: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Názov kontaktných údajov</label>
                <input
                  type="text"
                  value={formData.contactInfoTitle || ''}
                  onChange={(e) => setFormData({...formData, contactInfoTitle: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Názov služieb</label>
                <input
                  type="text"
                  value={formData.servicesTitle || ''}
                  onChange={(e) => setFormData({...formData, servicesTitle: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </>
          )}

          {section === 'contactDetails' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Konatelia spoločnosti</label>
                <input
                  type="text"
                  value={formData.manager || ''}
                  onChange={(e) => setFormData({...formData, manager: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Telefón</label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Adresa</label>
                <textarea
                  value={formData.address || ''}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </>
          )}

          {section === 'services' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-300">Služby</label>
                <button
                  type="button"
                  onClick={addService}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                >
                  + Pridať službu
                </button>
              </div>
              <div className="space-y-3">
                {Array.isArray(formData) && formData.map((service, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => updateService(index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="Názov služby"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Zrušiť
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Ukladám...' : 'Uložiť'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminContact;
