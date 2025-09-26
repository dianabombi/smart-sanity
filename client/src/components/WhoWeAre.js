import React from 'react';
import Layout from './layout/Layout';
import Hero from './ui/Hero';
import Breadcrumbs from './ui/Breadcrumbs';
import NavBar from './layout/NavBar';

const WhoWeAre = () => {
  const content = (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Will be replaced by text from Client */}
      <div className="flex flex-col justify-center lg:justify-start space-y-6">
      </div>
    </div>
  );

  return (
    <Layout>
      <NavBar />
      {/* Breadcrumbs */}
      <div className="pt-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>
      
      <div className="bg-black flex items-center justify-center py-16 min-h-[40vh]">
        {content}
      </div>
    </Layout>
  );
};

export default WhoWeAre;
