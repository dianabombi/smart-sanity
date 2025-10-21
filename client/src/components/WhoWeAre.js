import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';
import ApiService from '../services/api';

const WhoWeAre = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ebkLogo, setEbkLogo] = useState('/ebk-logo.svg');
  const [logoKey, setLogoKey] = useState(Date.now()); // Force re-render
  const [partnershipText, setPartnershipText] = useState('Partnersky spolupracujeme s interiérovým štúdiom');
  
  // Background slideshow state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = [
    '/photos/FRE218_1.jpg',
    '/photos/FRE218_2.jpg'
  ];

  useEffect(() => {
    loadContent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Background slideshow rotation
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(slideInterval);
  }, [backgroundImages.length]);

  // Check for logo updates only (removed content polling)
  useEffect(() => {
    const interval = setInterval(async () => {
      // Check for logo updates from Supabase database
      try {
        const brandsResult = await ApiService.getBrands();
        if (brandsResult.success && brandsResult.brands) {
          const ebkBrand = brandsResult.brands.find(brand => 
            brand.name.includes('Elite Bath + Kitchen') || brand.name.includes('EB+K')
          );
          if (ebkBrand && ebkBrand.logo && ebkBrand.logo !== ebkLogo) {
            console.log('🔄 EB+K logo updated in database, refreshing...');
            setEbkLogo(ebkBrand.logo);
            setLogoKey(Date.now()); // Force re-render
          }
        }
      } catch (error) {
        console.log('⚠️ Logo update check failed');
      }
    }, 30000); // Check every 30 seconds (less frequent)

    return () => clearInterval(interval);
  }, [ebkLogo]);

  const loadContent = async () => {
    try {
      // Load all data first, then set state once
      let logoData = '/ebk-logo.svg';
      let partnershipData = 'Partnersky spolupracujeme s interiérovým štúdiom';
      let contentData = {
        mainContent: ["Načítavam obsah..."],
        partnershipContent: ""
      };

      // Load logo
      try {
        const brandsResult = await ApiService.getBrands();
        if (brandsResult.success && brandsResult.brands) {
          const ebkBrand = brandsResult.brands.find(brand => 
            brand.name.includes('Elite Bath + Kitchen') || brand.name.includes('EB+K')
          );
          if (ebkBrand && ebkBrand.logo) {
            logoData = ebkBrand.logo;
          }
        }
      } catch (error) {
        console.log('Logo loading failed, using default');
      }

      // Load partnership text
      try {
        const partnershipResult = await ApiService.getPageContent('who-we-are', 'partnership', 'text');
        if (partnershipResult.success && partnershipResult.content) {
          partnershipData = partnershipResult.content;
        }
      } catch (error) {
        console.log('Partnership text loading failed, using default');
      }
      
      // Load main content
      try {
        const result = await ApiService.getWhoWeAreSections();
        
        if (result.success && result.sections && result.sections.length > 0) {
          const mainContent = result.sections
            .filter(section => section.size === 'large')
            .sort((a, b) => a.order - b.order)
            .map(section => section.content);
          
          const partnershipSection = result.sections.find(section => section.size === 'small');
          
          contentData = {
            mainContent: mainContent.length > 0 ? mainContent : [result.sections[0].content],
            partnershipContent: partnershipSection ? partnershipSection.content : ""
          };
        } else {
          contentData = {
            mainContent: ["Obsah nie je k dispozícii. Prosím, nastavte obsah v admin paneli."],
            partnershipContent: ""
          };
        }
      } catch (apiError) {
        console.log('Content loading failed:', apiError.message);
        contentData = {
          mainContent: ["Chyba pri načítavaní obsahu. Prosím, skontrolujte pripojenie."],
          partnershipContent: ""
        };
      }
      
      // Set all state at once to prevent flickering
      setEbkLogo(logoData);
      setPartnershipText(partnershipData);
      setContent(contentData);
      setLoading(false);
      
    } catch (error) {
      console.error('Error loading content:', error);
      setContent({
        mainContent: ["Chyba pri načítavaní obsahu. Prosím, obnovte stránku."],
        partnershipContent: ""
      });
      setLoading(false);
    }
  };

  if (loading || !content) {
    return (
      <Layout>
        <NavBar />
        <div className="pt-8 pb-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
              Smart Sanit s.r.o.
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2  mx-auto mb-4"></div>
            <p className="text-white">Načítavam obsah...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const contentSection = (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Side by Side Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch justify-center">
        {/* Combined Main Content */}
        <div className="flex justify-center">
          <div className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 transition-all duration-500 opacity-100 w-full h-full flex flex-col justify-center">
            <div className="space-y-6">
              {content?.mainContent?.map((text, index) => (
                <div 
                  key={index} 
                  className="text-lg leading-relaxed text-gray-300"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Partnership Section - Side by Side */}
        <div className="flex justify-center">
        <div className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 transition-all duration-500 w-full h-full opacity-100 flex flex-col justify-center">
          <div className="flex flex-col items-center space-y-6">
            <p className="text-lg leading-relaxed text-gray-300 text-center">
              {partnershipText}
            </p>
            
            {/* Elite Bath + Kitchen Partnership */}
            <div className="flex flex-col items-center space-y-4">
              {/* Logo Container */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <img 
                  key={logoKey}
                  src="/elite_logoRGB-11.jpg" 
                  alt="Elite Bath + Kitchen"
                  className="h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
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
                  
                </h3>
                <p className="text-gray-300 text-sm">
                  
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Background Slideshow */}
      <div className="fixed inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-30' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <NavBar />
      
      {/* Header Section */}
      <div className="pt-8 pb-4 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
            Smart Sanit s.r.o.
          </h1>
        </div>
      </div>
      
      <div className="bg-black/20 flex items-center justify-center py-8 min-h-[60vh] relative z-10">
        {contentSection}
      </div>
    </Layout>
  );
};

export default WhoWeAre;
