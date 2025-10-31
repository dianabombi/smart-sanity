import React, { useState, useEffect, useCallback } from 'react';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ApiService from '../services/api';

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

const References = () => {
  const [references, setReferences] = useState(fallbackReferences);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedReferenceImages, setSelectedReferenceImages] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);
  const [pageDescription, setPageDescription] = useState('Naše úspešne realizované projekty a spokojní klienti sú našou najlepšou vizitkou.');
  const [skeletonCount, setSkeletonCount] = useState(6); // Default skeleton count

  const loadReferences = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      const result = await ApiService.getReferences();
      
      if (result.success && result.references && result.references.length > 0) {
        console.log(`✅ PUBLIC: Loaded ${result.references.length} references from database`);
        // Set skeleton count based on actual data
        setSkeletonCount(result.references.length || 6);
        setReferences(result.references);
      } else {
        console.log('📋 PUBLIC: No references in database, using fallback data');
        setSkeletonCount(fallbackReferences.length);
        setReferences(fallbackReferences);
      }
    } catch (error) {
      console.error('❌ PUBLIC: Error in loadReferences:', error);
      console.log('📋 PUBLIC: Using fallback references due to error');
      setReferences(fallbackReferences);
    } finally {
      setLoading(false);
      // Start animation after content is loaded
      setTimeout(() => {
        setVisible(true);
      }, 400);
    }
  }, []);

  useEffect(() => {
    loadReferences();
    loadPageDescription();
    // Removed auto-refresh to prevent screen flickering
  }, [loadReferences]);

  const loadPageDescription = async () => {
    try {
      const result = await ApiService.getPageContent('references', 'main', 'description');
      if (result.success && result.content) {
        setPageDescription(result.content);
      }
    } catch (error) {
      console.error('Error loading page description:', error);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
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
        
        {/* Header Section */}
        <div className="pb-6 px-4 sm:px-6 lg:px-8 pt-32">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-300 mb-6 tracking-wide ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transition: 'all 0.8s ease-out',
              transitionDelay: '0.2s'
            }}>
              Referencie
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
        </div>
        
        {/* Skeleton Grid */}
        <div className="container mx-auto px-4 py-8 pb-16 min-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: skeletonCount }, (_, index) => (
              <div key={index} className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 transition-all duration-300" style={{ opacity: 1 }}>
                <div className="mb-4">
                  {/* Title skeleton */}
                  <div className="h-6 bg-gray-700 rounded mb-2 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                  </div>
                  
                  {/* Description skeleton */}
                  <div className="h-4 bg-gray-700 rounded mb-3 w-3/4 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                  </div>
                  
                  {/* Year and location skeleton */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-3 bg-gray-700 rounded w-16 animate-pulse"></div>
                    <div className="h-3 bg-gray-700 rounded w-20 animate-pulse"></div>
                  </div>
                  
                  {/* Client skeleton */}
                  <div className="h-3 bg-gray-700 rounded w-24 mb-4 animate-pulse"></div>
                  
                  {/* Button skeleton */}
                  <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      
      {/* Header Section */}
      <div className="pb-6 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-300 mb-6 tracking-wide ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transition: 'all 0.8s ease-out',
            transitionDelay: '0.2s'
          }}>
            Referencie
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
      </div>
      
      <div className="container mx-auto px-4 py-8 pb-16 min-h-[60vh]">
        {references.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {references.map((reference, index) => (
              <div 
                key={reference.id} 
                className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 h-80 flex flex-col"
                style={{ opacity: 1 }}
              >
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-white mb-2">{reference.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 flex-1">{reference.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                    <span className="font-medium">{reference.year}</span>
                    {reference.location && <span>{reference.location}</span>}
                  </div>
                  
                  {reference.client && (
                    <p className="text-sm text-gray-400 mb-4">Klient: {reference.client}</p>
                  )}
                </div>
                
                {reference.images && reference.images.length > 0 && (
                  <div className="mt-auto">
                    <button
                      onClick={() => openImageGallery(reference)}
                      className="w-full py-2 px-4 border border-gray-400 text-gray-400 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-sm"
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
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-400 mb-2">Žiadne referencie</h3>
            <p className="text-gray-400">Referencie sa načítavaju...</p>
          </div>
        )}
      </div>

      {/* Image Gallery Modal */}
      {selectedReferenceImages && !fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[120] p-4">
          <div className="bg-gray-800 rounded-lg max-w-6xl w-full max-h-[85vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedReferenceImages.title}</h2>
                <p className="text-gray-300">{selectedReferenceImages.description}</p>
                <div className="flex gap-4 text-sm text-gray-500 mt-2">
                  <span>{selectedReferenceImages.year}</span>
                  {selectedReferenceImages.location && <span>{selectedReferenceImages.location}</span>}
                  {selectedReferenceImages.client && <span>Klient: {selectedReferenceImages.client}</span>}
                </div>
              </div>
              <button
                onClick={closeImageGallery}
                className="text-gray-300 hover:text-white text-2xl font-bold"
              >
                ×
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
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
            <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-3 text-center">
              <button
                onClick={closeImageGallery}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
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
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl font-bold z-[140] bg-gray-800/50 hover:bg-gray-700/50 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            title="Zavrieť (ESC)"
          >
            ×
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
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl font-bold z-[140] bg-gray-800/50 hover:bg-gray-700/50 rounded-full w-14 h-14 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                title="Predchádzajúci obrázok (←)"
              >
                ‹
              </button>
              
              {/* Right arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl font-bold z-[140] bg-gray-800/50 hover:bg-gray-700/50 rounded-full w-14 h-14 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                title="Ďalší obrázok (→)"
              >
                ›
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
  );
};

export default References;
