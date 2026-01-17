import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminBrands from './admin/AdminBrands';
import AdminWhoWeAre from './admin/AdminWhoWeAre';
import AdminWhatWeOffer from './admin/AdminWhatWeOffer';
import AdminMessages from './admin/AdminMessages';
import AdminHeroBanners from './admin/AdminHeroBanners';
import AdminReferences from './admin/AdminReferences';
import AdminReferencesContent from './admin/AdminReferencesContent';
import AdminReferenceGallery from './admin/AdminReferenceGallery';
import AdminContact from './admin/AdminContact';
import AdminInspirations from './admin/AdminInspirations';
import AdminInspirationsContent from './admin/AdminInspirationsContent';
import MigrateBrandImages from './admin/MigrateBrandImages';

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
      <Route path="/messages" element={<AdminMessages onLogout={handleLogout} />} />
      <Route path="/hero-banners" element={<AdminHeroBanners onLogout={handleLogout} />} />
      <Route path="/inspirations" element={<AdminInspirations onLogout={handleLogout} />} />
      <Route path="/inspirations-content" element={<AdminInspirationsContent onLogout={handleLogout} />} />
      <Route path="/references" element={<AdminReferences onLogout={handleLogout} />} />
      <Route path="/references-content" element={<AdminReferencesContent onLogout={handleLogout} />} />
      <Route path="/references-gallery" element={<AdminReferenceGallery onLogout={handleLogout} />} />
      <Route path="/contact" element={<AdminContact onLogout={handleLogout} />} />
      <Route path="/migrate-images" element={<MigrateBrandImages />} />
    </Routes>
  );
};

export default Admin;
