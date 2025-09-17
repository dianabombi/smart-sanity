import React from 'react';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';

const AboutUs = () => {
  return (
    <Layout>
      <NavBar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            O nás
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Smart Sanity je váš spoľahlivý partner v oblasti sanitárnych zariadení a riešení pre moderné domácnosti a komerčné priestory.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            
            {/* Company Story */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">
                Naša história
              </h2>
              <p className="text-white/80 leading-relaxed">
                Smart Sanity bola založená s víziou priniesť inovatívne a kvalitné sanitárne riešenia na slovenský trh. 
                S viac ako 15-ročnými skúsenosťami v odbore sme sa etablovali ako jeden z vedúcich dodávateľov 
                sanitárnej techniky a zariadení.
              </p>
              <p className="text-white/80 leading-relaxed">
                Naša spoločnosť sa špecializuje na komplexné riešenia pre kúpeľne, kuchyne a všetky typy sanitárnych 
                priestorov. Spolupracujeme s renomovanými svetovými značkami a poskytujeme našim zákazníkom 
                najnovšie trendy a technológie v oblasti sanitárnej techniky.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Naše hodnoty</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-semibold">Kvalita</h4>
                    <p className="text-white/70 text-sm">Ponúkame len overené produkty od renomovaných výrobcov</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-semibold">Inovácia</h4>
                    <p className="text-white/70 text-sm">Sledujeme najnovšie trendy a technológie v sanitárnom priemysle</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-semibold">Servis</h4>
                    <p className="text-white/70 text-sm">Poskytujeme komplexný servis od návrhu po inštaláciu</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-semibold">Spoľahlivosť</h4>
                    <p className="text-white/70 text-sm">Dlhodobé partnerstvá založené na dôvere a profesionalite</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Naše služby
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-white mb-3">Domácnosti</h3>
                <p className="text-white/70">Kompletné riešenia pre kúpeľne, kuchyne a všetky sanitárne priestory v domácnostiach</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-xl font-semibold text-white mb-3">Komerčné projekty</h3>
                <p className="text-white/70">Profesionálne riešenia pre hotely, reštaurácie, kancelárie a iné komerčné priestory</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-xl font-semibold text-white mb-3">Servis a údržba</h3>
                <p className="text-white/70">Odborný servis, údržba a poradenstvo pre všetky typy sanitárnych zariadení</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Náš tím
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto leading-relaxed">
              Náš tím tvoria skúsení odborníci s dlhoročnými skúsenosťami v sanitárnom priemysle. 
              Každý člen nášho tímu je odborník vo svojej oblasti a je pripravený poskytnúť vám 
              profesionálne poradenstvo a kvalitné služby.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
