import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
  // Swipe-down to close state
  const [touchStartY, setTouchStartY] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);

  const handleNavClick = (path) => {
    // Close the sheet first, then navigate to ensure content is visible
    setMobileOpen(false);
    setDragOffset(0);
    setTouchStartY(null);
    setTimeout(() => navigate(path), 50);
  };

  // Handlers for swipe-down gesture on the bottom sheet
  const onTouchStart = (e) => {
    if (!mobileOpen) return;
    const y = e.touches?.[0]?.clientY ?? 0;
    setTouchStartY(y);
    setDragOffset(0);
  };

  const onTouchMove = (e) => {
    if (!mobileOpen || touchStartY === null) return;
    const y = e.touches?.[0]?.clientY ?? 0;
    const delta = Math.max(0, y - touchStartY);
    setDragOffset(delta);
  };

  const onTouchEnd = () => {
    if (!mobileOpen) return;
    const CLOSE_THRESHOLD = 80; // px to close
    if (dragOffset > CLOSE_THRESHOLD) {
      setMobileOpen(false);
    }
    // reset drag
    setDragOffset(0);
    setTouchStartY(null);
  };

  // Auto-close the sheet on route change as a safety net
  useEffect(() => {
    setMobileOpen(false);
    setDragOffset(0);
    setTouchStartY(null);
  }, [location.pathname]);

  return (
    <nav className="bg-black shadow-md sticky top-0 z-[100] relative">
      <div className="flex items-center justify-between pl-1 pr-2 md:px-6 lg:px-8 tablet:px-6 laptop:px-8">
        {/* Logo/Brand */}
        <div 
          className="cursor-pointer hover:opacity-80 transition-opacity py-2 shrink-0 -ml-1 sm:ml-0 sm:min-w-[350px] md:min-w-[280px] lg:min-w-[360px]"
          onClick={() => handleNavClick('/')}
        >
          <img 
            src="/logoBlack.webp" 
            alt="SMART SANITY" 
            className="shrink-0 block h-48 mobile:h-40 tablet:h-48 laptop:h-56 w-auto object-contain"
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
              className="text-gray-400 hover:text-gray-300 transition-colors text-lg sm:max-w-[200px] laptop:text-xl"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile/Tablet Menu Button */}
        {!mobileOpen && (
          <div className="laptop:hidden mr-2">
            <button
              className="text-white p-1 mr-6 rounded-md border-2 border-[#595959] shadow-[6px_6px_14px_0_#595959] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#595959]"
              aria-label="Open menu"
              aria-expanded={false}
              aria-controls="mobile-bottom-sheet"
              onClick={() => setMobileOpen(true)}
            >
              <svg className="w-12 h-12 text-[#595959]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Mobile/Tablet Bottom Sheet + Overlay */}
      {/* Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="laptop:hidden sm:h-40 fixed inset-0 z-[70] bg-black/40 backdrop-blur-[2px]"
        />
      )}

      {/* Bottom Sheet */}
      <div
        id="mobile-bottom-sheet"
        className={`laptop:hidden fixed left-0 right-0 bottom-0 z-[90] bg-black text-white rounded-t-2xl border-t border-gray-800 shadow-[0_-12px_30px_rgba(255,255,255,0.25)] transform transition-transform duration-300 h-[85vh] ${mobileOpen ? 'translate-y-0' : 'translate-y-full'} relative`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ transform: `${mobileOpen ? `translateY(${dragOffset}px)` : ''}` }}
      >
        {/* Sheet Close Button (top-right) */}
        <button
          type="button"
          aria-label="Zavrieť menu"
          onClick={() => setMobileOpen(false)}
          className="absolute top-3 right-3 z-[95] p-2 rounded-md border-2 border-[#595959] text-[#595959] shadow-[4px_4px_10px_0_#595959] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#595959]"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="h-full flex flex-col px-5 pt-4 pb-2">
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
          {/* Bottom divider and language switcher (always visible) */}
          <div
            className="pt-4 border-t border-gray-700 flex items-center justify-between bg-black shadow-[0_-6px_16px_rgba(0,0,0,0.6)]"
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}
          >
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
