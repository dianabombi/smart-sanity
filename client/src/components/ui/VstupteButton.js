import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const VstupteButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button 
      onClick={() => navigate('/brands')}
      className="h-[40px] px-6 text-gray-300 rounded-lg hover:text-white transition-all duration-200 bg-transparent text-lg font-semibold w-[220px] flex items-center justify-center"
      style={{
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        boxShadow: '0 0 0 1px rgb(209, 213, 219)'
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 0 1px white'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 0 1px rgb(209, 213, 219)'}
    >
      {t('home.enterButton')}
    </button>
  );
};

export default VstupteButton;
