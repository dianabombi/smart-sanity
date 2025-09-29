import React, { useState } from 'react';
import Layout from './layout/Layout';
import Breadcrumbs from './ui/Breadcrumbs';
import NavBar from './layout/NavBar';

const Brands = () => {
  const [selectedLogo, setSelectedLogo] = useState(null);

  const openLogoPreview = (brand) => {
    setSelectedLogo(brand);
  };

  const closeLogoPreview = () => {
    setSelectedLogo(null);
  };
  const mainBrands = [
    {
      name: 'Agape',
      description: 'Svet plný originality a materiálovej pestrosti z pera tých najlepších svetových dizajnérov – prémiový taliansky dodávateľ kúpeľňových batérií, sanity, nábytku a doplnkov.',
      website: 'https://www.agapedesign.it/',
      logo: '/icons/Agape_transparent.png',
      category: 'Kúpeľňový nábytok',
      darkBackground: true,
      logoSize: 'max-h-20'
    },
    {
      name: 'Fantini',
      description: 'Symbióza špičkového dizajnu a prvotriednej kvality je výsledkom talianskeho producenta kúpeľňových a kuchynských batérií, doplnkov a komplexných wellness riešení.',
      website: 'https://www.fantini.it/',
      logo: '/fantini.png',
      category: 'Batérie a sprchy',
      darkBackground: true
    },
    {
      name: 'Cielo',
      description: '“Hand Made Italy” – dotknite sa raja – ručne vyrábaná kúpeľňová sanita a nábytok.',
      website: 'https://www.ceramicacielo.it/',
      logo: '/logo_cielo_white.png',
      category: 'Sanitárna keramika',
      darkBackground: true,
      logoSize: 'max-h-14'
    },
    {
      name: 'Azzurra',
      description: 'Elegancia, ktorá zmení vašu kúpeľňu na moderný priestor – špičkový taliansky výrobca kúpeľňovej sanity a nábytku.',
      website: 'https://www.azzurra.it/',
      logo: '/icons/logo.svg',
      category: 'Sanitárna keramika',
      darkBackground: true,
      logoSize: 'max-h-32',
      logoFilter: 'brightness(0) invert(1)'
    },
    {
      name: 'CEA Design',
      description: 'Pocítte luxus – nerez ako hlavný materiál tohto prémiového talianskeho producenta kúpeľňových batérií, doplnkov a elektrických sušiakov.',
      website: 'https://www.ceadesign.it/',
      logo: '/cea.svg',
      category: 'Batérie a doplnky',
      darkBackground: true,
      logoSize: 'max-h-14'
    },
    {
      name: 'Zenon Surfaces',
      description: 'Zažite s nami nadšenie pre inovácie od španielskeho výrobcu umývadiel, vaní a sprchových vaničiek.',
      website: 'https://zenonsurfaces.com/en/',
      logo: '/icons/ZENON_white.png',
      category: 'Povrchy a vane',
      darkBackground: true
    },
    {
      name: 'Fondovalle',
      description: 'Pokročilé technológie výroby a špičková kvalita produktov – keramické obklady a dlažby v širokej škále dizajnov a povrchov pre zhmotnenie vašich predstáv.',
      website: 'https://fondovalle.it/',
      logo: '/icons/Fondovalle.png',
      category: 'Obklady a dlažby',
      darkBackground: true,
      logoSize: 'max-h-32'
    },
    {
      name: 'Fiandre',
      description: 'Povrchy, ktoré formujú jedinečnosť – prémiový taliansky výrobca gresových obkladov a dlažieb, ktorý medzi prvými prišiel s veľkoformátovými obkladmi.',
      website: 'https://www.fiandre.com/',
      logo: '/logogf.png',
      category: 'Obklady a dlažby',
      darkBackground: true
    }
  ];

  const otherBrands = [
    {
      name: 'Tres',
      website: 'https://tresgriferia.com/',
      logo: '/tres-logo.png'
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
      name: 'Huppe',
      website: 'https://www.huppe.com/',
      logo: '/huppe-logo.png'
    },
    {
      name: 'Dornbracht',
      website: 'https://www.dornbracht.com/',
      logo: '/dornbracht-logo.png'
    },
    {
      name: 'Laufen',
      website: 'https://www.laufen.com/',
      logo: '/laufen-logo.png'
    },
    {
      name: 'Kludi',
      website: 'https://www.kludi.com/',
      logo: '/kludi-logo.png'
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
          <h1 className="text-2xl md:text-3xl font-light text-white mb-8 tracking-wide">
            OBCHODOVANÉ ZNAČKY
          </h1>
          <p className="text-lg text-white opacity-80 max-w-3xl mx-auto leading-relaxed">
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
                className="group bg-white/5 border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
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
          <h2 className="text-2xl font-light text-white mb-8 text-center tracking-wide">
            OSTATNÉ
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {otherBrands.map((brand, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                onClick={() => openLogoPreview(brand)}
              >
                <div className="h-16 flex items-center justify-center">
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} Logo`}
                    className="max-h-12 max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    style={{
                      imageRendering: 'crisp-edges'
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
                    filter: selectedLogo.name === 'Agape' ? 'none' : 'none'
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
