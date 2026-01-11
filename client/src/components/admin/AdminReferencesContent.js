import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';
import LanguageToggle from './shared/LanguageToggle';

const AdminReferencesContent = ({ onLogout }) => {
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('sk');

  useEffect(() => {
    loadContent();
  }, [selectedLanguage]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadContent = async () => {
    try {
      setLoading(true);
      const result = await ApiService.getPageContent('references', 'main', 'description', selectedLanguage);
      if (result.success && result.content) {
        setDescription(result.content);
      } else {
        // Set default content based on language
        const defaultContent = selectedLanguage === 'en' 
          ? 'Our successfully completed projects and satisfied clients are our best business card.'
          : 'Naše úspešne realizované projekty a spokojní klienti sú našou najlepšou vizitkou.';
        setDescription(defaultContent);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      const defaultContent = selectedLanguage === 'en' 
        ? 'Our successfully completed projects and satisfied clients are our best business card.'
        : 'Naše úspešne realizované projekty a spokojní klienti sú našou najlepšou vizitkou.';
      setDescription(defaultContent);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const result = await ApiService.updatePageContent('references', 'main', 'description', description, selectedLanguage);
      
      if (result.success) {
        setIsEditing(false);
        alert(selectedLanguage === 'en' ? 'Text was saved successfully!' : 'Text bol úspešne uložený!');
      } else {
        console.error('Save failed:', result);
        if (result.message && result.message.includes('does not exist')) {
          alert('DATABÁZA CHYBA: Tabuľka "page_content" neexistuje v Supabase databáze.\n\nPre opravu:\n1. Otvorte Supabase Dashboard\n2. Prejdite do SQL Editor\n3. Spustite skript z /database/setup/create_page_content_table.sql');
        } else {
          alert('Chyba pri ukladaní: ' + result.message);
        }
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Chyba pri ukladaní textu: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    loadContent(); // Reload original content
  };

  if (loading) {
    return (
      <AdminLayout onLogout={onLogout}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Načítavam obsah...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Language Toggle */}
          <LanguageToggle 
            selectedLanguage={selectedLanguage} 
            onLanguageChange={setSelectedLanguage} 
          />
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {selectedLanguage === 'sk' ? 'Referencie - Obsah stránky' : 'References - Page Content'}
            </h1>
            <p className="text-gray-400">
              {selectedLanguage === 'sk' ? 'Upravte text pod hlavným nápisom na stránke Referencie' : 'Edit the text under the main heading on the References page'}
            </p>
          </div>

          {/* Content Editor */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Popis stránky
              </label>
              
              {isEditing ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Zadajte popis stránky referencií..."
                />
              ) : (
                <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 min-h-[100px]">
                  <p className="text-white whitespace-pre-wrap">{description}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Ukladám...
                      </>
                    ) : (
                      <>
                        ✅ Uložiť
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    ❌ Zrušiť
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  ✏️ Upraviť text
                </button>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="mt-8 bg-gray-900 rounded-lg p-6 border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-4">Náhľad na stránke:</h3>
            <div className="bg-black rounded-lg p-6 text-center">
              <h1 className="text-3xl font-bold text-gray-400 mb-4">Referencie</h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReferencesContent;
