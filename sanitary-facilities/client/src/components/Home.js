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
      {/* Split Layout - Carousel Left, Content Right */}
      <div className="min-h-screen bg-black flex flex-col lg:flex-row">
        {/* Left Side - Carousel */}
        <div className="w-full lg:w-2/3 flex items-center justify-center">
          <div className="w-full h-[50vh] lg:h-screen">
            <Carousel
              images={carouselImages}
              height="h-full"
              autoPlay={true}
              autoPlayInterval={5000}
              showDots={true}
              showArrows={true}
              showCounter={false}
              className="w-full h-full"
            />
          </div>
        </div>
        
        {/* Right Side - Text and Buttons */}
        <div className="w-full lg:w-1/3 flex items-center justify-center p-8">
          <div className="text-center space-y-8 max-w-lg">
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed">
              Profesionálne riešenia sanitárnych zariadení pre domácnosti a údržbu
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="large"
                onClick={handleEntranceClick}
              >
                VSTUP
              </Button>
              
              <Button
                size="large"
                onClick={handleWhoWeAreClick}
              >
                KTO SME
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
