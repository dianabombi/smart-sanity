import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';
import LanguageToggle from './shared/LanguageToggle';

const AdminWhatWeOffer = ({ onLogout }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('sk');

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
    backgroundImagePositionY: 'center',
    customPositionX: '50',
    customPositionY: '50'
  });
  const [backgroundLoading, setBackgroundLoading] = useState(false);
  const [backgroundMessage, setBackgroundMessage] = useState('');
  const [showCustomPosition, setShowCustomPosition] = useState(false);

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
      console.log('🔍 Position settings BEFORE save:', {
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
      
      // Clear any localStorage cache before saving
      localStorage.removeItem('backgroundSettings');
      
      // Filter out UI helper fields that shouldn't be saved to database
      const { customPositionX, customPositionY, ...settingsToSave } = backgroundSettings;
      
      const response = await ApiService.updateBackgroundSettings(settingsToSave);
      console.log('📊 Save response:', response);
      
      if (response.success) {
        console.log('✅ Background settings saved successfully to database');
        console.log('🔍 Saved position values:', {
          positionX: backgroundSettings.backgroundImagePositionX,
          positionY: backgroundSettings.backgroundImagePositionY
        });
        console.log('🔄 Settings will be visible on public page within 2 seconds');
        setBackgroundMessage('✅ Nastavenia uložené! Pozícia: ' + backgroundSettings.backgroundImagePositionX + '/' + backgroundSettings.backgroundImagePositionY);
        
        // Reload settings to confirm they were saved
        setTimeout(async () => {
          await loadBackgroundSettings();
          setBackgroundMessage('');
        }, 2000);
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

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setBackgroundMessage('Neplatný typ súboru. Podporované formáty: JPG, PNG, WebP, SVG');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setBackgroundMessage('Súbor je príliš veľký. Maximálna veľkosť je 5MB.');
      return;
    }

    try {
      setBackgroundLoading(true);
      setBackgroundMessage('Nahrávam a komprimujem obrázok...');
      console.log('🔄 Uploading background image:', file.name, file.size);
      
      // Compress background image AGGRESSIVELY for instant uploads
      const compressBackgroundImage = (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              
              // CRITICAL: Use 800px max for instant uploads (backgrounds don't need high res)
              const maxWidth = 800;
              const scale = Math.min(1, maxWidth / img.width);
              
              canvas.width = img.width * scale;
              canvas.height = img.height * scale;
              
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              
              // CRITICAL: Use WebP at 30% quality for tiny file sizes and instant uploads
              const compressedDataUrl = canvas.toDataURL('image/webp', 0.30);
              const originalSize = (e.target.result.length / 1024).toFixed(0);
              const compressedSize = (compressedDataUrl.length / 1024).toFixed(0);
              const reduction = ((1 - compressedDataUrl.length / e.target.result.length) * 100).toFixed(0);
              console.log(`📦 OPTIMIZED: ${originalSize}KB → ${compressedSize}KB (${reduction}% reduction)`);
              resolve(compressedDataUrl);
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      };
      
      const compressedDataUrl = await compressBackgroundImage(file);
      
      setBackgroundSettings(prev => ({
        ...prev,
        entrancePageBackgroundImage: compressedDataUrl
      }));
      setBackgroundMessage('✅ Obrázok bol úspešne nahraný a komprimovaný! Nezabudnite kliknúť "Uložiť pozadie".');
      setBackgroundLoading(false);
    } catch (error) {
      console.error('❌ Error uploading background image:', error);
      setBackgroundMessage('Chyba pri nahrávaní obrázka pozadia: ' + error.message);
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
        {/* Language Toggle */}
        <LanguageToggle 
          selectedLanguage={selectedLanguage} 
          onLanguageChange={setSelectedLanguage} 
        />
        
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {selectedLanguage === 'sk' ? 'Správa obsahu - Čo ponúkame' : 'Content Management - What We Offer'}
          </h2>
          <p className="text-gray-300">
            {selectedLanguage === 'sk' ? 'Upravte obsah stránky "Čo ponúkame"' : 'Edit "What We Offer" page content'}
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

            {/* Live Preview Info */}
            <div className="text-xs mb-4 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-300 font-semibold">📊 Aktuálne nastavenia</span>
                <span className={`px-2 py-1 rounded text-xs ${backgroundSettings.entrancePageBackgroundImage ? 'bg-green-700 text-green-100' : 'bg-gray-700 text-gray-300'}`}>
                  {backgroundSettings.entrancePageBackgroundImage ? '✓ Obrázok nahraný' : '○ Žiadny obrázok'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-gray-300">
                <div><span className="text-gray-500">Pozícia:</span> {backgroundSettings.backgroundImagePositionX} / {backgroundSettings.backgroundImagePositionY}</div>
                <div><span className="text-gray-500">Veľkosť:</span> {backgroundSettings.backgroundImageSize}</div>
                <div><span className="text-gray-500">Priehľadnosť:</span> {Math.round(backgroundSettings.backgroundImageOpacity * 100)}%</div>
                <div><span className="text-gray-500">Rozmazanie:</span> {backgroundSettings.backgroundImageBlur}px</div>
              </div>
            </div>

            {/* Background Image Controls - Only show if image is uploaded */}
            {backgroundSettings.entrancePageBackgroundImage && (
              <div className="border-t border-gray-600 pt-6 mt-6">
                <h3 className="text-lg font-medium text-gray-300 mb-4">Nastavenia obrázka pozadia</h3>
                
                {/* Quick Action Buttons */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Test Button with Auto-save */}
                  <div className="p-3 bg-red-900/20 border border-red-500 rounded-lg">
                    <button
                      type="button"
                      onClick={async () => {
                        console.log('🧪 TEST: Setting and saving test values');
                        const testSettings = {
                          ...backgroundSettings,
                          backgroundImagePositionX: 'left',
                          backgroundImagePositionY: 'top',
                          backgroundImageSize: 'contain',
                          backgroundImageOpacity: 0.5,
                          backgroundImageBlur: 0
                        };
                        setBackgroundSettings(testSettings);
                        
                        // Auto-save
                        setTimeout(async () => {
                          try {
                            setBackgroundLoading(true);
                            const { customPositionX, customPositionY, ...settingsToSave } = testSettings;
                            const result = await ApiService.updateBackgroundSettings(settingsToSave);
                            if (result.success) {
                              setBackgroundMessage('✅ Test hodnoty nastavené a uložené!');
                            }
                          } catch (error) {
                            console.error('Error auto-saving:', error);
                          } finally {
                            setBackgroundLoading(false);
                            setTimeout(() => setBackgroundMessage(''), 3000);
                          }
                        }, 100);
                      }}
                      disabled={backgroundLoading}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                      🧪 Test (Ľavý horný roh)
                    </button>
                    <p className="text-xs text-gray-400 mt-2">Nastaví: Vľavo, Hore, Contain, 50% opacity</p>
                  </div>
                  
                  {/* Reset Button */}
                  <div className="p-3 bg-yellow-900/20 border border-yellow-600 rounded-lg">
                    <button
                      type="button"
                      onClick={async () => {
                        console.log('🔄 RESET: Resetting to defaults');
                        const defaultSettings = {
                          ...backgroundSettings,
                          backgroundImagePositionX: 'center',
                          backgroundImagePositionY: 'center',
                          backgroundImageSize: 'cover',
                          backgroundImageOpacity: 0.3,
                          backgroundImageBlur: 0
                        };
                        setBackgroundSettings(defaultSettings);
                        
                        // Auto-save
                        setTimeout(async () => {
                          try {
                            setBackgroundLoading(true);
                            const { customPositionX, customPositionY, ...settingsToSave } = defaultSettings;
                            const result = await ApiService.updateBackgroundSettings(settingsToSave);
                            if (result.success) {
                              setBackgroundMessage('✅ Nastavenia resetované na predvolené!');
                            }
                          } catch (error) {
                            console.error('Error auto-saving:', error);
                          } finally {
                            setBackgroundLoading(false);
                            setTimeout(() => setBackgroundMessage(''), 3000);
                          }
                        }, 100);
                      }}
                      disabled={backgroundLoading}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                      🔄 Reset na predvolené
                    </button>
                    <p className="text-xs text-gray-400 mt-2">Cover, Stred, 30% opacity</p>
                  </div>
                </div>
                
                {/* Live Preview */}
                <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-600">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    👁️ Náhľad pozadia
                  </label>
                  <div 
                    className="relative w-full h-48 rounded-lg border-2 border-gray-600 overflow-hidden"
                    style={{
                      backgroundImage: backgroundSettings.entrancePageBackgroundImage 
                        ? `url(${backgroundSettings.entrancePageBackgroundImage})`
                        : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                      backgroundSize: backgroundSettings.backgroundImageSize || 'cover',
                      backgroundPosition: `${backgroundSettings.backgroundImagePositionX || 'center'} ${backgroundSettings.backgroundImagePositionY || 'center'}`,
                      backgroundRepeat: 'no-repeat',
                      opacity: backgroundSettings.backgroundImageOpacity !== undefined ? backgroundSettings.backgroundImageOpacity : 0.3,
                      filter: backgroundSettings.backgroundImageBlur ? `blur(${backgroundSettings.backgroundImageBlur}px)` : 'none'
                    }}
                  >
                    {!backgroundSettings.entrancePageBackgroundImage && (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                        Nahrajte obrázok pozadia
                      </div>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-gray-400 text-center">
                    Aktuálne nastavenia: {backgroundSettings.backgroundImageSize || 'cover'} | 
                    {' '}{backgroundSettings.backgroundImagePositionX || 'center'}/{backgroundSettings.backgroundImagePositionY || 'center'} | 
                    {' '}Opacity: {Math.round((backgroundSettings.backgroundImageOpacity || 0.3) * 100)}% | 
                    {' '}Blur: {backgroundSettings.backgroundImageBlur || 0}px
                  </div>
                </div>
                
                {/* Quick Presets */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    ⚡ Rýchle predvoľby
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setBackgroundSettings(prev => ({
                          ...prev,
                          backgroundImagePositionX: 'left',
                          backgroundImagePositionY: 'top',
                          backgroundImageSize: 'cover'
                        }));
                      }}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-xs transition-colors"
                    >
                      ↖️ Horný ľavý
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBackgroundSettings(prev => ({
                          ...prev,
                          backgroundImagePositionX: 'right',
                          backgroundImagePositionY: 'top',
                          backgroundImageSize: 'cover'
                        }));
                      }}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-xs transition-colors"
                    >
                      ↗️ Horný pravý
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBackgroundSettings(prev => ({
                          ...prev,
                          backgroundImagePositionX: 'left',
                          backgroundImagePositionY: 'bottom',
                          backgroundImageSize: 'cover'
                        }));
                      }}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-xs transition-colors"
                    >
                      ↙️ Dolný ľavý
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBackgroundSettings(prev => ({
                          ...prev,
                          backgroundImagePositionX: 'right',
                          backgroundImagePositionY: 'bottom',
                          backgroundImageSize: 'cover'
                        }));
                      }}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-xs transition-colors"
                    >
                      ↘️ Dolný pravý
                    </button>
                  </div>
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

                {/* Horizontal Position with Arrows */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Horizontálna pozícia
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        console.log('⬅️ Setting horizontal position to LEFT');
                        setBackgroundSettings(prev => ({
                          ...prev,
                          backgroundImagePositionX: 'left'
                        }));
                      }}
                      className="p-2 bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white rounded transition-colors"
                      title="Vľavo"
                    >
                      ⬅️
                    </button>
                    <div className="flex-1 flex items-center justify-center gap-2 bg-gray-800 rounded px-2 py-2">
                      <button
                        type="button"
                        onClick={() => {
                          setBackgroundSettings(prev => ({
                            ...prev,
                            backgroundImagePositionX: 'left'
                          }));
                        }}
                        className={`text-sm px-2 py-1 rounded transition-colors ${
                          backgroundSettings.backgroundImagePositionX === 'left' 
                            ? 'text-blue-400 font-bold bg-blue-600/20' 
                            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        Vľavo
                      </button>
                      <span className="text-gray-600">|</span>
                      <button
                        type="button"
                        onClick={() => {
                          setBackgroundSettings(prev => ({
                            ...prev,
                            backgroundImagePositionX: 'center'
                          }));
                        }}
                        className={`text-sm px-2 py-1 rounded transition-colors ${
                          backgroundSettings.backgroundImagePositionX === 'center' 
                            ? 'text-blue-400 font-bold bg-blue-600/20' 
                            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        Stred
                      </button>
                      <span className="text-gray-600">|</span>
                      <button
                        type="button"
                        onClick={() => {
                          setBackgroundSettings(prev => ({
                            ...prev,
                            backgroundImagePositionX: 'right'
                          }));
                        }}
                        className={`text-sm px-2 py-1 rounded transition-colors ${
                          backgroundSettings.backgroundImagePositionX === 'right' 
                            ? 'text-blue-400 font-bold bg-blue-600/20' 
                            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        Vpravo
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setBackgroundSettings(prev => ({
                          ...prev,
                          backgroundImagePositionX: 'right'
                        }));
                      }}
                      className="p-2 bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white rounded transition-colors"
                      title="Vpravo"
                    >
                      ➡️
                    </button>
                  </div>
                  
                  {/* Custom horizontal position */}
                  {showCustomPosition && (
                    <div className="mt-2 p-3 bg-gray-700/50 rounded border border-gray-600">
                      <label className="block text-xs text-gray-400 mb-2">
                        Vlastná horizontálna pozícia (%)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={backgroundSettings.customPositionX}
                          onChange={(e) => {
                            const value = e.target.value;
                            setBackgroundSettings(prev => ({
                              ...prev,
                              customPositionX: value,
                              backgroundImagePositionX: value + '%'
                            }));
                          }}
                          className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                        <span className="text-gray-400 text-sm">%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Vertical Position with Arrows */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">
                      Vertikálna pozícia
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCustomPosition(!showCustomPosition)}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {showCustomPosition ? '▼ Skryť vlastné %' : '▶ Vlastné %'}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setBackgroundSettings(prev => ({
                          ...prev,
                          backgroundImagePositionY: 'top'
                        }));
                      }}
                      className="p-2 bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white rounded transition-colors"
                      title="Hore"
                    >
                      ⬆️
                    </button>
                    <div className="flex-1 flex items-center justify-center gap-2 bg-gray-800 rounded px-2 py-2">
                      <button
                        type="button"
                        onClick={() => {
                          setBackgroundSettings(prev => ({
                            ...prev,
                            backgroundImagePositionY: 'top'
                          }));
                        }}
                        className={`text-sm px-2 py-1 rounded transition-colors ${
                          backgroundSettings.backgroundImagePositionY === 'top' 
                            ? 'text-blue-400 font-bold bg-blue-600/20' 
                            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        Hore
                      </button>
                      <span className="text-gray-600">|</span>
                      <button
                        type="button"
                        onClick={() => {
                          setBackgroundSettings(prev => ({
                            ...prev,
                            backgroundImagePositionY: 'center'
                          }));
                        }}
                        className={`text-sm px-2 py-1 rounded transition-colors ${
                          backgroundSettings.backgroundImagePositionY === 'center' 
                            ? 'text-blue-400 font-bold bg-blue-600/20' 
                            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        Stred
                      </button>
                      <span className="text-gray-600">|</span>
                      <button
                        type="button"
                        onClick={() => {
                          setBackgroundSettings(prev => ({
                            ...prev,
                            backgroundImagePositionY: 'bottom'
                          }));
                        }}
                        className={`text-sm px-2 py-1 rounded transition-colors ${
                          backgroundSettings.backgroundImagePositionY === 'bottom' 
                            ? 'text-blue-400 font-bold bg-blue-600/20' 
                            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        Dole
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setBackgroundSettings(prev => ({
                          ...prev,
                          backgroundImagePositionY: 'bottom'
                        }));
                      }}
                      className="p-2 bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white rounded transition-colors"
                      title="Dole"
                    >
                      ⬇️
                    </button>
                  </div>
                  
                  {/* Custom vertical position */}
                  {showCustomPosition && (
                    <div className="mt-2 p-3 bg-gray-700/50 rounded border border-gray-600">
                      <label className="block text-xs text-gray-400 mb-2">
                        Vlastná vertikálna pozícia (%)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={backgroundSettings.customPositionY}
                          onChange={(e) => {
                            const value = e.target.value;
                            setBackgroundSettings(prev => ({
                              ...prev,
                              customPositionY: value,
                              backgroundImagePositionY: value + '%'
                            }));
                          }}
                          className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                        <span className="text-gray-400 text-sm">%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Image Opacity */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">
                      Priehľadnosť obrázka
                    </label>
                    <span className="text-blue-400 font-mono text-sm">
                      {Math.round(backgroundSettings.backgroundImageOpacity * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={backgroundSettings.backgroundImageOpacity}
                    onChange={(e) => setBackgroundSettings(prev => ({
                      ...prev,
                      backgroundImageOpacity: parseFloat(e.target.value)
                    }))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Image Blur */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">
                      Rozmazanie obrázka
                    </label>
                    <span className="text-blue-400 font-mono text-sm">
                      {backgroundSettings.backgroundImageBlur}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={backgroundSettings.backgroundImageBlur}
                    onChange={(e) => setBackgroundSettings(prev => ({
                      ...prev,
                      backgroundImageBlur: parseInt(e.target.value)
                    }))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Ostré</span>
                    <span>Stredné</span>
                    <span>Veľmi rozmazané</span>
                  </div>
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
