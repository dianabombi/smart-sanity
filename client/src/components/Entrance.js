import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';

const Entrance = () => {
  const [visibleItems, setVisibleItems] = useState([]);

  // Animation for bullet points
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleItems([0, 1, 2, 3, 4, 5]);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <NavBar />
      
      {/* Header Section */}
      <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
            Čo ponúkame
          </h1>
        </div>
      </div>
      
      {/* Services Cards Section */}
      <div className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {[
              "Obchodujeme popredných svetových výrobcov v oblasti vybavenia kúpeľní, obkladov a dlažieb",
              "Podľa vašich požiadaviek vám vyskladáme kúpeľne z konkrétnych produktov od A po Z",
              "Spracujeme vám alternatívne riešenia s rôznymi cenovými hladinami",
              "Vyskladáme vám náročné sprchové, či vaňové zostavy batérií",
              "Zabezpečíme vám technickú podporu ku všetkým ponúkaným produktom",
              "Ponúkame vám dlhodobú spoluprácu založenú na odbornosti, spoľahlivosti a férovom prístupe"
            ].map((text, index) => (
              <div
                key={index}
                className={`group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 transform ${
                  visibleItems.includes(index) 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-8 opacity-0 scale-95'
                } hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="space-y-3">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Grid - Empty space for now */}
      <div className="pb-24 px-8 sm:px-12 lg:px-16 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Category tiles removed - empty space ready for new content */}
        </div>
      </div>
    </Layout>
  );
};

export default Entrance;
