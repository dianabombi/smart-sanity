import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from './ui/ActionButton';
import Carousel from './ui/Carousel';
import apiService from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [carouselImages, setCarouselImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback carousel images from public folder
  const fallbackCarouselImages = [
    {
      src: '/photos/kaldewei.avif',
      alt: 'Kaldewei premium bathroom solutions'
    },
    {
      src: '/photos/umyvadlo.jpeg', 
      alt: 'Modern sink installations'
    },
    {
      src: '/photos/vanaPs.png',
      alt: 'Premium bathtub design'
    }
  ];

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
      setIsLoading(true);
      const response = await apiService.getHeroBanners();
      if (response.success && response.banners.length > 0) {
        // Convert hero banners to carousel format
        const images = response.banners.map(banner => ({
          src: banner.src,
          alt: banner.alt || banner.title || 'Hero banner'
        }));
        setCarouselImages(images);
      } else {
        // Use fallback images if no hero banners found
        setCarouselImages(fallbackCarouselImages);
      }
    } catch (error) {
      console.error('Error loading hero banners:', error);
      setCarouselImages(fallbackCarouselImages);
    } finally {
      setIsLoading(false);
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
          {isLoading ? (
            /* Skeleton Loader */
            <div className="w-full h-full bg-gray-800 relative overflow-hidden">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
              </div>
              
              {/* Skeleton content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-700 rounded mx-auto mb-2 animate-pulse"></div>
                  <div className="h-3 w-24 bg-gray-700 rounded mx-auto animate-pulse"></div>
                </div>
              </div>
              
              {/* Skeleton dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="w-12 h-1 bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          ) : (
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
          )}
        </div>
        
        {/* Right Section - full width on mobile/tablet, 1/3 on laptop+ */}
        <div className="w-full laptop:w-1/3 bg-black flex flex-col items-center justify-start tablet:justify-between laptop:justify-between gap-8 tablet:gap-6 laptop:gap-8 px-4 tablet:px-6 py-8 tablet:py-12 laptop:py-0 laptop:items-stretch min-h-[65vh] tablet:min-h-[50vh] laptop:h-screen flex-1 laptop:flex-none">
          {isLoading ? (
            /* Right Section Skeleton */
            <>
              {/* Logo Skeleton */}
              <div className="flex-shrink-0 pt-2 tablet:pt-4 laptop:pt-12 flex justify-center">
                <div className="h-14 tablet:h-16 laptop:h-18 w-32 bg-gray-700 rounded animate-pulse"></div>
              </div>
              
              {/* Text Skeleton */}
              <div className="flex flex-col items-center justify-center pt-8 pb-8 tablet:pt-6 tablet:pb-6 laptop:pt-12 laptop:pb-12 space-y-4">
                <div className="h-6 w-48 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-56 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-40 bg-gray-700 rounded animate-pulse"></div>
              </div>
              
              {/* Button Skeleton */}
              <div className="pb-8 tablet:pb-4 laptop:pb-24 flex justify-center">
                <div className="h-12 w-32 bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
            </>
          ) : (
            /* Actual Content */
            <>
              {/* Smart Sanit Logo - positioned higher */}
              <div className="flex-shrink-0 pt-2 tablet:pt-4 laptop:pt-12 flex justify-center">
                <img 
                  src="/logo vektory_bez pozadia.png" 
                  alt="Smart Sanit" 
                  className="shrink-0 h-14 tablet:h-16 laptop:h-18 w-auto object-contain"
                  style={{
                  }}
                />
              </div>
              
              {/* Text Section */}
              <div className="flex flex-col items-center justify-center pt-8 pb-8 tablet:pt-6 tablet:pb-6 laptop:pt-12 laptop:pb-12">
                <div className="text-xl tablet:text-2xl text-gray-400 opacity-0 animate-[fadeInUp_2.5s_ease-out_0.8s_forwards] max-w-3xl mx-auto leading-relaxed text-center">
                  <p className="text-center">Profesionálne riešenia</p>
                  <p className="text-center">pre interiérových dizajnérov</p>
                  <p className="text-center">a architektov</p>
                </div>
              </div>
              
              {/* Button Section - Separate component */}
              <div className="pb-8 tablet:pb-4 laptop:pb-24 flex justify-center">
                <ActionButton
                  size="medium"
                  variant="primary"
                  onClick={() => navigate('/brands')}
                  className="min-w-[140px] tablet:min-w-[160px] text-lg"
                >
                  Vstúpte
                </ActionButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
