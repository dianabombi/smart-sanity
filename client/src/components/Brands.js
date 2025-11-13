import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';
import BrandCard from './brands/BrandCard';
import ApiService from '../services/api';
import { useBackgroundSettings } from '../hooks/useBackgroundSettings';

// Create a module-level cache to survive React Strict Mode remounts
// This prevents the loading skeleton from showing twice during development
// React Strict Mode intentionally mounts/unmounts/remounts components
// The cache persists across remounts, so the second mount shows cached data instantly
const dataCache = {
  brands: null,
  pageDescription: null,
  isLoaded: false
};

const Brands = () => {
  const navigate = useNavigate();
  // Initialize from cache if available
  const [brands, setBrands] = useState(dataCache.brands || []);
  const [pageDescription, setPageDescription] = useState(
    dataCache.pageDescription || 'Objavte našu ponuku prémiových značiek pre kúpeľne, interiér i exteriér.'
  );
  const { settings: backgroundSettings, getBackgroundImageStyle, refreshSettings } = useBackgroundSettings();
  const isMountedRef = useRef(false); // Prevent double loading
  
  // Auto-refresh background settings every 3 seconds to pick up admin changes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshSettings();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [refreshSettings]);

  const handleBrandClick = (brand) => {
    console.log('Navigating to brand detail:', brand.name);
    // Create URL-friendly brand identifier
    const brandId = brand.id || brand._id || brand.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/brands/${brandId}`);
  };


  const loadPageContent = useCallback(async () => {
    try {
      const result = await ApiService.getPageContent('brands', 'header', 'description');
      if (result.success && result.content) {
        setPageDescription(result.content);
        dataCache.pageDescription = result.content; // Update cache
      }
    } catch (error) {
      console.log('⚠️ PUBLIC: Failed to load page content, using fallback');
    }
  }, []);

  const loadBrands = useCallback(async () => {
    try {
      const result = await ApiService.getBrands();
      
      if (result.success && result.brands) {
        setBrands(result.brands);
        // Update cache
        dataCache.brands = result.brands;
        dataCache.isLoaded = true;
      } else {
        console.error('❌ PUBLIC: Failed to load brands:', result.message);
        setBrands([]);
      }
    } catch (error) {
      console.error('❌ PUBLIC: Error loading brands:', error);
      setBrands([]);
    }
  }, []);


  useEffect(() => {
    // Prevent double loading in React Strict Mode
    if (isMountedRef.current) {
      return;
    }
    
    isMountedRef.current = true;
    let isActive = true; // Track if component is still mounted
    
    const loadData = async () => {
      try {
        await Promise.all([loadBrands(), loadPageContent()]);
      } catch (error) {
        if (isActive) {
          console.error('❌ BRANDS: Error loading data:', error);
        }
      }
    };
    
    loadData();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isActive = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  // Debug logs commented out to improve performance
  // console.log('🚀 PRODUCTION DEPLOYMENT - BRANDS LOADING:');
  // console.log('- brands.length:', brands.length);
  // console.log('- loading:', loading);
  // console.log('- timestamp:', new Date().toISOString());
  // console.log('- production_version: 2025-01-20-14:16-FINAL');
  // console.log('- brands data:', brands.slice(0, 2)); // First 2 brands

  // Removed skeleton loading state - show content immediately

  // Debug background settings
  const bgImageStyle = backgroundSettings.brandsPageBackgroundImage 
    ? getBackgroundImageStyle(backgroundSettings.brandsPageBackgroundImage, 'brands')
    : null;
  
  console.log('🎨 BRANDS PAGE DEBUG:', {
    'Has Background Image?': !!backgroundSettings.brandsPageBackgroundImage,
    'Image URL Length': backgroundSettings.brandsPageBackgroundImage?.length || 0,
    'Image Preview (first 50 chars)': backgroundSettings.brandsPageBackgroundImage?.substring(0, 50) || 'NO IMAGE',
    'Pattern Enabled?': backgroundSettings.brandsPagePattern,
    'Pattern Type': backgroundSettings.patternType,
    'Pattern Opacity': backgroundSettings.patternOpacity,
    'Background Image Style Applied': bgImageStyle,
    'All Settings': backgroundSettings
  });

  return (
    <>
      {/* Full Page Background Image - Only uploaded image, no pattern */}
      {backgroundSettings.brandsPageBackgroundImage && (
        <div 
          className="fixed inset-0 bg-black"
          style={{
            ...getBackgroundImageStyle(backgroundSettings.brandsPageBackgroundImage, 'brands'),
            pointerEvents: 'none',
            zIndex: 0
          }}
        ></div>
      )}
      
      <Layout>
        <NavBar />
      
      {/* Header Section */}
      <div className="pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="leading-relaxed text-3xl tablet:text-4xl laptop:text-5xl font-bold text-gray-300 mb-4 mt-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
            Obchodované značky
          </h1>
          <p className="text-lg tablet:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-5 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
          {pageDescription}
          </p>
        </div>
      </div>

      {/* Main Brands Grid */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto relative">
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

      {/* Ostatné Section - Only show if there are brands in this category */}
      {brands.filter(brand => brand.is_main === false || brand.category === 'Ostatné').length > 0 && (
        <div className="pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
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
      )}

      {/* Call to Action Button Section */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <button 
            onClick={() => navigate('/contact')}
            className="py-2 px-4 border border-gray-400 text-gray-300 rounded-lg hover:border-white hover:text-white transition-colors duration-200 bg-transparent text-sm w-full max-w-xs"
          >
            Kontaktujte nás
          </button>
        </div>
      </div>

      </Layout>
    </>
  );
};

export default Brands;
