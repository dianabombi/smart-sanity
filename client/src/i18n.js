import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationSK from './locales/sk.json';

const resources = {
  en: {
    translation: translationEN
  },
  sk: {
    translation: translationSK
  }
};

// Get saved language from localStorage or default to 'sk'
const savedLanguage = localStorage.getItem('i18nextLng') || 'sk';

// Initialize i18n synchronously without language detector
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'sk',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;
