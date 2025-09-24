import React, { useState } from 'react';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import Breadcrumbs from './ui/Breadcrumbs';

const Inspirations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const inspirations = [
    {
      id: 1,
      title: 'Minimalistická elegancia',
      description: 'Čisté línie a neutrálne farby vytvárajú pokojnú atmosféru modernej kúpeľne.',
      category: 'modern',
      image: '/photos/umyvadlo.jpeg',
      features: ['Veľkoformátové obklady', 'Skrytá batéria', 'LED osvetlenie', 'Bezrámové zrkadlo'],
      brands: ['Hansgrohe', 'Villeroy & Boch', 'Kaldewei']
    },
    {
      id: 2,
      title: 'Luxusný wellness priestor',
      description: 'Domáce spa s prémiovými materiálmi a najmodernejšími technológiami.',
      category: 'luxury',
      image: '/photos/vanaPs.png',
      features: ['Voľne stojaca vaňa', 'Dažďová sprcha', 'Mramorové obklady', 'Podlahové kúrenie'],
      brands: ['AXOR', 'Kaldewei', 'Fantini']
    },
    {
      id: 3,
      title: 'Industriálny štýl',
      description: 'Kombinácia betónu, kovu a dreva pre autentický industriálny vzhľad.',
      category: 'industrial',
      image: '/photos/kaldewei.avif',
      features: ['Betónové umývadlo', 'Čierne batérie', 'Kovové doplnky', 'Drevené prvky'],
      brands: ['CEA Design', 'Agape', 'Cielo']
    },
    {
      id: 4,
      title: 'Klasická eleganc­ia',
      description: 'Nadčasový dizajn s tradičnými prvkami a kvalitnou keramikou.',
      category: 'classic',
      image: '/photos/umyvadlo.jpeg',
      features: ['Retro batérie', 'Klasické obklady', 'Voľne stojaca vaňa', 'Vintage doplnky'],
      brands: ['Fantini', 'Azzurra', 'Hansgrohe']
    },
    {
      id: 5,
      title: 'Malý priestor, veľký štýl',
      description: 'Inteligentné riešenia pre maximálne využitie malých kúpeľní.',
      category: 'small',
      image: '/photos/vanaPs.png',
      features: ['Závesné WC', 'Rohová sprcha', 'Zrkadlová skrinka', 'Svetlé farby'],
      brands: ['Hansgrohe', 'Cielo', 'Alcadrain']
    },
    {
      id: 6,
      title: 'Prírodné materiály',
      description: 'Harmónia dreva a kameňa pre relaxačnú atmosféru.',
      category: 'natural',
      image: '/photos/kaldewei.avif',
      features: ['Drevený nábytok', 'Kamenné obklady', 'Prírodné farby', 'Rastliny'],
      brands: ['Fiandre', 'Fondovalle', 'Zenon Surfaces']
    }
  ];

  const categories = [
    { id: 'all', name: 'Všetky inšpirácie', icon: '🏠' },
    { id: 'modern', name: 'Moderné', icon: '✨' },
    { id: 'luxury', name: 'Luxusné', icon: '💎' },
    { id: 'industrial', name: 'Industriálne', icon: '🏭' },
    { id: 'classic', name: 'Klasické', icon: '🏛️' },
    { id: 'small', name: 'Malé priestory', icon: '📐' },
    { id: 'natural', name: 'Prírodné', icon: '🌿' }
  ];

  const filteredInspirations = selectedCategory === 'all' 
    ? inspirations 
    : inspirations.filter(item => item.category === selectedCategory);

  const tips = [
    {
      title: 'Osvetlenie je kľúčové',
      description: 'Kombinujte všeobecné, úlohové a atmosférické osvetlenie pre dokonalý výsledok.',
      icon: '💡'
    },
    {
      title: 'Kvalitné materiály',
      description: 'Investujte do odolných materiálov, ktoré vydržia vlhkosť a časté používanie.',
      icon: '🛠️'
    },
    {
      title: 'Funkčnosť na prvom mieste',
      description: 'Krásny dizajn musí byť aj praktický. Myslite na každodenné používanie.',
      icon: '⚙️'
    },
    {
      title: 'Ventilá­cia je dôležitá',
      description: 'Správna ventilácia predchádza vlhkosti a zabezpečuje zdravé prostredie.',
      icon: '🌬️'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      
      {/* Breadcrumbs */}
      <div className="pt-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Inšpirácie
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Objavte najkrajšie kúpeľne a nechajte sa inšpirovať pre váš domov. 
            Od moderných minimalistických riešení až po luxusné wellness priestory.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-white text-black'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-700'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Inspirations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredInspirations.map((inspiration) => (
            <div key={inspiration.id} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all group">
              {/* Image */}
              <div className="h-64 bg-gray-800 flex items-center justify-center relative overflow-hidden">
                <img 
                  src={inspiration.image} 
                  alt={inspiration.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="text-gray-500 text-center absolute inset-0 flex flex-col items-center justify-center" style={{display: 'none'}}>
                  <div className="text-4xl mb-2">🏠</div>
                  <div className="text-sm">Foto kúpeľne</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {inspiration.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {inspiration.description}
                </p>
                
                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Kľúčové prvky:</h4>
                  <div className="flex flex-wrap gap-2">
                    {inspiration.features.map((feature, index) => (
                      <span key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Brands */}
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Odporúčané značky:</h4>
                  <div className="flex flex-wrap gap-2">
                    {inspiration.brands.map((brand, index) => (
                      <span key={index} className="text-xs bg-gray-700 text-white px-2 py-1 rounded">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Tipy od expertov
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="bg-gray-900 border border-gray-700 p-6 rounded-lg text-center hover:border-gray-600 transition-all">
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {tip.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trends Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Trendy roku 2024
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">
                🎨 Farebné akcenty
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Odvážne farby ako smaragdová zelená, námornícka modrá alebo terrakota 
                oživujú neutrálne kúpeľne a vytvárajú jedinečnú atmosféru.
              </p>
            </div>
            
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">
                🌿 Udržateľnosť
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Ekologické materiály, úsporné batérie a recyklovateľné prvky 
                sú stále populárnejšie medzi environmentálne uvedomelými zákazníkmi.
              </p>
            </div>
            
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">
                📱 Smart technológie
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Inteligentné zrkadlá, automatické batérie a systémy riadenia 
                teploty vody prinášajú komfort a úsporu energie.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-900 border border-gray-700 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">
            Potrebujete pomoc s návrhom?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Naši dizajnéri vám pomôžu vytvoriť kúpeľňu vašich snov
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Kontaktovať nás
            </button>
            <button 
              onClick={() => window.location.href = '/brands'}
              className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 border border-gray-600 transition-colors"
            >
              Prezrieť značky
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Inspirations;
