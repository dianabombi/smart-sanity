import React from 'react';

const HeroBanner = ({ 
  backgroundImage, 
  title, 
  subtitle, 
  height = 'h-96',
  overlay = true,
  overlayOpacity = 'bg-opacity-60',
  textPosition = 'center'
}) => {
  const backgroundStyle = backgroundImage 
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  const positionClasses = {
    center: 'items-center justify-center text-center',
    left: 'items-center justify-start text-left pl-8 lg:pl-16',
    right: 'items-center justify-end text-right pr-8 lg:pr-16'
  };

  return (
    <div 
      className={`${height} bg-black flex ${positionClasses[textPosition]} relative`}
      style={backgroundStyle}
    >
      {/* Overlay for better text readability when using background images */}
      {overlay && backgroundImage && (
        <div className={`absolute inset-0 bg-black ${overlayOpacity}`}></div>
      )}
      
      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl">
        {title && (
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 tracking-wide">
            {title}
          </h1>
        )}
        
        {subtitle && (
          <p className="text-base sm:text-lg md:text-xl text-white opacity-90 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
