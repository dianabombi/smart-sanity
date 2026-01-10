import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

// Brands that should appear only as logos in the Ostatne section
const LOGO_ONLY_BRANDS = ['tres', 'alca', 'kludi', 'keuco', 'hansgrohe', 'huppe', 'hüppe', 'kaldewei'];

// Brands that should appear as main cards AND also be listed as logos in Ostatne
const ALSO_IN_OSTATNE_BRANDS = ['axor', 'dornbracht', 'laufen'];

const Brands = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Initialize with cache only - NO fallback brands
  const [brands, setBrands] = useState(dataCache.brands || []);
  const [pageDescription, setPageDescription] = useState(
    dataCache.pageDescription || t('brands.description')
  );
  const [visible, setVisible] = useState(false);
  const { settings: backgroundSettings, getBackgroundImageStyle, refreshSettings } = useBackgroundSettings();
  
  // Auto-refresh background settings every 30 seconds to pick up admin changes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshSettings();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [refreshSettings]);

  const handleBrandClick = (brand) => {
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
      // Silently use fallback
    }
  }, []);

  const loadBrands = useCallback(async () => {
    try {
      const result = await ApiService.getBrandsLight();
      
      if (result.success && result.brands) {
        setBrands(result.brands);
        // Update cache
        dataCache.brands = result.brands;
        dataCache.isLoaded = true;
      }
    } catch (error) {
      console.error('❌ Error loading brands (light):', error);
    } finally {
      // Wait for DOM to render before triggering animation
      requestAnimationFrame(() => {
        setTimeout(() => {
          setVisible(true);
        }, 150);
      });
    }
  }, []);


  useEffect(() => {
    // Load brands immediately on mount
    if (!dataCache.isLoaded) {
      loadBrands();
    } else {
      // Wait for DOM to render before triggering animation (even for cached data)
      requestAnimationFrame(() => {
        setTimeout(() => {
          setVisible(true);
        }, 150);
      });
    }
    loadPageContent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



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
      <div className="pb-10 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className={`leading-relaxed text-3xl tablet:text-4xl laptop:text-5xl font-bold text-gray-300 mb-6 mt-8 tracking-wide ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transition: 'all 0.8s ease-out',
            transitionDelay: '0.2s'
          }}>
            {t('brands.pageTitle')}
          </h1>
          <p className={`text-lg tablet:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-5 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transition: 'all 0.8s ease-out',
            transitionDelay: '0.4s'
          }}>
          {pageDescription}
          </p>
        </div>
      </div>

      {/* Main Brands Grid */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto relative" style={{ minHeight: '800px' }}>
          {/* Main Brands Section - Show real brands only (excluding logo-only ones) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {brands
              .filter(brand => {
                const name = (brand.name || '').toLowerCase();
                return (
                  brand.is_main !== false &&
                  !LOGO_ONLY_BRANDS.includes(name) &&
                  !ALSO_IN_OSTATNE_BRANDS.includes(name)
                );
              })
              .map((brand, index) => (
              <div
                key={brand.id || brand._id || index}
                className={visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                style={{
                  transition: 'all 0.8s ease-out',
                  transitionDelay: `${0.6 + index * 0.1}s`
                }}
              >
                <BrandCard
                  brand={brand}
                  index={index}
                  onClick={handleBrandClick}
                  variant="main"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ostatné Section - Only show if there are brands in this category, logo-only brands, or extra brands */}
      {brands.filter(brand => {
        const name = (brand.name || '').toLowerCase();
        return (
          brand.is_main === false ||
          brand.category === 'Ostatné' ||
          LOGO_ONLY_BRANDS.includes(name) ||
          ALSO_IN_OSTATNE_BRANDS.includes(name)
        );
      }).length > 0 && (
        <div className="pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="bg-black/30 border-gray-600 rounded-lg px-4 sm:px-8 py-8" style={{ opacity: 1, borderWidth: '0.5px' }}>
              <h2 className="text-2xl tablet:text-3xl font-bold text-gray-300 mb-6 text-center tracking-wide">
                Ostatné
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto text-center mb-8">
                Ďalší producenti, ktorých vám vieme ponúknuť
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 items-center">
                {brands
                  .filter(brand => {
                    const name = (brand.name || '').toLowerCase();
                    return (
                      brand.is_main === false ||
                      brand.category === 'Ostatné' ||
                      LOGO_ONLY_BRANDS.includes(name) ||
                      ALSO_IN_OSTATNE_BRANDS.includes(name)
                    );
                  })
                  .map((brand, index) => (
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
        </div>
      )}

      {/* Call to Action Button Section */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <button 
            onClick={() => navigate('/contact')}
            className="py-2 px-4 border-gray-600 text-gray-300 rounded-lg hover:text-white transition-colors duration-500 bg-black/30 hover:bg-black/50 text-sm w-full max-w-xs"
            style={{ borderWidth: '0.5px' }}
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
