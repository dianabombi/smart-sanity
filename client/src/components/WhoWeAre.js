import React, { useState, useEffect } from 'react';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ApiService from '../services/api';

const WhoWeAre = () => {
  const [content, setContent] = useState(null);
  const [ebkLogo, setEbkLogo] = useState('/ebk-logo.svg');
  const [partnerLogos, setPartnerLogos] = useState(null); // null = not loaded yet, [] = loaded but empty
  const [logosLoading, setLogosLoading] = useState(true);
  const [logosCached, setLogosCached] = useState(false);
  
  // Page headers (editable in admin)
  const [pageTitle, setPageTitle] = useState('O nás');
  const [pageSubtitle, setPageSubtitle] = useState('Smart Sanit s.r.o.');
  
  // Background slideshow state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [backgroundImages, setBackgroundImages] = useState([
    // Placeholder - no default background until set in admin
  ]); // O nás background - configure in admin
  const [backgroundSettings, setBackgroundSettings] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    loadPageHeaders();
    loadContent();
    loadBackgroundSettings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Preload background images
  useEffect(() => {
    if (backgroundImages.length === 0) {
      setImagesLoaded(true);
      return;
    }

    setImagesLoaded(false);
    let loadedCount = 0;
    
    // Safety timeout - show content after 1.5 seconds even if images haven't loaded
    const timeoutId = setTimeout(() => {
      console.log('⏰ Background image loading timeout - showing content anyway');
      setImagesLoaded(true);
    }, 1500);

    backgroundImages.forEach((imageSrc) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === backgroundImages.length) {
          clearTimeout(timeoutId);
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.error('❌ Failed to load background image:', imageSrc.substring(0, 50));
        loadedCount++;
        if (loadedCount === backgroundImages.length) {
          clearTimeout(timeoutId);
          setImagesLoaded(true);
        }
      };
      img.src = imageSrc;
    });
    
    return () => clearTimeout(timeoutId);
  }, [backgroundImages]);

  const loadPageHeaders = async () => {
    try {
      const titleResult = await ApiService.getPageContent('who-we-are', 'page-headers', 'title');
      if (titleResult.success && titleResult.content) {
        setPageTitle(titleResult.content);
      }

      const subtitleResult = await ApiService.getPageContent('who-we-are', 'page-headers', 'subtitle');
      if (subtitleResult.success && subtitleResult.content) {
        setPageSubtitle(subtitleResult.content);
      }
    } catch (error) {
      console.log('Failed to load page headers, using defaults');
    }
  };

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
    // Only start slideshow if there are images
    if (backgroundImages.length === 0) return;
    
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
      // Check for logo updates from Supabase database (lightweight fetch)
      try {
        const brandsResult = await ApiService.getBrandsLight();
        if (brandsResult.success && brandsResult.brands) {
          const ebkBrand = brandsResult.brands.find(brand => 
            brand.name.includes('Elite Bath + Kitchen') || brand.name.includes('EB+K')
          );
          if (ebkBrand && ebkBrand.logo && ebkBrand.logo !== ebkLogo) {
            console.log('🔄 EB+K logo updated in database, refreshing...');
            setEbkLogo(ebkBrand.logo);
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
      // Load critical content FIRST - show page as soon as text is ready
      const contentResult = await ApiService.getWhoWeAreSections().catch(err => ({ success: false, error: err }));

      // Process main content
      let contentData = {
        mainContent: [],
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
      }

      // Show content immediately after it is processed
      setContent(contentData);

      // Load partner logos separately (optimized - don't load all brands)
      loadPartnerLogosOptimized();
      
    } catch (error) {
      console.error('Error loading content:', error);
      setContent({
        mainContent: ["Chyba pri načítavaní obsahu. Prosím, obnovte stránku."],
        partnershipContent: ""
      });
    }
  };

  const loadPartnerLogosOptimized = async () => {
    // Skip if already cached
    if (logosCached && partnerLogos !== null) {
      console.log('📦 Using cached partner logos');
      setLogosLoading(false);
      return;
    }

    try {
      setLogosLoading(true);
      console.log('🔄 Loading partner logos...');
      
      // Load partner logos (optimized query)
      const logosResult = await ApiService.getPartnerLogos().catch(err => ({ 
        success: false, 
        error: err 
      }));

      // Process partner logos
      let logosData = [];
      if (logosResult && logosResult.success && logosResult.logos) {
        logosData = logosResult.logos;
        console.log(`✅ Loaded ${logosData.length} partner logos`);
      } else {
        console.log('⚠️ No partner logos loaded');
      }

      setPartnerLogos(logosData);
      setLogosCached(true);
    } catch (error) {
      console.error('❌ Error loading partner logos:', error);
      setPartnerLogos([]);
    } finally {
      setLogosLoading(false);
    }
  };

  // Only render content section when data is loaded
  const contentSection = !content ? null : (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-8 mt-5 text-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
          {pageTitle}
        </h1>
        
        {/* Layout - stacked tiles on all screen sizes */}
        <div className="grid grid-cols-1 gap-6 items-stretch justify-center">
          {/* Combined Main Content */}
          <div className="flex justify-center">
            <div className="group rounded-lg transition-colors duration-500 w-full h-full flex flex-col justify-start bg-black/30 hover:bg-black/50 border-gray-600" style={{ borderWidth: '0.5px', padding: '0.85rem' }}>
              <div className="flex flex-col justify-start items-center space-y-8">
                {/* Company subtitle */}
                <h2 className="text-3xl font-bold text-gray-300 text-center pt-6">
                  {pageSubtitle}
                </h2>
                <div className="space-y-5 px-6 pb-5 w-full">
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

          {/* Partnership Section */}
          <div className="flex justify-center">
            <div className="group rounded-lg transition-colors duration-500 w-full h-full flex flex-col justify-start bg-black/30 hover:bg-black/50 border-gray-600" style={{ borderWidth: '0.5px', padding: '0.85rem' }}>
              <div className="space-y-6">
                <div className="flex flex-col justify-center items-center space-y-6">
                  <h2 className="text-3xl font-bold text-gray-300 text-center pt-6">
                    Naši partneri
                  </h2>
                  <div className="flex justify-center w-full pb-8">
                    {logosLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-gray-400 text-sm">Načítavam logá partnerov...</p>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', rowGap: '1rem', columnGap: '2rem', maxWidth: '900px', width: '100%', justifyItems: 'center' }}>
                        {partnerLogos && partnerLogos.length > 0 ? (
                          partnerLogos.map((logo, index) => (
                            <div 
                              key={logo.id} 
                              className="rounded-lg p-2 transition-all duration-300 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]" 
                              style={{ 
                                height: '110px', 
                                width: '100%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                animationDelay: `${index * 0.05}s`
                              }}
                            >
                              <img 
                                src={logo.logo} 
                                alt={logo.name}
                                style={{ height: '95px', width: 'auto', objectFit: 'contain', mixBlendMode: 'screen' }}
                                loading="lazy"
                                decoding="async"
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
                        ) : partnerLogos !== null ? (
                          <div className="col-span-4 text-gray-400 text-center py-8">
                            Žiadne logá partnerov
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => window.location.href = '/contact'}
            className="py-2 px-4 border border-gray-400 text-gray-300 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-black/30 text-sm w-full max-w-xs"
          >
            Kontaktujte nás
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black relative flex flex-col">
      {/* Background Slideshow - covers entire viewport */}
      <div className="fixed inset-0 z-0">
        {/* Background images - fade in when loaded */}
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex && imagesLoaded ? 'opacity-30' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: backgroundSettings?.backgroundImageSize || 'cover',
              backgroundPosition: `${backgroundSettings?.backgroundImagePositionX || 'center'} ${backgroundSettings?.backgroundImagePositionY || 'center'}`,
              backgroundRepeat: 'no-repeat',
              filter: backgroundSettings?.backgroundImageBlur ? `blur(${backgroundSettings.backgroundImageBlur}px)` : 'none',
              opacity: index === currentImageIndex && imagesLoaded ? (backgroundSettings?.backgroundImageOpacity || 0.3) : 0
            }}
          />
        ))}
      </div>
      
      {/* Main content area - always visible */}
      <div className="relative flex-1 flex flex-col">
        <NavBar />
        
        {/* Show content immediately, regardless of background loading state */}
        <div className="flex items-start justify-center pt-28 pb-12 flex-1 relative z-10">
          {contentSection}
        </div>

        {/* Footer at bottom */}
        <div className="relative z-10 mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
