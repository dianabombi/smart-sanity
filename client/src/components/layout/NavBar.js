import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'O nás', path: '/who-we-are' },
    { label: 'Čo ponúkame', path: '/what-we-offer' },
    { label: 'Obchodované značky', path: '/brands' },
    { label: 'Inšpirácie', path: '/inspirations' },
    { label: 'Referencie', path: '/references' },
    { label: 'Kontakt', path: '/contact' }
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState('sk');

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="bg-black shadow-md sticky top-0 z-50 relative">
      <div className="flex items-center justify-between px-3 md:px-6 lg:px-8 tablet:px-6 laptop:px-8">
        {/* Logo/Brand */}
        <div 
          className="cursor-pointer hover:opacity-80 transition-opacity py-2 shrink-0 md:min-w-[360px] lg:min-w-[460px] tablet:min-w-[460px] laptop:min-w-[560px]"
          onClick={() => handleNavClick('/')}
        >
          <img 
            src="/logoBlack.webp" 
            alt="SMART SANITY" 
            className="shrink-0 block h-36 mobile:h-40 tablet:h-60 laptop:h-72 w-auto object-contain"
            style={{
              imageRendering: 'high-quality',
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div 
            className="text-white font-light text-xl tablet:text-2xl tracking-wide" 
            style={{ display: 'none' }}
          >
            SMART SANITY
          </div>
        </div>
        
        {/* Navigation Links - show only on laptop and above */}
        <div className="hidden laptop:flex items-center flex-wrap gap-x-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path)}
              className="text-gray-400 hover:text-gray-300 transition-colors text-lg laptop:text-xl"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile/Tablet Menu Button */}
        <div className="laptop:hidden">
          <button
            className="text-white p-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-bottom-sheet"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Bottom Sheet + Overlay */}
      {/* Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="laptop:hidden fixed inset-0 z-[70] bg-black/40 backdrop-blur-[2px]"
        />
      )}

      {/* Bottom Sheet */}
      <div
        id="mobile-bottom-sheet"
        className={`laptop:hidden fixed left-0 right-0 bottom-0 z-[80] bg-black text-white rounded-t-2xl border-t border-gray-800 shadow-[0_-12px_30px_rgba(255,255,255,0.25)] transform transition-transform duration-300 h-[75vh] ${mobileOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="h-full flex flex-col px-5 pt-4 pb-4">
          {/* Drag handle indicator */}
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-white/40" />
          {/* Scrollable menu area */}
          <div className="flex-1 overflow-y-auto pr-1">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setMobileOpen(false);
                    handleNavClick(item.path);
                  }}
                  className="text-gray-100 hover:text-white transition-colors text-xl py-4 text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          {/* Bottom divider and language switcher */}
          <div className="pt-4 border-t border-gray-700 flex items-center justify-between">
            <span className="text-gray-400 text-sm">Jazyk / Language</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setLang('sk')}
                className={`${lang === 'sk' ? 'bg-white text-black' : 'bg-transparent text-white border border-white/40'} px-3 py-1 rounded-full text-sm`}
              >
                SK
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`${lang === 'en' ? 'bg-white text-black' : 'bg-transparent text-white border border-white/40'} px-3 py-1 rounded-full text-sm`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
