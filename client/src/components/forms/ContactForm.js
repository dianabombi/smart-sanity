import React, { useState } from 'react';
import FormField from '../ui/FormField';
import ApiService from '../../services/api';

const ContactForm = ({ title = 'Napíšte nám', className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const subjectOptions = [
    { value: 'general', label: 'Všeobecná otázka' },
    { value: 'quote', label: 'Cenová ponuka' },
    { value: 'consultation', label: 'Poradenstvo' },
    { value: 'installation', label: 'Inštalácia' },
    { value: 'service', label: 'Servis' },
    { value: 'complaint', label: 'Reklamácia' }
  ];

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
    <div className={className}>
      <h2 className="text-2xl font-semibold text-gray-300 mb-6">
        {title}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Meno a priezvisko"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          
          <FormField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <FormField
          label="Telefón"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />

        <FormField
          label="Predmet"
          type="select"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Vyberte predmet"
          options={subjectOptions}
          required
        />

        <FormField
          label="Správa"
          type="textarea"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={6}
          placeholder="Zadajte vašu správu..."
          required
        />

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
  );
};

export default ContactForm;
