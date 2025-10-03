import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { label: 'O nás', path: '/admin/who-we-are', icon: '👥' },
    { label: 'Čo ponúkame', path: '/admin/what-we-offer', icon: '🛠️' },
    { label: 'Obchodované značky', path: '/admin/brands', icon: '🏷️' },
    { label: 'Inšpirácie', path: '/admin/inspirations', icon: '💡' },
    { label: 'Referencie', path: '/admin/references', icon: '📋' },
    { label: 'Kontakt', path: '/admin/contact', icon: '📞' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    onLogout(false);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
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
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
          >
            <span className="text-lg">🚪</span>
            {sidebarOpen && <span>Odhlásiť sa</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">
              Smart Sanit - Administrácia
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Prihlásený ako: Dusan.drinka@smartsanit.sk
              </span>
              <button
                onClick={() => navigate('/')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Zobraziť stránku →
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
