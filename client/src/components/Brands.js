import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import Breadcrumbs from './ui/Breadcrumbs';
import NavBar from './layout/NavBar';

const Brands = () => {
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [visibleBrands, setVisibleBrands] = useState([]);
  const [showOtherBrands, setShowOtherBrands] = useState(false);

  const openLogoPreview = (brand) => {
    setSelectedLogo(brand);
  };

  const closeLogoPreview = () => {
    setSelectedLogo(null);
  };

  // Animation for brands
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleBrands([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    }, 400);
    
    const otherBrandsTimer = setTimeout(() => {
      setShowOtherBrands(true);
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearTimeout(otherBrandsTimer);
    };
  }, []);
  const mainBrands = [
    {
      name: 'Agape',
      description: 'Prémiový taliansky dodávateľ kúpeľňových batérií, sanity, nábytku a kúpeľňových doplnkov',
      website: 'https://www.agapedesign.it/',
      logo: '/icons/Agape_transparent.png',
      category: 'Kúpeľňový nábytok',
      darkBackground: true,
      logoSize: 'max-h-20'
    },
    {
      name: 'Fantini',
      description: 'Prémiový taliansky výrobca kúpeľňových a kuchynských batérií a doplnkov',
      website: 'https://www.fantini.it/',
      logo: '/fantini.png',
      category: 'Batérie a sprchy',
      darkBackground: true
    },
    {
      name: 'Cielo',
      description: 'Prémiový taliansky výrobca kúpeľňovej sanity, nábytku a kúpeľňových doplnkov',
      website: 'https://www.ceramicacielo.it/',
      logo: '/logo_cielo_white.png',
      category: 'Sanitárna keramika',
      darkBackground: true,
      logoSize: 'max-h-14'
    },
    {
      name: 'Azzurra',
      description: 'Prémiový taliansky výrobca kúpeľňovej sanity, nábytku a kúpeľňových doplnkov',
      website: 'https://www.azzurra.it/',
      logo: '/logoAZZ.svg',
      category: 'Sanitárna keramika',
      darkBackground: true,
      logoSize: 'max-h-40',
      logoFilter: 'brightness(0) invert(1)'
    },
    {
      name: 'Cea',
      description: 'Prémiový taliansky výrobca kúpeľňových a kuchynských batérií, elektrických sušiakov a doplnkov',
      website: 'https://www.ceadesign.it/',
      logo: '/cea.svg',
      category: 'Batérie a doplnky',
      darkBackground: true,
      logoSize: 'max-h-14'
    },
    {
      name: 'Zenon',
      description: 'Prémiový španielsky výrobca umývadiel, vaní a sprchových vaničiek',
      website: 'https://zenonsurfaces.com/en/',
      logo: '/icons/ZENON_2024.png',
      category: 'Povrchy a vane',
      darkBackground: true,
      logoFilter: 'brightness(0) invert(1)'
    },
    {
      name: 'Fondovalle',
      description: 'Prémiový taliansky výrobca keramických obkladov a dlažieb',
      website: 'https://fondovalle.it/',
      logo: '/icons/Fondovalle.png',
      category: 'Obklady a dlažby',
      darkBackground: true,
      logoSize: 'max-h-32'
    },
    {
      name: 'Fiandre',
      description: 'Prémiový taliansky výrobca keramických obkladov a dlažieb',
      website: 'https://www.fiandre.com/',
      logo: '/logogf.png',
      category: 'Obklady a dlažby',
      darkBackground: true
    },
    {
      name: 'Antrax',
      description: 'Prémiový taliansky výrobca dizajnových radiátorov',
      website: 'https://www.antrax.it/',
      logo: '/antrax-logo.png',
      category: 'Radiátory',
      darkBackground: true
    }
  ];

  const otherBrands = [
    {
      name: 'Tres',
      website: 'https://tresgriferia.com/',
      logo: '/TRES_logo_W.svg'
    },
    {
      name: 'AXOR',
      website: 'https://www.axor-design.com/int/',
      logo: '/Axor-logo-white.png'
    },
    {
      name: 'Kaldewei',
      website: 'https://www.kaldewei.com/',
      logo: '/icons/csm_kaldewei_white_rgb_f6885cdf89.png'
    },
    {
      name: 'Alca',
      website: 'https://alcadrain.sk/',
      logo: '/alca.svg'
    },
    {
      name: 'Hansgrohe',
      website: 'https://www.hansgrohe.com/',
      logo: '/Hansgrohe-Logo-2.svg'
    },
    {
      name: 'HÜPPE',
      website: 'https://www.hueppe.com/',
      logo: '/icons/logo_huppe.png'
    },
    {
      name: 'Dornbracht',
      website: 'https://www.dornbracht.com/',
      logo: '/icons/dorn_bracht_logo.png'
    },
    {
      name: 'Laufen',
      website: 'https://www.laufen.com/',
      logo: '/LAUFEN_White_RGB_big.png'
    },
    {
      name: 'Keco',
      website: '#',
      logo: '/placeholder-logo.png'
    }
  ];

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
            {mainBrands.map((brand, index) => (
              <div
                key={index}
                className={`group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 cursor-pointer transform ${
                  visibleBrands.includes(index) 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-8 opacity-0 scale-95'
                } hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => openLogoPreview(brand)}
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
            {otherBrands.map((brand, index) => (
              <div
                key={index}
                className={`group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 cursor-pointer transform ${
                  showOtherBrands 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-8 opacity-0 scale-95'
                } hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20`}
                style={{ transitionDelay: `${index * 80 + 200}ms` }}
                onClick={() => openLogoPreview(brand)}
              >
                <div className="h-16 flex items-center justify-center">
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} Logo`}
                    className="max-h-12 max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    style={{
                      imageRendering: 'crisp-edges',
                      filter: (brand.name === 'HÜPPE' || brand.name === 'Dornbracht' || brand.name === 'Laufen') ? 'brightness(0) invert(1)' : 'none'
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
    </Layout>
  );
};

export default Brands;
