import React from 'react';

const BackgroundControls = ({ 
  backgroundSettings, 
  setBackgroundSettings, 
  backgroundLoading,
  backgroundMessage,
  onSave,
  onImageUpload,
  showCustomPosition,
  setShowCustomPosition,
  pageKey // e.g., 'brandsPage', 'referencesPage', 'contactPage'
}) => {
  const imageKey = `${pageKey}BackgroundImage`;
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Nastavenia pozadia stránky</h2>
        <button
          onClick={onSave}
          disabled={backgroundLoading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-4 py-2 rounded transition-colors"
        >
          {backgroundLoading ? 'Ukladám...' : '💾 Uložiť pozadie'}
        </button>
      </div>

      {backgroundMessage && (
        <div className={`mb-4 px-4 py-3 rounded ${
          backgroundMessage.includes('úspešne') || backgroundMessage.includes('✅')
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
            onChange={onImageUpload}
            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          {backgroundSettings[imageKey] && (
            <div className="mt-2">
              <button
                onClick={() => {
                  setBackgroundSettings(prev => ({
                    ...prev,
                    [imageKey]: null
                  }));
                }}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                🗑️ Odstrániť obrázok
              </button>
            </div>
          )}
        </div>

        {/* Live Preview Info */}
        <div className="text-xs p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-300 font-semibold">📊 Aktuálne nastavenia</span>
            <span className={`px-2 py-1 rounded text-xs ${backgroundSettings[imageKey] ? 'bg-green-700 text-green-100' : 'bg-gray-700 text-gray-300'}`}>
              {backgroundSettings[imageKey] ? '✓ Obrázok nahraný' : '○ Žiadny obrázok'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-gray-300">
            <div><span className="text-gray-500">Pozícia:</span> {backgroundSettings.backgroundImagePositionX || 'center'} / {backgroundSettings.backgroundImagePositionY || 'center'}</div>
            <div><span className="text-gray-500">Veľkosť:</span> {backgroundSettings.backgroundImageSize || 'cover'}</div>
            <div><span className="text-gray-500">Priehľadnosť:</span> {Math.round((backgroundSettings.backgroundImageOpacity || 0.3) * 100)}%</div>
            <div><span className="text-gray-500">Rozmazanie:</span> {backgroundSettings.backgroundImageBlur || 0}px</div>
          </div>
        </div>

        {/* Background Image Controls - Only show if image is uploaded */}
        {backgroundSettings[imageKey] && (
          <div className="border-t border-gray-600 pt-6 mt-6">
            <h3 className="text-lg font-medium text-gray-300 mb-4">Nastavenia obrázka pozadia</h3>
            
            {/* Live Preview */}
            <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-600">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                👁️ Náhľad pozadia
              </label>
              <div 
                className="relative w-full h-48 rounded-lg border-2 border-gray-600 overflow-hidden"
                style={{
                  backgroundImage: `url(${backgroundSettings[imageKey]})`,
                  backgroundSize: backgroundSettings.backgroundImageSize || 'cover',
                  backgroundPosition: `${backgroundSettings.backgroundImagePositionX || 'center'} ${backgroundSettings.backgroundImagePositionY || 'center'}`,
                  backgroundRepeat: 'no-repeat',
                  opacity: backgroundSettings.backgroundImageOpacity !== undefined ? backgroundSettings.backgroundImageOpacity : 0.3,
                  filter: backgroundSettings.backgroundImageBlur ? `blur(${backgroundSettings.backgroundImageBlur}px)` : 'none'
                }}
              />
              <div className="mt-2 text-xs text-gray-400 text-center">
                {backgroundSettings.backgroundImageSize || 'cover'} | 
                {' '}{backgroundSettings.backgroundImagePositionX || 'center'}/{backgroundSettings.backgroundImagePositionY || 'center'} | 
                {' '}Opacity: {Math.round((backgroundSettings.backgroundImageOpacity || 0.3) * 100)}% | 
                {' '}Blur: {backgroundSettings.backgroundImageBlur || 0}px
              </div>
            </div>
            
            {/* Image Size */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Veľkosť obrázka
              </label>
              <select
                value={backgroundSettings.backgroundImageSize || 'cover'}
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
                  onClick={() => setBackgroundSettings(prev => ({ ...prev, backgroundImagePositionX: 'left' }))}
                  className="p-2 bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white rounded transition-colors"
                >
                  ⬅️
                </button>
                <div className="flex-1 flex items-center justify-center gap-2 bg-gray-800 rounded px-2 py-2">
                  {['left', 'center', 'right'].map((pos, idx) => (
                    <React.Fragment key={pos}>
                      {idx > 0 && <span className="text-gray-600">|</span>}
                      <button
                        type="button"
                        onClick={() => setBackgroundSettings(prev => ({ ...prev, backgroundImagePositionX: pos }))}
                        className={`text-sm px-2 py-1 rounded transition-colors ${
                          (backgroundSettings.backgroundImagePositionX || 'center') === pos
                            ? 'text-blue-400 font-bold bg-blue-600/20'
                            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {pos === 'left' ? 'Vľavo' : pos === 'center' ? 'Stred' : 'Vpravo'}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setBackgroundSettings(prev => ({ ...prev, backgroundImagePositionX: 'right' }))}
                  className="p-2 bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white rounded transition-colors"
                >
                  ➡️
                </button>
              </div>
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
                  onClick={() => setBackgroundSettings(prev => ({ ...prev, backgroundImagePositionY: 'top' }))}
                  className="p-2 bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white rounded transition-colors"
                >
                  ⬆️
                </button>
                <div className="flex-1 flex items-center justify-center gap-2 bg-gray-800 rounded px-2 py-2">
                  {['top', 'center', 'bottom'].map((pos, idx) => (
                    <React.Fragment key={pos}>
                      {idx > 0 && <span className="text-gray-600">|</span>}
                      <button
                        type="button"
                        onClick={() => setBackgroundSettings(prev => ({ ...prev, backgroundImagePositionY: pos }))}
                        className={`text-sm px-2 py-1 rounded transition-colors ${
                          (backgroundSettings.backgroundImagePositionY || 'center') === pos
                            ? 'text-blue-400 font-bold bg-blue-600/20'
                            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {pos === 'top' ? 'Hore' : pos === 'center' ? 'Stred' : 'Dole'}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setBackgroundSettings(prev => ({ ...prev, backgroundImagePositionY: 'bottom' }))}
                  className="p-2 bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white rounded transition-colors"
                >
                  ⬇️
                </button>
              </div>
              
              {/* Custom position inputs */}
              {showCustomPosition && (
                <div className="mt-2 grid grid-cols-2 gap-3 p-3 bg-gray-700/50 rounded border border-gray-600">
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Horizontálne (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={backgroundSettings.customPositionX || 50}
                      onChange={(e) => setBackgroundSettings(prev => ({
                        ...prev,
                        customPositionX: e.target.value,
                        backgroundImagePositionX: e.target.value + '%'
                      }))}
                      className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Vertikálne (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={backgroundSettings.customPositionY || 50}
                      onChange={(e) => setBackgroundSettings(prev => ({
                        ...prev,
                        customPositionY: e.target.value,
                        backgroundImagePositionY: e.target.value + '%'
                      }))}
                      className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
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
                  {Math.round((backgroundSettings.backgroundImageOpacity || 0.3) * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={backgroundSettings.backgroundImageOpacity || 0.3}
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
                  {backgroundSettings.backgroundImageBlur || 0}px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={backgroundSettings.backgroundImageBlur || 0}
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
  );
};

export default BackgroundControls;
