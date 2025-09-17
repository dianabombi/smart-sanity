import React from 'react';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';
import Breadcrumbs from './ui/Breadcrumbs';

const Contact = () => {
  return (
    <Layout>
      <NavBar />
      {/* Breadcrumbs */}
      <div className="pt-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>
      
      <div className="min-h-screen bg-black flex items-center justify-center py-16">
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="text-center space-y-8">
            {/* Logo Section */}
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <img 
                  src="/logo.png" 
                  alt="SMART SANITY Logo" 
                  className="h-32 w-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div 
                  className="text-black font-bold text-2xl tracking-wide text-center" 
                  style={{display: 'none'}}
                >
                  SMART SANITY
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 text-white">
              <h1 className="text-3xl md:text-4xl font-light text-white mb-8 tracking-wide">
                KONTAKT
              </h1>
              
              <div className="space-y-4 text-lg leading-relaxed">
                <p className="text-2xl font-light text-white">
                  Ing. Dušan Drinka, PhD.
                </p>
                
                <div className="space-y-3 text-xl opacity-90">
                  <p>
                    <span className="font-medium">M:</span> +421 948 882 376
                  </p>
                  <p>
                    <span className="font-medium">E:</span> dusan.drinka@smartsanit.sk
                  </p>
                  <p>
                    <span className="font-medium">A:</span> Továrenská 14, 811 09 Bratislava
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
