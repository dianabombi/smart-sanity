import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';
import ApiService from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const result = await ApiService.sendMessage(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <NavBar />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-white">Načítavam kontakt...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <NavBar />
      
      <div className="min-h-screen bg-black py-16">
        <div className="w-full max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
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
            <div className={`bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transition: 'all 0.8s ease-out',
              transitionDelay: '0.6s'
            }}>
              <h2 className="text-2xl font-semibold text-gray-300 mb-6">
                {contactContent?.formTitle || 'Napíšte nám'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Meno a priezvisko *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Telefón
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Predmet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
                    style={{
                      color: 'black'
                    }}
                  >
                    <option value="" style={{ color: 'black' }}>Vyberte predmet</option>
                    <option value="general">Všeobecná otázka</option>
                    <option value="quote">Cenová ponuka</option>
                    <option value="consultation">Poradenstvo</option>
                    <option value="installation">Inštalácia</option>
                    <option value="service">Servis</option>
                    <option value="complaint">Reklamácia</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Správa *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors resize-vertical"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-lg">
                    Ďakujeme za vašu správu! Odpovieme vám čo najskôr.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                    Nastala chyba pri odosielaní správy. Skúste to prosím znovu.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Odosielam...' : 'Odoslať správu'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Company Info */}
              <div className={`bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition: 'all 0.8s ease-out',
                transitionDelay: '0.8s'
              }}>
                <h2 className="text-2xl font-semibold text-gray-300 mb-6">
                  {contactContent?.contactInfoTitle || 'Kontaktné údaje'}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-gray-300 text-xl">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-300">Konateľ spoločnosti</h3>
                      <p className="text-gray-300/70">{contactContent?.contactDetails?.manager || 'Ing. Dušan Drinka, PhD.'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-gray-300 text-xl">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-300">Telefón</h3>
                      <p className="text-gray-300/70">{contactContent?.contactDetails?.phone || '+421 948 882 376'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-gray-300 text-xl">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-300">Email</h3>
                      <p className="text-gray-300/70">{contactContent?.contactDetails?.email || 'dusan.drinka@smartsanit.sk'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-gray-300 text-xl">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-300">Adresa</h3>
                      <p className="text-gray-300/70 whitespace-pre-line">{contactContent?.contactDetails?.address || 'Továrenská 14\n811 09 Bratislava'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className={`bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition: 'all 0.8s ease-out',
                transitionDelay: '1.0s'
              }}>
                <h2 className="text-2xl font-semibold text-gray-300 mb-6">
                  {contactContent?.servicesTitle || 'Naše služby'}
                </h2>
                
                <ul className="space-y-3 text-gray-300/70">
                  {(contactContent?.services || [
                    'Poradenstvo a návrh kúpeľní',
                    'Dodávka sanitárnych zariadení',
                    'Inštalácia a montáž',
                    'Servis a údržba',
                    'Technická podpora'
                  ]).map((service, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <span className="text-gray-300">✓</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
