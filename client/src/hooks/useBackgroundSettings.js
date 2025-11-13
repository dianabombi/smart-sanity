import { useState, useEffect, useRef } from 'react';
import ApiService from '../services/api';

export const useBackgroundSettings = () => {
  const [settings, setSettings] = useState({
    brandsPagePattern: true,
    entrancePagePattern: true,
    patternOpacity: 0.3,
    patternSize: 20,
    patternType: 'tiles',
    homePageBackground: 'default',
    globalBackground: 'default',
    brandsPageBackgroundImage: null,
    entrancePageBackgroundImage: null,
    referencesPageBackgroundImage: null,
    contactPageBackgroundImage: null,
    inspirationsPageBackgroundImage: null,
    backgroundImageOpacity: 0.3,
    backgroundImageBlur: 0,
    backgroundImageSize: 'cover',
    backgroundImagePositionX: 'center',
    backgroundImagePositionY: 'center'
  });
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(false);

  useEffect(() => {
    // Prevent double loading in React Strict Mode
    if (isMountedRef.current) {
      return;
    }
    
    isMountedRef.current = true;
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await ApiService.getBackgroundSettings();
      if (response.success && response.settings) {
        setSettings(prev => ({
          ...prev,
          ...response.settings
        }));
      }
    } catch (error) {
      console.error('Error loading background settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPatternCSS = (patternType) => {
    const patternColor = '#000000'; // Solid black - opacity controlled by layer
    
    switch (patternType) {
      case 'tiles':
        return `
          linear-gradient(45deg, ${patternColor} 25%, transparent 25%),
          linear-gradient(-45deg, ${patternColor} 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, ${patternColor} 75%),
          linear-gradient(-45deg, transparent 75%, ${patternColor} 75%)
        `;
      case 'dots':
        return `radial-gradient(circle, ${patternColor} 2px, transparent 2px)`;
      case 'lines':
        return `linear-gradient(90deg, ${patternColor} 1px, transparent 1px)`;
      case 'grid':
        return `
          linear-gradient(90deg, ${patternColor} 1px, transparent 1px),
          linear-gradient(0deg, ${patternColor} 1px, transparent 1px)
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
      opacity: settings.patternOpacity,
      pointerEvents: 'none'
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

    return {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: size,
      backgroundPosition: `${positionX} ${positionY}`,
      backgroundRepeat: 'no-repeat',
      opacity: settings.backgroundImageOpacity || 0.3,
      filter: `blur(${settings.backgroundImageBlur || 0}px)`
    };
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
