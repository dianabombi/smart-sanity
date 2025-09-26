import React from 'react';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';

const AboutUs = () => {
  return (
    <Layout>
      <NavBar />
      
      {/* Empty content area ready for new content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* New content will be added here */}
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
