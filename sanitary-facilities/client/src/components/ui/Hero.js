import React from 'react';

const Hero = ({ 
  backgroundImage, 
  title, 
  subtitle, 
  children, 
  height = 'min-h-screen',
  overlay = true,
  overlayOpacity = 'bg-opacity-50'
}) => {
  const backgroundStyle = backgroundImage 
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  return (
    <div 
      className={`${height} bg-black flex items-center justify-center relative`}
      style={backgroundStyle}
    >
      {/* Overlay for better text readability when using background images */}
      {overlay && backgroundImage && (
        <div className={`absolute inset-0 bg-black ${overlayOpacity}`}></div>
      )}
      
      {/* Content */}
      <div className="relative z-10 text-center px-2 sm:px-4 lg:px-6 max-w-full mx-auto">
        {title && (
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-wide">
            {title}
          </h1>
        )}
        
        {subtitle && (
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white opacity-90 mb-8 max-w-5xl mx-auto leading-relaxed -mt-4">
            {subtitle}
          </p>
        )}
        
        {/* Custom content (buttons, forms, etc.) */}
        {children && (
          <div className="flex flex-col items-center space-y-8">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
