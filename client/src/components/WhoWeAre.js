import React, { useState, useEffect } from 'react';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ApiService from '../services/api';

const WhoWeAre = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ebkLogo, setEbkLogo] = useState('/ebk-logo.svg');
  const [logoKey, setLogoKey] = useState(Date.now()); // Force re-render
  const [partnerLogos, setPartnerLogos] = useState([]);
  
  // Background slideshow state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [backgroundImages, setBackgroundImages] = useState([
    '/photos/FRE218_1.jpg',
    '/photos/FRE218_2.jpg'
  ]); // Default fallback images
  const [backgroundSettings, setBackgroundSettings] = useState(null);

  useEffect(() => {
    loadContent();
    loadBackgroundSettings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadBackgroundSettings = async () => {
    try {
      console.log('🔄 Loading WhoWeAre background settings...');
      
      // Try to load from database first
      try {
        const result = await ApiService.getPageContent('who-we-are', 'background', 'settings');
        if (result.success && result.content) {
          const dbSettings = JSON.parse(result.content);
          console.log('✅ Loaded background settings from database');
          setBackgroundSettings(dbSettings);
          
          // Update background images if available
          if (dbSettings.whoWeAreBackgroundImages && dbSettings.whoWeAreBackgroundImages.length > 0) {
            const imageUrls = dbSettings.whoWeAreBackgroundImages
              .sort((a, b) => a.order - b.order)
              .map(img => img.dataUrl);
            setBackgroundImages(imageUrls);
          }
          return;
        }
      } catch (dbError) {
        console.log('⚠️ Database load failed, trying localStorage:', dbError);
      }
      
      // Fallback to localStorage
      const saved = localStorage.getItem('whoWeAreBackgroundSettings');
      if (saved) {
        const settings = JSON.parse(saved);
        console.log('✅ Loaded background settings from localStorage');
        setBackgroundSettings(settings);
        
        // Update background images if available
        if (settings.whoWeAreBackgroundImages && settings.whoWeAreBackgroundImages.length > 0) {
          const imageUrls = settings.whoWeAreBackgroundImages
            .sort((a, b) => a.order - b.order)
            .map(img => img.dataUrl);
          setBackgroundImages(imageUrls);
        }
      } else {
        console.log('ℹ️ No background settings found, using defaults');
      }
    } catch (error) {
      console.error('❌ Error loading WhoWeAre background settings:', error);
    }
  };

  // Background slideshow rotation
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(slideInterval);
  }, [backgroundImages.length]);

  // Check for updates (logos and background settings)
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

      // Check for background settings updates
      try {
        const result = await ApiService.getPageContent('who-we-are', 'background', 'settings');
        if (result.success && result.content) {
          const dbSettings = JSON.parse(result.content);
          
          // Check if settings have changed
          const currentSettingsString = JSON.stringify(backgroundSettings);
          const newSettingsString = JSON.stringify(dbSettings);
          
          if (currentSettingsString !== newSettingsString) {
            console.log('🔄 Background settings updated, refreshing...');
            setBackgroundSettings(dbSettings);
            
            // Update background images if available
            if (dbSettings.whoWeAreBackgroundImages && dbSettings.whoWeAreBackgroundImages.length > 0) {
              const imageUrls = dbSettings.whoWeAreBackgroundImages
                .sort((a, b) => a.order - b.order)
                .map(img => img.dataUrl);
              setBackgroundImages(imageUrls);
            }
          }
        }
      } catch (error) {
        console.log('⚠️ Background settings update check failed');
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [ebkLogo, backgroundSettings]);

  // Format content for display (convert markdown-style to HTML)
  const formatContentForDisplay = (content) => {
    if (!content) return '';
    
    // Split by double line breaks first to handle paragraphs
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map(paragraph => {
      // Apply text formatting to each paragraph
      let formatted = paragraph
        // Convert **bold** to <strong>
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Convert *italic* to <em>
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Handle HTML formatting tags
        .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
        .replace(/<s>(.*?)<\/s>/g, '<s>$1</s>')
        .replace(/<h1>(.*?)<\/h1>/g, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
        .replace(/<h2>(.*?)<\/h2>/g, '<h2 class="text-2xl font-semibold mb-3">$1</h2>')
        .replace(/<h3>(.*?)<\/h3>/g, '<h3 class="text-xl font-medium mb-2">$1</h3>')
        // Convert single line breaks to <br>
        .replace(/\n/g, '<br>');
      
      // Handle bullet points (convert to list)
      if (formatted.includes('• ')) {
        const items = formatted.split('<br>').filter(line => line.trim());
        const listItems = items
          .map(item => item.trim().replace(/^• /, ''))
          .map(item => `<li>${item}</li>`)
          .join('');
        return `<ul class="list-disc list-inside space-y-1 my-4">${listItems}</ul>`;
      }
      
      // Handle numbered lists
      if (/^\d+\./.test(formatted)) {
        const items = formatted.split('<br>').filter(line => line.trim());
        const listItems = items
          .map(item => item.trim().replace(/^\d+\.\s*/, ''))
          .map(item => `<li>${item}</li>`)
          .join('');
        return `<ol class="list-decimal list-inside space-y-1 my-4">${listItems}</ol>`;
      }
      
      // Handle alignment tags
      if (formatted.includes('<center>')) {
        formatted = formatted.replace(/<center>(.*?)<\/center>/g, '<div class="text-center">$1</div>');
        return formatted;
      }
      if (formatted.includes('<left>')) {
        formatted = formatted.replace(/<left>(.*?)<\/left>/g, '<div class="text-left">$1</div>');
        return formatted;
      }
      if (formatted.includes('<right>')) {
        formatted = formatted.replace(/<right>(.*?)<\/right>/g, '<div class="text-right">$1</div>');
        return formatted;
      }
      
      // Handle headings (don't wrap in <p>)
      if (formatted.startsWith('<h1') || formatted.startsWith('<h2') || formatted.startsWith('<h3')) {
        return formatted;
      }
      
      // Regular paragraph
      return `<p class="mb-4">${formatted}</p>`;
    }).join('');
  };

  const loadContent = async () => {
    try {
      // Load all data in PARALLEL for faster loading
      const [brandsResult, contentResult, logosResult] = await Promise.all([
        ApiService.getBrands().catch(err => ({ success: false, error: err })),
        ApiService.getWhoWeAreSections().catch(err => ({ success: false, error: err })),
        ApiService.getPartnerLogos().catch(err => ({ success: false, error: err }))
      ]);

      // Process logo
      let logoData = '/ebk-logo.svg';
      if (brandsResult.success && brandsResult.brands) {
        const ebkBrand = brandsResult.brands.find(brand => 
          brand.name.includes('Elite Bath + Kitchen') || brand.name.includes('EB+K')
        );
        if (ebkBrand && ebkBrand.logo) {
          logoData = ebkBrand.logo;
        }
      }
      
      // Process main content
      let contentData = {
        mainContent: ["Načítavam obsah..."],
        partnershipContent: ""
      };
      
      if (contentResult.success && contentResult.sections && contentResult.sections.length > 0) {
        const mainContent = contentResult.sections
          .filter(section => section.size === 'large')
          .sort((a, b) => a.order - b.order)
          .map(section => formatContentForDisplay(section.content)); // Apply formatting
        
        const partnershipSection = contentResult.sections.find(section => section.size === 'small');
        
        contentData = {
          mainContent: mainContent.length > 0 ? mainContent : [formatContentForDisplay(contentResult.sections[0].content)],
          partnershipContent: partnershipSection ? partnershipSection.content : ""
        };
      } else {
        contentData = {
          mainContent: ["Obsah nie je k dispozícii. Prosím, nastavte obsah v admin paneli."],
          partnershipContent: ""
        };
      }
      
      // Process partner logos
      let logosData = [];
      if (logosResult && logosResult.success && logosResult.logos) {
        logosData = logosResult.logos;
      }
      
      // Set all state at once to prevent flickering
      setEbkLogo(logoData);
      setContent(contentData);
      setPartnerLogos(logosData);
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
      <div className="min-h-screen bg-black relative flex flex-col">
        {/* Background for skeleton */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-50"></div>
        </div>
        
        <div className="relative flex-1 flex flex-col">
          <NavBar />
          
          {/* Header Skeleton */}
          <div className="pb-2 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              <div className="mt-36 mb-2 h-12 md:h-14 w-80 mx-auto bg-gray-700/30 rounded-lg animate-pulse"></div>
            </div>
          </div>
          
          {/* Content Skeleton */}
          <div className="flex items-center justify-center pt-8 pb-32 flex-1 relative z-10">
            <div className="w-full px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch justify-center">
                {/* Left Card Skeleton */}
                <div className="flex justify-center">
                  <div className="rounded-lg p-8 py-20 w-full h-full bg-black/80 border border-gray-600/50">
                    <div className="space-y-4 animate-pulse">
                      <div className="h-4 bg-gray-700/40 rounded w-full"></div>
                      <div className="h-4 bg-gray-700/40 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-700/40 rounded w-full"></div>
                      <div className="h-4 bg-gray-700/40 rounded w-4/5"></div>
                      <div className="h-4 bg-gray-700/40 rounded w-full"></div>
                      <div className="h-4 bg-gray-700/40 rounded w-3/4"></div>
                      <div className="mt-6 h-4 bg-gray-700/40 rounded w-full"></div>
                      <div className="h-4 bg-gray-700/40 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-700/40 rounded w-full"></div>
                    </div>
                  </div>
                </div>

                {/* Right Card Skeleton */}
                <div className="flex justify-center">
                  <div className="rounded-lg p-8 py-20 w-full h-full bg-black/80 border border-gray-600/50">
                    <div className="flex flex-col items-center space-y-12 animate-pulse">
                      {/* Text skeleton */}
                      <div className="space-y-3 w-full">
                        <div className="h-4 bg-gray-700/40 rounded w-3/4 mx-auto"></div>
                        <div className="h-4 bg-gray-700/40 rounded w-2/3 mx-auto"></div>
                      </div>
                      {/* Logo skeleton */}
                      <div className="bg-gray-700/20 rounded-lg p-4 border border-gray-600/30">
                        <div className="h-20 w-48 bg-gray-700/40 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const contentSection = (
    <div className="w-full px-4">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-8 text-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
        O nás
      </h1>
      
      {/* Side by Side Layout - Full Width */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch justify-center">
        {/* Combined Main Content */}
        <div className="flex justify-center">
          <div className="group rounded-lg transition-all duration-500 w-full h-full flex flex-col justify-start bg-black/30 border-gray-600" style={{ borderWidth: '0.5px', padding: '1rem' }}>
            <div className="flex flex-col justify-start items-center space-y-10">
              {/* Smart Sanit s.r.o. title */}
              <h2 className="text-3xl font-bold text-gray-300 text-center pt-6">
                Smart Sanit s.r.o.
              </h2>
              <div className="space-y-6 px-8 pb-6 w-full">
                {content?.mainContent?.map((text, index) => (
                  <div 
                    key={index} 
                    className="text-lg leading-relaxed text-gray-300 text-justify"
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Section - Side by Side */}
        <div className="flex justify-center">
        <div className="group rounded-lg transition-all duration-500 w-full h-full flex flex-col justify-start bg-black/30 border-gray-600" style={{ borderWidth: '0.5px', padding: '1rem' }}>
          <div className="space-y-6">
            {/* Partnership text above logo */}
            <div className="flex flex-col justify-center items-center space-y-8">
              {/* Naši partneri title */}
              <h2 className="text-3xl font-bold text-gray-300 text-center pt-6">
                Naši partneri
              </h2>
              
              {/* Logos Container */}
              <div className="flex justify-center w-full pb-6">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', maxWidth: '500px', width: '100%', justifyItems: 'center' }}>
                  {partnerLogos.length > 0 ? (
                    partnerLogos.map((logo) => (
                      <div key={logo.id} className="rounded-lg p-1 transition-all duration-300" style={{ height: '90px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img 
                          src={logo.logo} 
                          alt={logo.name}
                          style={{ height: '80px', width: 'auto', objectFit: 'contain', mixBlendMode: 'screen' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <div className="text-white font-semibold text-center hidden">
                          {logo.name}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-lg p-1 transition-all duration-300" style={{ height: '90px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img 
                        key={logoKey}
                        src="/elite_logoRGB-11.jpg" 
                        alt="Elite Bath + Kitchen"
                        style={{ height: '80px', width: 'auto', objectFit: 'contain', mixBlendMode: 'screen' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div className="text-white font-semibold text-center hidden">
                        Elite Bath + Kitchen
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Contact Button */}
      <div className="flex justify-center mt-16 mb-4">
        <button
          onClick={() => window.location.href = '/contact'}
          className="py-2 px-4 border border-gray-400 text-gray-300 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-black/30 text-sm w-full max-w-xs"
        >
          Kontaktujte nás
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black relative flex flex-col">
      {/* Background Slideshow - covers entire viewport */}
      <div className="fixed inset-0 z-0">
          {backgroundImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-30' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: backgroundSettings?.backgroundImageSize || 'cover',
                backgroundPosition: `${backgroundSettings?.backgroundImagePositionX || 'center'} ${backgroundSettings?.backgroundImagePositionY || 'center'}`,
                backgroundRepeat: 'no-repeat',
                filter: backgroundSettings?.backgroundImageBlur ? `blur(${backgroundSettings.backgroundImageBlur}px)` : 'none',
                opacity: index === currentImageIndex ? (backgroundSettings?.backgroundImageOpacity || 0.3) : 0
              }}
            />
          ))}
        {/* Dark overlay removed per user request */}
      </div>
      
      {/* Main content area */}
      <div className="relative flex-1 flex flex-col">
        <NavBar />
        
        <div className="flex items-center justify-center pt-32 pb-16 flex-1 relative z-10">
          {contentSection}
        </div>
      </div>
      
      {/* Footer at bottom */}
      <div className="relative z-10 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default WhoWeAre;
