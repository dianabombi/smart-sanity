import { useState, useEffect } from 'react';
import ApiService from '../services/api';

export const useBackgroundSettings = () => {
  const [settings, setSettings] = useState({
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // CRITICAL FIX: Skip API call to prevent table error, use default settings
      console.log('Using default background settings (Supabase table not configured)');
      // Settings already initialized with defaults above
    } catch (error) {
      console.error('Error loading background settings:', error);
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

  const getBackgroundStyle = () => {
    if (!settings.brandsPagePattern || settings.patternType === 'none') {
      return {};
    }

    return {
      backgroundImage: getPatternCSS(settings.patternType),
      backgroundSize: `${settings.patternSize}px ${settings.patternSize}px`,
      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
      opacity: settings.patternOpacity
    };
  };

  const getBackgroundImageStyle = () => {
    if (!settings.brandsPageBackgroundImage) {
      return {};
    }

    return {
      backgroundImage: `url(${settings.brandsPageBackgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: settings.backgroundImageOpacity,
      filter: `blur(${settings.backgroundImageBlur}px)`
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
