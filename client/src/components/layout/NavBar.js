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

  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Touch gesture state for swipe-down to close
  const [touchStartY, setTouchStartY] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);

  const handleNavClick = (path) => {
    setMobileOpen(false);
    setDragOffset(0);
    setTouchStartY(null);
    setTimeout(() => navigate(path), 50);
  };

  // Touch handlers for swipe-down gesture
  const onTouchStart = (e) => {
    if (!mobileOpen) return;
    setTouchStartY(e.touches[0].clientY);
    setDragOffset(0);
  };

  const onTouchMove = (e) => {
    if (!mobileOpen || touchStartY === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY;
    if (diff > 0) { // Only allow downward drag
      setDragOffset(diff);
    }
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
      <div className="flex items-center justify-between pl-1 pr-4 md:px-6 lg:px-8 tablet:px-6 laptop:px-8">
        {/* Logo/Brand */}
        <div 
          className="cursor-pointer hover:opacity-80 transition-opacity py-1 shrink-0 -ml-1 sm:ml-0 max-w-[70%] laptop:min-w-[360px] laptop:max-w-none"
          onClick={() => handleNavClick('/')}
        >
          <img 
            src="/logoBlack.webp" 
            alt="SMART SANITY" 
            className="shrink-0 block h-48 mobile:h-52 tablet:h-36 laptop:h-40 w-auto object-contain"
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
        {!mobileOpen && (
          <div className="laptop:hidden flex-shrink-0 ml-2 min-w-[60px]">
            <button
              className="text-white p-2 rounded-md border-2 border-[#595959] shadow-[6px_6px_14px_0_#595959] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#595959]"
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

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div 
          className="laptop:hidden sm:h-40 fixed inset-0 z-[70] bg-black/40 backdrop-blur-[2px]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Bottom Sheet */}
      <div 
        id="mobile-bottom-sheet"
        className={`laptop:hidden fixed left-0 right-0 bottom-0 z-[90] bg-black border-t border-gray-700 transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-y-0' : 'translate-y-full'
        } h-[60vh] tablet:h-[70vh] rounded-t-2xl`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ transform: `${mobileOpen ? `translateY(${dragOffset}px)` : ''}` }}
      >
        {/* Close button inside the sheet */}
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

        {/* Drag indicator */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className="block w-full text-left px-4 py-4 text-white text-xl font-light hover:bg-gray-800 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Language switcher - always visible */}
        <div className="pt-4 border-t border-gray-700 flex items-center justify-between bg-black shadow-[0_-6px_16px_rgba(0,0,0,0.6)]"
             style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
          <div className="px-6">
            <span className="text-gray-400 text-sm">Jazyk</span>
            <div className="flex gap-3 mt-1">
              <button className="text-white text-lg font-medium">SK</button>
              <button className="text-gray-500 text-lg">EN</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
