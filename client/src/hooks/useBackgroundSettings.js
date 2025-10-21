import { useState, useEffect } from 'react';
import ApiService from '../services/api';

export const useBackgroundSettings = () => {
  const [settings, setSettings] = useState({
    brandsPagePattern: true,
    entrancePagePattern: true,
    patternOpacity: 0.05,
    patternSize: 20,
    patternType: 'tiles',
    homePageBackground: 'default',
    globalBackground: 'default',
    brandsPageBackgroundImage: null,
    entrancePageBackgroundImage: null,
    backgroundImageOpacity: 0.3,
    backgroundImageBlur: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      console.log('🔄 Loading background settings from API...');
      const response = await ApiService.getBackgroundSettings();
      if (response.success && response.settings) {
        console.log('✅ Background settings loaded:', response.settings);
        setSettings(prev => ({
          ...prev,
          ...response.settings
        }));
      } else {
        console.log('⚠️ Using default background settings');
      }
    } catch (error) {
      console.error('❌ Error loading background settings:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const getBackgroundStyle = (page = 'brands') => {
    const patternKey = page === 'entrance' ? 'entrancePagePattern' : 'brandsPagePattern';
    const backgroundImageKey = page === 'entrance' ? 'entrancePageBackgroundImage' : 'brandsPageBackgroundImage';
    
    // Only show pattern if there's a background image AND pattern is enabled
    if (!settings[patternKey] || settings.patternType === 'none' || !settings[backgroundImageKey]) {
      return {};
    }

    return {
      backgroundImage: getPatternCSS(settings.patternType),
      backgroundSize: `${settings.patternSize}px ${settings.patternSize}px`,
      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
      opacity: settings.patternOpacity
    };
  };

  const getBackgroundImageStyle = (imageUrl, page = 'brands') => {
    // Use provided imageUrl or get from settings based on page
    const backgroundImage = imageUrl || (page === 'entrance' ? settings.entrancePageBackgroundImage : settings.brandsPageBackgroundImage);
    
    if (!backgroundImage) {
      return {};
    }

    // Get positioning values with defaults
    const positionX = settings.backgroundImagePositionX || 'center';
    const positionY = settings.backgroundImagePositionY || 'center';
    const size = settings.backgroundImageSize || 'cover';

    console.log('🎨 Background Image Style Debug:', {
      page,
      positionX,
      positionY,
      size,
      opacity: settings.backgroundImageOpacity,
      blur: settings.backgroundImageBlur,
      settings
    });

    const style = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: size,
      backgroundPosition: `${positionX} ${positionY}`,
      backgroundRepeat: 'no-repeat',
      opacity: settings.backgroundImageOpacity || 0.3,
      filter: `blur(${settings.backgroundImageBlur || 0}px)`
    };

    console.log('🎨 Final background style:', style);
    return style;
  };

  return {
    settings,
    loading,
    getBackgroundStyle,
    getBackgroundImageStyle,
    refreshSettings: loadSettings
  };
};

export default useBackgroundSettings;
