import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-black text-sm md:text-base leading-relaxed">
          <p>
            Táto webová stránka používa súbory cookie na zlepšenie vášho zážitku z prehliadania. 
            Kliknutím na "Prijať" súhlasíte s používaním všetkých súborov cookie.
          </p>
        </div>
        
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="px-6 py-2 bg-black text-white border-2 border-black rounded-lg hover:bg-gray-800 transition-all duration-300 whitespace-nowrap"
          >
            Odmietnuť
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-black text-white border-2 border-black rounded-lg hover:bg-gray-800 transition-all duration-300 whitespace-nowrap"
          >
            Prijať
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
