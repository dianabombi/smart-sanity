import React from 'react';

const BrandCard = ({ 
  brand, 
  index = 0, 
  onClick, 
  showImages = true,
  variant = 'main' // 'main' or 'compact'
}) => {
  const handleClick = () => {
    if (brand.images && brand.images.length > 0 && showImages) {
      onClick(brand, 'gallery');
    } else {
      onClick(brand, 'logo');
    }
  };

  if (variant === 'compact') {
    return (
      <div
        className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-500 cursor-pointer transform opacity-100 translate-y-0 scale-100 hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
        style={{ transitionDelay: `${index * 80 + 200}ms` }}
        onClick={handleClick}
      >
        <div className="h-16 flex items-center justify-center">
          <img 
            src={brand.logo} 
            alt={`${brand.name} Logo`}
            className={`${brand.logoSize || 'max-h-12'} max-w-full object-contain group-hover:scale-110 transition-transform duration-300`}
            style={{
              imageRendering: 'crisp-edges',
              filter: brand.logoFilter || 'none'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div 
            className="text-white font-bold text-sm text-center items-center justify-center h-full w-full"
            style={{display: 'none'}}
          >
            {brand.name}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-all duration-500 cursor-pointer transform relative pb-16 opacity-100 translate-y-0 scale-100 hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={handleClick}
    >
      {/* Logo Container */}
      <div className={`p-4 mb-4 h-24 flex items-center justify-center ${brand.useBlackBackground ? 'bg-black rounded-lg' : ''}`}>
        {brand.useTextLogo ? (
          <div className="text-white font-bold text-xl text-center flex items-center justify-center h-full w-full">
            {brand.name}
          </div>
        ) : (
          <>
            <img 
              key={brand.logo} // Force re-render when logo changes
              src={brand.logo} 
              alt={`${brand.name} Logo`}
              className={`${brand.logoSize || 'max-h-16'} max-w-full object-contain`}
              style={{
                imageRendering: 'crisp-edges',
                filter: brand.logoFilter || 'none'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              className="text-white font-bold text-lg text-center items-center justify-center h-full w-full"
              style={{display: 'none'}}
            >
              {brand.name}
            </div>
          </>
        )}
      </div>

      {/* Brand Info */}
      <div className="space-y-3">
        <h3 className="text-gray-300 font-medium text-lg group-hover:text-white transition-colors">
          {brand.name}
        </h3>
        
        <div className="text-blue-300 text-sm font-light tracking-wide">
          {brand.category}
        </div>
        
        <p className="text-sm leading-relaxed text-gray-300 overflow-hidden" style={{
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical'
        }}>
          {brand.description}
        </p>

        {/* Vstúpte Button - Fixed Position */}
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full py-2 px-4 border border-gray-300 text-gray-300 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-sm">
            Vstúpte
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
