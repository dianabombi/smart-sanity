import React from 'react';
import Footer from './Footer';

const Layout = ({ children, className = '', showFooter = true }) => {
  return (
    <div className={`min-h-screen bg-black ${className}`}>
      {children}
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
