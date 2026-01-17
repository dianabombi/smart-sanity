import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ApiService from '../services/api';
import { useBackgroundSettings } from '../hooks/useBackgroundSettings';

const Inspirations = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory] = useState('all');
  const [inspirations, setInspirations] = useState([]);
  const [pageDescription, setPageDescription] = useState(t('inspirations.description'));
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  
  // Background settings hook
  const { settings: backgroundSettings, refreshSettings } = useBackgroundSettings();

  const loadInspirations = useCallback(async (forceRefresh = false) => {
    try {
      console.log(`🔄 INSPIRATIONS: Loading inspirations... ${forceRefresh ? '(FORCE REFRESH)' : ''}`);
      
      const result = await ApiService.getInspirations();
      
      console.log('🔍 INSPIRATIONS: API result:', result);
      console.log('🔍 INSPIRATIONS: Data source:', result.source);
      
      if (result.success && result.inspirations) {
        console.log(`✅ INSPIRATIONS: Loaded ${result.inspirations.length} inspirations from database`);
        
        // Preload the first image for faster display
        if (result.inspirations.length > 0 && result.inspirations[0].image) {
          const firstImage = new Image();
          firstImage.src = result.inspirations[0].image;
        }
        
        setInspirations(result.inspirations);
      } else {
        console.error('❌ INSPIRATIONS: Failed to load inspirations:', result.message);
        console.error('❌ INSPIRATIONS: Error source:', result.source);
        setInspirations([]);
      }
    } catch (error) {
      console.error('❌ INSPIRATIONS: Error in loadInspirations:', error);
      setInspirations([]);
    } finally {
      // Wait for DOM to render before triggering animation
      requestAnimationFrame(() => {
        setTimeout(() => {
          setVisible(true);
        }, 150);
      });
    }
  }, []);


  const loadPageDescription = useCallback(async () => {
    try {
      const currentLanguage = i18n.language || 'sk';
      const result = await ApiService.getPageContent('inspirations', 'main', 'description', currentLanguage);
      if (result.success && result.content) {
        setPageDescription(result.content);
      } else {
        // Fallback to translation file if no database content
        setPageDescription(t('inspirations.description'));
      }
    } catch (error) {
      console.error('Error loading page description:', error);
      setPageDescription(t('inspirations.description'));
    }
  }, [i18n.language, t]);

  useEffect(() => {
    loadInspirations();
    loadPageDescription();
    // Removed auto-refresh to prevent screen flickering
    // Animation trigger moved to loadInspirations finally block
  }, [loadInspirations, loadPageDescription]);

  // Reload description when language changes
  useEffect(() => {
    loadPageDescription();
  }, [i18n.language, loadPageDescription]);

  // Auto-refresh background settings every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshSettings();
    }, 2000);

    return () => clearInterval(interval);
  }, [refreshSettings]);


  const openImageModal = (inspiration) => {
    setSelectedImage(inspiration);
    // Find the index of this inspiration
    const index = filteredInspirations.findIndex(i => i.id === inspiration.id);
    setCurrentImageIndex(index);
    // Go directly to fullscreen mode
    setFullScreenImage(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setFullScreenImage(false);
    setCurrentImageIndex(0);
  };

  // Close modal with Escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeImageModal();
      } else if (fullScreenImage && filteredInspirations.length > 1) {
        // Arrow key navigation in fullscreen
        if (e.key === 'ArrowLeft') {
          navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
          navigateImage(1);
        }
      }
    };

    // Prevent body scroll when modal is open
    if (selectedImage && fullScreenImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, fullScreenImage]); // eslint-disable-line react-hooks/exhaustive-deps



  const filteredInspirations = selectedCategory === 'all' 
    ? inspirations 
    : inspirations.filter(item => item.category === selectedCategory);

  // Navigation function for fullscreen image gallery
  const navigateImage = (direction) => {
    if (!filteredInspirations || filteredInspirations.length === 0) return;
    
    const totalImages = filteredInspirations.length;
    let newIndex = currentImageIndex + direction;
    
    // Wrap around
    if (newIndex < 0) newIndex = totalImages - 1;
    if (newIndex >= totalImages) newIndex = 0;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredInspirations[newIndex]);
  };



  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Image */}
      {backgroundSettings.inspirationsPageBackgroundImage && (
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundSettings.inspirationsPageBackgroundImage})`,
            backgroundSize: backgroundSettings.backgroundImageSize || 'cover',
            backgroundPosition: `${backgroundSettings.backgroundImagePositionX || 'center'} ${backgroundSettings.backgroundImagePositionY || 'center'}`,
            backgroundRepeat: 'no-repeat',
            opacity: backgroundSettings.backgroundImageOpacity !== undefined ? backgroundSettings.backgroundImageOpacity : 0.3,
            filter: backgroundSettings.backgroundImageBlur ? `blur(${backgroundSettings.backgroundImageBlur}px)` : 'none'
          }}
        />
      )}

      <div className="relative min-h-screen flex flex-col">
        {/* Custom CSS for shimmer animation */}
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
        `}</style>
        <NavBar />
        
        {/* Main content with flex-grow to push footer down */}
        <div className="flex-grow min-h-screen">
          <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-300 mb-6 mt-20 tracking-wide ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transition: 'all 0.8s ease-out',
            transitionDelay: '0.2s'
          }}>
            {t('inspirations.title')}
          </h1>
          <p className={`text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transition: 'all 0.8s ease-out',
            transitionDelay: '0.4s'
          }}>
            {pageDescription}
          </p>
        </div>


        {/* Photos Only Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" style={{ minHeight: '1200px' }}>
        {filteredInspirations.length > 0 ? (
          filteredInspirations.map((inspiration, index) => (
            <div key={inspiration.id} className={`group ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transition: 'all 0.8s ease-out',
              transitionDelay: `${0.6 + index * 0.1}s`
            }}>
              <div 
                className="h-64 bg-gray-800 flex items-center justify-center relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openImageModal(inspiration)}
              >
                {/* Loading skeleton */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
                </div>
                
                <img 
                  src={inspiration.image} 
                  alt={inspiration.title}
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-300 opacity-0"
                  loading={inspiration.id === 1 ? "eager" : "lazy"}
                  decoding="async"
                  style={{
                    backgroundColor: '#1f2937',
                    minHeight: '256px'
                  }}
                  onLoad={(e) => {
                    e.target.style.opacity = '1';
                    e.target.previousSibling.style.display = 'none';
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                    e.target.previousSibling.style.display = 'none';
                  }}
                />
                <div className="text-gray-500 text-center absolute inset-0 flex flex-col items-center justify-center" style={{display: 'none'}}>
                  <div className="text-4xl mb-2">🏠</div>
                  <div className="text-sm">Foto kúpeľne</div>
                </div>
                
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center pointer-events-none">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-400">Načítavajú sa inšpirácie...</p>
          </div>
        )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 px-4">
          <button 
            onClick={() => window.location.href = '/contact'}
            className="py-2 px-4 border border-gray-400 text-gray-300 rounded-lg hover:border-white hover:text-white hover:bg-black/40 transition-colors duration-200 bg-black/30 text-sm w-full sm:w-48"
          >
            {t('common.contactUs')}
          </button>
          <button 
            onClick={() => window.location.href = '/brands'}
            className="py-2 px-4 border border-gray-400 text-gray-300 rounded-lg hover:border-white hover:text-white hover:bg-black/40 transition-colors duration-200 bg-black/30 text-sm w-full sm:w-48"
          >
            Prezrieť značky
          </button>
        </div>
        </div>
        </div>

      {/* Full Screen Image Modal */}
      {selectedImage && fullScreenImage && (
        <div 
          className="fixed inset-0 bg-black flex items-center justify-center z-[130] overflow-hidden"
          onClick={closeImageModal}
        >
          {/* Close button */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-5 z-[140] transition-all duration-200"
            title="Zavrieť (ESC)"
          >
            <svg className="w-10 h-10 text-gray-400 hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image title at bottom center */}
          {selectedImage.title && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[140] bg-black/70 backdrop-blur-sm px-6 py-3 rounded-lg">
              <div className="text-white text-xl font-semibold tracking-wide drop-shadow-lg text-center">
                {selectedImage.title}
              </div>
            </div>
          )}
          
          {/* Navigation arrows */}
          {filteredInspirations && filteredInspirations.length > 1 ? (
            <React.Fragment>
              {/* Left arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(-1);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-300 z-[140] group"
                title="Predchádzajúca inšpirácia (←)"
              >
                <img 
                  src="/right-chevron.png" 
                  alt="Previous" 
                  className="h-12 scale-90 rotate-180 drop-shadow-lg brightness-[0.6] hover:brightness-100 invert-[0.6] hover:invert transition-all duration-300"
                />
              </button>
              
              {/* Right arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-300 z-[140] group"
                title="Ďalšia inšpirácia (→)"
              >
                <img 
                  src="/right-chevron.png" 
                  alt="Next" 
                  className="h-12 scale-90 drop-shadow-lg brightness-[0.6] hover:brightness-100 invert-[0.6] hover:invert transition-all duration-300"
                />
              </button>
            </React.Fragment>
          ) : null}
          
          {/* Full screen image */}
          <img
            src={selectedImage.image}
            alt={selectedImage.title}
            className="object-contain"
            style={{ 
              maxWidth: 'calc(100vw - 32px)',
              maxHeight: selectedImage.title ? 'calc(100vh - 120px)' : 'calc(100vh - 80px)',
              width: 'auto',
              height: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      
      <Footer />
      </div>
    </div>
  );
};

export default Inspirations;
