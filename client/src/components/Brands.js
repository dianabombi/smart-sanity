import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';
import ActionButton from './ui/ActionButton';
import ApiService from '../services/api';
import EmergencyBrands from '../services/emergencyBrands';
import { useBackgroundSettings } from '../hooks/useBackgroundSettings';

const Brands = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrandImages, setSelectedBrandImages] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [pageDescription, setPageDescription] = useState('Spolupracujeme s poprednými svetovými výrobcami kúpeľňovej sanity, obkladov a dlažieb. Veríme, že naša ponuka dokáže uspokojiť aj tých najnáročnejších klientov.');
  const { settings: backgroundSettings, getBackgroundStyle, getBackgroundImageStyle } = useBackgroundSettings();

  const openLogoPreview = (brand) => {
    setSelectedLogo(brand);
  };

  const closeLogoPreview = () => {
    setSelectedLogo(null);
  };

  const openImageGallery = (brand) => {
    console.log('Opening image gallery for brand:', brand.name);
    console.log('Brand images:', brand.images);
    console.log('Brand images length:', brand.images?.length);
    
    // Log each image structure for debugging
    if (brand.images && brand.images.length > 0) {
      brand.images.forEach((image, index) => {
        console.log(`Image ${index + 1} structure:`, {
          url: image.url,
          dataUrl: image.dataUrl,
          path: image.path,
          src: image.src,
          filename: image.filename,
          originalName: image.originalName,
          fullObject: image
        });
      });
    }
    
    setSelectedBrandImages(brand);
  };

  const closeImageGallery = () => {
    setSelectedBrandImages(null);
  };


  const loadPageContent = useCallback(async () => {
    try {
      const result = await ApiService.getPageContent('brands', 'header', 'description');
      if (result.success && result.content) {
        setPageDescription(result.content);
      }
    } catch (error) {
      console.log('⚠️ PUBLIC: Failed to load page content, using fallback');
    }
  }, []);

  const loadBrands = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      console.log(`🚨 PUBLIC: Loading brands from database... ${forceRefresh ? '(FORCE REFRESH)' : ''}`);
      
      // First, try to load from Supabase database
      try {
        console.log('🔄 PUBLIC: Loading from Supabase database...');
        const supabaseResult = await ApiService.getBrands();
        
        if (supabaseResult.success && supabaseResult.brands && supabaseResult.brands.length > 0) {
          console.log(`✅ PUBLIC: Loaded ${supabaseResult.brands.length} brands from Supabase`);
          console.log('🔍 First Supabase brand:', supabaseResult.brands[0]);
          setBrands(supabaseResult.brands);
          return; // Successfully loaded from database
        } else {
          console.log('⚠️ PUBLIC: Supabase returned no brands, trying fallback...');
        }
      } catch (error) {
        console.log('⚠️ PUBLIC: Supabase failed, trying fallback...', error);
      }
      
      // Fallback to EmergencyBrands if Supabase fails
      console.log('🔍 PUBLIC: Using EmergencyBrands fallback...');
      const emergencyResult = EmergencyBrands.getBrands();
      
      if (emergencyResult.success && emergencyResult.brands.length > 0) {
        console.log(`✅ PUBLIC: Loaded ${emergencyResult.brands.length} brands from EmergencyBrands (fallback)`);
        setBrands(emergencyResult.brands);
      } else {
        console.error('❌ PUBLIC: Both Supabase and EmergencyBrands failed');
        setBrands([]);
      }
    } catch (error) {
      console.error('❌ PUBLIC: Error in loadBrands:', error);
      setBrands([]);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    loadBrands();
    loadPageContent();
    
    // Auto-refresh brands every 30 seconds to catch admin changes
    const interval = setInterval(() => {
      console.log('🔄 PUBLIC: Auto-refreshing brands to catch admin changes...');
      loadBrands(true);
    }, 30000); // 30 seconds
    
    return () => clearInterval(interval);
  }, [loadBrands, loadPageContent]);


  console.log('🚀 PRODUCTION DEPLOYMENT - BRANDS LOADING:');
  console.log('- brands.length:', brands.length);
  console.log('- loading:', loading);
  console.log('- timestamp:', new Date().toISOString());
  console.log('- production_version: 2025-01-20-14:16-FINAL');
  console.log('- brands data:', brands.slice(0, 2)); // First 2 brands

  return (
    <Layout>
      <NavBar />
      
      
      {/* Header Section */}
      <div className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="leading-relaxed text-3xl tablet:text-4xl laptop:text-5xl font-bold text-gray-300 mb-4 mt-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
            Obchodované značky
          </h1>
          <p className="text-lg tablet:text-xl text-gray-300 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] max-w-3xl mx-auto leading-relaxed">
          {pageDescription}
          </p>
        </div>
      </div>

      {/* Main Brands Grid */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Image */}
        {backgroundSettings.brandsPageBackgroundImage && (
          <div className="absolute inset-0 -z-20" style={getBackgroundImageStyle()}></div>
        )}
        
        {/* Dynamic background pattern */}
        {backgroundSettings.brandsPagePattern && backgroundSettings.patternType !== 'none' && (
          <div className="absolute inset-0 -z-10" style={getBackgroundStyle()}></div>
        )}
        <div className="max-w-6xl mx-auto relative z-10">
          {console.log('🎨 Rendering brands. Total:', brands.length, 'Main brands:', brands.filter(brand => brand.category !== 'Ostatné' && brand.category !== 'Partnerstvo').length, 'Partnership brands:', brands.filter(brand => brand.category === 'Partnerstvo').length)}
          

          {/* Main Brands Section - SIMPLIFIED */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {brands.filter(brand => brand.category !== 'Ostatné' && brand.category !== 'Partnerstvo').map((brand, index) => (
              <div
                key={brand.id || brand._id || index}
                className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-all duration-500 cursor-pointer transform relative pb-16 opacity-100 translate-y-0 scale-100 hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => {
                  if (brand.images && brand.images.length > 0) {
                    openImageGallery(brand);
                  } else {
                    openLogoPreview(brand);
                  }
                }}
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
            ))}
          </div>
        </div>
      </div>

      {/* Ostatné Section */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Image */}
        {backgroundSettings.brandsPageBackgroundImage && (
          <div className="absolute inset-0 -z-20" style={getBackgroundImageStyle()}></div>
        )}
        
        {/* Dynamic background pattern */}
        {backgroundSettings.brandsPagePattern && backgroundSettings.patternType !== 'none' && (
          <div className="absolute inset-0 -z-10" style={getBackgroundStyle()}></div>
        )}
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-2xl tablet:text-3xl font-bold text-gray-300 mb-4 text-center tracking-wide opacity-100 translate-y-0">
            Ostatné
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto text-center mb-8 opacity-100 translate-y-0">
            Ďalší producenti, ktorých vám vieme ponúknuť
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {brands.filter(brand => brand.category === 'Ostatné').map((brand, index) => (
              <div
                key={brand.id || brand._id || index}
                className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-500 cursor-pointer transform opacity-100 translate-y-0 scale-100 hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
                style={{ transitionDelay: `${index * 80 + 200}ms` }}
                onClick={() => {
                  if (brand.images && brand.images.length > 0) {
                    openImageGallery(brand);
                  } else {
                    openLogoPreview(brand);
                  }
                }}
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
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Button Section */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <ActionButton
            size="xl"
            variant="secondary"
            onClick={() => navigate('/contact')}
            className="min-w-[200px]"
          >
            Kontaktujte nás
          </ActionButton>
        </div>
      </div>

      {/* Logo Preview Modal */}
      {selectedLogo && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4">
          <div className="bg-black rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-300">{selectedLogo.name}</h2>
                <button
                  onClick={closeLogoPreview}
                  className="text-gray-300 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="bg-black p-8 rounded-lg mb-6 flex items-center justify-center">
                <img
                  src={selectedLogo.logo}
                  alt={selectedLogo.name}
                  className="max-w-full max-h-32 object-contain"
                  style={{
                    filter: selectedLogo.logoFilter || 'none'
                  }}
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  {selectedLogo.category}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {selectedLogo.description}
                </p>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={closeLogoPreview}
                  className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Zavrieť
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Gallery Modal */}
      {selectedBrandImages && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 pt-20">
          <div className="bg-gray-700 rounded-lg max-w-6xl w-full max-h-[85vh] overflow-hidden border border-gray-500">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start gap-6 flex-1">
                  {/* Brand Logo */}
                  <div className="flex-shrink-0">
                    <div className={`p-3 h-20 w-32 flex items-center justify-center ${selectedBrandImages.useBlackBackground ? 'bg-black rounded-lg' : ''}`}>
                      {selectedBrandImages.useTextLogo ? (
                        <div className="text-white font-bold text-lg text-center">
                          {selectedBrandImages.name}
                        </div>
                      ) : (
                        <img 
                          src={selectedBrandImages.logo} 
                          alt={`${selectedBrandImages.name} Logo`}
                          className={`${selectedBrandImages.logoSize || 'max-h-16'} max-w-full object-contain`}
                          style={{
                            imageRendering: 'crisp-edges',
                            filter: selectedBrandImages.logoFilter || 'none'
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
                    <h2 className="text-2xl font-bold text-gray-300 mb-2">{selectedBrandImages.name}</h2>
                    <p className="text-blue-300 text-sm font-light tracking-wide mb-3">{selectedBrandImages.category}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{selectedBrandImages.description}</p>
                  </div>
                </div>
                
                <button
                  onClick={closeImageGallery}
                  className="text-gray-300 hover:text-white text-3xl p-2 flex-shrink-0"
                >
                  ×
                </button>
              </div>
              
              {selectedBrandImages.images && selectedBrandImages.images.length > 0 ? (
                <div className="max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedBrandImages.images.map((image, index) => (
                      <div key={image.id || image.filename || index} className="group relative">
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <img
                            src={image.url} // Directly use the guaranteed URL from the API
                            alt={image.originalName || `Image ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              console.error(`Failed to load image: ${image.url}`);
                              // Simple fallback for the rare case the API-provided URL fails
                              e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23DC2626'/%3E%3Ctext x='200' y='200' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='0.3em'%3EError%3C/text%3E%3C/svg%3E`;
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-300 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-lg">Žiadne obrázky nie sú k dispozícii</p>
                </div>
              )}
              
              <div className="flex justify-center mt-6 pt-4 border-t border-gray-700">
                <button
                  onClick={closeImageGallery}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Zavrieť galériu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
};

export default Brands;
