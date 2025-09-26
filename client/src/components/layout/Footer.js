import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-700 py-8 px-4 sm:px-6 lg:px-8 shadow-[0_-10px_30px_rgba(255,255,255,0.1)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Smart Sanit</h3>
            <p className="text-sm text-white">
              Profesionálne riešenia sanitárnych zariadení pre domácnosti a údržbu
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

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Kontakt</h3>
            <div className="space-y-2">
              <p className="text-sm text-white">
                <span className="font-medium">Konateľ spoločnosti:</span><br />
                Ing. Dušan Drinka, PhD.
              </p>
              <p className="text-sm text-white">
                <span className="font-medium">Email:</span> dusan.drinka@smartsanit.sk
              </p>
              <p className="text-sm text-white">
                <span className="font-medium">Telefón:</span> +421 948 882 376
              </p>
              <p className="text-sm text-white">
                <span className="font-medium">Adresa:</span><br />
                Továrenská 14, 811 09 Bratislava
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-white">
              © 2024 Smart Sanit. Všetky práva vyhradené.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <button 
                className="text-sm text-white hover:text-gray-300 transition-colors duration-200 bg-transparent border-none cursor-pointer"
                onClick={() => console.log('Privacy policy clicked')}
              >
                Ochrana súkromia
              </button>
              <button 
                className="text-sm text-white hover:text-gray-300 transition-colors duration-200 bg-transparent border-none cursor-pointer"
                onClick={() => console.log('Terms of use clicked')}
              >
                Podmienky použitia
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
