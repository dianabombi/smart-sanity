import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-700 py-8 px-4 sm:px-6 lg:px-8 shadow-[0_-10px_30px_rgba(89,89,89,0.3)]">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-center justify-center">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Smart Sanit</h3>
            <p className="text-sm text-white">
              Profesionálne riešenia<br />
              sanitárnych zariadení<br />
              pre domácnosti a údržbu
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Rýchle odkazy</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/components" 
                  className="text-sm text-white hover:text-gray-300 transition-colors duration-200"
                >
                  Komponenty
                </a>
              </li>
              <li>
                <a 
                  href="/brands" 
                  className="text-sm text-white hover:text-gray-300 transition-colors duration-200"
                >
                  Značky
                </a>
              </li>
              <li>
                <a 
                  href="/who-we-are" 
                  className="text-sm text-white hover:text-gray-300 transition-colors duration-200"
                >
                  Kto sme
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-sm text-white hover:text-gray-300 transition-colors duration-200"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex justify-center items-center text-center">
            <p className="text-sm text-white">
              Created by{' '}
              <a 
                href="https://wavelynecode.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-200 underline"
              >
                Wavelyne
              </a>{' '}
              - wavelynecode.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
