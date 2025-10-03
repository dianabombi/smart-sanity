import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';

const AdminWhoWeAre = ({ onLogout }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const result = await ApiService.getContent('who-we-are');
      if (result.success) {
        setContent(result.content);
      } else {
        // Initialize content if not found
        await ApiService.initializeContent();
        const retryResult = await ApiService.getContent('who-we-are');
        if (retryResult.success) {
          setContent(retryResult.content);
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
      setError('Chyba pri načítavaní obsahu');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const result = await ApiService.updateContent('who-we-are', {
        ...content,
        modifiedBy: 'admin'
      });

      if (result.success) {
        setContent(result.content);
        setSuccess('Obsah bol úspešne uložený!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.message || 'Chyba pri ukladaní obsahu');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setError('Chyba pri ukladaní obsahu');
    } finally {
      setSaving(false);
    }
  };

  const handleContentChange = (field, value) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSectionChange = (sectionIndex, field, value) => {
    setContent(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) => 
        index === sectionIndex 
          ? { ...section, [field]: value }
          : section
      )
    }));
  };

  const addSection = () => {
    setContent(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          sectionId: `section-${Date.now()}`,
          title: '',
          content: '',
          order: prev.sections.length + 1
        }
      ]
    }));
  };

  const removeSection = (sectionIndex) => {
    setContent(prev => ({
      ...prev,
      sections: prev.sections.filter((_, index) => index !== sectionIndex)
    }));
  };

  if (loading) {
    return (
      <AdminLayout onLogout={onLogout}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Načítavam obsah...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error && !content) {
    return (
      <AdminLayout onLogout={onLogout}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-medium mb-2">Chyba</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={loadContent}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Skúsiť znovu
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Správa obsahu - O nás
          </h2>
          <p className="text-gray-300">
            Upravte obsah stránky "O nás"
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <p className="text-green-400">{success}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Content Form */}
        <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nadpis stránky
              </label>
              <input
                type="text"
                value={content?.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Zadajte nadpis stránky"
              />
            </div>

            {/* Main Content */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hlavný obsah
              </label>
              <textarea
                value={content?.content || ''}
                onChange={(e) => handleContentChange('content', e.target.value)}
                rows={10}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Zadajte hlavný obsah stránky"
              />
            </div>

            {/* Sections */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Sekcie
                </label>
                <button
                  onClick={addSection}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Pridať sekciu
                </button>
              </div>

              {content?.sections?.map((section, index) => (
                <div key={section.sectionId || index} className="border border-gray-600 bg-gray-700 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-white">Sekcia {index + 1}</h4>
                    <button
                      onClick={() => removeSection(index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Odstrániť
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={section.title || ''}
                      onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nadpis sekcie"
                    />
                    <textarea
                      value={section.content || ''}
                      onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Obsah sekcie"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors"
              >
                {saving ? 'Ukladám...' : 'Uložiť zmeny'}
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Náhľad</h3>
          <div className="prose max-w-none">
            <h1 className="text-2xl font-bold mb-4 text-white">{content?.title}</h1>
            <div className="whitespace-pre-wrap mb-6 text-gray-300">{content?.content}</div>
            
            {content?.sections?.map((section, index) => (
              <div key={section.sectionId || index} className="mb-4">
                <h2 className="text-xl font-semibold mb-2 text-white">{section.title}</h2>
                <div className="whitespace-pre-wrap text-gray-300">{section.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminWhoWeAre;
