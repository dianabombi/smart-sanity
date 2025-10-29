import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';
import ContactForm from './forms/ContactForm';
import ContactInfo from './contact/ContactInfo';
import LoadingSpinner from './ui/LoadingSpinner';
import Card from './ui/Card';
import ApiService from '../services/api';

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [contactContent, setContactContent] = useState(null);

  useEffect(() => {
    loadContactContent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        setTimeout(() => reject(new Error('API timeout')), 2000)
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
    title: 'Kontakt',
    subtitle: 'Máte otázky alebo potrebujete poradenstvo? Kontaktujte nás a radi vám pomôžeme s výberom správnych riešení pre vašu kúpeľňu.',
    formTitle: 'Napíšte nám',
    contactInfoTitle: 'Kontaktné údaje',
    servicesTitle: 'Naše služby',
    contactDetails: {
      manager: 'Ing. Dušan Drinka, PhD.',
      phone: '+421 948 882 376',
      email: 'dusan.drinka@smartsanit.sk',
      address: 'Továrenská 14\n811 09 Bratislava'
    },
    services: [
      'Poradenstvo a návrh kúpeľní',
      'Dodávka sanitárnych zariadení',
      'Inštalácia a montáž',
      'Servis a údržba',
      'Technická podpora'
    ]
  });


  if (loading) {
    return (
      <Layout>
        <NavBar />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <LoadingSpinner text="Načítavam kontakt..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <NavBar />
      
      <div className="min-h-screen bg-black py-8">
        <div className="w-full max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 pt-8">
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
              {contactContent?.subtitle || 'Máte otázky alebo potrebujete poradenstvo? Kontaktujte nás a radi vám pomôžeme s výberom správnych riešení pre vašu kúpeľňu.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card
              className={`p-8 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition: 'all 0.8s ease-out',
                transitionDelay: '0.6s'
              }}
            >
              <ContactForm title={contactContent?.formTitle} />
            </Card>

            {/* Contact Information */}
            <ContactInfo 
              contactContent={contactContent}
              visible={visible}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
