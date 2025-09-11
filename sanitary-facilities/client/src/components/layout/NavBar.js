import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/who-we-are' },
    { label: 'Brands', path: '/brands' },
    { label: 'Contact Us', path: '/contact' }
  ];

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="w-full bg-black border-b border-white/20 py-6 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div 
          className="text-white font-light text-xl tracking-wide cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleNavClick('/')}
        >
          SMART SANITY
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path)}
              className="text-white font-light tracking-wide uppercase text-sm hover:opacity-80 transition-opacity duration-300"
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
