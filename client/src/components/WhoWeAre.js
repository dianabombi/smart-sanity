import React from 'react';
import Layout from './layout/Layout';
// import Hero from './ui/Hero';
import Breadcrumbs from './ui/Breadcrumbs';
import NavBar from './layout/NavBar';

const WhoWeAre = () => {
  const content = (
    <div className="w-full max-w-6xl mx-auto px-4">

      {/* Content Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20">
          <p className="text-lg leading-relaxed text-gray-400 text-center">
            Spoločnosť Smart Sanit s.r.o. vznikla v roku 2024 ako obchodná spoločnosť, ktorej hlavnou náplňou je 
            ponuka dizajnových produktov v oblasti obkladov, dlažieb a kompletného vybavenia kúpeľní.
          </p>
        </div>
        
        <div className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20">
          <p className="text-lg leading-relaxed text-gray-400 text-center">
            Ako milovníci dizajnu sledujeme najnovšie trendy v danej oblasti. S nami sa dotknete krásy a pocítite 
            emóciu dizajnu na vlastnej koži.
          </p>
        </div>
        
        <div className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20">
          <p className="text-lg leading-relaxed text-gray-400 text-center">
            Našim klientom ponúkame moderné, funkčné a na mieru šité riešenia, ktoré svojím budúcim 
            užívateľom prinášajú každodenný pocit komfortu, pohody a spoľahlivosti.
          </p>
        </div>
        
        <div className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20">
          <p className="text-lg leading-relaxed text-gray-400 text-center">
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
