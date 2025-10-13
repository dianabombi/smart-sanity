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
  }, []);

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
  const handleRefreshBanners = () => {
    console.log('Manually refreshing hero banners...');
    loadHeroBanners();
  };

  return (
    <Layout showFooter={false}>
      {/* Responsive container: stack on mobile/tablet, side-by-side on laptop+ */}
      <div className="min-h-screen w-full bg-black flex flex-col laptop:flex-row">
        {/* Hero Banner - full width on mobile/tablet, 2/3 on laptop+ */}
        <div className="relative w-full laptop:w-2/3 h-[35vh] tablet:h-[50vh] laptop:h-screen mb-4 tablet:mb-0 laptop:mb-0">
          {loading ? (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-gray-400 text-lg">Načítavam bannery...</div>
            </div>
          ) : (
            <Carousel
              images={carouselImages}
              height="h-full"
              autoPlay={true}
              autoPlayInterval={20000}
              showDots={false}
              showArrows={false}
              showCounter={false}
              className="w-full h-full"
            />
          )}
        </div>
        
        {/* Right Section - full width on mobile/tablet, 1/3 on laptop+ */}
        <div className="w-full laptop:w-1/3 bg-black flex flex-col items-center justify-start tablet:justify-between laptop:justify-between gap-8 tablet:gap-6 laptop:gap-8 px-4 tablet:px-6 py-8 tablet:py-12 laptop:py-0 laptop:items-stretch min-h-[65vh] tablet:min-h-[50vh] laptop:h-screen flex-1 laptop:flex-none">
          {/* Smart Sanit Logo - positioned higher */}
          <div className="flex-shrink-0 pt-4 tablet:pt-6 laptop:pt-16 flex justify-center">
            <img 
              src="/logo.png" 
              alt="Smart Sanit" 
              className="shrink-0 h-14 tablet:h-20 laptop:h-20 w-auto object-contain"
              style={{
              }}
            />
          </div>
          
          {/* Text Section */}
          <div className="flex flex-col items-center justify-center pt-8 tablet:pt-2 laptop:pt-8">
            
            <div className="text-xl tablet:text-2xl text-gray-400 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] max-w-3xl mx-auto leading-relaxed text-center">
              <p>Profesionálne riešenia</p>
              <p>pre interiérových dizajnérov</p>
              <p>a architektov</p>
            </div>
          </div>
          
          {/* Button in middle of lower section */}
          <div className="pb-8 tablet:pb-4 laptop:pb-24 flex justify-center">
            <Button
              size="small"
              variant="primary"
              onClick={() => navigate('/what-we-offer')}
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
      </div>
    </Layout>
  );
};

export default Home;
