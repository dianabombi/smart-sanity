import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ApiService from '../services/api';
import { useBackgroundSettings } from '../hooks/useBackgroundSettings';

// Fallback references data
const fallbackReferences = [
    {
      id: 1,
      title: "Apartmán Sky Park",
      description: "Kompletný návrh a realizácia kúpeľne a WC v modernom industriálnom štýle. Design by Dušan Drinka. Spolupráca s Elite Bath+Kitchen.",
      year: "2021",
      location: "Bratislava",
      client: "Dušan Drinka, Juraj Stodolovský",
      images: []
    },
    {
      id: 2,
      title: "Apartmán Tatranská Lomnica",
      description: "Kompletný návrh a realizácia kúpeľne s WC. Design by Dušan Drinka & Juraj Stodolovský.",
      year: "2025",
      location: "Tatranská Lomnica",
      client: "súkromný investor",
      images: []
    },
    {
      id: 3,
      title: "Rodinný dom Senec",
      description: "Realizácia hlavnej kúpeľne a hosťovskej toalety v rodinnom dome.",
      year: "2024",
      location: "Senec",
      client: "súkromný investor",
      images: []
    }
  ];

// Cache to survive component remounts
const referencesCache = {
  references: null,
  pageDescription: null,
  isLoaded: false
};

const References = () => {
  const navigate = useNavigate();
  const [references, setReferences] = useState(referencesCache.references || []);
  const [visible, setVisible] = useState(false);
  const [pageDescription, setPageDescription] = useState(
    referencesCache.pageDescription || 'Naše úspešne realizované projekty a spokojní klienti sú našou najlepšou vizitkou.'
  );
  const isMountedRef = useRef(false); // Prevent double loading
  
  // Background settings hook
  const { settings: backgroundSettings } = useBackgroundSettings();

  const loadReferences = async (forceRefresh = false) => {
    try {
      console.log('🔄 PUBLIC REFERENCES: Loading references from database...');
      const result = await ApiService.getReferences();
      console.log('📊 PUBLIC REFERENCES: API result:', result);
      
      if (result.success && result.references && result.references.length > 0) {
        console.log(`✅ PUBLIC REFERENCES: Loaded ${result.references.length} references from database`);
        console.log('📋 PUBLIC REFERENCES: First reference:', result.references[0]);
        setReferences(result.references);
        referencesCache.references = result.references;
        referencesCache.isLoaded = true;
      } else {
        console.warn('⚠️ PUBLIC REFERENCES: No references in database or failed to load');
        console.log('📊 PUBLIC REFERENCES: Result details:', {
          success: result.success,
          hasReferences: !!result.references,
          count: result.references?.length || 0,
          message: result.message
        });
        console.log('📋 PUBLIC REFERENCES: Using fallback data');
        setReferences(fallbackReferences);
      }
    } catch (error) {
      console.error('❌ PUBLIC REFERENCES: Error in loadReferences:', error);
      console.log('📋 PUBLIC REFERENCES: Using fallback references due to error');
      setReferences(fallbackReferences);
    } finally {
      // Start animation after content is loaded
      setTimeout(() => {
        setVisible(true);
      }, 100);
    }
  };

  useEffect(() => {
    // Prevent double loading
    if (isMountedRef.current) {
      return;
    }
    
    isMountedRef.current = true;
    loadReferences();
    loadPageDescription();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadPageDescription = async () => {
    try {
      const result = await ApiService.getPageContent('references', 'main', 'description');
      if (result.success && result.content) {
        setPageDescription(result.content);
        referencesCache.pageDescription = result.content;
      }
    } catch (error) {
      console.log('Using default page description');
    }
  };

  const openReferenceGallery = (referenceId) => {
    navigate(`/references/${referenceId}`);
  };


  console.log('🎨 PUBLIC REFERENCES: Background Image Status:', {
    hasImage: !!backgroundSettings.referencesPageBackgroundImage,
    imageLength: backgroundSettings.referencesPageBackgroundImage?.length || 0,
    position: `${backgroundSettings.backgroundImagePositionX}/${backgroundSettings.backgroundImagePositionY}`,
    size: backgroundSettings.backgroundImageSize,
    opacity: backgroundSettings.backgroundImageOpacity,
    blur: backgroundSettings.backgroundImageBlur
  });

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Image */}
      {backgroundSettings.referencesPageBackgroundImage && (
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundSettings.referencesPageBackgroundImage})`,
            backgroundSize: backgroundSettings.backgroundImageSize || 'cover',
            backgroundPosition: `${backgroundSettings.backgroundImagePositionX || 'center'} ${backgroundSettings.backgroundImagePositionY || 'center'}`,
            backgroundRepeat: 'no-repeat',
            opacity: backgroundSettings.backgroundImageOpacity !== undefined ? backgroundSettings.backgroundImageOpacity : 0.3,
            filter: backgroundSettings.backgroundImageBlur ? `blur(${backgroundSettings.backgroundImageBlur}px)` : 'none'
          }}
        />
      )}

      <div className="relative min-h-screen">
        <NavBar />
        
        {/* Header Section */}
        <div className="pb-10 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-6xl mx-auto text-center">
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-300 mb-6 tracking-wide ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transition: 'all 0.8s ease-out',
              transitionDelay: '0.2s'
            }}>
              Referencie
            </h1>
            <p className={`text-xl text-gray-300 mt-5 max-w-3xl mx-auto leading-relaxed ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transition: 'all 0.8s ease-out',
              transitionDelay: '0.4s'
            }}>
              {pageDescription}
            </p>
          </div>
        </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 min-h-[60vh]">
        {references.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {references.map((reference, index) => (
              <div 
                key={reference.id} 
                className="group bg-black/30 border border-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-black/50 transition-all duration-500 cursor-pointer relative pb-16 flex flex-col min-h-[360px]"
                style={{ opacity: 1 }}
              >
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-300 mb-3 text-center min-h-[3.5rem]">{reference.title}</h3>
                  
                  <div className="flex gap-2 items-center text-sm text-blue-300 mb-5 w-full text-left">
                    <span className="font-medium">{reference.year}</span>
                    {reference.location && <span>{reference.location}</span>}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 text-left w-full">{reference.description}</p>
                </div>
                
                {reference.client && (
                  <p className="absolute bottom-16 p-2 left-4 right-4 text-sm text-gray-300 text-left">Architekt: {reference.client}</p>
                )}
                
                {reference.images && reference.images.length > 0 && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <button
                      onClick={() => openReferenceGallery(reference.id)}
                      className="w-full py-2 px-4 mt-5 border border-gray-300 text-gray-300 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-sm"
                    >
                      Galéria
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 min-h-[40vh] flex flex-col justify-center">
            <div className="text-gray-300 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">Žiadne referencie</h3>
            <p className="text-gray-300">Referencie sa načítavaju...</p>
          </div>
        )}
        
        {/* Contact Button */}
        <div className="flex justify-center mt-12 px-4">
          <button 
            onClick={() => window.location.href = '/contact'}
            className="py-2 px-4 border border-gray-400 text-gray-300 rounded-lg hover:text-white transition-colors duration-500 bg-black/30 hover:bg-black/50 text-sm w-full max-w-xs mx-auto"
            style={{ borderWidth: '0.5px' }}
          >
            Kontaktujte nás
          </button>
        </div>
      </div>
      
        <Footer />
      </div>
    </div>
  );
};

export default References;
