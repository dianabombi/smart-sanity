import React, { useState, useEffect } from 'react';

const Carousel = ({ 
  images = [], 
  autoPlay = true, 
  autoPlayInterval = 4000,
  showDots = true,
  showArrows = true,
  showCounter = true,
  height = 'h-96',
  className = '',
  transitionType = 'fade' // 'fade', 'slide', 'zoom', 'ken-burns'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preload images
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, [images]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, images.length]);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((currentIndex + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Get transition styles based on type
  const getTransitionStyles = (index, isActive) => {
    const baseTransition = 'transition-all duration-1000 ease-in-out';
    
    switch (transitionType) {
      case 'slide':
        return {
          className: `${baseTransition} ${isActive ? 'translate-x-0' : index < currentIndex ? '-translate-x-full' : 'translate-x-full'}`,
          style: { opacity: isActive ? 1 : 0 }
        };
      
      case 'zoom':
        return {
          className: `${baseTransition} ${isActive ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`,
          style: {}
        };
      
      case 'ken-burns':
        return {
          className: `${baseTransition} ${isActive ? 'opacity-100' : 'opacity-0'}`,
          style: {
            animation: isActive ? 'smoothZoomIn 8s ease-out forwards' : 'none',
            transform: isActive ? 'scale(1.1)' : 'scale(1.15)' // Inactive at max zoom, active starts slightly smaller
          }
        };
      
      default: // fade
        return {
          className: `${baseTransition} ${isActive ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`,
          style: {}
        };
    }
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
      {/* Smooth zoom-in only animation */}
      <style jsx>{`
        @keyframes smoothZoomIn {
          0% { transform: scale(1.1); }
          100% { transform: scale(1.15); }
        }
      `}</style>

      {/* Images */}
      {images.map((image, index) => {
        const isActive = index === currentIndex;
        const transitionStyles = getTransitionStyles(index, isActive);
        
        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full overflow-hidden ${
              transitionType === 'slide' ? '' : ''
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={`w-full h-full object-cover ${transitionStyles.className}`}
              style={{
                imageRendering: 'crisp-edges',
                filter: 'none',
                objectPosition: 'center',
                ...transitionStyles.style
              }}
            />
          </div>
        );
      })}

      {/* Navigation Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-all duration-300 focus:outline-none z-20 group"
            aria-label="Previous image"
          >
            <img 
              src="/right-chevron.png" 
              alt="Previous" 
              className="h-12 scale-90 rotate-180 drop-shadow-lg brightness-[0.6] group-hover:brightness-100 transition-all duration-300"
              style={{ filter: 'brightness(0.6) invert(0.6)', transition: 'all 0.3s' }}
              onMouseEnter={(e) => e.target.style.filter = 'brightness(1) invert(1)'}
              onMouseLeave={(e) => e.target.style.filter = 'brightness(0.6) invert(0.6)'}
            />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-all duration-300 focus:outline-none z-20 group"
            aria-label="Next image"
          >
            <img 
              src="/right-chevron.png" 
              alt="Next" 
              className="h-12 scale-90 drop-shadow-lg brightness-[0.6] group-hover:brightness-100 transition-all duration-300"
              style={{ filter: 'brightness(0.6) invert(0.6)', transition: 'all 0.3s' }}
              onMouseEnter={(e) => e.target.style.filter = 'brightness(1) invert(1)'}
              onMouseLeave={(e) => e.target.style.filter = 'brightness(0.6) invert(0.6)'}
            />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Dot clicked:', index, 'Current:', currentIndex);
                goToSlide(index);
              }}
              className={`w-12 h-0.5 transition-colors duration-300 focus:outline-none cursor-pointer ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-gray-400 hover:bg-gray-300'
              }`}
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
