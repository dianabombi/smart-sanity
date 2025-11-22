import React from 'react';

const ContactInfo = ({ 
  contactContent, 
  visible = true,
  className = '',
  delay = '0.8s'
}) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Company Info */}
      <div className={`group rounded-lg transition-colors duration-500 bg-black/30 hover:bg-black/50 border-gray-600 px-10 py-8 h-full ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{
        borderWidth: '0.5px',
        transition: 'all 0.8s ease-out',
        transitionDelay: delay
      }}>
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">
          {contactContent?.contactInfoTitle || 'Kontaktné údaje'}
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="text-gray-300 text-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-400">Konatelia spoločnosti</h3>
              <p className="text-gray-300 whitespace-pre-line">{contactContent?.contactDetails?.manager || 'Ing. Dušan Drinka, PhD.\nMgr. Juraj Stodolovský'}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-gray-300 text-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-400">Telefón</h3>
              <p className="text-gray-300">{contactContent?.contactDetails?.phone || '+421 948 882 376'}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-gray-300 text-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-400">Email</h3>
              <p className="text-gray-300">{contactContent?.contactDetails?.email || 'dusan.drinka@smartsanit.sk'}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-gray-300 text-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-400">Adresa</h3>
              <p className="text-gray-300 whitespace-pre-line">{contactContent?.contactDetails?.address || 'Továrenská 14\n811 09 Bratislava'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
