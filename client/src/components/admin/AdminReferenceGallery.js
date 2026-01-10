import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';
import BackgroundControls from './shared/BackgroundControls';

const AdminReferenceGallery = ({ onLogout }) => {
  // Background settings for reference gallery pages
  const [backgroundSettings, setBackgroundSettings] = useState({
    referenceGalleryBackgroundImage: null,
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
    loadBackgroundSettings();
  }, []);
  
  const loadBackgroundSettings = async () => {
    try {
      console.log('📥 ADMIN REFERENCE GALLERY: Loading background settings from database...');
      const response = await ApiService.getBackgroundSettings();
      console.log('📥 ADMIN REFERENCE GALLERY: API response:', response);
      
      if (response.success && response.settings) {
        console.log('📥 ADMIN REFERENCE GALLERY: Settings from DB:', {
          hasGalleryImage: !!response.settings.referenceGalleryBackgroundImage,
          imageLength: response.settings.referenceGalleryBackgroundImage?.length || 0,
          allKeys: Object.keys(response.settings)
        });
        
        setBackgroundSettings(prev => ({
          ...prev,
          referenceGalleryBackgroundImage: response.settings.referenceGalleryBackgroundImage,
          backgroundImageSize: response.settings.backgroundImageSize || 'cover',
          backgroundImagePositionX: response.settings.backgroundImagePositionX || 'center',
          backgroundImagePositionY: response.settings.backgroundImagePositionY || 'center',
          backgroundImageOpacity: response.settings.backgroundImageOpacity !== undefined ? response.settings.backgroundImageOpacity : 0.3,
          backgroundImageBlur: response.settings.backgroundImageBlur || 0
        }));
        
        console.log('📥 ADMIN REFERENCE GALLERY: Settings state updated');
      } else {
        console.warn('⚠️ ADMIN REFERENCE GALLERY: No settings returned from API');
      }
    } catch (error) {
      console.error('❌ ADMIN REFERENCE GALLERY: Error loading background settings:', error);
    }
  };
  
  const handleBgImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('📤 ADMIN REFERENCE GALLERY: File selected:', file.name, file.size, file.type);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setBackgroundMessage('❌ Vyberte prosím obrázok (JPG, PNG, WebP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setBackgroundMessage('❌ Obrázok je príliš veľký. Maximálna veľkosť je 5MB');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('📤 ADMIN REFERENCE GALLERY: Image converted to base64, length:', reader.result.length);
        setBackgroundSettings(prev => {
          const newSettings = {
            ...prev,
            referenceGalleryBackgroundImage: reader.result
          };
          console.log('📤 ADMIN REFERENCE GALLERY: Updated settings state:', {
            hasImage: !!newSettings.referenceGalleryBackgroundImage,
            imageLength: newSettings.referenceGalleryBackgroundImage?.length || 0
          });
          return newSettings;
        });
        setBackgroundMessage('✅ Obrázok nahraný! Kliknite na "💾 Uložiť pozadie" pre uloženie.');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading background image:', error);
      setBackgroundMessage('❌ Chyba pri nahrávaní obrázka');
    }
  };

  const saveBackgroundSettings = async () => {
    try {
      setBackgroundLoading(true);
      localStorage.removeItem('backgroundSettings');
      
      // Remove customPositionX/Y if not using custom positions (they're not in database schema)
      const { customPositionX, customPositionY, ...settingsToSave } = backgroundSettings;
      
      // Debug: Log what we're saving
      console.log('💾 ADMIN REFERENCE GALLERY: Saving background settings:', settingsToSave);
      console.log('💾 ADMIN REFERENCE GALLERY: Image key check:', {
        hasImage: !!settingsToSave.referenceGalleryBackgroundImage,
        imageLength: settingsToSave.referenceGalleryBackgroundImage?.length || 0
      });
      
      const response = await ApiService.updateBackgroundSettings(settingsToSave);
      console.log('💾 ADMIN REFERENCE GALLERY: Save response:', response);
      
      if (response.success) {
        setBackgroundMessage('✅ Nastavenia uložené! Zmeny sa prejavia na stránke do 2 sekúnd.');
        setTimeout(() => setBackgroundMessage(''), 5000);
      } else {
        setBackgroundMessage('❌ Chyba pri ukladaní nastavení pozadia');
      }
    } catch (error) {
      console.error('Error saving background settings:', error);
      setBackgroundMessage('❌ Chyba pri ukladaní nastavení pozadia: ' + error.message);
    } finally {
      setBackgroundLoading(false);
    }
  };

  const handleRemoveBackground = () => {
    if (window.confirm('Naozaj chcete odstrániť obrázok pozadia pre galérie referencií?')) {
      setBackgroundSettings(prev => ({
        ...prev,
        referenceGalleryBackgroundImage: null
      }));
      setBackgroundMessage('Obrázok pozadia odstránený. Kliknite na "💾 Uložiť pozadie" pre potvrdenie.');
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Galéria referencií - Pozadie</h1>
          <p className="text-gray-400">Nastavte pozadie pre stránky jednotlivých referencií</p>
          <p className="text-sm text-blue-400 mt-2">
            💡 Toto pozadie sa zobrazí na stránkach jednotlivých projektov pri prehliadaní fotiek
          </p>
        </div>

        {/* Preview Section */}
        {backgroundSettings.referenceGalleryBackgroundImage && (
          <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">📸 Náhľad pozadia</h2>
            <div 
              className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-600"
              style={{
                backgroundImage: `url(${backgroundSettings.referenceGalleryBackgroundImage})`,
                backgroundSize: backgroundSettings.backgroundImageSize || 'cover',
                backgroundPosition: `${backgroundSettings.backgroundImagePositionX || 'center'} ${backgroundSettings.backgroundImagePositionY || 'center'}`,
                backgroundRepeat: 'no-repeat',
                opacity: backgroundSettings.backgroundImageOpacity !== undefined ? backgroundSettings.backgroundImageOpacity : 0.3,
                filter: backgroundSettings.backgroundImageBlur ? `blur(${backgroundSettings.backgroundImageBlur}px)` : 'none'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 px-6 py-3 rounded-lg">
                  <p className="text-white text-lg">Obsah galérie referencie</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleRemoveBackground}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              🗑️ Odstrániť pozadie
            </button>
          </div>
        )}

        {/* Background Controls */}
        <BackgroundControls
          backgroundSettings={backgroundSettings}
          setBackgroundSettings={setBackgroundSettings}
          backgroundLoading={backgroundLoading}
          backgroundMessage={backgroundMessage}
          onSave={saveBackgroundSettings}
          onImageUpload={handleBgImageUpload}
          showCustomPosition={showCustomPosition}
          setShowCustomPosition={setShowCustomPosition}
          pageKey="referenceGallery"
        />

        {/* Information Card */}
        <div className="mt-8 bg-blue-900/20 border border-blue-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-300 mb-3">ℹ️ Informácie</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Toto pozadie sa použije na stránkach jednotlivých referencií (napr. /references/1)</li>
            <li>• Odporúčaná veľkosť obrázka: 1920x1080 px</li>
            <li>• Odporúčaný formát: JPG alebo WebP pre optimálnu rýchlosť načítania</li>
            <li>• Maximálna veľkosť súboru: 5MB</li>
            <li>• Pre najlepší výsledok použite obrázok s jemnými farbami a nižším kontrastom</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReferenceGallery;
