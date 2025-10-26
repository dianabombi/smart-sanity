import React from 'react';

const ImageGallery = ({ 
  images = [], 
  columns = 3, 
  onImageClick,
  className = '',
  emptyMessage = 'Žiadne obrázky nie sú k dispozícii',
  emptyIcon = true
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
  };

  if (!images || images.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        {emptyIcon && (
          <div className="text-gray-300 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <p className="text-gray-300 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridClasses[columns]} gap-4 ${className}`}>
      {images.map((image, index) => (
        <div key={image.id || image.filename || index} className="group relative">
          <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={image.url || image.src || image}
              alt={image.originalName || image.alt || `Image ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onClick={() => onImageClick && onImageClick(image, index)}
              onError={(e) => {
                console.error(`Failed to load image: ${image.url || image.src || image}`);
                e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23DC2626'/%3E%3Ctext x='200' y='200' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='0.3em'%3EError%3C/text%3E%3C/svg%3E`;
              }}
            />
          </div>
          {onImageClick && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg flex items-center justify-center cursor-pointer">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
