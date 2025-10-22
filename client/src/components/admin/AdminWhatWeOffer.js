import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';

const AdminWhatWeOffer = ({ onLogout }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Background settings state
  const [backgroundSettings, setBackgroundSettings] = useState({
    entrancePagePattern: true,
    patternOpacity: 0.05,
    patternSize: 20,
    patternType: 'tiles',
    entrancePageBackgroundImage: null,
    backgroundImageOpacity: 0.3,
    backgroundImageBlur: 0,
    backgroundImageSize: 'cover',
    backgroundImagePositionX: 'center',
    backgroundImagePositionY: 'center'
  });
  const [backgroundLoading, setBackgroundLoading] = useState(false);
  const [backgroundMessage, setBackgroundMessage] = useState('');

  useEffect(() => {
    loadContent();
    loadBackgroundSettings();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      
      // Try to load from page content system first
      try {
        const result = await ApiService.getPageContent('what-we-offer', 'main', 'content');
        if (result.success && result.content) {
          // Parse the content from the page content system
          const lines = result.content.split('\n').filter(line => line.trim());
          setContent({
            title: 'Čo ponúkame',
            content: result.content,
            bulletPoints: lines
          });
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log('Page content system not available, using fallback');
      }
      
      // Fallback to default content from the existing webpage
      const defaultBulletPoints = [
        "Obchodujeme popredných svetových výrobcov v oblasti vybavenia kúpeľní, obkladov a dlažieb",
        "Podľa vašich požiadaviek vám vyskladáme kúpeľne z konkrétnych produktov od A po Z",
        "Spracujeme vám alternatívne riešenia s rôznymi cenovými hladinami",
        "Vyskladáme vám náročné sprchové, či vaňové zostavy batérií",
        "Zabezpečíme vám technickú podporu ku všetkým ponúkaným produktom",
        "Ponúkame vám dlhodobú spoluprácu založenú na odbornosti, spoľahlivosti a férovom prístupe"
      ];
      
      const defaultContent = defaultBulletPoints.map(point => `• ${point}`).join('\n');
      
      setContent({
        title: 'Čo ponúkame',
        content: defaultContent,
        bulletPoints: defaultBulletPoints
      });
      
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

      // Save to page content system
      const result = await ApiService.updatePageContent('what-we-offer', 'main', 'content', content.content);

      if (result.success) {
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
    handleContentChange('content', bulletText);
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

  // Background settings functions
  const loadBackgroundSettings = async () => {
    try {
      setBackgroundLoading(true);
      console.log('🔄 Loading background settings...');
      const response = await ApiService.getBackgroundSettings();
      console.log('📊 Loaded settings response:', response);
      
      if (response.success && response.settings) {
        console.log('🔍 Loaded position settings:', {
          size: response.settings.backgroundImageSize,
          positionX: response.settings.backgroundImagePositionX,
          positionY: response.settings.backgroundImagePositionY,
          opacity: response.settings.backgroundImageOpacity,
          blur: response.settings.backgroundImageBlur
        });
        
        setBackgroundSettings(prev => ({
          ...prev,
          ...response.settings
        }));
      }
    } catch (error) {
      console.error('Error loading background settings:', error);
    } finally {
      setBackgroundLoading(false);
    }
  };

  const saveBackgroundSettings = async () => {
    try {
      setBackgroundLoading(true);
      console.log('🔄 Saving background settings:', backgroundSettings);
      console.log('🔍 Position settings:', {
        size: backgroundSettings.backgroundImageSize,
        positionX: backgroundSettings.backgroundImagePositionX,
        positionY: backgroundSettings.backgroundImagePositionY,
        opacity: backgroundSettings.backgroundImageOpacity,
        blur: backgroundSettings.backgroundImageBlur
      });
      
      // Add validation
      if (!backgroundSettings.backgroundImagePositionX) {
        console.warn('⚠️ Missing backgroundImagePositionX, setting default');
        setBackgroundSettings(prev => ({
          ...prev,
          backgroundImagePositionX: 'center'
        }));
      }
      
      const response = await ApiService.updateBackgroundSettings(backgroundSettings);
      console.log('📊 Save response:', response);
      
      if (response.success) {
        console.log('✅ Background settings saved successfully');
        setBackgroundMessage('Nastavenia pozadia boli úspešne uložené!');
        setTimeout(() => setBackgroundMessage(''), 3000);
      } else {
        console.error('❌ Failed to save background settings:', response.message);
        setBackgroundMessage('Chyba pri ukladaní nastavení pozadia: ' + (response.message || ''));
      }
    } catch (error) {
      console.error('❌ Error saving background settings:', error);
      setBackgroundMessage('Chyba pri ukladaní nastavení pozadia: ' + error.message);
    } finally {
      setBackgroundLoading(false);
    }
  };

  const handleBackgroundImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setBackgroundLoading(true);
      console.log('🔄 Uploading background image:', file.name, file.size);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('✅ Image converted to data URL, length:', e.target.result.length);
        setBackgroundSettings(prev => ({
          ...prev,
          entrancePageBackgroundImage: e.target.result
        }));
        setBackgroundMessage('Obrázok bol nahraný! Nezabudnite kliknúť "Uložiť pozadie".');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('❌ Error uploading background image:', error);
      setBackgroundMessage('Chyba pri nahrávaní obrázka pozadia.');
    } finally {
      setBackgroundLoading(false);
    }
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

        {/* Background Settings */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Nastavenia pozadia stránky</h2>
            <button
              onClick={saveBackgroundSettings}
              disabled={backgroundLoading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-4 py-2 rounded transition-colors"
            >
              {backgroundLoading ? 'Ukladám...' : '💾 Uložiť pozadie'}
            </button>
          </div>

          {backgroundMessage && (
            <div className={`mb-4 px-4 py-3 rounded ${
              backgroundMessage.includes('úspešne') 
                ? 'bg-green-900/50 border border-green-500 text-green-200'
                : 'bg-red-900/50 border border-red-500 text-red-200'
            }`}>
              {backgroundMessage}
            </div>
          )}

          <div className="space-y-6">
            {/* Background Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Obrázok pozadia
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundImageUpload}
                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              <p className="text-xs text-gray-400 mt-1">
                Podporované formáty: JPG, PNG, WebP. Maximálna veľkosť: 5MB
              </p>
            </div>

            {/* Pattern Settings */}
            <div>
              <label className="flex items-center space-x-3 mb-4">
                <input
                  type="checkbox"
                  checked={backgroundSettings.entrancePagePattern}
                  onChange={(e) => setBackgroundSettings(prev => ({
                    ...prev,
                    entrancePagePattern: e.target.checked
                  }))}
                  className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-300">Zobraziť vzor pozadia (iba s obrázkom)</span>
              </label>
              <p className="text-xs text-gray-400 ml-6 -mt-3 mb-4">
                Vzor sa zobrazí iba keď je nahraný obrázok pozadia
              </p>
            </div>

            {/* Pattern Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Typ vzoru
              </label>
              <select
                value={backgroundSettings.patternType}
                onChange={(e) => setBackgroundSettings(prev => ({
                  ...prev,
                  patternType: e.target.value
                }))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="tiles">Dlaždice</option>
                <option value="dots">Bodky</option>
                <option value="lines">Čiary</option>
              </select>
            </div>

            {/* Opacity Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Priehľadnosť: {backgroundSettings.patternOpacity}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={backgroundSettings.patternOpacity}
                onChange={(e) => setBackgroundSettings(prev => ({
                  ...prev,
                  patternOpacity: parseFloat(e.target.value)
                }))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Debug info */}
            <div className="text-xs text-gray-500 mb-4 p-3 bg-gray-800 rounded">
              <div>Debug: Image exists: {backgroundSettings.entrancePageBackgroundImage ? 'YES' : 'NO'}</div>
              <div>Position X: {backgroundSettings.backgroundImagePositionX || 'undefined'}</div>
              <div>Position Y: {backgroundSettings.backgroundImagePositionY || 'undefined'}</div>
              <div>Size: {backgroundSettings.backgroundImageSize || 'undefined'}</div>
              <div>Opacity: {backgroundSettings.backgroundImageOpacity || 'undefined'}</div>
              {backgroundSettings.entrancePageBackgroundImage && <div>Image: {backgroundSettings.entrancePageBackgroundImage.substring(0, 50)}...</div>}
            </div>

            {/* Background Image Controls - Only show if image is uploaded */}
            {backgroundSettings.entrancePageBackgroundImage && (
              <div className="border-t border-gray-600 pt-6 mt-6">
                <h3 className="text-lg font-medium text-gray-300 mb-4">Nastavenia obrázka pozadia</h3>
                
                {/* Test Button */}
                <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded">
                  <button
                    type="button"
                    onClick={() => {
                      console.log('🧪 TEST: Setting test values');
                      setBackgroundSettings(prev => ({
                        ...prev,
                        backgroundImagePositionX: 'left',
                        backgroundImagePositionY: 'top',
                        backgroundImageSize: 'contain',
                        backgroundImageOpacity: 0.5
                      }));
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                  >
                    🧪 TEST: Set Test Values
                  </button>
                </div>
                
                {/* Image Size */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Veľkosť obrázka
                  </label>
                  <select
                    value={backgroundSettings.backgroundImageSize}
                    onChange={(e) => setBackgroundSettings(prev => ({
                      ...prev,
                      backgroundImageSize: e.target.value
                    }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="cover">Pokryť celú stránku (Cover)</option>
                    <option value="contain">Zmestiť celý obrázok (Contain)</option>
                    <option value="auto">Pôvodná veľkosť (Auto)</option>
                    <option value="100% 100%">Roztiahnuť na celú stránku</option>
                  </select>
                </div>

                {/* Horizontal Position */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Horizontálna pozícia
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        console.log('🔄 Setting position to LEFT');
                        setBackgroundSettings(prev => ({
                          ...prev,
                          backgroundImagePositionX: 'left'
                        }));
                      }}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        backgroundSettings.backgroundImagePositionX === 'left'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      ⬅️ Vľavo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        console.log('🔄 Setting position to CENTER');
                        setBackgroundSettings(prev => ({
                          ...prev,
                          backgroundImagePositionX: 'center'
                        }));
                      }}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        backgroundSettings.backgroundImagePositionX === 'center'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      ↔️ Stred
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        console.log('🔄 Setting position to RIGHT');
                        setBackgroundSettings(prev => ({
                          ...prev,
                          backgroundImagePositionX: 'right'
                        }));
                      }}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        backgroundSettings.backgroundImagePositionX === 'right'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      ➡️ Vpravo
                    </button>
                  </div>
                </div>

                {/* Vertical Position */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Vertikálna pozícia
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setBackgroundSettings(prev => ({
                        ...prev,
                        backgroundImagePositionY: 'top'
                      }))}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        backgroundSettings.backgroundImagePositionY === 'top'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      ⬆️ Hore
                    </button>
                    <button
                      type="button"
                      onClick={() => setBackgroundSettings(prev => ({
                        ...prev,
                        backgroundImagePositionY: 'center'
                      }))}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        backgroundSettings.backgroundImagePositionY === 'center'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      ↕️ Stred
                    </button>
                    <button
                      type="button"
                      onClick={() => setBackgroundSettings(prev => ({
                        ...prev,
                        backgroundImagePositionY: 'bottom'
                      }))}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        backgroundSettings.backgroundImagePositionY === 'bottom'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      ⬇️ Dole
                    </button>
                  </div>
                </div>

                {/* Image Opacity */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Priehľadnosť obrázka: {backgroundSettings.backgroundImageOpacity}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={backgroundSettings.backgroundImageOpacity}
                    onChange={(e) => setBackgroundSettings(prev => ({
                      ...prev,
                      backgroundImageOpacity: parseFloat(e.target.value)
                    }))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Image Blur */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rozmazanie obrázka: {backgroundSettings.backgroundImageBlur}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={backgroundSettings.backgroundImageBlur}
                    onChange={(e) => setBackgroundSettings(prev => ({
                      ...prev,
                      backgroundImageBlur: parseInt(e.target.value)
                    }))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
          <h4 className="text-blue-400 font-medium mb-2">Informácie</h4>
          <p className="text-blue-300 text-sm">
            Tieto body sa zobrazia na stránke "Čo ponúkame" s animáciami. Každý bod sa zobrazí postupne s pekným efektom.
            Nastavenia pozadia sa aplikujú na celú stránku "Čo ponúkame".
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminWhatWeOffer;
