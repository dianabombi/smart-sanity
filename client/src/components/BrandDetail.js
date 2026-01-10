import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ApiService from '../services/api';

const BrandDetail = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const loadBrand = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🔄 BRAND DETAIL: Loading brand:', brandId);
      
      const result = await ApiService.getBrandById(brandId);

      if (result.success && result.brand) {
        console.log('✅ BRAND DETAIL: Brand found:', result.brand.name);
        console.log('📷 BRAND DETAIL: Images:', result.brand.images?.length || 0);
        setBrand(result.brand);
      } else {
        console.error('❌ BRAND DETAIL: Brand not found or failed to load');
        setTimeout(() => navigate('/brands'), 2000);
      }
    } catch (error) {
      console.error('❌ BRAND DETAIL: Error loading brand:', error);
      setTimeout(() => navigate('/brands'), 2000);
    } finally {
      setLoading(false);
    }
  }, [brandId, navigate]);

  useEffect(() => {
    loadBrand();
  }, [loadBrand]);

  const openImageModal = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  // Navigation function for fullscreen image gallery
  const navigateImage = useCallback((direction) => {
    if (!brand?.images || brand.images.length === 0) return;
    
    const totalImages = brand.images.length;
    let newIndex = currentImageIndex + direction;
    
    // Wrap around
    if (newIndex < 0) newIndex = totalImages - 1;
    if (newIndex >= totalImages) newIndex = 0;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(brand.images[newIndex]);
  }, [brand, currentImageIndex]);

  // Close modal with Escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeImageModal();
      } else if (selectedImage && brand?.images?.length > 1) {
        // Arrow key navigation
        if (e.key === 'ArrowLeft') {
          navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
          navigateImage(1);
        }
      }
    };

    // Prevent body scroll when modal is open
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, brand, navigateImage]);

  // Get image URL from various possible properties
  const getImageUrl = (image) => {
    return image?.url || image?.dataUrl || image?.path || image?.src || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="h-12 bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse mt-20"></div>
            <div className="h-6 bg-gray-700 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-700 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <NavBar />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">Značka sa nenašla</h2>
          <p className="text-gray-400 mb-6">Presmerováva sa späť na značky...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const brandImages = brand.images || [];

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      
      {/* Back Navigation Button - Absolute Position Right Side */}
      <button
        onClick={() => navigate('/brands')}
        className="absolute right-12 top-[135px] z-10 hover:scale-110 transition-all duration-300"
        title="Späť na značky"
      >
        <img 
          src="/right-chevron.png" 
          alt="Back" 
          className="h-9 rotate-180 drop-shadow-lg brightness-[0.6] hover:brightness-100 invert-[0.6] hover:invert transition-all duration-300"
        />
      </button>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section - Brand Name and Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-6 mt-24 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
            {brand.name}
          </h1>
          {brand.description && (
            <p className="text-lg tablet:text-xl text-gray-300 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] max-w-3xl mx-auto leading-relaxed">
              {brand.description}
            </p>
          )}
        </div>

        {/* Photos Gallery */}
        {brandImages.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📷</div>
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">Žiadne fotografie</h2>
            <p className="text-gray-400">Pre túto značku zatiaľ nie sú k dispozícii žiadne fotografie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {brandImages.map((image, index) => {
              const imageUrl = getImageUrl(image);
              return (
                <div key={index} className="group" style={{ opacity: 1 }}>
                  <div 
                    className="h-64 bg-gray-800 flex items-center justify-center relative overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => openImageModal(image, index)}
                  >
                    <img 
                      src={imageUrl} 
                      alt={`${brand.name} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                      loading="eager"
                      decoding="sync"
                      style={{
                        backgroundColor: '#1f2937',
                        minHeight: '256px'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="text-gray-500 text-center absolute inset-0 flex flex-col items-center justify-center" style={{display: 'none'}}>
                      <div className="text-4xl mb-2">🖼️</div>
                      <div className="text-sm">Obrázok {brand.name}</div>
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
              );
            })}
          </div>
        )}

        {/* Bottom back button */}
        <div className="pb-8 mt-16 flex justify-center">
          <button 
            onClick={() => navigate('/brands')}
            className="py-2 px-8 min-w-[220px] border border-gray-400 text-gray-300 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-sm"
          >
            Späť na značky
          </button>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {selectedImage && (
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

          {/* Brand name or image title at bottom center */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[140] bg-black/70 backdrop-blur-sm px-6 py-3 rounded-lg">
            <div className="text-white text-xl font-semibold tracking-wide drop-shadow-lg text-center">
              {selectedImage?.title || brand.name}
            </div>
          </div>
          
          {/* Navigation arrows */}
          {brandImages.length > 1 ? (
            <React.Fragment>
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
                title="Ďalší obrázok (→)"
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
            src={getImageUrl(selectedImage)}
            alt={`${brand.name} ${currentImageIndex + 1}`}
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

export default BrandDetail;
