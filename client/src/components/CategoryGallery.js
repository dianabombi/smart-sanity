import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from './layout/Layout';
import Breadcrumbs from './ui/Breadcrumbs';
import NavBar from './layout/NavBar';

const CategoryGallery = () => {
  const { category } = useParams();
  
  // Placeholder images - you can replace these with actual category-specific images
  const galleryImages = [
    '/bathroom.png',
    '/sinks.png', 
    '/tap_silver.png'
  ];

  const categoryTitles = {
    battery: 'RIEŠENIA BATÉRIÍ',
    tap: 'INŠTALÁCIE KOHÚTIKOV',
    sink: 'DIZAJNY UMÝVADIEL',
    toilet: 'TOALETNÉ ZARIADENIA',
    shower: 'SPRCHOVÉ SYSTÉMY',
    bathtub: 'KOLEKCIE VANÍ'
  };

  const categoryDescriptions = {
    battery: 'Preskúmajte náš sortiment batériových sanitárnych riešení a záložných systémov.',
    tap: 'Objavte prémiové dizajny kohútikov a inštalácie pre moderné domácnosti.',
    sink: 'Prehliadnite si našu kolekciu elegantných a funkčných riešení umývadiel.',
    toilet: 'Pozrite si naše komplexné toaletné zariadenia a moderné dizajny.',
    shower: 'Preskúmajte inovatívne sprchové systémy a inštalácie.',
    bathtub: 'Objavte luxusné kolekcie vaní a dizajny.'
  };

  return (
    <Layout>
      <NavBar />
      
      {/* Breadcrumbs */}
      <div className="pt-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>
      
      {/* Header Section */}
      <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-wide">
            {categoryTitles[category] || 'GALLERY'}
          </h1>
          <p className="text-lg text-white opacity-80 max-w-2xl mx-auto leading-relaxed">
            {categoryDescriptions[category] || 'Explore our collection of sanitary facilities.'}
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className="bg-black border-2 border-white rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105 transform"
              >
                <div className="aspect-square bg-black flex items-center justify-center">
                  <img
                    src={image}
                    alt={`${category} ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                    style={{
                      imageRendering: 'high-quality',
                      imageRendering: '-webkit-optimize-contrast',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium tracking-wide uppercase text-center">
                    {category} {index + 1}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryGallery;
