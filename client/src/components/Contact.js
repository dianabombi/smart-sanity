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

  useEffect(() => {
    // Simulate loading and then start animation
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setVisible(true);
      }, 400);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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
              Kontakt
            </h1>
            <p className={`text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transition: 'all 0.8s ease-out',
              transitionDelay: '0.4s'
            }}>
              Máte otázky alebo potrebujete poradenstvo? Kontaktujte nás a radi vám pomôžeme s výberom správnych riešení pre vašu kúpeľňu.
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
                Napíšte nám
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Meno a priezvisko *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-500 border border-gray-400 rounded-lg text-white placeholder-black focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                      placeholder="Vaše meno"
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
                      className="w-full px-4 py-3 bg-gray-500 border border-gray-400 rounded-lg text-white placeholder-black focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                      placeholder="vas@email.sk"
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
                    className="w-full px-4 py-3 bg-gray-500 border border-gray-400 rounded-lg text-white placeholder-black focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                    placeholder="+421 XXX XXX XXX"
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
                    className="w-full px-4 py-3 bg-gray-500 border border-gray-400 rounded-lg text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                    style={{
                      color: formData.subject === '' ? 'black' : 'white'
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
                    className="w-full px-4 py-3 bg-gray-500 border border-gray-400 rounded-lg text-white placeholder-black focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors resize-vertical"
                    placeholder="Opíšte vašu požiadavku alebo otázku..."
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
                  Kontaktné údaje
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-gray-400 text-xl">👤</div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-300">Konateľ spoločnosti</h3>
                      <p className="text-gray-300/70">Ing. Dušan Drinka, PhD.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-gray-400 text-xl">📞</div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-300">Telefón</h3>
                      <p className="text-gray-300/70">+421 948 882 376</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-gray-400 text-xl">✉️</div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-300">Email</h3>
                      <p className="text-gray-300/70">dusan.drinka@smartsanit.sk</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-gray-400 text-xl">📍</div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-300">Adresa</h3>
                      <p className="text-gray-300/70">Továrenská 14<br />811 09 Bratislava</p>
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
                  Naše služby
                </h2>
                
                <ul className="space-y-3 text-gray-300/70">
                  <li className="flex items-center space-x-3">
                    <span className="text-gray-400">✓</span>
                    <span>Poradenstvo a návrh kúpeľní</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-gray-400">✓</span>
                    <span>Dodávka sanitárnych zariadení</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-gray-400">✓</span>
                    <span>Inštalácia a montáž</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-gray-400">✓</span>
                    <span>Servis a údržba</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-gray-400">✓</span>
                    <span>Záručný a pozáručný servis</span>
                  </li>
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
