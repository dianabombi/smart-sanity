import React, { useState, useEffect, useCallback } from 'react';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ApiService from '../services/api';

const Inspirations = () => {
  const [selectedCategory] = useState('all');
  const [inspirations, setInspirations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageDescription, setPageDescription] = useState('Objavte najkrajšie kúpeľne a nechajte sa inšpirovať pre váš domov. Od moderných minimalistických riešení až po luxusné wellness priestory.');
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(9); // Default skeleton count

  const loadInspirations = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      console.log(`🔄 INSPIRATIONS: Loading inspirations... ${forceRefresh ? '(FORCE REFRESH)' : ''}`);
      
      const result = await ApiService.getInspirations();
      
      console.log('🔍 INSPIRATIONS: API result:', result);
      console.log('🔍 INSPIRATIONS: Data source:', result.source);
      
      if (result.success && result.inspirations) {
        console.log(`✅ INSPIRATIONS: Loaded ${result.inspirations.length} inspirations from database`);
        
        // Set skeleton count based on actual data
        setSkeletonCount(result.inspirations.length || 9);
        
        // Preload the first image for faster display
        if (result.inspirations.length > 0 && result.inspirations[0].image) {
          const firstImage = new Image();
          firstImage.src = result.inspirations[0].image;
        }
        
        setInspirations(result.inspirations);
      } else {
        console.error('❌ INSPIRATIONS: Failed to load inspirations:', result.message);
        console.error('❌ INSPIRATIONS: Error source:', result.source);
        setSkeletonCount(0); // No skeletons if no data
        setInspirations([]);
      }
    } catch (error) {
      console.error('❌ INSPIRATIONS: Error in loadInspirations:', error);
      setSkeletonCount(0);
      setInspirations([]);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    loadInspirations();
    loadPageDescription();
    // Removed auto-refresh to prevent screen flickering
  }, [loadInspirations]);

  const loadPageDescription = async () => {
    try {
      const result = await ApiService.getPageContent('inspirations', 'main', 'description');
      if (result.success && result.content) {
        setPageDescription(result.content);
      }
    } catch (error) {
      console.error('Error loading page description:', error);
    }
  };

  const openImageModal = (inspiration) => {
    setSelectedImage(inspiration);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setFullScreenImage(false);
  };

  // Close modal with Escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (fullScreenImage) {
          setFullScreenImage(false);
        } else if (selectedImage) {
          closeImageModal();
        }
      }
    };

    // Prevent body scroll when modal is open
    if (selectedImage || fullScreenImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, fullScreenImage]);

  // const categories = [
  //   { id: 'all', name: 'Všetky inšpirácie', icon: '🏠' },
  //   { id: 'modern', name: 'Moderné', icon: '✨' },
  //   { id: 'luxury', name: 'Luxusné', icon: '💎' },
  //   { id: 'industrial', name: 'Industriálne', icon: '🏭' },
  //   { id: 'classic', name: 'Klasické', icon: '🏛️' },
  //   { id: 'small', name: 'Malé priestory', icon: '📐' },
  //   { id: 'natural', name: 'Prírodné', icon: '🌿' }
  // ];

  const filteredInspirations = selectedCategory === 'all' 
    ? inspirations 
    : inspirations.filter(item => item.category === selectedCategory);

  // const tips = [
  //   {
  //     title: 'Osvetlenie je kľúčové',
  //     description: 'Kombinujte všeobecné, úlohové a atmosférické osvetlenie pre dokonalý výsledok.',
  //     icon: '💡'
  //   },
  //   {
  //     title: 'Kvalitné materiály',
  //     description: 'Investujte do odolných materiálov, ktoré vydržia vlhkosť a časté používanie.',
  //     icon: '🛠️'
  //   },
  //   {
  //     title: 'Funkčnosť na prvom mieste',
  //     description: 'Krásny dizajn musí byť aj praktický. Myslite na každodenné používanie.',
  //     icon: '⚙️'
  //   },
  //   {
  //     title: 'Ventilá­cia je dôležitá',
  //     description: 'Správna ventilácia predchádza vlhkosti a zabezpečuje zdravé prostredie.',
  //     icon: '🌬️'
  //   }
  // ];


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
      
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-6 mt-20 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
            Inšpirácie
          </h1>
          <p className="text-xl text-gray-300 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] max-w-3xl mx-auto leading-relaxed">
            {pageDescription}
          </p>
        </div>


        {/* Photos Only Gallery */}
        {loading ? (
          /* Skeleton Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {Array.from({ length: skeletonCount }, (_, index) => (
              <div key={index} className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 transition-all duration-300" style={{ opacity: 1 }}>
                {/* Image placeholder */}
                <div className="h-48 bg-gray-700 rounded-lg mb-4 relative overflow-hidden animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                </div>
                
                {/* Content skeleton */}
                <div className="space-y-3">
                  {/* Title skeleton */}
                  <div className="h-5 bg-gray-700 rounded w-3/4 animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                  </div>
                  
                  {/* Description skeleton */}
                  <div className="h-4 bg-gray-700 rounded w-full animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                  </div>
                  <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                  </div>
                  
                  {/* Button skeleton */}
                  <div className="h-8 bg-gray-700 rounded mt-4 animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredInspirations.map((inspiration) => (
            <div key={inspiration.id} className="group" style={{ opacity: 1 }}>
              <div 
                className="h-64 bg-gray-800 flex items-center justify-center relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openImageModal(inspiration)}
              >
                {/* Loading skeleton */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-gray-500 text-center">
                      <div className="text-4xl mb-2">📷</div>
                      <div className="text-sm">Načítavam...</div>
                    </div>
                  </div>
                </div>
                
                <img 
                  src={inspiration.image} 
                  alt={inspiration.title}
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-300 opacity-0"
                  loading={inspiration.id === 1 ? "eager" : "lazy"}
                  decoding="async"
                  fetchpriority={inspiration.id === 1 ? "high" : "low"}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-gray-900 border border-gray-700 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">
            Potrebujete pomoc s návrhom?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Naši dizajnéri vám pomôžu vytvoriť kúpeľňu vašich snov
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/contact'}
              className="py-2 px-4 border border-gray-400 text-gray-300 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-sm w-full sm:w-48"
            >
              Kontaktujte nás
            </button>
            <button 
              onClick={() => window.location.href = '/brands'}
              className="py-2 px-4 border border-gray-400 text-gray-300 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-sm w-full sm:w-48"
            >
              Prezrieť značky
            </button>
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && !fullScreenImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-6 pt-24"
          onClick={closeImageModal}
        >
          <div 
            className="relative bg-gray-900 rounded-lg p-6 max-w-4xl max-h-[80vh] w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeImageModal}
              className="absolute top-3 right-3 text-white hover:text-gray-300 text-2xl font-bold z-20 bg-gray-600 hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
            >
              ×
            </button>
            
            {/* Image Container */}
            <div className="flex flex-col items-center justify-start min-h-[400px] pt-16">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-[55vh] object-contain rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  setFullScreenImage(true);
                }}
                title="Kliknite pre zobrazenie v plnej veľkosti"
              />
              
              {/* Image info */}
              {selectedImage.title && (
                <div className="mt-6 text-center max-w-md">
                  <h3 className="text-xl font-semibold text-white">{selectedImage.title}</h3>
                  {selectedImage.description && (
                    <p className="text-sm text-gray-300 mt-2 leading-relaxed">{selectedImage.description}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Image Modal */}
      {selectedImage && fullScreenImage && (
        <div 
          className="fixed inset-0 bg-black flex items-center justify-center z-[60] overflow-hidden"
          onClick={() => setFullScreenImage(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setFullScreenImage(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl font-bold z-[70] bg-gray-800/50 hover:bg-gray-700/50 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            title="Zavrieť (ESC)"
          >
            ×
          </button>
          
          {/* Full screen image */}
          <img
            src={selectedImage.image}
            alt={selectedImage.title}
            className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* Image title at bottom */}
          {selectedImage.title && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-6 py-3 rounded-lg">
              <h3 className="text-xl font-semibold text-white">{selectedImage.title}</h3>
            </div>
          )}
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Inspirations;
