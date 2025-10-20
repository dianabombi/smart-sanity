import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Button from './ui/Button';
import Carousel from './ui/Carousel';
import apiService from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [carouselImages, setCarouselImages] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
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
      setLoading(false);
    }
  };

  // Manual refresh function for development/testing
  // const handleRefreshBanners = () => {
  //   console.log('Manually refreshing hero banners...');
  //   loadHeroBanners();
  // };

  return (
    <Layout showFooter={false}>
      {/* Shimmer animation styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      
      {/* Responsive container: stack on mobile/tablet, side-by-side on laptop+ */}
      <div className="min-h-screen w-full bg-black flex flex-col laptop:flex-row">
        {loading ? (
          /* Full Page Skeleton */
          <>
            {/* Left Section Skeleton - Carousel Area */}
            <div className="relative w-full laptop:w-2/3 h-[35vh] tablet:h-[50vh] laptop:h-screen mb-4 tablet:mb-0 laptop:mb-0">
              <div className="w-full h-full bg-gray-800 relative overflow-hidden">
                {/* Skeleton animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]"></div>
                </div>
                
                {/* Skeleton dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>

            {/* Right Section Skeleton */}
            <div className="w-full laptop:w-1/3 bg-black flex flex-col items-center justify-start tablet:justify-between laptop:justify-between gap-8 tablet:gap-6 laptop:gap-8 px-4 tablet:px-6 py-8 tablet:py-12 laptop:py-0 laptop:items-stretch min-h-[65vh] tablet:min-h-[50vh] laptop:h-screen flex-1 laptop:flex-none">
              {/* Logo Skeleton */}
              <div className="flex-shrink-0 pt-4 tablet:pt-6 laptop:pt-16 flex justify-center">
                <div className="h-14 tablet:h-16 laptop:h-18 w-32 tablet:w-36 laptop:w-40 bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
              
              {/* Text Section Skeleton */}
              <div className="flex flex-col items-center justify-center pt-6 pb-6 tablet:pt-2 tablet:pb-2 laptop:pt-8 laptop:pb-8 space-y-3">
                <div className="w-64 tablet:w-72 h-6 tablet:h-7 bg-gray-700 rounded animate-pulse"></div>
                <div className="w-56 tablet:w-64 h-6 tablet:h-7 bg-gray-700 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-48 tablet:w-56 h-6 tablet:h-7 bg-gray-700 rounded animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              
              {/* Button Skeleton */}
              <div className="pb-8 tablet:pb-4 laptop:pb-24 flex justify-center">
                <div className="w-[130px] tablet:w-[160px] h-10 tablet:h-12 bg-gray-700 rounded-lg animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>
          </>
        ) : (
          /* Actual Content */
          <>
            {/* Hero Banner - full width on mobile/tablet, 2/3 on laptop+ */}
            <div className="relative w-full laptop:w-2/3 h-[35vh] tablet:h-[50vh] laptop:h-screen mb-4 tablet:mb-0 laptop:mb-0">
              <Carousel
                images={carouselImages}
                height="h-full"
                autoPlay={true}
                autoPlayInterval={8000}
                showDots={true}
                showArrows={false}
                showCounter={false}
                className="w-full h-full"
                transitionType="ken-burns"
              />
            </div>
            
            {/* Right Section - full width on mobile/tablet, 1/3 on laptop+ */}
            <div className="w-full laptop:w-1/3 bg-black flex flex-col items-center justify-start tablet:justify-between laptop:justify-between gap-8 tablet:gap-6 laptop:gap-8 px-4 tablet:px-6 py-8 tablet:py-12 laptop:py-0 laptop:items-stretch min-h-[65vh] tablet:min-h-[50vh] laptop:h-screen flex-1 laptop:flex-none">
              {/* Smart Sanit Logo - positioned higher */}
              <div className="flex-shrink-0 pt-4 tablet:pt-6 laptop:pt-16 flex justify-center">
                <img 
                  src="/logo vektory_bez pozadia.png" 
                  alt="Smart Sanit" 
                  className="shrink-0 h-14 tablet:h-16 laptop:h-18 w-auto object-contain"
                  style={{
                  }}
                />
                {/* Version indicator - remove after deployment confirmed */}
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded opacity-50">
                  v2025.01.20.14:16
                </div>
              </div>
              
              {/* Text Section */}
              <div className="flex flex-col items-center justify-center pt-6 pb-6 tablet:pt-2 tablet:pb-2 laptop:pt-8 laptop:pb-8">
                <div className="text-xl tablet:text-2xl text-gray-300 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] max-w-3xl mx-auto leading-relaxed text-center mb-6">
                  <p>Profesionálne riešenia</p>
                  <p>pre interiérových dizajnérov</p>
                  <p>a architektov</p>
                </div>
                
              </div>
              
              {/* Button Section */}
              <div className="pb-8 tablet:pb-4 laptop:pb-24 flex justify-center">
                <Button
                  size="small"
                  variant="primary"
                  onClick={() => navigate('/brands')}
                  className="w-full max-w-[130px] tablet:max-w-[160px]"
                  style={{
                    color: '#9ca3af',
                    borderColor: '#9ca3af',
                    backgroundColor: 'transparent',
                    textTransform: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'white';
                    e.target.style.borderColor = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#9ca3af';
                    e.target.style.borderColor = '#9ca3af';
                  }}
                >
                Vstúpte
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
