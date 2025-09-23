import React, { useState, useEffect, useRef } from 'react';

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
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Helper function to draw image with proper proportions and zoom effect
  const drawImageProportional = (ctx, img, canvasWidth, canvasHeight, zoomFactor = 1, centerX = 0.5, centerY = 0.5) => {
    const imgAspect = img.width / img.height;
    const canvasAspect = canvasWidth / canvasHeight;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    let srcX = 0, srcY = 0, srcWidth = img.width, srcHeight = img.height;
    
    // Apply zoom factor to the drawing dimensions
    drawWidth = canvasWidth * zoomFactor;
    drawHeight = canvasHeight * zoomFactor;
    
    // Center the zoomed image based on centerX and centerY
    offsetX = (canvasWidth - drawWidth) * centerX;
    offsetY = (canvasHeight - drawHeight) * centerY;
    
    if (imgAspect > canvasAspect) {
      // Image is wider than canvas - crop sides to fit height
      const scaledImgWidth = canvasHeight * imgAspect;
      const cropWidth = (scaledImgWidth - canvasWidth) / (canvasHeight / img.height);
      srcX = cropWidth / 2;
      srcWidth = img.width - cropWidth;
    } else {
      // Image is taller than canvas - crop top/bottom to fit width
      const scaledImgHeight = canvasWidth / imgAspect;
      const cropHeight = (scaledImgHeight - canvasHeight) / (canvasWidth / img.width);
      srcY = cropHeight / 2;
      srcHeight = img.height - cropHeight;
    }
    
    // Fill background with black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw image with zoom effect
    ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Helper function to get proportional dimensions (cover behavior)
  const getProportionalDimensions = (img, canvasWidth, canvasHeight) => {
    return {
      drawWidth: canvasWidth,
      drawHeight: canvasHeight,
      offsetX: 0,
      offsetY: 0,
      srcX: 0,
      srcY: 0,
      srcWidth: img.width,
      srcHeight: img.height
    };
  };

  // Helper function to check if tile is within image bounds (always true for cover behavior)
  const isTileInImageBounds = (tile, dims) => {
    return true; // All tiles are within bounds when using cover behavior
  };

  // Helper function to draw a tile from an image with cover behavior
  const drawTileFromImage = (ctx, img, tile, dims, canvasWidth, canvasHeight) => {
    const tileSize = 40;
    const imgAspect = img.width / img.height;
    const canvasAspect = canvasWidth / canvasHeight;
    
    let srcX, srcY, srcWidth, srcHeight;
    
    if (imgAspect > canvasAspect) {
      // Image is wider - crop sides
      const scaledImgWidth = canvasHeight * imgAspect;
      const cropWidth = (scaledImgWidth - canvasWidth) / (canvasHeight / img.height);
      srcX = cropWidth / 2 + (tile.x / canvasWidth) * (img.width - cropWidth);
      srcY = (tile.y / canvasHeight) * img.height;
      srcWidth = (tileSize / canvasWidth) * (img.width - cropWidth);
      srcHeight = (tileSize / canvasHeight) * img.height;
    } else {
      // Image is taller - crop top/bottom
      const scaledImgHeight = canvasWidth / imgAspect;
      const cropHeight = (scaledImgHeight - canvasHeight) / (canvasWidth / img.width);
      srcX = (tile.x / canvasWidth) * img.width;
      srcY = cropHeight / 2 + (tile.y / canvasHeight) * (img.height - cropHeight);
      srcWidth = (tileSize / canvasWidth) * img.width;
      srcHeight = (tileSize / canvasHeight) * (img.height - cropHeight);
    }
    
    ctx.drawImage(
      img,
      srcX, srcY, srcWidth, srcHeight,
      tile.x, tile.y, tileSize, tileSize
    );
  };

  // Dynamic zoom transition function with coming closer effect
  const morphToNext = (fromIndex, toIndex) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Load images
    const fromImg = new Image();
    const toImg = new Image();
    
    fromImg.onload = () => {
      toImg.onload = () => {
        let progress = 0;
        const duration = 4500; // 4.5 seconds for slower, smoother zoom effect
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation (ease-out)
          const easeOut = (t) => 1 - Math.pow(1 - t, 3);
          const easedProgress = easeOut(progress);
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw current image at normal scale (no fade out)
          if (progress < 0.3) {
            drawImageProportional(ctx, fromImg, canvas.width, canvas.height, 1);
          }
          
          // New image zooms in from current size with crossfade
          const zoomIn = 1 + easedProgress * 0.2; // Start at 100% zoom, end at 120% (less aggressive zoom)
          const alpha = progress; // Fade in
          
          ctx.globalAlpha = alpha;
          drawImageProportional(ctx, toImg, canvas.width, canvas.height, zoomIn);
          ctx.globalAlpha = 1;
          
          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            // Final state - clear canvas and set index without drawing static image
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setCurrentIndex(toIndex);
            setIsTransitioning(false);
          }
        };
        
        animate();
      };
      toImg.src = images[toIndex].src;
    };
    fromImg.src = images[fromIndex].src;
  };

  // Auto-play functionality with mosaic effect
  useEffect(() => {
    if (autoPlay && images.length > 1 && !isTransitioning) {
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        morphToNext(currentIndex, nextIndex);
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, images.length, currentIndex, isTransitioning]);

  const goToPrevious = () => {
    if (isTransitioning) return;
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    morphToNext(currentIndex, prevIndex);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    morphToNext(currentIndex, nextIndex);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    morphToNext(currentIndex, index);
  };

  // Canvas setup without initial image display
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && images[currentIndex]) {
      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Set up canvas context with high quality
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Display initial image on load
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawImageProportional(ctx, img, canvas.width, canvas.height, 1);
        };
        img.src = images[currentIndex].src;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      return () => window.removeEventListener('resize', resizeCanvas);
    }
  }, [currentIndex, images]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className={`${height} bg-gray-900 flex items-center justify-center ${className}`}>
        <p className="text-white opacity-50">No images available</p>
      </div>
    );
  }

  return (
    <div className={`relative ${height} overflow-hidden bg-black ${className}`}>
      {/* Canvas for mosaic effect - always visible */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

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
