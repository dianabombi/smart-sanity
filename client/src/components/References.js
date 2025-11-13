import React, { useState, useEffect, useCallback, useRef } from 'react';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ApiService from '../services/api';
import { useBackgroundSettings } from '../hooks/useBackgroundSettings';

// Fallback references data
const fallbackReferences = [
    {
      id: 1,
      title: "Apartmán Sky Park",
      description: "Kompletný návrh a realizácia kúpeľne a WC v modernom industriálnom štýle. Design by Dušan Drinka. Spolupráca s Elite Bath+Kitchen.",
      year: "2021",
      location: "Bratislava",
      client: "Dušan Drinka, Juraj Stodolovský",
      images: []
    },
    {
      id: 2,
      title: "Apartmán Tatranská Lomnica",
      description: "Kompletný návrh a realizácia kúpeľne s WC. Design by Dušan Drinka & Juraj Stodolovský.",
      year: "2025",
      location: "Tatranská Lomnica",
      client: "súkromný investor",
      images: []
    },
    {
      id: 3,
      title: "Rodinný dom Senec",
      description: "Realizácia hlavnej kúpeľne a hosťovskej toalety v rodinnom dome.",
      year: "2024",
      location: "Senec",
      client: "súkromný investor",
      images: []
    }
  ];

// Cache to survive component remounts
const referencesCache = {
  references: null,
  pageDescription: null,
  isLoaded: false
};

