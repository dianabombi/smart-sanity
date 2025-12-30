import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const VstupteButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button 
      onClick={() => navigate('/brands')}
      className="h-[40px] px-10 border border-gray-400 text-gray-400 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-lg font-medium w-[180px] flex items-center justify-center"
    >
      {t('home.enterButton')}
    </button>
  );
};

export default VstupteButton;
