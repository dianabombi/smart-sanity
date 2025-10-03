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
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Vitajte v admin paneli
          </h2>
          <p className="text-gray-600">
            Spravujte obsah vašej Smart Sanit webstránky jednoducho a efektívne.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Rýchle akcie
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <span className="text-2xl mr-3">🏷️</span>
              <div className="text-left">
                <p className="font-medium text-gray-800">Spravovať značky</p>
                <p className="text-sm text-gray-600">Pridať alebo upraviť značky</p>
              </div>
            </button>
            
            <button className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <span className="text-2xl mr-3">📋</span>
              <div className="text-left">
                <p className="font-medium text-gray-800">Pridať referenciu</p>
                <p className="text-sm text-gray-600">Nová referencia projektu</p>
              </div>
            </button>
            
            <button className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <span className="text-2xl mr-3">💡</span>
              <div className="text-left">
                <p className="font-medium text-gray-800">Pridať inšpiráciu</p>
                <p className="text-sm text-gray-600">Nová inšpirácia pre klientov</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Posledná aktivita
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-lg mr-3">✅</span>
              <div>
                <p className="text-sm font-medium text-gray-800">Systém úspešne spustený</p>
                <p className="text-xs text-gray-600">Práve teraz</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-lg mr-3">🔧</span>
              <div>
                <p className="text-sm font-medium text-gray-800">Admin panel pripravený na použitie</p>
                <p className="text-xs text-gray-600">Práve teraz</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
