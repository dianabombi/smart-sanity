import React, { useState, useEffect, useCallback } from 'react';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ApiService from '../services/api';

const Inspirations = () => {
  const [selectedCategory] = useState('all');
  const [inspirations, setInspirations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInspirations = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      console.log(`🚨 PUBLIC: Loading inspirations from database... ${forceRefresh ? '(FORCE REFRESH)' : ''}`);
      
      const result = await ApiService.getInspirations();
      
      if (result.success && result.inspirations && result.inspirations.length > 0) {
        console.log(`✅ PUBLIC: Loaded ${result.inspirations.length} inspirations from database`);
        setInspirations(result.inspirations);
      } else {
        console.log('⚠️ PUBLIC: No inspirations found, using fallback data');
        setInspirations(getDefaultInspirations());
      }
    } catch (error) {
      console.error('❌ PUBLIC: Error loading inspirations:', error);
      setInspirations(getDefaultInspirations());
    } finally {
      setLoading(false);
    }
  }, []);

  const getDefaultInspirations = () => [
    {
      id: 2,
      title: 'Luxusný priestor',
      description: 'Prémiové materiály a sofistikované riešenia.',
      category: 'luxury',
      image: '/photos/compressed/ATX_AG0065.jpg',
      features: ['Luxusné materiály', 'Prémiové vybavenie', 'Elegantný dizajn'],
      brands: ['AXOR', 'Fantini', 'Cielo']
    },
    {
      id: 3,
      title: 'Štýlová kúpeľňa',
      description: 'Kombinácia funkčnosti a estetiky.',
      category: 'modern',
      image: '/photos/compressed/ATX_AG0088.jpg',
      features: ['Štýlový dizajn', 'Praktické riešenia', 'Kvalitné materiály'],
      brands: ['CEA Design', 'Azzurra', 'Hansgrohe']
    },
    {
      id: 4,
      title: 'Minimalistický štýl',
      description: 'Čisté línie a jednoduché riešenia.',
      category: 'modern',
      image: '/photos/compressed/ATX_AG0102.jpg',
      features: ['Minimalizmus', 'Čisté línie', 'Funkčnosť'],
      brands: ['Agape', 'Kaldewei', 'Hansgrohe']
    },
    {
      id: 5,
      title: 'Elegantná kúpeľňa',
      description: 'Sofistikované riešenie s dôrazom na detail.',
      category: 'luxury',
      image: '/photos/compressed/ATX_AG0114.jpg',
      features: ['Elegancia', 'Detailné riešenia', 'Kvalita'],
      brands: ['Fantini', 'AXOR', 'Cielo']
    },
    {
      id: 6,
      title: 'Klasický štýl',
      description: 'Nadčasový dizajn s tradičnými prvkami.',
      category: 'classic',
      image: '/photos/compressed/ATX_AG0120.jpg',
      features: ['Klasický dizajn', 'Tradičné prvky', 'Nadčasovosť'],
      brands: ['Azzurra', 'Hansgrohe', 'Kaldewei']
    },
    {
      id: 7,
      title: 'Moderný komfort',
      description: 'Pohodlné a praktické riešenia.',
      category: 'modern',
      image: '/photos/compressed/ATX_AG0129.jpg',
      features: ['Komfort', 'Praktickosť', 'Modernosť'],
      brands: ['CEA Design', 'Agape', 'Fantini']
    },
    {
      id: 8,
      title: 'Dizajnová kúpeľňa',
      description: 'Jedinečný dizajn s dôrazom na estetiku.',
      category: 'luxury',
      image: '/photos/compressed/ATX_AG0134.jpg',
      features: ['Jedinečný dizajn', 'Estetika', 'Originalita'],
      brands: ['AXOR', 'Cielo', 'Hansgrohe']
    },
    {
      id: 9,
      title: 'Štýlový priestor',
      description: 'Harmonické spojenie funkčnosti a krásy.',
      category: 'modern',
      image: '/photos/compressed/ATX_AG0142.jpg',
      features: ['Harmónia', 'Funkčnosť', 'Krása'],
      brands: ['Kaldewei', 'Azzurra', 'CEA Design']
    }
  ];

  useEffect(() => {
    loadInspirations();
    
    // Auto-refresh inspirations every 30 seconds to catch admin changes
    const interval = setInterval(() => {
      console.log('🔄 PUBLIC: Auto-refreshing inspirations to catch admin changes...');
      loadInspirations(true);
    }, 30000); // 30 seconds
    
    return () => clearInterval(interval);
  }, [loadInspirations]);

  // const categories = [
  //   { id: 'all', name: 'Všetky inšpirácie', icon: '🏠' },
  //   { id: 'modern', name: 'Moderné', icon: '✨' },
  //   { id: 'luxury', name: 'Luxusné', icon: '💎' },
  //   { id: 'industrial', name: 'Industriálne', icon: '🏭' },
  //   { id: 'classic', name: 'Klasické', icon: '🏛️' },
  //   { id: 'small', name: 'Malé priestory', icon: '📐' },
  //   { id: 'natural', name: 'Prírodné', icon: '🌿' }
  // ];

  const filteredInspirations = selectedCategory === 'all' 
    ? inspirations 
    : inspirations.filter(item => item.category === selectedCategory);

  // const tips = [
  //   {
  //     title: 'Osvetlenie je kľúčové',
  //     description: 'Kombinujte všeobecné, úlohové a atmosférické osvetlenie pre dokonalý výsledok.',
  //     icon: '💡'
  //   },
  //   {
  //     title: 'Kvalitné materiály',
  //     description: 'Investujte do odolných materiálov, ktoré vydržia vlhkosť a časté používanie.',
  //     icon: '🛠️'
  //   },
  //   {
  //     title: 'Funkčnosť na prvom mieste',
  //     description: 'Krásny dizajn musí byť aj praktický. Myslite na každodenné používanie.',
  //     icon: '⚙️'
  //   },
  //   {
  //     title: 'Ventilá­cia je dôležitá',
  //     description: 'Správna ventilácia predchádza vlhkosti a zabezpečuje zdravé prostredie.',
  //     icon: '🌬️'
  //   }
  // ];

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-6 mt-20 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
            Inšpirácie
          </h1>
          <p className="text-xl text-gray-300 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] max-w-3xl mx-auto leading-relaxed">
            Objavte najkrajšie kúpeľne a nechajte sa inšpirovať pre váš domov. 
            Od moderných minimalistických riešení až po luxusné wellness priestory.
          </p>
        </div>


        {/* Photos Only Gallery */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg">Načítavam inšpirácie...</div>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredInspirations.map((inspiration) => (
            <div key={inspiration.id} className="group">
              <div className="h-64 bg-gray-800 flex items-center justify-center relative overflow-hidden rounded-lg">
                {/* Loading skeleton */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-gray-500 text-center">
                      <div className="text-4xl mb-2">📷</div>
                      <div className="text-sm">Načítavam...</div>
                    </div>
                  </div>
                </div>
                
                <img 
                  src={inspiration.image} 
                  alt={inspiration.title}
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-300 opacity-0"
                  loading={inspiration.id <= 3 ? "eager" : "lazy"}
                  decoding="async"
                  fetchpriority={inspiration.id <= 3 ? "high" : "low"}
                  style={{
                    backgroundColor: '#1f2937',
                    minHeight: '256px'
                  }}
                  onLoad={(e) => {
                    e.target.style.opacity = '1';
                    e.target.previousSibling.style.display = 'none';
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                    e.target.previousSibling.style.display = 'none';
                  }}
                />
                <div className="text-gray-500 text-center absolute inset-0 flex flex-col items-center justify-center" style={{display: 'none'}}>
                  <div className="text-4xl mb-2">🏠</div>
                  <div className="text-sm">Foto kúpeľne</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

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
