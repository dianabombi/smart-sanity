import React, { useState, useEffect, useCallback } from 'react';
import Layout from './layout/Layout';
import Breadcrumbs from './ui/Breadcrumbs';
import NavBar from './layout/NavBar';
import ApiService from '../services/api';

const Brands = () => {
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [visibleBrands, setVisibleBrands] = useState([]);
  const [showOtherBrands, setShowOtherBrands] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrandImages, setSelectedBrandImages] = useState(null);

  const openLogoPreview = (brand) => {
    setSelectedLogo(brand);
  };

  const closeLogoPreview = () => {
    setSelectedLogo(null);
  };

  const openImageGallery = (brand) => {
    setSelectedBrandImages(brand);
  };

  const closeImageGallery = () => {
    setSelectedBrandImages(null);
  };

  // Load brands from API
  const loadBrands = useCallback(async () => {
    try {
      setLoading(true);
      const result = await ApiService.getBrands();
      if (result.success) {
        setBrands(result.brands);
      } else {
        setBrands(getFallbackBrands());
      }
    } catch (error) {
      console.error('Error loading brands:', error);
      setBrands(getFallbackBrands());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBrands();
  }, [loadBrands]);

  const getFallbackBrands = () => {
    // Hlavné značky s popismi
    const mainBrands = [
      {
        _id: '1',
        name: 'Agape',
        category: 'Kúpeľňový nábytok',
        logo: '/Users/diana/Desktop/SMART SANIT/CascadeProjects/windsurf-project/client/public/icons/Agape_transparent.png', // použijem dostupné logo
        description: 'Prémiový taliansky dodávateľ kúpeľňových batérií, sanity, nábytku a kúpeľňových doplnkov',
        images: [],
        isMain: true
      },
      {
        _id: '2',
        name: 'Fantini',
        category: 'Batérie a sprchy',
        logo: '/fantini.png',
        description: 'Prémiový taliansky výrobca kúpeľňových a kuchynských batérií a doplnkov',
        images: [],
        isMain: true
      },
      {
        _id: '1',
        name: 'Agape',
        category: 'Kúpeľňový nábytok',
        logo: '/white-logo.svg', // použijem dostupné logo
        description: 'Prémiový taliansky dodávateľ kúpeľňových batérií, sanity, nábytku a kúpeľňových doplnkov',
        images: [],
        isMain: true
      },
      {
        _id: '3',
        name: 'Cielo',
        category: 'Sanitárna keramika',
        logo: '/logo_cielo_white.png',
        description: 'Prémiový taliansky výrobca kúpeľňovej sanity, nábytku a kúpeľňových doplnkov',
        images: [],
        isMain: true
      },
      {
        _id: '4',
        name: 'Azzurra',
        category: 'Sanitárne zariadenia',
        logo: '/logo Azzurra bianco su fondo nero.png',
        description: 'Prémiový taliansky výrobca kúpeľňovej sanity, nábytku a kúpeľňových doplnkov',
        images: [],
        isMain: true
      },
      {
        _id: '5',
        name: 'CEA',
        category: 'Batérie a doplnky',
        logo: '/cea.svg',
        description: 'Prémiový taliansky výrobca kúpeľňových a kuchynských batérií, elektrických sušiakov a doplnkov',
        images: [],
        isMain: true
      },
      {
        _id: '6',
        name: 'Antrax',
        category: 'Dizajnové radiátory',
        logo: '/antraxIt.jpg',
        description: 'Prémiový taliansky výrobca dizajnových radiátorov',
        images: [],
        isMain: true
      },
      {
        _id: '7',
        name: 'Zenon',
        category: 'Umývadlá a vane',
        logo: '/new.svg', // použijem dostupné logo
        description: 'Prémiový španielsky výrobca umývadiel, vaní a sprchových vaničiek',
        images: [],
        isMain: true
      },
      {
        _id: '8',
        name: 'Fondovalle',
        category: 'Obklady a dlažby',
        logo: '/logogf.png',
        description: 'Prémiový taliansky výrobca keramických obkladov a dlažieb',
        images: [],
        isMain: true
      },
      {
        _id: '9',
        name: 'Fiandre',
        category: 'Obklady a dlažby',
        logo: '/elite_logoRGB-11.jpg',
        description: 'Prémiový taliansky výrobca keramických obkladov a dlažieb',
        images: [],
        isMain: true
      }
    ];

    // Ostatné značky - iba logá bez popisov
    const otherBrands = [
      {
        _id: '10',
        name: 'Tres',
        logo: '/TRES_logo_W.svg',
        website: 'tresgriferia.com',
        isOther: true
      },
      {
        _id: '11',
        name: 'Axor',
        logo: '/Axor-logo-white.png',
        isOther: true
      },
      {
        _id: '12',
        name: 'Kaldewei',
        logo: '/kaldewei.png',
        isOther: true
      },
      {
        _id: '13',
        name: 'Alca',
        logo: '/alca.svg',
        isOther: true
      },
      {
        _id: '14',
        name: 'Hansgrohe',
        logo: '/Hansgrohe-Logo-2.svg',
        isOther: true
      },
      {
        _id: '15',
        name: 'Huppe',
        logo: '/logoWhite.svg', // fallback logo
        isOther: true
      },
      {
        _id: '16',
        name: 'Dornbracht',
        logo: '/logoWhite.svg', // fallback logo
        isOther: true
      },
      {
        _id: '17',
        name: 'Laufen',
        logo: '/LAUFEN_White_RGB_big.png',
        isOther: true
      },
      {
        _id: '18',
        name: 'Kludi',
        logo: '/logoWhite.svg', // fallback logo
        isOther: true
      }
    ];

    return [...mainBrands, ...otherBrands];
  };

  // Animation for brands
  useEffect(() => {
    if (brands.length > 0) {
      const timer = setTimeout(() => {
        setVisibleBrands(brands.map((_, index) => index));
      }, 400);
      
      const otherBrandsTimer = setTimeout(() => {
        setShowOtherBrands(true);
      }, 1200);

      return () => {
        clearTimeout(timer);
        clearTimeout(otherBrandsTimer);
      };
    }
  }, [brands]);

  if (loading) {
    return (
      <Layout>
        <NavBar />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-white">Načítavam značky...</p>
          </div>
        </div>
      </Layout>
    );
  }

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
          <h1 className="text-3xl tablet:text-4xl laptop:text-5xl font-light text-white mb-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
            OBCHODOVANÉ ZNAČKY
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]"></div>
          <p className="text-lg tablet:text-xl text-white opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] max-w-3xl mx-auto leading-relaxed">
          Spolupracujeme s poprednými svetovými výrobcami kúpeľňovej sanity, obkladov a dlažieb. Veríme, že naša ponuka dokáže uspokojiť aj tých najnáročnejších klientov.
          </p>
        </div>
      </div>

      {/* Main Brands Grid */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {brands.filter(brand => brand.category !== 'Ostatné').map((brand, index) => (
              <div
                key={brand._id || index}
                className={`group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 cursor-pointer transform ${
                  visibleBrands.includes(index) 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-8 opacity-0 scale-95'
                } hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20`}
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
                  <h3 className="text-white font-medium text-lg group-hover:text-blue-300 transition-colors">
                    {brand.name}
                  </h3>
                  
                  <div className="text-blue-300 text-sm font-light uppercase tracking-wide">
                    {brand.category}
                  </div>
                  
                  <p className="text-sm leading-relaxed text-white/70">
                    {brand.description}
                  </p>

                  {/* Image Gallery Indicator */}
                  {brand.images && brand.images.length > 0 && (
                    <div className="mt-3 w-full bg-green-600/20 border border-green-500/30 text-green-300 py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {brand.images.length === 1 
                        ? '1 obrázok k dispozícii'
                        : brand.images.length >= 2 && brand.images.length <= 4
                        ? `${brand.images.length} obrázky k dispozícii`
                        : `${brand.images.length} obrázkov k dispozícii`
                      }
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ostatné Section */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-2xl tablet:text-3xl font-light text-white mb-4 text-center tracking-wide transform transition-all duration-1000 ${
            showOtherBrands ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            OSTATNÉ
          </h2>
          <p className={`text-lg text-white opacity-80 max-w-2xl mx-auto text-center mb-8 transform transition-all duration-1000 ${
            showOtherBrands ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
            Ďalší producenti, ktorých vám vieme ponúknuť
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {brands.filter(brand => brand.category === 'Ostatné').map((brand, index) => (
              <div
                key={brand._id || index}
                className={`group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 cursor-pointer transform ${
                  showOtherBrands 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-8 opacity-0 scale-95'
                } hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20`}
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
                {/* Website info for Tres */}
                {brand.website && (
                  <div className="mt-2 text-center">
                    <p className="text-xs text-blue-300 opacity-80">{brand.website}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-light text-white mb-6">
              Prečo si vybrať naše značky?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
              <div>
                <h3 className="font-medium mb-2">Kvalita</h3>
                <p className="text-sm">Všetky naše značky sú synonymom pre najvyššiu kvalitu a spoľahlivosť.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Inovácia</h3>
                <p className="text-sm">Najnovšie technológie a dizajnové trendy v sanitárnej technike.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Servis</h3>
                <p className="text-sm">Komplexný servis a poradenstvo pre všetky naše produkty.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Preview Modal */}
      {selectedLogo && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4">
          <div className="bg-black rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedLogo.name}</h2>
                <button
                  onClick={closeLogoPreview}
                  className="text-gray-400 hover:text-white text-2xl"
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
                    filter: selectedLogo.logoFilter || 
                           (selectedLogo.name === 'HÜPPE' || selectedLogo.name === 'Dornbracht' || selectedLogo.name === 'Laufen') ? 'brightness(0) invert(1)' : 'none'
                  }}
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
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
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedBrandImages.name}</h2>
                  <p className="text-blue-300 text-sm mt-1">{selectedBrandImages.category}</p>
                </div>
                <button
                  onClick={closeImageGallery}
                  className="text-gray-400 hover:text-white text-3xl p-2"
                >
                  ×
                </button>
              </div>
              
              {selectedBrandImages.images && selectedBrandImages.images.length > 0 ? (
                <div className="max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedBrandImages.images.map((image, index) => (
                      <div key={image._id || index} className="group relative">
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <img
                            src={process.env.NODE_ENV === 'production' 
                              ? `/${image.path}` 
                              : `http://localhost:5001/${image.path}`}
                            alt={image.originalName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-lg">Žiadne obrázky nie sú k dispozícii</p>
                </div>
              )}
              
              <div className="flex justify-center mt-6 pt-4 border-t border-gray-700">
                <button
                  onClick={closeImageGallery}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
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
