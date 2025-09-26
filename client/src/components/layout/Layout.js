import React from 'react';
import Footer from './Footer';

const Layout = ({ children, className = '', showFooter = true }) => {
  return (
    <div className={`min-h-screen bg-black flex flex-col ${className}`}>
      <div className="flex-grow">
        {children}
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
