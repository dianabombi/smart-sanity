import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ApiService from '../services/api';
import { useBackgroundSettings } from '../hooks/useBackgroundSettings';

// Cache to survive React Strict Mode remounts

const entranceCache = {
  bulletPoints: null,
  isLoaded: false
};

const Entrance = () => {
  const { t, i18n } = useTranslation();
  const { settings: backgroundSettings, refreshSettings } = useBackgroundSettings();
  const [bulletPoints, setBulletPoints] = useState(
    entranceCache.bulletPoints || []
  );
  const isMountedRef = useRef(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  // Set default bullet points from translations if cache is empty
  useEffect(() => {
    if (!entranceCache.bulletPoints && i18n.isInitialized) {
      const defaultPoints = t('entrance.bulletPoints', { returnObjects: true });
      setBulletPoints(defaultPoints);
    }
  }, [i18n.isInitialized, t]);

  // Load content from admin only once on mount
  useEffect(() => {
    if (isMountedRef.current) {
      return;
    }
    isMountedRef.current = true;
    loadContent();
    
    // Trigger animation after component mounts
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reload content when language changes
  useEffect(() => {
    if (i18n.isInitialized) {
      loadContent();
    }
  }, [i18n.language]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-refresh background settings every 3 seconds to pick up admin changes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshSettings();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [refreshSettings]);

  const loadContent = async () => {
    try {
      // Get current language
      const currentLanguage = i18n.language || 'sk';
      
      const result = await ApiService.getPageContent('what-we-offer', 'main', 'content', currentLanguage);
      
      if (result.success && result.content) {
        const lines = result.content.split('\n').filter(line => line.trim().startsWith('•'));
        const points = lines.map(line => line.replace('•', '').trim());
        if (points.length > 0) {
          setBulletPoints(points);
          entranceCache.bulletPoints = points;
          entranceCache.isLoaded = true;
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  // Show background image immediately (progressive loading)
  useEffect(() => {
    // Always show background immediately - no preloading delay
    setBackgroundLoaded(true);
    
    // Optional: Log background info
    if (backgroundSettings.entrancePageBackgroundImage) {
      console.log('✅ Showing entrance background image immediately');
    }
  }, [backgroundSettings.entrancePageBackgroundImage]);

  // Debug logging for background settings
  console.log('🎨 ENTRANCE PAGE DEBUG:', {
    'Has Entrance Background?': !!backgroundSettings.entrancePageBackgroundImage,
    'Entrance Image Length': backgroundSettings.entrancePageBackgroundImage?.length || 0,
    'Image Preview (first 50 chars)': backgroundSettings.entrancePageBackgroundImage?.substring(0, 50) || 'NO IMAGE',
    'Opacity': backgroundSettings.backgroundImageOpacity,
    'All Settings': backgroundSettings
  });

  return (
    <>
      {/* Background Image - Outside parent, covers entire viewport */}
      {backgroundSettings.entrancePageBackgroundImage && (
        <div 
          className="fixed inset-0 bg-black"
          style={{
            backgroundImage: `url(${backgroundSettings.entrancePageBackgroundImage})`,
            backgroundSize: backgroundSettings.backgroundImageSize || 'cover',
            backgroundPosition: `${backgroundSettings.backgroundImagePositionX || 'center'} ${backgroundSettings.backgroundImagePositionY || 'center'}`,
            backgroundRepeat: 'no-repeat',
            opacity: backgroundLoaded ? (backgroundSettings.backgroundImageOpacity !== undefined ? backgroundSettings.backgroundImageOpacity : 1.0) : 0,
            filter: backgroundSettings.backgroundImageBlur ? `blur(${backgroundSettings.backgroundImageBlur}px)` : 'none',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
      )}
      
      <div className="min-h-screen relative">
        <div className="relative min-h-screen">
        <NavBar />
        
        {/* Header Section */}
        <div className="pt-32 pb-1 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-300 mb-0 tracking-wide ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transition: 'all 0.8s ease-out',
              transitionDelay: '0.2s'
            }}>
              {t('entrance.pageTitle')}
            </h1>
          </div>
        </div>
        
        {/* Services Cards Section */}
        <div className="pb-12 px-4 sm:px-6 lg:px-8 relative z-10 mt-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {bulletPoints.map((text, index) => (
                <div
                  key={index}
                  className={`group rounded-lg p-6 transition-colors duration-300 bg-black/40 border-gray-600 hover:bg-black/60 hover:border-gray-400 ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    borderWidth: '0.5px',
                    transition: 'all 0.8s ease-out',
                    transitionDelay: `${0.4 + index * 0.1}s`
                  }}
                >
                  <div className="space-y-3">
                    <p className="text-gray-300 leading-relaxed text-lg text-center">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid - Empty space for now */}
        <div className="pb-8 px-8 sm:px-12 lg:px-16 py-4">
          <div className="max-w-6xl mx-auto">
            {/* Category tiles removed - empty space ready for new content */}
          </div>
        </div>

        {/* Contact Button */}
        <div className="flex justify-center -mt-10 mb-12 px-4">
          <button 
            onClick={() => window.location.href = '/contact'}
            className={`py-2 px-4 border border-gray-400 text-gray-300 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-black/30 text-sm w-full max-w-xs ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transition: 'all 0.8s ease-out',
              transitionDelay: `${0.4 + bulletPoints.length * 0.1 + 0.1}s`
            }}
          >
            {t('contact.title')}
          </button>
        </div>

        {/* Footer */}
        <Footer />
        </div>
      </div>
    </>
  );
};

export default Entrance;
