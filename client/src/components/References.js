import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ApiService from '../services/api';
import { useBackgroundSettings } from '../hooks/useBackgroundSettings';

// Simple cache to avoid repeated API calls
let referencesCache = null;

const References = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [references, setReferences] = useState(referencesCache || []);
  const [pageDescription, setPageDescription] = useState(t('references.description'));
  const [visible, setVisible] = useState(false); // Always start false for animation
  const [loading, setLoading] = useState(!referencesCache);
  
  // Background settings hook
  const { settings: backgroundSettings } = useBackgroundSettings();

  const loadReferences = async (forceRefresh = false) => {
    // Use cache if available - trigger animation after short delay
    if (referencesCache && !forceRefresh) {
      setReferences(referencesCache);
      setLoading(false);
      // Trigger animation with delay for smooth roll-out effect
      requestAnimationFrame(() => {
        setTimeout(() => {
          setVisible(true);
        }, 100);
      });
      return;
    }

    setLoading(true);
    
    try {
      const result = await ApiService.getReferences();
      
      if (result.success && result.references && result.references.length > 0) {
        referencesCache = result.references;
        setReferences(result.references);
      }
    } catch (error) {
      console.error('Error loading references:', error);
    } finally {
      setLoading(false);
      // Trigger animation after data is loaded
      requestAnimationFrame(() => {
        setTimeout(() => {
          setVisible(true);
        }, 50);
      });
    }
  };

  useEffect(() => {
    loadReferences();
    loadPageDescription();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadPageDescription = async () => {
    try {
      const result = await ApiService.getPageContent('references', 'main', 'description');
      if (result.success && result.content) {
        setPageDescription(result.content);
      }
    } catch (error) {
      console.log('Using default page description');
    }
  };

  const openReferenceGallery = (referenceId) => {
    navigate(`/references/${referenceId}`);
  };

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
              {t('references.title')}
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Načítavam referencie...</p>
            </div>
          </div>
        ) : references.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {references.map((reference, index) => (
              <div 
                key={reference.id} 
                className={`group bg-black/30 hover:bg-black/50 border-gray-600 rounded-lg p-6 cursor-pointer relative pb-16 flex flex-col min-h-[360px] ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  borderWidth: '0.5px',
                  transition: 'all 0.8s ease-out',
                  transitionDelay: `${0.6 + index * 0.25}s`
                }}
              >
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-300 mb-3 text-center min-h-[3.5rem]">{reference.title}</h3>
                  
                  <div className="flex gap-2 items-center text-sm text-blue-300 mb-9 w-full text-left">
                    <span className="font-medium">{reference.year}</span>
                    {reference.location && <span>{reference.location}</span>}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 text-left w-full">{reference.description}</p>
                </div>
                
                {reference.client && (
                  <p className="absolute bottom-16 p-2 left-4 right-4 text-sm text-gray-300 text-left">Architekt: {reference.client}</p>
                )}
                
                {/* Gallery button - images are loaded when user clicks */}
                <div className="absolute bottom-4 left-4 right-4">
                  <button
                    onClick={() => openReferenceGallery(reference.id)}
                    className="w-full py-2 px-4 mt-5 border border-gray-300 text-gray-300 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-sm"
                  >
                    Galéria
                  </button>
                </div>
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
            className="py-2 px-4 border-gray-600 text-gray-300 rounded-lg hover:text-white transition-colors duration-500 bg-black/30 hover:bg-black/50 text-sm w-full max-w-xs mx-auto"
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
