import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';
import ActionButton from './ui/ActionButton';
import BrandCard from './brands/BrandCard';
import BrandModal from './brands/BrandModal';
import ApiService from '../services/api';
import { useBackgroundSettings } from '../hooks/useBackgroundSettings';

const Brands = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [modalType, setModalType] = useState('gallery'); // 'gallery' or 'logo'
  const [pageDescription, setPageDescription] = useState('Spolupracujeme s poprednými svetovými výrobcami kúpeľňovej sanity, obkladov a dlažieb. Veríme, že naša ponuka dokáže uspokojiť aj tých najnáročnejších klientov.');
  const { settings: backgroundSettings, getBackgroundStyle, getBackgroundImageStyle } = useBackgroundSettings();

  const handleBrandClick = (brand, type) => {
    console.log('Opening brand modal:', brand.name, 'Type:', type);
    if (type === 'gallery' && brand.images && brand.images.length > 0) {
      console.log('Brand images:', brand.images);
      console.log('Brand images length:', brand.images?.length);
      
      // Log each image structure for debugging
      brand.images.forEach((image, index) => {
        console.log(`Image ${index + 1} structure:`, {
          url: image.url,
          dataUrl: image.dataUrl,
          path: image.path,
          src: image.src,
          filename: image.filename,
          originalName: image.originalName,
          fullObject: image
        });
      });
    }
    
    setSelectedBrand(brand);
    setModalType(type);
  };

  const closeBrandModal = () => {
    setSelectedBrand(null);
    setModalType('gallery');
  };


  const loadPageContent = useCallback(async () => {
    try {
      const result = await ApiService.getPageContent('brands', 'header', 'description');
      if (result.success && result.content) {
        setPageDescription(result.content);
      }
    } catch (error) {
      console.log('⚠️ PUBLIC: Failed to load page content, using fallback');
    }
  }, []);

  const loadBrands = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      console.log(`🔄 PUBLIC: Loading brands from database... ${forceRefresh ? '(FORCE REFRESH)' : ''}`);
      
      const result = await ApiService.getBrands();
      
      if (result.success && result.brands) {
        console.log(`✅ PUBLIC: Loaded ${result.brands.length} brands from database`);
        setBrands(result.brands);
      } else {
        console.error('❌ PUBLIC: Failed to load brands:', result.message);
        setBrands([]);
      }
    } catch (error) {
      console.error('❌ PUBLIC: Error loading brands:', error);
      setBrands([]);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    loadBrands();
    loadPageContent();
    
    // Auto-refresh brands every 30 seconds to catch admin changes
    const interval = setInterval(() => {
      console.log('🔄 PUBLIC: Auto-refreshing brands to catch admin changes...');
      loadBrands(true);
    }, 30000); // 30 seconds
    
    return () => clearInterval(interval);
  }, [loadBrands, loadPageContent]);


  console.log('🚀 PRODUCTION DEPLOYMENT - BRANDS LOADING:');
  console.log('- brands.length:', brands.length);
  console.log('- loading:', loading);
  console.log('- timestamp:', new Date().toISOString());
  console.log('- production_version: 2025-01-20-14:16-FINAL');
  console.log('- brands data:', brands.slice(0, 2)); // First 2 brands

  return (
    <Layout>
      <NavBar />
      
      
      {/* Header Section */}
      <div className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="leading-relaxed text-3xl tablet:text-4xl laptop:text-5xl font-bold text-gray-300 mb-4 mt-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
            Obchodované značky
          </h1>
          <p className="text-lg tablet:text-xl text-gray-300 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] max-w-3xl mx-auto leading-relaxed">
          {pageDescription}
          </p>
        </div>
      </div>

      {/* Main Brands Grid */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Image */}
        {backgroundSettings.brandsPageBackgroundImage && (
          <div className="absolute inset-0 -z-20" style={getBackgroundImageStyle()}></div>
        )}
        
        {/* Dynamic background pattern */}
        {backgroundSettings.brandsPagePattern && backgroundSettings.patternType !== 'none' && (
          <div className="absolute inset-0 -z-10" style={getBackgroundStyle()}></div>
        )}
        <div className="max-w-6xl mx-auto relative z-10">
          {console.log('🎨 Rendering brands. Total:', brands.length, 'Main brands:', brands.filter(brand => brand.is_main !== false).length, 'Other brands:', brands.filter(brand => brand.is_main === false).length)}
          

          {/* Main Brands Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {brands.filter(brand => brand.is_main !== false).map((brand, index) => (
              <BrandCard
                key={brand.id || brand._id || index}
                brand={brand}
                index={index}
                onClick={handleBrandClick}
                variant="main"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Ostatné Section */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Image */}
        {backgroundSettings.brandsPageBackgroundImage && (
          <div className="absolute inset-0 -z-20" style={getBackgroundImageStyle()}></div>
        )}
        
        {/* Dynamic background pattern */}
        {backgroundSettings.brandsPagePattern && backgroundSettings.patternType !== 'none' && (
          <div className="absolute inset-0 -z-10" style={getBackgroundStyle()}></div>
        )}
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-2xl tablet:text-3xl font-bold text-gray-300 mb-4 text-center tracking-wide opacity-100 translate-y-0">
            Ostatné
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto text-center mb-8 opacity-100 translate-y-0">
            Ďalší producenti, ktorých vám vieme ponúknuť
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {brands.filter(brand => brand.is_main === false || brand.category === 'Ostatné').map((brand, index) => (
              <BrandCard
                key={brand.id || brand._id || index}
                brand={brand}
                index={index}
                onClick={handleBrandClick}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Button Section */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <ActionButton
            size="xl"
            variant="secondary"
            onClick={() => navigate('/contact')}
            className="min-w-[200px]"
          >
            Kontaktujte nás
          </ActionButton>
        </div>
      </div>

      {/* Brand Modal */}
      <BrandModal
        brand={selectedBrand}
        isOpen={!!selectedBrand}
        onClose={closeBrandModal}
        type={modalType}
      />

    </Layout>
  );
};

export default Brands;
