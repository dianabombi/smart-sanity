import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'O nás', path: '/who-we-are' },
    { label: 'Čo ponúkame', path: '/components' },
    { label: 'Obchodované značky', path: '/brands' },
    { label: 'Referencie', path: '/references' },
    { label: 'Kontakt', path: '/contact' }
  ];

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand - Moved to left side */}
        <div 
          className="cursor-pointer hover:opacity-80 transition-opacity rounded-lg p-2 -ml-32"
          onClick={() => handleNavClick('/')}
        >
          <img 
            src="/logoBlack.webp" 
            alt="SMART SANITY" 
            className="h-40 w-auto"
            style={{
              imageRendering: 'high-quality',
              imageRendering: '-webkit-optimize-contrast',
              imageRendering: 'crisp-edges'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div 
            className="text-white font-light text-2xl tracking-wide" 
            style={{ display: 'none' }}
          >
            SMART SANITY
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path)}
              className="font-bold tracking-wide uppercase text-lg hover:opacity-60 transition-opacity duration-300"
              style={{ color: '#595959' }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
