import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Button from './ui/Button';
import Carousel from './ui/Carousel';

const Home = () => {
  const navigate = useNavigate();


  // Carousel images from public folder
  const carouselImages = [
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

  return (
    <Layout showFooter={false}>
      {/* Responsive container: stack on mobile/tablet, side-by-side on laptop+ */}
      <div className="min-h-screen w-full bg-black flex flex-col laptop:flex-row">
        {/* Hero Banner - full width on mobile/tablet, 2/3 on laptop+ */}
        <div className="relative w-full laptop:w-2/3 h-[50vh] tablet:h-[60vh] laptop:h-screen">
          <Carousel
            images={carouselImages}
            height="h-full"
            autoPlay={true}
            autoPlayInterval={20000}
            showDots={true}
            showArrows={false}
            showCounter={false}
            className="w-full h-full"
          />
        </div>
        
        {/* Right Section - full width on mobile/tablet, 1/3 on laptop+ */}
        <div className="w-full laptop:w-1/3 bg-black flex flex-col items-center justify-evenly gap-0 px-4 tablet:px-6 py-10 tablet:py-12 laptop:py-0 laptop:items-stretch laptop:gap-0 laptop:justify-start laptop:h-screen flex-1 laptop:flex-none">
          {/* Smart Sanit Logo - positioned higher */}
          <div className="flex-shrink-0 pt-0 tablet:pt-6 laptop:pt-16 flex justify-center">
            <img 
              src="/logo.png" 
              alt="Smart Sanit" 
              className="shrink-0 h-16 tablet:h-20 laptop:h-24 w-auto object-contain"
              style={{
                imageRendering: 'crisp-edges'
              }}
            />
          </div>
          
          {/* Text Section */}
          <div className="flex flex-col items-center justify-center pt-0 tablet:pt-2 laptop:pt-8">
            <div className="text-center">
              <p className="text-white font-light leading-tight mb-0 tablet:mb-2 text-lg tablet:text-xl laptop:text-[22px]">
                Profesionálne riešenia<br />
                pre interiérových dizajnérov<br />
                a architektov
              </p>
            </div>
          </div>
          
          {/* Button in middle of lower section */}
          <div className="flex-shrink-0 pb-0 tablet:pb-4 laptop:pb-24 flex justify-center">
            <Button
              size="small"
              variant="primary"
              onClick={() => navigate('/what-we-offer')}
              className="w-full max-w-[140px] tablet:max-w-[160px]"
            >
              VSTÚPTE
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
