import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import ContactForm from './forms/ContactForm';
import ContactInfo from './contact/ContactInfo';
import LoadingSpinner from './ui/LoadingSpinner';
import ApiService from '../services/api';
import { useBackgroundSettings } from '../hooks/useBackgroundSettings';

const Contact = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [contactContent, setContactContent] = useState(null);
  
  // Background settings hook
  const { settings: backgroundSettings, refreshSettings } = useBackgroundSettings();

  useEffect(() => {
    loadContactContent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-refresh background settings every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshSettings();
    }, 2000);

    return () => clearInterval(interval);
  }, [refreshSettings]);

  const loadContactContent = async () => {
    try {
      setLoading(true);
      
      // Load fallback content immediately for fast display
      const fallbackContent = getDefaultContactContent();
      setContactContent(fallbackContent);
      setLoading(false);
      
      // Start animation after content is loaded
      setTimeout(() => {
        setVisible(true);
      }, 400);
      
      // Try to load from API with timeout in background
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('API timeout')), 3000)
      );
      
      try {
        const result = await Promise.race([
          ApiService.getContactContent(),
          timeoutPromise
        ]);
        
        if (result.success && result.content) {
          setContactContent(result.content);
        }
      } catch (apiError) {
        console.log('API failed or timed out, keeping fallback content:', apiError.message);
      }
      
    } catch (error) {
      console.error('Error loading contact content:', error);
      setContactContent(getDefaultContactContent());
      setLoading(false);
      setTimeout(() => {
        setVisible(true);
      }, 400);
    }
  };

  const getDefaultContactContent = () => ({
    title: t('contact.title'),
    subtitle: t('contact.subtitle'),
    formTitle: t('contact.formTitle'),
    contactInfoTitle: t('contact.contactInfoTitle'),
    servicesTitle: t('contact.servicesTitle'),
    contactDetails: {
      manager: 'Ing. Dušan Drinka, PhD.\nMgr. Juraj Stodolovský',
      phone: '+421 948 882 376',
      email: 'dusan.drinka@smartsanit.sk',
      address: 'Továrenská 14\n811 09 Bratislava'
    },
    services: t('contact.services', { returnObjects: true })
  });


  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner text="Načítavam kontakt..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative flex flex-col">
      {/* Background Image */}
      {backgroundSettings.contactPageBackgroundImage && (
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundSettings.contactPageBackgroundImage})`,
            backgroundSize: backgroundSettings.backgroundImageSize || 'cover',
            backgroundPosition: `${backgroundSettings.backgroundImagePositionX || 'center'} ${backgroundSettings.backgroundImagePositionY || 'center'}`,
            backgroundRepeat: 'no-repeat',
            opacity: backgroundSettings.backgroundImageOpacity !== undefined ? backgroundSettings.backgroundImageOpacity : 0.3,
            filter: backgroundSettings.backgroundImageBlur ? `blur(${backgroundSettings.backgroundImageBlur}px)` : 'none'
          }}
        />
      )}

      {/* Main content area */}
      <div className="relative flex-1 flex flex-col">
        <NavBar />
        
        <div className="flex-1 bg-transparent pb-32 pt-32 relative z-10">
          <div className="w-full max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className={`text-4xl md:text-5xl font-bold text-gray-300 mb-6 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition: 'all 0.8s ease-out',
                transitionDelay: '0.2s'
              }}>
                {contactContent?.title || 'Kontakt'}
              </h1>
              <p className={`text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition: 'all 0.8s ease-out',
                transitionDelay: '0.4s'
              }}>
                {contactContent?.subtitle || ''}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Contact Form */}
              <div
                className={`group rounded-lg transition-colors duration-500 w-full h-full bg-black/30 hover:bg-black/50 border-gray-600 px-10 py-8 min-h-[460px] ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  borderWidth: '0.5px',
                  transition: 'all 0.8s ease-out',
                  transitionDelay: '0.6s'
                }}
              >
                <ContactForm title={contactContent?.formTitle} />
              </div>

              {/* Contact Information */}
              <ContactInfo 
                contactContent={contactContent}
                visible={visible}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer at bottom */}
      <div className="relative z-10 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
