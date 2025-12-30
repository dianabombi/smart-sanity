import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormField from '../ui/FormField';
import ApiService from '../../services/api';

const ContactForm = ({ title, className = '' }) => {
  const { t } = useTranslation();
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
    { value: 'general', label: t('contact.form.subjects.general') },
    { value: 'quote', label: t('contact.form.subjects.quote') },
    { value: 'consultation', label: t('contact.form.subjects.consultation') },
    { value: 'installation', label: t('contact.form.subjects.installation') },
    { value: 'service', label: t('contact.form.subjects.service') },
    { value: 'complaint', label: t('contact.form.subjects.complaint') }
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
      <h2 className="text-2xl font-semibold text-gray-300 mb-1">
        {title || t('contact.formTitle')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-2 pt-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormField
            label={t('contact.form.name')}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          
          <FormField
            label={t('contact.form.email')}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <FormField
          label={t('contact.form.phone')}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />

        <FormField
          label={t('contact.form.subject')}
          type="select"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder={t('contact.form.selectPlaceholder')}
          options={subjectOptions}
          required
        />

        <FormField
          label={t('contact.form.message')}
          type="textarea"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={3}
          required
        />

        {submitStatus === 'success' && (
          <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-lg">
            {t('contact.form.successMessage')}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
            {t('contact.form.errorMessage')}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full !mt-8 text-gray-300 border border-gray-400 bg-transparent hover:text-white hover:border-white px-8 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
