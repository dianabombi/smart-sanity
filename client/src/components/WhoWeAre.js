import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';
import ApiService from '../services/api';

const WhoWeAre = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      
      // Load fallback content immediately for fast display
      const fallbackContent = getDefaultContent();
      setContent(fallbackContent);
      setLoading(false);
      
      // Start animation after content is loaded
      setTimeout(() => {
        setVisible(true);
      }, 400);
      
      // Try to load from API with timeout in background
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('API timeout')), 2000)
      );
      
      try {
        const result = await Promise.race([
          ApiService.getWhoWeAreSections(),
          timeoutPromise
        ]);
        
        if (result.success && result.sections && result.sections.length > 0) {
          // Convert sections to content format
          const mainContent = result.sections
            .filter(section => section.size === 'large')
            .sort((a, b) => a.order - b.order)
            .map(section => section.content);
          
          const partnershipSection = result.sections.find(section => section.size === 'small');
          
          setContent({
            mainContent: mainContent.length > 0 ? mainContent : fallbackContent.mainContent,
            partnershipContent: partnershipSection ? partnershipSection.content : fallbackContent.partnershipContent
          });
        }
      } catch (apiError) {
        console.log('API failed or timed out, keeping fallback content:', apiError.message);
      }
      
    } catch (error) {
      console.error('Error loading content:', error);
      setContent(getDefaultContent());
      setLoading(false);
      setTimeout(() => {
        setVisible(true);
      }, 400);
    }
  };

  const getDefaultContent = () => ({
    mainContent: [
      "Spoločnosť Smart Sanit s.r.o. vznikla v roku 2024 ako obchodná spoločnosť, ktorej hlavnou náplňou je ponuka dizajnových produktov v oblasti obkladov, dlažieb a kompletného vybavenia kúpeľní.",
      "Ako milovníci dizajnu sledujeme najnovšie trendy v danej oblasti. S nami sa dotknete krásy a pocítite emóciu dizajnu na vlastnej koži.",
      "Našim klientom ponúkame moderné, funkčné a na mieru šité riešenia, ktoré svojím budúcim užívateľom prinášajú každodenný pocit komfortu, pohody a spoľahlivosti."
    ],
    partnershipContent: "Partnersky spolupracujeme so štúdiom EB+K."
  });

  if (loading) {
    return (
      <Layout>
        <NavBar />
        <div className="pt-8 pb-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-400 mb-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
              Smart Sanit s.r.o.
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-white">Načítavam obsah...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const contentSection = (
    <div className="w-full max-w-6xl mx-auto px-4 space-y-8">
      {/* Main Content - Single Card with Animation */}
      <div className="flex justify-center">
        <div className={`group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 max-w-4xl ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          transition: 'all 0.8s ease-out',
          transitionDelay: '0.2s'
        }}>
          <div className="text-lg leading-relaxed text-gray-300 text-center space-y-6">
            {content?.mainContent?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Partnership Section - Separate Card with Animation */}
      <div className="flex justify-center">
        <div className={`group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 max-w-md ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          transition: 'all 0.8s ease-out',
          transitionDelay: '0.6s'
        }}>
          <p className="text-lg leading-relaxed text-gray-300 text-center">
            {content?.partnershipContent}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <NavBar />
      
      {/* Header Section */}
      <div className="pt-8 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-400 mb-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
            Smart Sanit s.r.o.
          </h1>
        </div>
      </div>
      
      <div className="bg-black flex items-center justify-center py-8 min-h-[40vh]">
        {contentSection}
      </div>
    </Layout>
  );
};

export default WhoWeAre;
