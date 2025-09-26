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
      <div className="min-h-screen w-full bg-black flex">
        {/* Hero Banner - 2/3 of screen width */}
        <div className="relative w-2/3 h-screen">
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
        
        {/* Right Section - 1/3 of screen width with logo, text and button */}
        <div className="w-1/3 h-screen bg-black flex flex-col px-6">
          {/* Smart Sanit Logo - positioned higher */}
          <div className="flex-shrink-0 pt-24 flex justify-center">
            <img 
              src="/logo.png" 
              alt="Smart Sanit" 
              className="h-24 w-auto object-contain"
              style={{
                imageRendering: 'crisp-edges'
              }}
            />
          </div>
          
          {/* Text Section */}
          <div className="flex-1 flex flex-col items-center justify-center pt-16">
            <div className="text-center">
              <p className="text-white font-light leading-tight mb-8 text-[28px]">
                Profesionálne riešenia<br />
                pre interiérových dizajnérov<br />
                a architektov
              </p>
            </div>
          </div>
          
          {/* Button in middle of lower section */}
          <div className="flex-shrink-0 pb-32 flex justify-center">
            <Button
              size="medium"
              variant="primary"
              onClick={() => navigate('/what-we-offer')}
              className="w-full max-w-[200px]"
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
