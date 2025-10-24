import React, { useState, useEffect } from 'react';
import NavBar from './layout/NavBar';
import ApiService from '../services/api';
import { useBackgroundSettings } from '../hooks/useBackgroundSettings';

const Entrance = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const { settings: backgroundSettings, getBackgroundStyle, refreshSettings } = useBackgroundSettings();
  const [bulletPoints, setBulletPoints] = useState([
    "Obchodujeme popredných svetových výrobcov v oblasti vybavenia kúpeľní, obkladov a dlažieb",
    "Podľa vašich požiadaviek vám vyskladáme kúpeľne z konkrétnych produktov od A po Z",
    "Spracujeme vám alternatívne riešenia s rôznymi cenovými hladinami",
    "Vyskladáme vám náročné sprchové, či vaňové zostavy batérií",
    "Zabezpečíme vám technickú podporu ku všetkým ponúkaným produktom",
    "Ponúkame vám dlhodobú spoluprácu založenú na odbornosti, spoľahlivosti a férovom prístupe"
  ]);

  // Load content from admin
  useEffect(() => {
    loadContent();
  }, []);

  // Separate useEffect for background settings refresh
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 Refreshing background settings...');
      refreshSettings();
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [refreshSettings]);

  const loadContent = async () => {
    try {
      console.log('🔄 Loading content from API...');
      const result = await ApiService.getPageContent('what-we-offer', 'main', 'content');
      console.log('📊 Content API result:', result);
      
      if (result.success && result.content) {
        const lines = result.content.split('\n').filter(line => line.trim().startsWith('•'));
        const points = lines.map(line => line.replace('•', '').trim());
        if (points.length > 0) {
          console.log('✅ Content loaded from API:', points);
          setBulletPoints(points);
        } else {
          console.log('⚠️ No bullet points found in API content, using defaults');
        }
      } else {
        console.log('⚠️ No content from API, using default bullet points');
      }
    } catch (error) {
      console.error('❌ Error loading content:', error);
      console.log('⚠️ Using default bullet points due to error');
    }
  };

  // Animation for bullet points
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleItems(bulletPoints.map((_, index) => index));
    }, 300);
    
    return () => clearTimeout(timer);
  }, [bulletPoints]);

  console.log('🎨 ENTRANCE: Current background settings:', backgroundSettings);
  console.log('🎨 ENTRANCE: Has background image:', !!backgroundSettings.entrancePageBackgroundImage);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Image - covers entire viewport */}
      {backgroundSettings.entrancePageBackgroundImage ? (
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundSettings.entrancePageBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.8
          }}
        />
      ) : (
        <div 
          className="fixed inset-0 z-0"
          style={getBackgroundStyle('entrance')}
        />
      )}
      
      <div className="relative min-h-screen">
        <NavBar />
        
        {/* Header Section */}
        <div className="pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide text-shadow-lg">
              <div className="mt-32">  Čo ponúkame</div>
            </h1>
          </div>
        </div>
        
        {/* Services Cards Section */}
        <div className="pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {console.log('🔍 Rendering bullet points:', bulletPoints.length, bulletPoints)}
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {bulletPoints.map((text, index) => (
                <div
                  key={index}
                  className={`group rounded-lg p-6 transition-all duration-500 transform ${
                    visibleItems.includes(index) 
                      ? 'translate-y-0 opacity-100 scale-100' 
                      : 'translate-y-8 opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms`, backgroundColor: '#1a1a1a', border: '1px solid #262626' }}
                >
                  <div className="space-y-3">
                    <p className="text-gray-300 leading-relaxed text-lg text-center">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid - Empty space for now */}
        <div className="pb-8 px-8 sm:px-12 lg:px-16 py-4">
          <div className="max-w-6xl mx-auto">
            {/* Category tiles removed - empty space ready for new content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entrance;
