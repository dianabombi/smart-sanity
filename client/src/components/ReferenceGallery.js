import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ApiService from '../services/api';
import { useBackgroundSettings } from '../hooks/useBackgroundSettings';

const ReferenceGallery = () => {
  const { referenceId } = useParams();
  const navigate = useNavigate();
  const [reference, setReference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Background settings hook
  const { settings: backgroundSettings } = useBackgroundSettings();

  const loadReference = useCallback(async () => {
    try {
      setLoading(true);
      
      const result = await ApiService.getReferenceById(parseInt(referenceId));
      
      if (result.success && result.reference) {
        if (result.reference.images && result.reference.images.length > 0) {
          setReference(result.reference);
        } else {
          navigate('/references');
        }
      } else {
        navigate('/references');
      }
    } catch (error) {
      console.error('Error loading reference:', error);
      navigate('/references');
    } finally {
      setLoading(false);
    }
  }, [referenceId, navigate]);

  useEffect(() => {
    loadReference();
  }, [loadReference]);

  const openImageModal = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setFullScreenImage(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setFullScreenImage(false);
    setCurrentImageIndex(0);
  };

  // Navigation function for fullscreen image gallery
  const navigateImage = (direction) => {
    if (!reference || !reference.images || reference.images.length === 0) return;
    
    const totalImages = reference.images.length;
    let newIndex = currentImageIndex + direction;
    
    // Wrap around
    if (newIndex < 0) newIndex = totalImages - 1;
    if (newIndex >= totalImages) newIndex = 0;
    
    setCurrentImageIndex(newIndex);
    
    // Set the full image object (not just the URL) so we preserve the title
    const image = reference.images[newIndex];
    setSelectedImage(image);
  };

  // Close modal with Escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeImageModal();
      } else if (fullScreenImage && reference && reference.images.length > 1) {
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
  }, [selectedImage, fullScreenImage, reference]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-300">Načítavam...</div>
      </div>
    );
  }

  if (!reference) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Image */}
      {backgroundSettings.referenceGalleryBackgroundImage && (
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundSettings.referenceGalleryBackgroundImage})`,
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
        
        {/* Back Arrow */}
        <button
          onClick={() => navigate('/references')}
          className="absolute right-12 top-[135px] z-10 hover:scale-110 transition-all duration-300"
          title="Späť na referencie"
        >
          <img 
            src="/right-chevron.png" 
            alt="Späť" 
            className="h-9 rotate-180 drop-shadow-lg transition-all duration-300"
            style={{ 
              filter: 'brightness(0.6) invert(0.6)'
            }}
            onMouseEnter={(e) => e.target.style.filter = 'brightness(1) invert(1)'}
            onMouseLeave={(e) => e.target.style.filter = 'brightness(0.6) invert(0.6)'}
          />
        </button>
        
        <div className="container mx-auto px-4 pt-32 pb-16">
          
          {/* Header Section with Reference Details */}
          <div className="mb-10 max-w-4xl mx-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide text-left">
              {reference.title}
            </h1>
            
            {/* Reference Metadata */}
            <div className="flex flex-wrap gap-4 text-blue-300 mb-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] text-left">
              <span className="font-medium">{reference.year}</span>
              {reference.location && <span>{reference.location}</span>}
            </div>
            
            {/* Description */}
            <p className="text-xl text-gray-300 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] leading-snug mb-2 text-left">
              {reference.description}
            </p>
            
            {/* Client/Architect */}
            {reference.client && (
              <p className="text-lg text-gray-300 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] text-left">
                Architekt: {reference.client}
              </p>
            )}
          </div>

          {/* Photos Gallery */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {reference.images.map((image, index) => {
              // Handle both string paths and object formats
              let imageUrl;
              if (typeof image === 'string') {
                imageUrl = image;
              } else {
                imageUrl = image.url || image.dataUrl || image.src || image.path || image.filename;
              }
              
              return (
                <div key={index} className="group" style={{ opacity: 1 }}>
                  <div 
                    className="h-64 bg-gray-800 flex items-center justify-center relative overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => openImageModal(imageUrl, index)}
                  >
                    <img 
                      src={imageUrl} 
                      alt={`${reference.title} - obrázok ${index + 1}`}
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
                      <div className="text-sm">Obrázok nedostupný</div>
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
          </div>

          {/* Navigation Buttons */}
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mt-12">
              <button 
                onClick={() => navigate('/contact')}
                className="py-2 px-4 border border-gray-400 text-gray-300 rounded-lg hover:border-white hover:text-white hover:bg-black/40 transition-colors duration-200 bg-black/30 text-sm w-48"
              >
                Kontaktujte nás
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

            {/* Reference title or image title at bottom center */}
            {(selectedImage?.title || reference.title) && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[140] bg-black/70 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-white text-xl font-semibold tracking-wide drop-shadow-lg text-center">
                  {selectedImage?.title || reference.title}
                </div>
              </div>
            )}
            
            {/* Navigation arrows */}
            {reference.images && reference.images.length > 1 ? (
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
              src={typeof selectedImage === 'string' ? selectedImage : (selectedImage?.url || selectedImage?.dataUrl || selectedImage?.src || selectedImage?.path || selectedImage?.filename)}
              alt={selectedImage?.title || `${reference.title} - fullscreen`}
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

export default ReferenceGallery;
