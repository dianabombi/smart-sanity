import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';
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
  const [skeletonCount, setSkeletonCount] = useState(8); // Default skeleton count for brands
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
        // Set skeleton count based on actual data
        setSkeletonCount(result.brands.length || 8);
        setBrands(result.brands);
      } else {
        console.error('❌ PUBLIC: Failed to load brands:', result.message);
        setSkeletonCount(0); // No skeletons if no data
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

  if (loading) {
    return (
      <Layout>
        {/* Custom CSS for shimmer animation */}
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
        `}</style>
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

        {/* Skeleton Grid */}
        <div className="pb-16 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {Array.from({ length: skeletonCount }, (_, index) => (
                <div key={index} className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 relative pb-16" style={{ opacity: 1 }}>
                  {/* Logo Container Skeleton */}
                  <div className="p-4 mb-4 h-24 flex items-center justify-center">
                    <div className="h-16 w-32 bg-gray-700 rounded animate-pulse relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                    </div>
                  </div>

                  {/* Brand Info Skeleton */}
                  <div className="space-y-3">
                    {/* Brand name skeleton */}
                    <div className="h-5 bg-gray-700 rounded w-3/4 animate-pulse relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                    </div>
                    
                    {/* Category skeleton */}
                    <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                    </div>
                    
                    {/* Description skeleton */}
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-700 rounded w-full animate-pulse relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                      </div>
                      <div className="h-3 bg-gray-700 rounded w-5/6 animate-pulse relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                      </div>
                      <div className="h-3 bg-gray-700 rounded w-2/3 animate-pulse relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                      </div>
                    </div>

                    {/* Button skeleton - Fixed Position */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="h-8 bg-gray-700 rounded-lg animate-pulse relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <NavBar />
      
      
      {/* Header Section */}
      <div className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="leading-relaxed text-3xl tablet:text-4xl laptop:text-5xl font-bold text-gray-300 mb-4 mt-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
            Obchodované značky
          </h1>
          <p className="text-lg tablet:text-xl text-gray-300 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] max-w-3xl mx-auto leading-relaxed mt-5">
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
          <button 
            onClick={() => navigate('/contact')}
            className="py-2 px-4 border border-gray-400 text-gray-300 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-sm w-full max-w-xs"
          >
            Kontaktujte nás
          </button>
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
