import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';

const AdminInspirationsContent = ({ onLogout }) => {
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const result = await ApiService.getPageContent('inspirations', 'main', 'description');
      if (result.success && result.content) {
        setDescription(result.content);
      } else {
        // Set default content if none exists
        setDescription('Objavte najkrajšie kúpeľne a nechajte sa inšpirovať pre váš domov. Od moderných minimalistických riešení až po luxusné wellness priestory.');
      }
    } catch (error) {
      console.error('Error loading content:', error);
      setDescription('Objavte najkrajšie kúpeľne a nechajte sa inšpirovať pre váš domov. Od moderných minimalistických riešení až po luxusné wellness priestory.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const result = await ApiService.updatePageContent('inspirations', 'main', 'description', description);
      
      if (result.success) {
        setIsEditing(false);
        alert('Text bol úspešne uložený!');
      } else {
        alert('Chyba pri ukladaní: ' + result.message);
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Chyba pri ukladaní textu');
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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Inšpirácie - Obsah stránky</h1>
            <p className="text-gray-400">Upravte text pod hlavným nápisom na stránke Inšpirácie</p>
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
                  placeholder="Zadajte popis stránky inšpirácií..."
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
              <h1 className="text-3xl font-bold text-gray-400 mb-4">Inšpirácie</h1>
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

export default AdminInspirationsContent;
