import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ApiService from '../services/api';
import { useBackgroundSettings } from '../hooks/useBackgroundSettings';

// No localStorage fallback - only use database

const WhoWeAre = () => {
  const { t, i18n } = useTranslation();
  const { settings: backgroundSettings, refreshSettings } = useBackgroundSettings();
  const [content, setContent] = useState({ mainContent: [], partnershipContent: "" });
  const [ebkLogo, setEbkLogo] = useState('/ebk-logo.svg');
  const [partnerLogos, setPartnerLogos] = useState([]);
  const [logosCached, setLogosCached] = useState(false);
  const [visible, setVisible] = useState(false);
  
  // Page headers (editable in admin)
  const [pageTitle, setPageTitle] = useState(t('whoWeAre.pageTitle'));
  const [pageSubtitle, setPageSubtitle] = useState(t('whoWeAre.pageSubtitle'));
  
  // Background slideshow state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [backgroundImages, setBackgroundImages] = useState([]);

  useEffect(() => {
    // Load everything in parallel in background - don't wait
    loadPageHeaders();
    loadContent();
    loadPartnerLogosOptimized();
    loadBackgroundSettings();
    
    // Trigger animation after component mounts
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reload content when language changes
  useEffect(() => {
    if (i18n.isInitialized) {
      loadContent();
    }
  }, [i18n.language]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-refresh background settings to sync with admin changes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshSettings();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [refreshSettings]);

  // Log background images on load
  useEffect(() => {
    if (backgroundImages.length > 0) {
      console.log(`✅ Showing ${backgroundImages.length} background image(s) immediately`);
    }
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
      // Load only from database
      const result = await ApiService.getPageContent('who-we-are', 'background', 'settings');
      if (result.success && result.content) {
        const dbSettings = JSON.parse(result.content);
        
        // Update background images if available
        if (dbSettings.whoWeAreBackgroundImages && dbSettings.whoWeAreBackgroundImages.length > 0) {
          const imageUrls = dbSettings.whoWeAreBackgroundImages
            .sort((a, b) => a.order - b.order)
            .map(img => img.dataUrl);
          setBackgroundImages(imageUrls);
          console.log(`✅ Loaded ${imageUrls.length} background image(s) from database`);
        } else {
          console.log('⚠️ No background images found in database');
        }
      } else {
        console.log('⚠️ Failed to load background settings from database');
      }
    } catch (error) {
      console.error('❌ Error loading background settings:', error);
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

  // Check for updates (logos only - background settings handled by hook)
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
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [ebkLogo]);

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
      // Get current language
      const currentLanguage = i18n.language || 'sk';
      
      // Load critical content FIRST - show page as soon as text is ready
      const contentResult = await ApiService.getWhoWeAreSections(currentLanguage).catch(err => ({ success: false, error: err }));

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

      // Set content but don't show yet (controlled by showContent state)
      setContent(contentData);
      
    } catch (error) {
      console.error('Error loading content:', error);
      setContent({
        mainContent: [t('whoWeAre.loadingError')],
        partnershipContent: ""
      });
    }
  };

  const loadPartnerLogosOptimized = async () => {
    // Skip if already cached
    if (logosCached && partnerLogos !== null) {
      console.log('📦 Using cached partner logos');
      return;
    }

    try {
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
    }
  };

  // Always render content section immediately
  const contentSection = (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-300 mb-8 mt-5 text-center tracking-wide ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          transition: 'all 0.8s ease-out',
          transitionDelay: '0.2s'
        }}>
          {pageTitle}
        </h1>
        
        {/* Layout - stacked tiles on all screen sizes */}
        <div className="grid grid-cols-1 gap-6 items-stretch justify-center">
          {/* Combined Main Content */}
          <div className="flex justify-center">
            <div className={`group rounded-lg transition-colors duration-500 w-full h-full flex flex-col justify-start bg-black/30 hover:bg-black/50 border-gray-600 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ borderWidth: '0.5px', padding: '0.85rem', transition: 'all 0.8s ease-out', transitionDelay: '0.4s' }}>
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
            <div className={`group rounded-lg transition-colors duration-500 w-full h-full flex flex-col justify-start bg-black/30 hover:bg-black/50 border-gray-600 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ borderWidth: '0.5px', padding: '0.85rem', transition: 'all 0.8s ease-out', transitionDelay: '0.6s' }}>
              <div className="space-y-6">
                <div className="flex flex-col justify-center items-center space-y-6">
                  <h2 className="text-3xl font-bold text-gray-300 text-center pt-6">
                    {t('whoWeAre.ourPartners')}
                  </h2>
                  <div className="flex justify-center w-full pb-8">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', rowGap: '1rem', columnGap: '2rem', maxWidth: '900px', width: '100%', justifyItems: 'center' }}>
                      {partnerLogos && partnerLogos.length > 0 ? (
                          partnerLogos.map((logo, index) => (
                            <div 
                              key={logo.id} 
                              className="rounded-lg p-2 transition-all duration-300" 
                              style={{ 
                                height: '110px', 
                                width: '100%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center'
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
                        ) : null}
                    </div>
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
        {/* Background images - instant display */}
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0"
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
