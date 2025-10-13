import React from 'react';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';

const WhoWeAre = () => {
  const content = (
    <div className="w-full max-w-6xl mx-auto px-4 space-y-8">

      {/* Main Content - Single Card */}
      <div className="flex justify-center">
        <div className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 max-w-4xl">
          <div className="text-lg leading-relaxed text-gray-400 text-center space-y-6">
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
          </div>
        </div>
      </div>

      {/* Partnership Section - Separate Card */}
      <div className="flex justify-center">
        <div className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 max-w-md">
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
      
      <div className="bg-black flex items-center justify-center py-16 min-h-[40vh]">
        {content}
      </div>
    </Layout>
  );
};

export default WhoWeAre;
