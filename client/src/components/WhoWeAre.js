import React from 'react';
import Layout from './layout/Layout';
import Hero from './ui/Hero';
import Breadcrumbs from './ui/Breadcrumbs';
import NavBar from './layout/NavBar';

const WhoWeAre = () => {
  const content = (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-col justify-center lg:justify-start space-y-6">
        
        <div className="text-white space-y-6 text-lg leading-relaxed">
          <p>
            Spoločnosť Smart Sanit s.r.o. vznikla v roku 2024 ako obchodná spoločnosť, ktorej hlavnou náplňou je 
            ponuka dizajnových produktov v oblasti obkladov, dlažieb a kompletného vybavenia kúpeľní.
          </p>
          
          <p>
            Ako milovníci dizajnu sledujeme najnovšie trendy v danej oblasti. S nami sa dotknete krásy a pocítite 
            emóciu dizajnu na vlastnej koži.
          </p>
          
          <p>
            Našim klientom ponúkame moderné, funkčné a na mieru šité riešenia, ktoré svojím budúcim 
            užívateľom prinášajú každodenný pocit komfortu, pohody a spoľahlivosti.
          </p>
          
          <p>
            Partnersky spolupracujeme so štúdiom EB+K.
          </p>
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
      
      <div className="bg-black flex items-center justify-center py-16 min-h-[40vh]">
        {content}
      </div>
    </Layout>
  );
};

export default WhoWeAre;
