import React, { useState, useEffect } from 'react';

const Carousel = ({ 
  images = [], 
  autoPlay = true, 
  autoPlayInterval = 4000,
  showDots = true,
  showArrows = true,
  showCounter = true,
  height = 'h-96',
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && images.length > 1 && !isTransitioning) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, images.length, currentIndex, isTransitioning]);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setCurrentIndex(prevIndex => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`${height} bg-gray-900 flex items-center justify-center ${className}`}>
        <p className="text-white opacity-50">No images available</p>
      </div>
    );
  }

  return (
    <div className={`relative ${height} overflow-hidden bg-black ${className}`}>
      {/* High-quality images with smooth transitions */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              style={{
                imageRendering: 'high-quality',
                imageRendering: '-webkit-optimize-contrast',
                imageRendering: 'crisp-edges'
              }}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            disabled={isTransitioning}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 z-20 ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 z-20 ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {showCounter && images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm z-20">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default Carousel;
