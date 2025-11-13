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
  const [loading, setLoading] = useState(!dataCache.isLoaded);
  const [pageDescription, setPageDescription] = useState(
    dataCache.pageDescription || 'Objavte našu ponuku prémiových značiek pre kúpeľne, interiér i exteriér.'
  );
  const [skeletonCount, setSkeletonCount] = useState(dataCache.brands?.length || 8);
  const { settings: backgroundSettings, getBackgroundStyle, getBackgroundImageStyle } = useBackgroundSettings();
  const isMountedRef = useRef(false); // Prevent double loading

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

  const loadBrands = useCallback(async (forceRefresh = false, silent = false) => {
    try {
      // Only show loading state on initial load, not on background refresh
      if (!silent) {
        setLoading(true);
      }
      
      const result = await ApiService.getBrands();
      
      if (result.success && result.brands) {
        // Set skeleton count based on actual data
        setSkeletonCount(result.brands.length || 8);
        setBrands(result.brands);
        // Update cache
        dataCache.brands = result.brands;
        dataCache.isLoaded = true;
      } else {
        console.error('❌ PUBLIC: Failed to load brands:', result.message);
        if (!silent) {
          setSkeletonCount(0); // No skeletons if no data
          setBrands([]);
        }
      }
    } catch (error) {
      console.error('❌ PUBLIC: Error loading brands:', error);
      if (!silent) {
        setBrands([]);
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
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
        
        {/* Header Section - No text during loading to prevent double animation */}
        <div className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            {/* Skeleton placeholders for title and description */}
            <div className="h-12 bg-gray-700 rounded w-2/3 mx-auto mb-4 mt-8 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
            </div>
            <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
            </div>
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

  // Debug background settings
  console.log('🎨 BRANDS PAGE DEBUG:', {
    'Has Background Image?': !!backgroundSettings.brandsPageBackgroundImage,
    'Image URL Length': backgroundSettings.brandsPageBackgroundImage?.length || 0,
    'Image Preview (first 50 chars)': backgroundSettings.brandsPageBackgroundImage?.substring(0, 50) || 'NO IMAGE',
    'Pattern Enabled?': backgroundSettings.brandsPagePattern,
    'Pattern Type': backgroundSettings.patternType,
    'Pattern Opacity': backgroundSettings.patternOpacity,
    'All Settings': backgroundSettings
  });

  return (
    <Layout>
      {/* Full Page Background Image */}
      {backgroundSettings.brandsPageBackgroundImage && (
        <div 
          className="fixed inset-0" 
          style={{
            ...getBackgroundImageStyle(backgroundSettings.brandsPageBackgroundImage, 'brands'),
            pointerEvents: 'none',
            zIndex: -20
          }}
        ></div>
      )}
      
      {/* Dynamic background pattern - only show with background image */}
      {backgroundSettings.brandsPageBackgroundImage && backgroundSettings.brandsPagePattern && backgroundSettings.patternType !== 'none' && (
        <div className="fixed inset-0" style={{
          ...getBackgroundStyle('brands'),
          zIndex: -10
        }}></div>
      )}
      
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

      {/* Ostatné Section */}
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
  );
};

export default Brands;
