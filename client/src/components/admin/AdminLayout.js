import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminLayout = ({ children, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { label: 'Hero Bannery', path: '/admin/hero-banners', icon: '🖼️' },
    { label: 'O nás', path: '/admin/who-we-are', icon: '👥' },
    { label: 'Čo ponúkame', path: '/admin/what-we-offer', icon: '💼' },
    { label: 'Obchodované značky', path: '/admin/brands', icon: '🏷️' },
    { label: 'Inšpirácie', path: '/admin/inspirations', icon: '💡' },
    { label: 'Inšpirácie - Text', path: '/admin/inspirations-content', icon: '📝' },
    { label: 'Referencie', path: '/admin/references', icon: '📋' },
    { label: 'Referencie - Text', path: '/admin/references-content', icon: '📝' },
    { label: 'Referencie - Galéria', path: '/admin/references-gallery', icon: '🖼️' },
    { label: 'Kontakt', path: '/admin/contact', icon: '📞' },
    { label: 'Kontaktné správy', path: '/admin/messages', icon: '📧' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    onLogout(false);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-black text-white transition-all duration-300 relative`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="Smart Sanit" className="h-8 w-auto" />
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded hover:bg-gray-700 transition-colors"
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors text-sm"
          >
            <span className="text-lg">🚪</span>
            {sidebarOpen && <span>Odhlásiť sa</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-gray-800 shadow-sm border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-white">
              Smart Sanit - Administrácia
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">
                Prihlásený ako: Dusan.drinka@smartsanit.sk
              </span>
              
              {/* Language Switcher */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => i18n.changeLanguage('sk')}
                  className={`text-sm font-medium transition-colors ${
                    i18n.language === 'sk'
                      ? 'text-gray-400'
                      : 'text-gray-500 hover:text-gray-400'
                  }`}
                >
                  SK
                </button>
                <span className="text-gray-500">|</span>
                <button
                  onClick={() => i18n.changeLanguage('en')}
                  className={`text-sm font-medium transition-colors ${
                    i18n.language === 'en'
                      ? 'text-gray-400'
                      : 'text-gray-500 hover:text-gray-400'
                  }`}
                >
                  EN
                </button>
              </div>
              
              <button
                onClick={() => navigate('/')}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                Zobraziť stránku →
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
