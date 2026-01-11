import React from 'react';

const LanguageToggle = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-1">
        <button
          type="button"
          onClick={() => onLanguageChange('sk')}
          className={`px-4 py-2 rounded-md font-medium transition-all cursor-pointer ${
            selectedLanguage === 'sk'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-600 text-gray-300 hover:text-white hover:bg-gray-500'
          }`}
        >
          🇸🇰 SK
        </button>
        <button
          type="button"
          onClick={() => onLanguageChange('en')}
          className={`px-4 py-2 rounded-md font-medium transition-all cursor-pointer ${
            selectedLanguage === 'en'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-600 text-gray-300 hover:text-white hover:bg-gray-500'
          }`}
        >
          🇬🇧 EN
        </button>
      </div>
      <div className={`${selectedLanguage === 'en' ? 'bg-green-900/30 border-green-700' : 'bg-blue-900/30 border-blue-700'} border rounded-lg px-3 py-2`}>
        <p className={`${selectedLanguage === 'en' ? 'text-green-300' : 'text-blue-300'} text-sm`}>
          📝 {selectedLanguage === 'sk' ? 'Upravujete: Slovenčinu' : 'Editing: English'}
        </p>
      </div>
    </div>
  );
};

export default LanguageToggle;
