import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';

const BrandModal = ({ 
  brand, 
  isOpen, 
  onClose, 
  type = 'gallery' // 'gallery' or 'logo'
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    if (!brand || !brand.images || brand.images.length === 0) return;
    
    const totalImages = brand.images.length;
    let newIndex = currentImageIndex + direction;
    
    // Wrap around
    if (newIndex < 0) newIndex = totalImages - 1;
    if (newIndex >= totalImages) newIndex = 0;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(brand.images[newIndex]);
  };

  // Close modal with Escape key and prevent body scroll
  useEffect(() => {
    if (!brand) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (fullScreenImage) {
          closeImageModal();
        } else if (isOpen) {
          onClose();
        }
      } else if (fullScreenImage && brand.images && brand.images.length > 1) {
        // Arrow key navigation in fullscreen
        if (e.key === 'ArrowLeft') {
          navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
          navigateImage(1);
        }
      }
    };

    // Prevent body scroll when any modal is open
    if (isOpen || fullScreenImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [fullScreenImage, isOpen, onClose, brand]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!brand) return null;

  if (type === 'logo') {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={brand.name}
        size="default"
      >
        <div className="p-4 pt-3">
          <div className="bg-black p-8 rounded-lg mb-4 flex items-center justify-center">
            <img
              src={brand.logo}
              alt={brand.name}
              className="max-w-full max-h-32 object-contain"
              style={{
                filter: brand.logoFilter || 'none'
              }}
            />
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">
              {brand.category}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {brand.description}
            </p>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="py-2 px-6 border border-gray-400 text-gray-300 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-sm"
            >
              Zavrieť
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  const images = brand.images || [];

  return (
    <>
      <Modal
        isOpen={isOpen && !fullScreenImage}
        onClose={onClose}
        size="xl"
        className="pt-10"
        showCloseButton={false}
      >
        <div className="p-4 pt-3">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-6 flex-1">
              {/* Brand Logo */}
              <div className="flex-shrink-0 -mt-1">
                <div className={`p-2 h-16 w-28 flex items-center justify-center ${brand.useBlackBackground ? 'bg-black rounded-lg' : ''}`}>
                  {brand.useTextLogo ? (
                    <div className="text-white font-bold text-lg text-center">
                      {brand.name}
                    </div>
                  ) : (
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} Logo`}
                      className={`${brand.logoSize || 'max-h-12'} max-w-full object-contain`}
                      style={{
                        imageRendering: 'crisp-edges',
                        filter: brand.logoFilter || 'none'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </div>
              
              {/* Brand Info */}
              <div className="flex-1 -mt-1">
                <h2 className="text-2xl font-bold text-gray-300 mb-1.5">{brand.name}</h2>
                <p className="text-gray-300 text-sm leading-relaxed pb-3 border-b border-gray-700">{brand.description}</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="hover:opacity-70 transition-all duration-200 p-1 flex-shrink-0 -mt-1"
            >
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Image Gallery Grid - Similar to Inspirations */}
          <div>
            {images.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-300 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-lg">Žiadne obrázky nie sú k dispozícii</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                  <div key={image.id || image.filename || index} className="group" style={{ opacity: 1 }}>
                    <div 
                      className="h-64 bg-gray-800 flex items-center justify-center relative overflow-hidden rounded-lg cursor-pointer"
                      onClick={() => openImageModal(image, index)}
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
                        src={image.url || image.src || image.dataUrl || image} 
                        alt={image.originalName || image.alt || `${brand.name} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-all duration-300 opacity-0"
                        loading="lazy"
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
                        <div className="text-4xl mb-2">🖼️</div>
                        <div className="text-sm">Foto</div>
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
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-center mt-4 pt-3 border-t border-gray-700">
            <button
              onClick={onClose}
              className="py-2 px-6 border border-gray-400 text-gray-300 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-sm"
            >
              Zavrieť galériu
            </button>
          </div>
        </div>
      </Modal>

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

          {/* Brand info in top right corner - outside of photo */}
          <div className="absolute top-4 right-20 z-[140] flex flex-col items-end gap-2 mr-2">
            {/* Brand name */}
            <div className="text-white text-2xl font-bold tracking-wide drop-shadow-lg">
              {brand.name}
            </div>
            
            {/* Image counter - only show if more than 1 image */}
            {images && images.length > 1 && (
              <div className="bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-base shadow-lg">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
          
          {/* Navigation arrows - show only if more than 1 image */}
          {images && images.length > 1 && (
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
            </>
          )}
          
          {/* Full screen image */}
          <img
            src={selectedImage.url || selectedImage.src || selectedImage.dataUrl || selectedImage}
            alt={selectedImage.originalName || selectedImage.alt || `${brand.name}`}
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
    </>
  );
};

export default BrandModal;
