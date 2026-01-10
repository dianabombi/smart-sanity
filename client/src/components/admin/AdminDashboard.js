import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import apiService from '../../services/api';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { label: 'Značky', value: '0', icon: '🏷️', color: 'bg-blue-500' },
    { label: 'Referencie', value: '0', icon: '📋', color: 'bg-green-500' },
    { label: 'Inšpirácie', value: '0', icon: '💡', color: 'bg-purple-500' },
    { label: 'Kontakty', value: '0', icon: '📞', color: 'bg-orange-500' }
  ]);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
    loadRecentActivity();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await apiService.getDashboardStats();
      
      if (response.success) {
        setStats([
          { label: 'Značky', value: response.stats.brands.toString(), icon: '🏷️', color: 'bg-blue-500' },
          { label: 'Referencie', value: response.stats.references.toString(), icon: '📋', color: 'bg-green-500' },
          { label: 'Inšpirácie', value: response.stats.inspirations.toString(), icon: '💡', color: 'bg-purple-500' },
          { label: 'Kontakty', value: response.stats.contacts.toString(), icon: '📞', color: 'bg-orange-500' }
        ]);
      }
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecentActivity = async () => {
    try {
      setActivityLoading(true);
      const response = await apiService.getRecentActivity();
      
      if (response.success) {
        setRecentActivity(response.activities);
      }
    } catch (error) {
      console.error('Error loading recent activity:', error);
    } finally {
      setActivityLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Práve teraz';
    if (diffInMinutes < 60) return `Pred ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `Pred ${Math.floor(diffInMinutes / 60)} h`;
    return `Pred ${Math.floor(diffInMinutes / 1440)} dňami`;
  };

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
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700 animate-pulse">
                <div className="flex items-center">
                  <div className="bg-gray-600 rounded-lg p-3 mr-4 w-14 h-14"></div>
                  <div>
                    <div className="h-4 bg-gray-600 rounded w-16 mb-2"></div>
                    <div className="h-8 bg-gray-600 rounded w-8"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            stats.map((stat, index) => (
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
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Rýchle akcie
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button 
              onClick={() => navigate('/admin/brands')}
              className="flex items-center p-4 bg-blue-900/30 hover:bg-blue-800/40 rounded-lg transition-colors border border-blue-700/50"
            >
              <span className="text-2xl mr-3">🏷️</span>
              <div className="text-left">
                <p className="font-medium text-white">Spravovať značky</p>
                <p className="text-sm text-gray-300">Pridať alebo upraviť značky</p>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/admin/references')}
              className="flex items-center p-4 bg-green-900/30 hover:bg-green-800/40 rounded-lg transition-colors border border-green-700/50"
            >
              <span className="text-2xl mr-3">📋</span>
              <div className="text-left">
                <p className="font-medium text-white">Pridať referenciu</p>
                <p className="text-sm text-gray-300">Nová referencia projektu</p>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/admin/inspirations')}
              className="flex items-center p-4 bg-purple-900/30 hover:bg-purple-800/40 rounded-lg transition-colors border border-purple-700/50"
            >
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
            {activityLoading ? (
              // Loading skeleton for activities
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-700 rounded-lg animate-pulse">
                  <div className="w-6 h-6 bg-gray-600 rounded mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-600 rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-600 rounded w-1/4"></div>
                  </div>
                </div>
              ))
            ) : (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center p-3 bg-gray-700 rounded-lg">
                  <span className="text-lg mr-3">{activity.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{activity.message}</p>
                    <p className="text-xs text-gray-400">{formatTimestamp(activity.timestamp)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
