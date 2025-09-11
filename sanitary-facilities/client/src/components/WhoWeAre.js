import React from 'react';
import Layout from './layout/Layout';
import Hero from './ui/Hero';
import Navigation from './layout/Navigation';

const WhoWeAre = () => {
  const content = (
    <div className="space-y-8 text-lg text-white opacity-90 leading-relaxed max-w-4xl mx-auto">
      <p>
        We are dedicated to providing comprehensive sanitary facility solutions 
        for modern households. Our mission is to ensure clean, efficient, and 
        sustainable sanitary systems for every home.
      </p>
      <p>
        With years of experience in household management and sanitary engineering, 
        we understand the importance of maintaining proper sanitary facilities 
        for health, comfort, and quality of life.
      </p>
      <p>
        Our approach combines traditional expertise with modern technology to 
        deliver solutions that are both practical and innovative.
      </p>
    </div>
  );

  return (
    <Layout>
      <Navigation showBackButton={true} />
      <Hero
        title="WHO WE ARE"
        subtitle="Learn about our mission and expertise in sanitary facilities management"
      >
        {content}
      </Hero>
    </Layout>
  );
};

export default WhoWeAre;
