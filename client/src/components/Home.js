import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Button from './ui/Button';
import Carousel from './ui/Carousel';

const Home = () => {
  const navigate = useNavigate();

  const handleEntranceClick = () => {
    navigate('/components');
  };

  const handleWhoWeAreClick = () => {
    navigate('/who-we-are');
  };

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
      {/* Full Width Hero Banner */}
      <div className="relative min-h-screen w-full">
        {/* Full Width Carousel Background */}
        <div className="absolute w-full h-full" style={{ top: '200px' }}>
          <Carousel
            images={carouselImages}
            height="h-full"
            autoPlay={true}
            autoPlayInterval={5000}
            showDots={true}
            showArrows={false}
            showCounter={false}
            className="w-full h-full"
          />
        </div>
        
        {/* Text Overlay at Top */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-80 py-6 pl-6 pr-2">
          <div className="max-w-7xl mx-auto flex items-end">
            {/* Smart Sanit Logo on the left */}
            <div className="flex-shrink-0">
              <img 
                src="/logo.png" 
                alt="Smart Sanit" 
                className="h-32 w-auto object-contain"
                style={{
                  imageRendering: 'high-quality',
                  imageRendering: 'crisp-edges'
                }}
              />
            </div>
            
            {/* Spacer */}
            <div className="flex-grow"></div>
            
            {/* Text and Button on the right */}
            <div className="flex items-end gap-6">
              <div className="text-right">
                <p className="text-base md:text-lg lg:text-xl text-white font-light leading-relaxed">
                  Profesionálne riešenia kúpeľní pre<br />
                  interiérových dizajnérov a architektov
                </p>
              </div>
              
              <Button
                size="medium"
                onClick={handleEntranceClick}
              >
                VSTUP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
