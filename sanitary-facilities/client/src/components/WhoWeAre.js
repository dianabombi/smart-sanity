import React from 'react';
import Layout from './layout/Layout';
import Hero from './ui/Hero';
import Breadcrumbs from './ui/Breadcrumbs';
import NavBar from './layout/NavBar';

const WhoWeAre = () => {
  const content = (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 min-h-[60vh] items-center">
        {/* Left Side - Logo */}
        <div className="flex justify-center lg:justify-end">
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
        
        {/* Right Side - Text */}
        <div className="flex flex-col justify-center lg:justify-start space-y-6">
          <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed text-center lg:text-left">
            Profesionálne riešenia sanitárnych zariadení pre domácnosti a údržbu
          </p>
          
          <div className="space-y-4 text-lg text-white opacity-90 leading-relaxed text-center lg:text-left">
            <p>
              Sme profesionálny tím venujúci sa poskytovaniu vysokokvalitných sanitárnych riešení 
              pre moderné domácnosti. Naša odbornosť pokrýva všetky aspekty dizajnu, inštalácie 
              a údržby kúpeľní a sanitárnych zariadení.
            </p>
            <p>
              S rokmi skúseností v správe domácností a sanitárnom inžinierstve 
              rozumieme důležitosti udržiavania správnych sanitárnych zariadení 
              pre zdravie, pohodlie a kvalitu života.
            </p>
            <p>
              Náš prístup kombinuje tradičnú odbornosť s modernou technológiou 
              na poskytovanie riešení, ktoré sú praktické aj inovatívne.
            </p>
          </div>
        </div>
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
      
      <div className="min-h-screen bg-black flex items-center justify-center py-16">
        {content}
      </div>
    </Layout>
  );
};

export default WhoWeAre;
