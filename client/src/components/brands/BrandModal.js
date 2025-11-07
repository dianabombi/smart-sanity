import React from 'react';
import Modal from '../ui/Modal';
import ImageGallery from '../ui/ImageGallery';

const BrandModal = ({ 
  brand, 
  isOpen, 
  onClose, 
  type = 'gallery' // 'gallery' or 'logo'
}) => {
  if (!brand) return null;

  if (type === 'logo') {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={brand.name}
        size="default"
      >
        <div className="p-6">
          <div className="bg-black p-8 rounded-lg mb-6 flex items-center justify-center">
            <img
              src={brand.logo}
              alt={brand.name}
              className="max-w-full max-h-32 object-contain"
              style={{
                filter: brand.logoFilter || 'none'
              }}
            />
          </div>
          
          <div className="mb-6">
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
              className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Zavrieť
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      className="pt-20"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-6 flex-1">
            {/* Brand Logo */}
            <div className="flex-shrink-0">
              <div className={`p-3 h-20 w-32 flex items-center justify-center ${brand.useBlackBackground ? 'bg-black rounded-lg' : ''}`}>
                {brand.useTextLogo ? (
                  <div className="text-white font-bold text-lg text-center">
                    {brand.name}
                  </div>
                ) : (
                  <img 
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
                )}
              </div>
            </div>
            
            {/* Brand Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-300 mb-2">{brand.name}</h2>
              <p className="text-blue-300 text-sm font-light tracking-wide mb-3">{brand.category}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{brand.description}</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="hover:opacity-70 transition-all duration-200 p-2 flex-shrink-0"
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto">
          <ImageGallery 
            images={brand.images}
            columns={3}
            emptyMessage="Žiadne obrázky nie sú k dispozícii"
          />
        </div>
        
        <div className="flex justify-center mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Zavrieť galériu
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BrandModal;
