import React from 'react';
import AdminLayout from './AdminLayout';

const AdminDashboard = ({ onLogout }) => {
  const stats = [
    { label: 'Značky', value: '10', icon: '🏷️', color: 'bg-blue-500' },
    { label: 'Referencie', value: '25', icon: '📋', color: 'bg-green-500' },
    { label: 'Inšpirácie', value: '15', icon: '💡', color: 'bg-purple-500' },
    { label: 'Kontakty', value: '5', icon: '📞', color: 'bg-orange-500' }
  ];

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Vitajte v admin paneli
          </h2>
          <p className="text-gray-300">
            Spravujte obsah vašej Smart Sanit webstránky jednoducho a efektívne.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Rýchle akcie
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="flex items-center p-4 bg-blue-900/30 hover:bg-blue-800/40 rounded-lg transition-colors border border-blue-700/50">
              <span className="text-2xl mr-3">🏷️</span>
              <div className="text-left">
                <p className="font-medium text-white">Spravovať značky</p>
                <p className="text-sm text-gray-300">Pridať alebo upraviť značky</p>
              </div>
            </button>
            
            <button className="flex items-center p-4 bg-green-900/30 hover:bg-green-800/40 rounded-lg transition-colors border border-green-700/50">
              <span className="text-2xl mr-3">📋</span>
              <div className="text-left">
                <p className="font-medium text-white">Pridať referenciu</p>
                <p className="text-sm text-gray-300">Nová referencia projektu</p>
              </div>
            </button>
            
            <button className="flex items-center p-4 bg-purple-900/30 hover:bg-purple-800/40 rounded-lg transition-colors border border-purple-700/50">
              <span className="text-2xl mr-3">💡</span>
              <div className="text-left">
                <p className="font-medium text-white">Pridať inšpiráciu</p>
                <p className="text-sm text-gray-300">Nová inšpirácia pre klientov</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Posledná aktivita
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-700 rounded-lg">
              <span className="text-lg mr-3">✅</span>
              <div>
                <p className="text-sm font-medium text-white">Systém úspešne spustený</p>
                <p className="text-xs text-gray-400">Práve teraz</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-700 rounded-lg">
              <span className="text-lg mr-3">🔧</span>
              <div>
                <p className="text-sm font-medium text-white">Admin panel pripravený na použitie</p>
                <p className="text-xs text-gray-400">Práve teraz</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
