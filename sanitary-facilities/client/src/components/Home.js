import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Hero from './ui/Hero';
import Button from './ui/Button';
import Carousel from './ui/Carousel';

const Home = () => {
  const navigate = useNavigate();

  const handleEntranceClick = () => {
    navigate('/entrance');
  };

  const handleWhoWeAreClick = () => {
    navigate('/who-we-are');
  };

  // Carousel images from public folder
  const carouselImages = [
    {
      src: '/bathroom.png',
      alt: 'Modern bathroom facilities'
    },
    {
      src: '/sinks.png', 
      alt: 'Premium sink installations'
    },
    {
      src: '/tap_silver.png',
      alt: 'High-quality silver taps'
    }
  ];

  return (
    <Layout>
      {/* Carousel Section - Top of page */}
      <div className="pt-8 px-2 sm:px-4 lg:px-6">
        <div className="max-w-full mx-auto">
          <Carousel
            images={carouselImages}
            height="h-80 md:h-96 lg:h-[500px] xl:h-[600px]"
            autoPlay={true}
            autoPlayInterval={5000}
            showDots={true}
            showArrows={true}
            showCounter={false}
            className="rounded-lg overflow-hidden mb-8"
          />
        </div>
      </div>
      
      <Hero
        title="SMART SANITY"
        subtitle="Professional household sanitary solutions and maintenance"
        height="min-h-[50vh]"
      >
        <div className="flex flex-col sm:flex-row gap-6">
          <Button
            size="large"
            onClick={handleEntranceClick}
          >
            ENTRANCE
          </Button>
          
          <Button
            size="large"
            onClick={handleWhoWeAreClick}
          >
            WHO WE ARE
          </Button>
        </div>
      </Hero>
    </Layout>
  );
};

export default Home;
