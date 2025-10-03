import React, { useState } from 'react';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';
import Breadcrumbs from './ui/Breadcrumbs';
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

  return (
    <Layout>
      <NavBar />
      {/* Breadcrumbs */}
      <div className="pt-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>
      
      <div className="min-h-screen bg-black py-16">
        <div className="w-full max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Kontakt
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Máte otázky alebo potrebujete poradenstvo? Kontaktujte nás a radi vám pomôžeme s výberom správnych riešení pre vašu kúpeľňu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Napíšte nám
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
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
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
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
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
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
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
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                  >
                    <option value="">Vyberte predmet</option>
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
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors resize-vertical"
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
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Kontaktné údaje
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-white text-xl">👤</div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Konateľ spoločnosti</h3>
                      <p className="text-gray-300">Ing. Dušan Drinka, PhD.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-white text-xl">📞</div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Telefón</h3>
                      <p className="text-gray-300">+421 948 882 376</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-white text-xl">✉️</div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Email</h3>
                      <p className="text-gray-300">dusan.drinka@smartsanit.sk</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-white text-xl">📍</div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Adresa</h3>
                      <p className="text-gray-300">Továrenská 14<br />811 09 Bratislava</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Naše služby
                </h2>
                
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-3">
                    <span className="text-white">✓</span>
                    <span>Poradenstvo a návrh kúpeľní</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-white">✓</span>
                    <span>Dodávka sanitárnych zariadení</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-white">✓</span>
                    <span>Inštalácia a montáž</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-white">✓</span>
                    <span>Servis a údržba</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-white">✓</span>
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
