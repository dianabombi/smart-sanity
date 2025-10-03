import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminBrands from './admin/AdminBrands';
import AdminWhoWeAre from './admin/AdminWhoWeAre';
import AdminWhatWeOffer from './admin/AdminWhatWeOffer';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authState = localStorage.getItem('adminAuth');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (authState) => {
    setIsAuthenticated(authState);
  };

  const handleLogout = (authState) => {
    setIsAuthenticated(authState);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Načítavam...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/dashboard" element={<AdminDashboard onLogout={handleLogout} />} />
      <Route path="/brands" element={<AdminBrands onLogout={handleLogout} />} />
      <Route path="/who-we-are" element={<AdminWhoWeAre onLogout={handleLogout} />} />
      <Route path="/what-we-offer" element={<AdminWhatWeOffer onLogout={handleLogout} />} />
      <Route path="/inspirations" element={
        <AdminDashboard onLogout={handleLogout}>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Inšpirácie - Správa obsahu</h2>
            <p className="text-gray-600">Táto sekcia bude pridaná v budúcnosti.</p>
          </div>
        </AdminDashboard>
      } />
      <Route path="/references" element={
        <AdminDashboard onLogout={handleLogout}>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Referencie - Správa obsahu</h2>
            <p className="text-gray-600">Táto sekcia bude pridaná v budúcnosti.</p>
          </div>
        </AdminDashboard>
      } />
      <Route path="/contact" element={
        <AdminDashboard onLogout={handleLogout}>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Kontakt - Správa obsahu</h2>
            <p className="text-gray-600">Táto sekcia bude pridaná v budúcnosti.</p>
          </div>
        </AdminDashboard>
      } />
    </Routes>
  );
};

export default Admin;
