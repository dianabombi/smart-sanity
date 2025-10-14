import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';
import ApiService from '../services/api';
import EmergencyBrands from '../services/emergencyBrands';

const WhoWeAre = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [ebkLogo, setEbkLogo] = useState('/ebk-logo.svg');
  const [logoKey, setLogoKey] = useState(Date.now()); // Force re-render

  useEffect(() => {
    loadContent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Check for logo and content updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      // CRITICAL FIX: Check for logo updates from Supabase database
      try {
        const brandsResult = await ApiService.getBrands();
        if (brandsResult.success && brandsResult.brands) {
          const ebkBrand = brandsResult.brands.find(brand => 
            brand.name.includes('Elite Bath + Kitchen') || brand.name.includes('EB+K')
          );
          if (ebkBrand && ebkBrand.logo && ebkBrand.logo !== ebkLogo) {
            console.log('🔄 CRITICAL: EB+K logo updated in database, refreshing...');
            setEbkLogo(ebkBrand.logo);
            setLogoKey(Date.now()); // Force re-render
          }
        }
      } catch (error) {
        console.log('⚠️ Logo update check failed, trying localStorage fallback');
        // Fallback to localStorage check only if database fails
        const brandsResult = EmergencyBrands.getBrands();
        if (brandsResult.success) {
          const ebkBrand = brandsResult.brands.find(brand => 
            brand.name.includes('Elite Bath + Kitchen') || brand.name.includes('EB+K')
          );
          if (ebkBrand && ebkBrand.logo && ebkBrand.logo !== ebkLogo) {
            console.log('🔄 WhoWeAre: EB+K logo updated in localStorage, refreshing...');
            setEbkLogo(ebkBrand.logo);
            setLogoKey(Date.now()); // Force re-render
          }
        }
      }

      // Check for content updates from localStorage (emergency system)
      try {
        const localSections = localStorage.getItem('adminWhoWeAreSections');
        if (localSections) {
          const sections = JSON.parse(localSections);
          const mainSections = sections.filter(section => section.title !== 'Partnerstvo');
          const partnershipSection = sections.find(section => section.title === 'Partnerstvo');
          
          const newContent = {
            mainContent: mainSections.map(section => section.content),
            partnershipContent: partnershipSection ? partnershipSection.content : content?.partnershipContent
          };
          
          // Check if content has changed
          const contentChanged = JSON.stringify(newContent) !== JSON.stringify(content);
          if (contentChanged) {
            console.log('🔄 WhoWeAre: Content updated from localStorage, refreshing...');
            setContent(newContent);
          }
        } else {
          // Fallback to API if localStorage is empty
          const result = await ApiService.getWhoWeAreSections();
          if (result.success && result.sections) {
            const mainSections = result.sections.filter(section => section.title !== 'Partnerstvo');
            const partnershipSection = result.sections.find(section => section.title === 'Partnerstvo');
            
            const newContent = {
              mainContent: mainSections.map(section => section.content),
              partnershipContent: partnershipSection ? partnershipSection.content : content?.partnershipContent
            };
            
            const contentChanged = JSON.stringify(newContent) !== JSON.stringify(content);
            if (contentChanged) {
              console.log('🔄 WhoWeAre: Content updated from API, refreshing...');
              setContent(newContent);
            }
          }
        }
      } catch (error) {
        console.log('Content update check failed:', error);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [ebkLogo, content]);

  const loadContent = async () => {
    try {
      setLoading(true);
      
      // CRITICAL FIX: Get EB+K logo from Supabase database (not localStorage)
      try {
        console.log('🚨 CRITICAL: Loading EB+K logo from Supabase database...');
        const brandsResult = await ApiService.getBrands();
        if (brandsResult.success && brandsResult.brands) {
          const ebkBrand = brandsResult.brands.find(brand => 
            brand.name.includes('Elite Bath + Kitchen') || brand.name.includes('EB+K')
          );
          if (ebkBrand && ebkBrand.logo) {
            console.log('✅ CRITICAL: Found EB+K logo in database:', ebkBrand.logo.substring(0, 50) + '...');
            setEbkLogo(ebkBrand.logo);
          } else {
            console.log('⚠️ CRITICAL: No EB+K logo found in database');
          }
        } else {
          console.log('⚠️ CRITICAL: Failed to load brands from database');
        }
      } catch (error) {
        console.error('🚨 CRITICAL: Database error loading EB+K logo:', error);
        // Fallback to emergency brands only if database fails
        const brandsResult = EmergencyBrands.getBrands();
        if (brandsResult.success) {
          const ebkBrand = brandsResult.brands.find(brand => 
            brand.name.includes('Elite Bath + Kitchen') || brand.name.includes('EB+K')
          );
          if (ebkBrand && ebkBrand.logo) {
            setEbkLogo(ebkBrand.logo);
          }
        }
      }
      
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
          <div className="flex flex-col items-center space-y-6">
            <p className="text-lg leading-relaxed text-gray-300 text-center">
              {content?.partnershipContent}
            </p>
            
            {/* Elite Bath + Kitchen Partnership */}
            <div className="flex flex-col items-center space-y-4">
              {/* Logo Container */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <img 
                  key={logoKey}
                  src={ebkLogo} 
                  alt="Elite Bath + Kitchen (EB+K)"
                  className="h-16 w-auto object-contain filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-white font-semibold text-center hidden">
                  Elite Bath + Kitchen
                </div>
              </div>
              
              {/* Full Brand Name */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Elite Bath + Kitchen (EB+K)
                </h3>
                <p className="text-gray-400 text-sm">
                  Dizajnové štúdio pre kúpeľne a kuchyne
                </p>
              </div>
            </div>
          </div>
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
