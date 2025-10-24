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
  const [previousIndex, setPreviousIndex] = useState(null);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          setPreviousIndex(prevIndex);
          return (prevIndex + 1) % images.length;
        });
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, images.length]);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPreviousIndex(currentIndex);
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPreviousIndex(currentIndex);
    setCurrentIndex((currentIndex + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setPreviousIndex(currentIndex);
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
        const isPrevious = index === previousIndex;
        return {
          className: `${baseTransition} ${isActive ? 'opacity-100' : 'opacity-0'}`,
          style: {
            animation: isActive ? 'smoothZoomIn 8s ease-in-out forwards' : 'none',
            transform: isPrevious ? 'scale(1.05)' : (isActive ? undefined : 'scale(1.0)')
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
          0% { transform: scale(1.0); }
          85% { transform: scale(1.05); }
          100% { transform: scale(1.05); }
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
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 hover:scale-110 transition-all duration-300 focus:outline-none z-20"
            aria-label="Previous image"
          >
            <svg className="w-8 h-8 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 hover:scale-110 transition-all duration-300 focus:outline-none z-20"
            aria-label="Next image"
          >
            <svg className="w-8 h-8 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
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
              className={`w-12 h-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 cursor-pointer ${
                index === currentIndex 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white bg-opacity-40 hover:bg-opacity-70'
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
