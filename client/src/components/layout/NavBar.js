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
    <>
      {/* Logo - Separate positioned div */}
      <div 
        className="fixed p-2 top-0 sm:-top-8 md:top-2 left-8 z-[110] cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => handleNavClick('/')}
      >
        <img 
          src="/logo vektory_bez pozadia.png" 
          alt="SMART SANITY" 
          className="h-12 mobile:h-14 tablet:h-16 laptop:h-18 w-auto object-contain"
          style={{
            imageRendering: 'high-quality',
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div 
          className="text-white font-light text-lg tablet:text-xl tracking-wide" 
          style={{ display: 'none' }}
        >
          SMART SANITY
        </div>
      </div>

      {/* Navbar - Compact with large gray shadow (desktop only) */}
      <nav className="bg-black sticky top-0 z-[100] relative">
        <div className="hidden xl:block absolute inset-0 pointer-events-none" style={{ boxShadow: '0 10px 25px -3px rgba(156, 163, 175, 0.4), 0 4px 6px -2px rgba(156, 163, 175, 0.2), 0 20px 40px -10px rgba(156, 163, 175, 0.15)' }}></div>
        <div className="flex items-center justify-end pl-1 pr-2 md:px-2 lg:px-2 tablet:px-2 laptop:px-2 ml-36 mobile:ml-40 tablet:ml-44 laptop:ml-52 h-16 sm:h-20 md:h-24">
        
        {/* Navigation Links - show only when there's enough space (1200px+) */}
        <div className="hidden xl:flex items-baseline justify-end flex-wrap gap-x-6 mr-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path)}
              className="text-gray-300 hover:text-white transition-colors text-lg xl:text-xl"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile/Tablet Menu Button - show when nav items would wrap */}
        <div className="xl:hidden flex-shrink-0 ml-2 mr-4 min-w-[40px]">
          <button
            className="text-white p-1.5 rounded-md border-2 border-[#595959] shadow-[4px_4px_10px_0_#595959] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#595959]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-bottom-sheet"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-8 h-8 text-[#595959]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 9h16M4 15h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div 
          className="xl:hidden sm:h-40 fixed inset-0 z-[70] bg-black/40 backdrop-blur-[2px]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Bottom Sheet */}
      <div 
        id="mobile-bottom-sheet"
        className={`xl:hidden fixed left-0 right-0 bottom-0 z-[90] bg-black border-t border-gray-700 transition-transform duration-300 ease-out ${
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
    </>
  );
};

export default NavBar;
