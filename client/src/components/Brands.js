import React from 'react';
import Layout from './layout/Layout';
import Breadcrumbs from './ui/Breadcrumbs';
import NavBar from './layout/NavBar';

const Brands = () => {
  const brands = [
    {
      name: 'CEA Design',
      description: 'Taliansky výrobca luxusných batérií a kúpeľňových doplnkov',
      website: 'https://www.ceadesign.it/',
      logo: '/cea.svg',
      category: 'Batérie a doplnky',
      darkBackground: true
    },
    {
      name: 'Elite Bath & Kitchen',
      description: 'PRÉMIOVÁ SPOLUPRÁCA',
      website: 'https://www.elitebathkitchen.sk/',
      logo: '/new.svg',
      category: 'Prémiová spolupráca ',
      darkBackground: true,
      isPremiumPartner: true
    },
    {
      name: 'Agape',
      description: 'Taliansky dizajn kúpeľňového nábytku a sanitárnych zariadení',
      website: 'https://www.agapedesign.it/',
      logo: '/Agape.jpg',
      category: 'Kúpeľňový nábytok',
      darkBackground: true
    },
    {
      name: 'Fantini',
      description: 'Taliansky výrobca luxusných batérií a sprchových systémov',
      website: 'https://www.fantini.it/',
      logo: '/fantini.png',
      category: 'Batérie a sprchy',
      darkBackground: true
    },
    {
      name: 'Azzurra',
      description: 'Taliansky výrobca sanitárnej keramiky a kúpeľňového vybavenia',
      website: 'https://www.azzurra.it/',
      logo: '/logo Azzurra bianco su fondo nero.png',
      category: 'Sanitárna keramika',
      darkBackground: true
    },
    {
      name: 'Alcadrain',
      description: 'Odvodňovacie systémy a riešenia',
      website: 'https://alcadrain.sk/',
      logo: '/alca.svg',
      category: 'Odvodňovanie',
      darkBackground: true
    },
    {
      name: 'Zenon Surfaces',
      description: 'Bath & SPC Surfaces - Asymmetrické vane pre avantgardné projekty',
      website: 'https://zenonsurfaces.com/en/',
      logo: '/ZENON_2024.png',
      category: 'Povrchy a vane',
      darkBackground: false
    },
    {
      name: 'AXOR',
      description: 'Luxusné batérie a sprchy pre prémiové kúpeľne a kuchyne',
      website: 'https://www.axor-design.com/int/',
      logo: '/Axor-logo-white.png',
      category: 'Batérie a sprchy',
      darkBackground: true
    },
    {
      name: 'Fiandre',
      description: 'Porcelánové kameniny - keramika pre architektúru a dizajn',
      website: 'https://www.fiandre.com/',
      logo: '/logogf.png',
      category: 'Obklady a dlažby',
      darkBackground: true
    },
    {
      name: 'Fondovalle',
      description: 'Keramické obklady z porcelánovej kameniny',
      website: 'https://fondovalle.it/',
      logo: '/Logo_Fondovalle.png',
      category: 'Obklady a dlažby',
      darkBackground: false
    },
    {
      name: 'Kaldewei',
      description: 'Prémiové vane, sprchy a umývadlá pre vaše vysnívaná kúpeľňa',
      website: 'https://www.kaldewei.com/',
      logo: '/kaldewei.png',
      category: 'Vane a sprchy',
      darkBackground: false
    },
    {
      name: 'Cielo',
      description: 'Taliansky dizajn sanitárnej keramiky',
      website: 'https://www.ceramicacielo.it/',
      logo: '/logo_cielo_white.png',
      category: 'Sanitárna keramika',
      darkBackground: true
    },
    {
      name: 'Hansgrohe',
      description: 'Prémiové batérie pre kúpeľne a kuchyne',
      website: 'https://www.hansgrohe.com/',
      logo: '/Hansgrohe-Logo-2.svg',
      category: 'Batérie a sprchy',
      darkBackground: true
    },
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
            ZNAČKY
          </h1>
          <p className="text-lg text-white opacity-80 max-w-3xl mx-auto leading-relaxed">
            Spolupracujeme s najlepšími značkami v oblasti sanitárnych zariadení 
            a ponúkame produkty najvyššej kvality pre vaše domácnosti.
          </p>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {brands.map((brand, index) => (
              <div
                key={index}
                className={`group ${brand.isPremiumPartner ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/30 ring-2 ring-yellow-400/20' : 'bg-white/5 border-white/10'} backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer relative`}
                onClick={() => window.open(brand.website, '_blank')}
              >
                {/* Premium Partnership Badge */}
                {brand.isPremiumPartner && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    PRÉMIOVÁ SPOLUPRÁCA
                  </div>
                )}
                {/* Logo Container */}
                <div className={`${brand.darkBackground ? '' : 'bg-white rounded-lg'} p-4 mb-4 h-24 flex items-center justify-center`}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} Logo`}
                    className="max-h-16 max-w-full object-contain"
                    style={{
                      imageRendering: 'high-quality',
                      imageRendering: '-webkit-optimize-contrast',
                      imageRendering: 'crisp-edges'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className={`${brand.darkBackground ? 'text-white' : 'text-black'} font-bold text-lg text-center items-center justify-center h-full w-full`}
                    style={{display: 'none'}}
                  >
                    {brand.name}
                  </div>
                </div>

                {/* Brand Info */}
                <div className="space-y-3">
                  <h3 className="text-white font-medium text-lg group-hover:text-blue-300 transition-colors">
                    {brand.name}
                  </h3>
                  
                  <div className="text-blue-300 text-sm font-light uppercase tracking-wide">
                    {brand.category}
                  </div>
                  
                  <p className={`text-sm leading-relaxed ${brand.isPremiumPartner ? 'text-yellow-300 font-semibold text-base' : 'text-white/70'}`}>
                    {brand.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="mt-4 flex items-center text-white/50 group-hover:text-white transition-colors">
                  <span className="text-xs uppercase tracking-wide">Navštíviť web</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
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
    </Layout>
  );
};

export default Brands;
