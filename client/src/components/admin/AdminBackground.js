import React, { useState, useEffect } from 'react';
import ApiService from '../../services/api';

const AdminBackground = () => {
  const [backgroundSettings, setBackgroundSettings] = useState({
    brandsPagePattern: true,
    patternOpacity: 0.05,
    patternSize: 20,
    patternType: 'tiles',
    homePageBackground: 'default',
    globalBackground: 'default',
    brandsPageBackgroundImage: null,
    backgroundImageOpacity: 0.3,
    backgroundImageBlur: 0
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadBackgroundSettings();
  }, []);

  const loadBackgroundSettings = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getBackgroundSettings();
      if (response.success && response.settings) {
        setBackgroundSettings(response.settings);
      }
    } catch (error) {
      console.error('Error loading background settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveBackgroundSettings = async () => {
    try {
      setLoading(true);
      const response = await ApiService.updateBackgroundSettings(backgroundSettings);
      if (response.success) {
        setMessage('Nastavenia pozadia boli úspešne uložené!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Chyba pri ukladaní nastavení pozadia.');
      }
    } catch (error) {
      console.error('Error saving background settings:', error);
      setMessage('Chyba pri ukladaní nastavení pozadia.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setBackgroundSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setMessage('Podporované sú len JPG, PNG a WebP súbory.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Súbor je príliš veľký. Maximálna veľkosť je 5MB.');
      return;
    }

    try {
      setLoading(true);
      
      // Convert to base64 for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        setBackgroundSettings(prev => ({
          ...prev,
          brandsPageBackgroundImage: imageDataUrl
        }));
        setMessage('Obrázok bol úspešne nahraný!');
        setTimeout(() => setMessage(''), 3000);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Chyba pri nahrávaní obrázka.');
      setLoading(false);
    }
  };

  const removeBackgroundImage = () => {
    setBackgroundSettings(prev => ({
      ...prev,
      brandsPageBackgroundImage: null
    }));
    setMessage('Obrázok pozadia bol odstránený.');
    setTimeout(() => setMessage(''), 3000);
  };

  const patternTypes = [
    { value: 'tiles', label: 'Dlaždice' },
    { value: 'dots', label: 'Bodky' },
    { value: 'lines', label: 'Čiary' },
    { value: 'grid', label: 'Mriežka' },
    { value: 'none', label: 'Žiadny' }
  ];

  const backgroundOptions = [
    { value: 'default', label: 'Predvolené (čierne)' },
    { value: 'dark-gray', label: 'Tmavo sivé' },
    { value: 'gradient', label: 'Gradient' },
    { value: 'texture', label: 'Textúra' }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-300 mb-8">Nastavenia pozadia</h1>
        
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('úspešne') 
              ? 'bg-green-900/50 border border-green-500 text-green-300'
              : 'bg-red-900/50 border border-red-500 text-red-300'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-8">
          {/* Brands Page Background Image */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Stránka značiek - Obrázok pozadia</h2>
            
            <div className="space-y-4">
              {!backgroundSettings.brandsPageBackgroundImage ? (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nahrať obrázok pozadia
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Podporované formáty: JPG, PNG, WebP. Maximálna veľkosť: 5MB
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Aktuálny obrázok pozadia
                  </label>
                  <div className="relative">
                    <img
                      src={backgroundSettings.brandsPageBackgroundImage}
                      alt="Background preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={removeBackgroundImage}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Priehľadnosť obrázka: {backgroundSettings.backgroundImageOpacity}
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={backgroundSettings.backgroundImageOpacity}
                        onChange={(e) => handleInputChange('backgroundImageOpacity', parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Rozmazanie (blur): {backgroundSettings.backgroundImageBlur}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={backgroundSettings.backgroundImageBlur}
                        onChange={(e) => handleInputChange('backgroundImageBlur', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Brands Page Pattern Settings */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Stránka značiek - Vzor pozadia</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="brandsPagePattern"
                  checked={backgroundSettings.brandsPagePattern}
                  onChange={(e) => handleInputChange('brandsPagePattern', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="brandsPagePattern" className="text-gray-300">
                  Zobraziť vzor pozadia na stránke značiek
                </label>
              </div>

              {backgroundSettings.brandsPagePattern && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Typ vzoru
                    </label>
                    <select
                      value={backgroundSettings.patternType}
                      onChange={(e) => handleInputChange('patternType', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {patternTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Priehľadnosť vzoru: {backgroundSettings.patternOpacity}
                    </label>
                    <input
                      type="range"
                      min="0.01"
                      max="0.2"
                      step="0.01"
                      value={backgroundSettings.patternOpacity}
                      onChange={(e) => handleInputChange('patternOpacity', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Veľkosť vzoru: {backgroundSettings.patternSize}px
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      step="5"
                      value={backgroundSettings.patternSize}
                      onChange={(e) => handleInputChange('patternSize', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Home Page Background */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Domovská stránka - Pozadie</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Typ pozadia
              </label>
              <select
                value={backgroundSettings.homePageBackground}
                onChange={(e) => handleInputChange('homePageBackground', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {backgroundOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Global Background */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Globálne pozadie</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Typ pozadia pre celú stránku
              </label>
              <select
                value={backgroundSettings.globalBackground}
                onChange={(e) => handleInputChange('globalBackground', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {backgroundOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Náhľad pozadia</h2>
            
            <div className="relative w-full h-32 bg-gray-800 rounded-lg overflow-hidden">
              {/* Background Image */}
              {backgroundSettings.brandsPageBackgroundImage && (
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${backgroundSettings.brandsPageBackgroundImage})`,
                    opacity: backgroundSettings.backgroundImageOpacity,
                    filter: `blur(${backgroundSettings.backgroundImageBlur}px)`
                  }}
                />
              )}
              
              {/* Pattern Overlay */}
              {backgroundSettings.brandsPagePattern && backgroundSettings.patternType !== 'none' && (
                <div 
                  className="absolute inset-0"
                  style={{
                    opacity: backgroundSettings.patternOpacity,
                    backgroundImage: getPatternCSS(backgroundSettings.patternType),
                    backgroundSize: `${backgroundSettings.patternSize}px ${backgroundSettings.patternSize}px`,
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                  }}
                />
              )}
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <p className="text-gray-300">Ukážka obsahu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={saveBackgroundSettings}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200"
            >
              {loading ? 'Ukladám...' : 'Uložiť nastavenia'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate CSS patterns
const getPatternCSS = (patternType) => {
  switch (patternType) {
    case 'tiles':
      return `
        linear-gradient(45deg, #ffffff 25%, transparent 25%),
        linear-gradient(-45deg, #ffffff 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #ffffff 75%),
        linear-gradient(-45deg, transparent 75%, #ffffff 75%)
      `;
    case 'dots':
      return `radial-gradient(circle, #ffffff 2px, transparent 2px)`;
    case 'lines':
      return `linear-gradient(90deg, #ffffff 1px, transparent 1px)`;
    case 'grid':
      return `
        linear-gradient(90deg, #ffffff 1px, transparent 1px),
        linear-gradient(0deg, #ffffff 1px, transparent 1px)
      `;
    default:
      return 'none';
  }
};

export default AdminBackground;
