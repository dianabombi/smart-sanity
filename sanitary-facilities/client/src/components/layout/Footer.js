import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Smart Sanity</h3>
            <p className="text-sm" style={{ color: '#595959' }}>
              Profesionálne riešenia sanitárnych zariadení pre domácnosti a údržbu
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Rýchle odkazy</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/components" 
                  className="text-sm hover:text-gray-800 transition-colors duration-200"
                  style={{ color: '#595959' }}
                >
                  Komponenty
                </a>
              </li>
              <li>
                <a 
                  href="/brands" 
                  className="text-sm hover:text-gray-800 transition-colors duration-200"
                  style={{ color: '#595959' }}
                >
                  Značky
                </a>
              </li>
              <li>
                <a 
                  href="/who-we-are" 
                  className="text-sm hover:text-gray-800 transition-colors duration-200"
                  style={{ color: '#595959' }}
                >
                  Kto sme
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-sm hover:text-gray-800 transition-colors duration-200"
                  style={{ color: '#595959' }}
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Kontakt</h3>
            <div className="space-y-2">
              <p className="text-sm" style={{ color: '#595959' }}>
                Email: info@smartsanity.sk
              </p>
              <p className="text-sm" style={{ color: '#595959' }}>
                Telefón: +421 XXX XXX XXX
              </p>
              <p className="text-sm" style={{ color: '#595959' }}>
                Adresa: Bratislava, Slovensko
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm" style={{ color: '#595959' }}>
              © 2024 Smart Sanity. Všetky práva vyhradené.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a 
                href="#" 
                className="text-sm hover:text-gray-800 transition-colors duration-200"
                style={{ color: '#595959' }}
              >
                Ochrana súkromia
              </a>
              <a 
                href="#" 
                className="text-sm hover:text-gray-800 transition-colors duration-200"
                style={{ color: '#595959' }}
              >
                Podmienky použitia
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
