import React from 'react';
import { useNavigate } from 'react-router-dom';

const VstupteButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/brands')}
      className="h-[40px] px-10 border border-gray-400 text-gray-400 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-lg font-medium w-[180px] flex items-center justify-center"
    >
      Vstúpte
    </button>
  );
};

export default VstupteButton;