const References = () => {
  const [references, setReferences] = useState(referencesCache.references || []);
  const [visible, setVisible] = useState(false);
  const [selectedReferenceImages, setSelectedReferenceImages] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);
  const [pageDescription, setPageDescription] = useState(
    referencesCache.pageDescription || 'Naše úspešne realizované projekty a spokojní klienti sú našou najlepšou vizitkou.'
  );
  const isMountedRef = useRef(false); // Prevent double loading
  
  // Background settings hook
  const { settings: backgroundSettings } = useBackgroundSettings();

  const loadReferences = useCallback(async (forceRefresh = false) => {
    try {
      console.log('🔄 PUBLIC REFERENCES: Loading references from database...');
      const result = await ApiService.getReferences();
      console.log('📊 PUBLIC REFERENCES: API result:', result);
      
      if (result.success && result.references && result.references.length > 0) {
        console.log(`✅ PUBLIC REFERENCES: Loaded ${result.references.length} references from database`);
        console.log('📋 PUBLIC REFERENCES: First reference:', result.references[0]);
        setReferences(result.references);
        referencesCache.references = result.references;
        referencesCache.isLoaded = true;
      } else {
        console.warn('⚠️ PUBLIC REFERENCES: No references in database or failed to load');
        console.log('📊 PUBLIC REFERENCES: Result details:', {
          success: result.success,
          hasReferences: !!result.references,
          count: result.references?.length || 0,
          message: result.message
        });
        console.log('📋 PUBLIC REFERENCES: Using fallback data');
        setReferences(fallbackReferences);
      }
    } catch (error) {
      console.error('❌ PUBLIC REFERENCES: Error in loadReferences:', error);
      console.log('📋 PUBLIC REFERENCES: Using fallback references due to error');
      setReferences(fallbackReferences);
    } finally {
      // Start animation after content is loaded
      setTimeout(() => {
        setVisible(true);
      }, 100);
    }
  }, []);

  useEffect(() => {
    // Prevent double loading
    if (isMountedRef.current) {
      return;
    }
    
    isMountedRef.current = true;
    loadReferences();
    loadPageDescription();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadPageDescription = async () => {
    try {
      const result = await ApiService.getPageContent('references', 'main', 'description');
      if (result.success && result.content) {
        setPageDescription(result.content);
        referencesCache.pageDescription = result.content;
      }
    } catch (error) {
      console.log('Using default page description');
    }
  };

  const openImageGallery = (reference) => {
    if (reference.images && reference.images.length > 0) {
      setSelectedReferenceImages(reference);
    }
  };

  const closeImageGallery = () => {
    setSelectedReferenceImages(null);
    setFullscreenImage(null);
    setFullscreenImageIndex(0);
  };

  const navigateImage = useCallback((direction) => {
    if (!selectedReferenceImages || !selectedReferenceImages.images) return;
    
    const totalImages = selectedReferenceImages.images.length;
    let newIndex = fullscreenImageIndex + direction;
    
    // Wrap around
    if (newIndex < 0) newIndex = totalImages - 1;
    if (newIndex >= totalImages) newIndex = 0;
    
    setFullscreenImageIndex(newIndex);
    
    // Get the new image URL
    const image = selectedReferenceImages.images[newIndex];
    const imageUrl = typeof image === 'string' ? image : (image.url || image.dataUrl || image.src || image.path || image.filename);
    setFullscreenImage(imageUrl);
  }, [selectedReferenceImages, fullscreenImageIndex]);

  // Handle ESC key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (fullscreenImage) {
          setFullscreenImage(null);
        } else if (selectedReferenceImages) {
          closeImageGallery();
        }
      } else if (fullscreenImage && selectedReferenceImages) {
        // Arrow key navigation
        if (e.key === 'ArrowLeft') {
          navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
          navigateImage(1);
        }
      }
    };

    // Prevent body scroll when modal is open
    if (selectedReferenceImages || fullscreenImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedReferenceImages, fullscreenImage, navigateImage]);

  // Removed skeleton loading state - show content immediately


  console.log('🎨 PUBLIC REFERENCES: Background Image Status:', {
    hasImage: !!backgroundSettings.referencesPageBackgroundImage,
    imageLength: backgroundSettings.referencesPageBackgroundImage?.length || 0,
    position: `${backgroundSettings.backgroundImagePositionX}/${backgroundSettings.backgroundImagePositionY}`,
    size: backgroundSettings.backgroundImageSize,
    opacity: backgroundSettings.backgroundImageOpacity,
    blur: backgroundSettings.backgroundImageBlur
  });

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Image */}
      {backgroundSettings.referencesPageBackgroundImage && (
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundSettings.referencesPageBackgroundImage})`,
            backgroundSize: backgroundSettings.backgroundImageSize || 'cover',
            backgroundPosition: `${backgroundSettings.backgroundImagePositionX || 'center'} ${backgroundSettings.backgroundImagePositionY || 'center'}`,
            backgroundRepeat: 'no-repeat',
            opacity: backgroundSettings.backgroundImageOpacity !== undefined ? backgroundSettings.backgroundImageOpacity : 0.3,
            filter: backgroundSettings.backgroundImageBlur ? `blur(${backgroundSettings.backgroundImageBlur}px)` : 'none'
          }}
        />
      )}

      <div className="relative min-h-screen">
        <NavBar />
        
        {/* Header Section */}
        <div className="pb-12 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-300 mb-4 tracking-wide ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transition: 'all 0.8s ease-out',
            transitionDelay: '0.2s'
          }}>
            Referencie
          </h1>
          <p className={`text-xl text-gray-300 mt-5 max-w-3xl mx-auto leading-relaxed ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transition: 'all 0.8s ease-out',
            transitionDelay: '0.4s'
          }}>
            {pageDescription}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 min-h-[60vh]">
        {references.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {references.map((reference, index) => (
              <div 
                key={reference.id} 
                className="group bg-black/30 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-black/50 transition-all duration-500 cursor-pointer relative pb-16 flex flex-col min-h-[360px]"
                style={{ opacity: 1 }}
              >
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-300 mb-3 text-center min-h-[3.5rem]">{reference.title}</h3>
                  
                  <div className="flex gap-2 items-center text-sm text-blue-300 mb-5 w-full text-left">
                    <span className="font-medium">{reference.year}</span>
                    {reference.location && <span>{reference.location}</span>}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 text-left w-full">{reference.description}</p>
                </div>
                
                {reference.client && (
                  <p className="absolute bottom-16 p-2 left-4 right-4 text-sm text-gray-300 text-left">Architekt: {reference.client}</p>
                )}
                
                {reference.images && reference.images.length > 0 && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <button
                      onClick={() => openImageGallery(reference)}
                      className="w-full py-2 px-4 mt-5 border border-gray-300 text-gray-300 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-sm"
                    >
                      Galéria
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 min-h-[40vh] flex flex-col justify-center">
            <div className="text-gray-300 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">Žiadne referencie</h3>
            <p className="text-gray-300">Referencie sa načítavaju...</p>
          </div>
        )}
        
        {/* Contact Button */}
        <div className="flex justify-center mt-12 px-4">
          <button 
            onClick={() => window.location.href = '/contact'}
            className="py-2 px-4 border border-gray-400 text-gray-300 rounded-lg hover:text-white transition-colors duration-500 bg-black/30 hover:bg-black/50 text-sm w-full max-w-xs mx-auto"
            style={{ borderWidth: '0.5px' }}
          >
            Kontaktujte nás
          </button>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {selectedReferenceImages && !fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[120] p-4">
          <div className="bg-black rounded-lg max-w-6xl w-full max-h-[85vh] overflow-y-auto border border-gray-600">
            {/* Modal Header */}
            <div className="sticky top-0 bg-black border-b border-gray-700 p-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedReferenceImages.title}</h2>
                <p className="text-gray-300">{selectedReferenceImages.description}</p>
                <div className="flex gap-4 text-sm text-gray-500 mt-2">
                  <span>{selectedReferenceImages.year}</span>
                  {selectedReferenceImages.location && <span>{selectedReferenceImages.location}</span>}
                  {selectedReferenceImages.client && <span>Architekt: {selectedReferenceImages.client}</span>}
                </div>
              </div>
              <button
                onClick={closeImageGallery}
                className="transition-all duration-200 mr-8"
              >
                <svg className="w-10 h-10 text-gray-400 hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Images Grid */}
            <div className="p-6">
              {console.log('🖼️ DEBUG: Selected reference images:', selectedReferenceImages)}
              {console.log('🖼️ DEBUG: Images array:', selectedReferenceImages.images)}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedReferenceImages.images.map((image, index) => {
                  // Handle both string paths and object formats
                  let imageUrl;
                  if (typeof image === 'string') {
                    // Image is stored as a simple string path
                    imageUrl = image;
                  } else {
                    // Image is stored as an object with properties
                    imageUrl = image.url || image.dataUrl || image.src || image.path || image.filename;
                  }
                  
                  console.log(`🖼️ DEBUG: Image ${index}:`, image);
                  console.log(`🖼️ DEBUG: Image ${index} type:`, typeof image);
                  console.log(`🖼️ DEBUG: Image ${index} URL:`, imageUrl);
                  
                  return (
                    <div key={index} className="aspect-square bg-gray-900 rounded-lg overflow-hidden cursor-pointer group relative">
                      <img
                        src={imageUrl}
                        alt={typeof image === 'object' ? (image.originalName || `Reference image ${index + 1}`) : `Reference image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onClick={() => {
                          setFullscreenImage(imageUrl);
                          setFullscreenImageIndex(index);
                        }}
                        onLoad={() => {
                          console.log(`✅ Image ${index} loaded successfully`);
                        }}
                        onError={(e) => {
                          console.error(`❌ Image ${index} failed to load:`, imageUrl);
                          console.error(`❌ Image ${index} error details:`, e);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      {/* Zoom icon overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center pointer-events-none">
                        <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-300" style={{ display: 'none' }}>
                        <div className="text-center">
                          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-xs">Obrázok sa nepodarilo načítať</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Close Button */}
            <div className="sticky bottom-0 bg-black border-t border-gray-700 p-3 text-center">
              <button
                onClick={closeImageGallery}
                className="py-2 px-6 border border-gray-400 text-gray-300 rounded-lg hover:text-white transition-colors duration-500 bg-black/30 hover:bg-black/50 text-sm"
                style={{ borderWidth: '0.5px' }}
              >
                Zavrieť galériu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black flex items-center justify-center z-[130] overflow-hidden"
          onClick={() => setFullscreenImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-5 z-[140] transition-all duration-200"
            title="Zavrieť (ESC)"
          >
            <svg className="w-10 h-10 text-gray-400 hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Navigation arrows - show only if more than 1 image */}
          {selectedReferenceImages && selectedReferenceImages.images && selectedReferenceImages.images.length > 1 && (
            <>
              {/* Left arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(-1);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-300 z-[140] group"
                title="Predchádzajúci obrázok (←)"
              >
                <img 
                  src="/right-chevron.png" 
                  alt="Previous" 
                  className="h-12 scale-90 rotate-180 drop-shadow-lg"
                  style={{ filter: 'brightness(0.6) invert(0.6)', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => e.target.style.filter = 'brightness(1) invert(1)'}
                  onMouseLeave={(e) => e.target.style.filter = 'brightness(0.6) invert(0.6)'}
                />
              </button>
              
              {/* Right arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-300 z-[140] group"
                title="Ďalší obrázok (→)"
              >
                <img 
                  src="/right-chevron.png" 
                  alt="Next" 
                  className="h-12 scale-90 drop-shadow-lg"
                  style={{ filter: 'brightness(0.6) invert(0.6)', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => e.target.style.filter = 'brightness(1) invert(1)'}
                  onMouseLeave={(e) => e.target.style.filter = 'brightness(0.6) invert(0.6)'}
                />
              </button>
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm z-[140]">
                {fullscreenImageIndex + 1} / {selectedReferenceImages.images.length}
              </div>
            </>
          )}
          
          {/* Fullscreen image */}
          <img
            src={fullscreenImage}
            alt="Fullscreen reference"
            className="object-contain"
            style={{ 
              maxWidth: 'calc(100vw - 32px)',
              maxHeight: 'calc(100vh - 80px)',
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

export default References;
