import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './ui/Carousel';
import apiService from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    loadHeroBanners();
    
    // Auto-refresh hero banners every 30 seconds to catch admin changes
    const interval = setInterval(() => {
      loadHeroBanners();
    }, 30000); // 30 seconds
    
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadHeroBanners = async () => {
    try {
      const response = await apiService.getHeroBanners();
      if (response.success && response.banners.length > 0) {
        // Convert hero banners to carousel format
        const carouselData = response.banners.map(banner => ({
          src: banner.src,
          alt: banner.alt || banner.title || 'Hero banner'
        }));
        setCarouselImages(carouselData);
      } else {
        // No banners found - show empty carousel
        setCarouselImages([]);
      }
    } catch (error) {
      console.error('Error loading hero banners:', error);
      setCarouselImages([]);
    }
  };

  // Manual refresh function for development/testing
  // const handleRefreshBanners = () => {
  //   console.log('Manually refreshing hero banners...');
  //   loadHeroBanners();
  // };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Custom CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
      {/* Responsive container: stack on mobile/tablet, side-by-side on laptop+ */}
      <div className="min-h-screen w-full bg-black flex flex-col laptop:flex-row">
        {/* Hero Banner - full width on mobile/tablet, 2/3 on laptop+ */}
        <div className="relative w-full laptop:w-2/3 h-[35vh] tablet:h-[50vh] laptop:h-screen mb-4 tablet:mb-0 laptop:mb-0">
          {carouselImages.length > 0 ? (
            <Carousel
              images={carouselImages}
              height="h-full"
              autoPlay={true}
              autoPlayInterval={8000}
              showDots={true}
              showArrows={true}
              showCounter={false}
              className="w-full h-full"
              transitionType="ken-burns"
            />
          ) : (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-lg mb-2">Žiadne bannery</div>
                <div className="text-sm">Pridajte bannery v admin paneli</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right Section - full width on mobile/tablet, 1/3 on laptop+ */}
        <div className="w-full laptop:w-1/3 bg-black flex flex-col items-center justify-start tablet:justify-between laptop:justify-between gap-8 tablet:gap-6 laptop:gap-8 px-4 tablet:px-6 py-8 tablet:py-12 laptop:py-0 laptop:items-stretch min-h-[65vh] tablet:min-h-[50vh] laptop:h-screen flex-1 laptop:flex-none">
          {/* Smart Sanit Logo - positioned higher */}
          <div className="flex-shrink-0 pt-12 tablet:pt-16 laptop:pt-24 flex justify-center">
            <img 
              src="/logo vektory_bez pozadia.png" 
              alt="Smart Sanit" 
              className="shrink-0 h-14 tablet:h-16 laptop:h-18 w-auto object-contain"
              style={{
              }}
            />
          </div>
          
          {/* Text Section */}
          <div className="flex flex-col items-center justify-center pt-6 pb-9 tablet:pt-3 tablet:pb-6 laptop:pt-10 laptop:pb-16">
            <div className="text-xl tablet:text-2xl text-gray-400 opacity-0 animate-[fadeInUp_2.5s_ease-out_0.8s_forwards] max-w-3xl mx-auto leading-relaxed text-center">
              <p className="text-center">Profesionálne riešenia</p>
              <p className="text-center">pre interiérových dizajnérov</p>
              <p className="text-center">a architektov</p>
            </div>
          </div>
          
          {/* Button Section - Separate component */}
          <div className="pb-8 tablet:pb-4 laptop:pb-24 flex justify-center">
            <button 
              onClick={() => navigate('/brands')}
              className="h-[40px] px-10 border-2 border-gray-400 text-gray-400 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-lg font-medium min-w-[200px] flex items-center justify-center"
            >
              Vstúpte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
