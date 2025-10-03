import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';

const AdminWhatWeOffer = ({ onLogout }) => {
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
      const result = await ApiService.getContent('what-we-offer');
      if (result.success) {
        setContent(result.content);
      } else {
        // Initialize content if not found
        await ApiService.initializeContent();
        const retryResult = await ApiService.getContent('what-we-offer');
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

      const result = await ApiService.updateContent('what-we-offer', {
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

  // Convert bullet points to array for easier editing
  const getBulletPoints = () => {
    if (!content?.content) return [''];
    const lines = content.content.split('\n');
    return lines.filter(line => line.trim().startsWith('•')).map(line => line.replace('•', '').trim());
  };

  const setBulletPoints = (points) => {
    const bulletText = points.filter(point => point.trim()).map(point => `• ${point}`).join('\n');
    const otherContent = content?.content?.split('\n').filter(line => !line.trim().startsWith('•')).join('\n') || '';
    const newContent = otherContent.trim() + '\n\n' + bulletText;
    handleContentChange('content', newContent.trim());
  };

  const handleBulletPointChange = (index, value) => {
    const points = getBulletPoints();
    points[index] = value;
    setBulletPoints(points);
  };

  const addBulletPoint = () => {
    const points = getBulletPoints();
    points.push('');
    setBulletPoints(points);
  };

  const removeBulletPoint = (index) => {
    const points = getBulletPoints();
    points.splice(index, 1);
    setBulletPoints(points);
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

  const bulletPoints = getBulletPoints();

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Správa obsahu - Čo ponúkame
          </h2>
          <p className="text-gray-300">
            Upravte obsah stránky "Čo ponúkame"
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

            {/* Bullet Points */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Body ponuky (animované na stránke)
                </label>
                <button
                  onClick={addBulletPoint}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Pridať bod
                </button>
              </div>

              {bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-3 mb-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => handleBulletPointChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Zadajte text bodu"
                  />
                  <button
                    onClick={() => removeBulletPoint(index)}
                    className="text-red-400 hover:text-red-300 px-2"
                  >
                    ×
                  </button>
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
            <h1 className="text-2xl font-bold mb-6 text-white">{content?.title}</h1>
            
            <div className="space-y-4">
              {bulletPoints.filter(point => point.trim()).map((point, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="mt-2 h-4 w-4 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0"></span>
                  <span className="text-lg text-gray-300">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
          <h4 className="text-blue-400 font-medium mb-2">Informácie</h4>
          <p className="text-blue-300 text-sm">
            Tieto body sa zobrazia na stránke "Čo ponúkame" s animáciami. Každý bod sa zobrazí postupne s pekným efektom.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminWhatWeOffer;
