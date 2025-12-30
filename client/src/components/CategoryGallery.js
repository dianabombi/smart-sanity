import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar';

const CategoryGallery = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getCategoryTitle = () => t(`categories.${category}`) || 'GALLERY';
  const getCategoryDescription = () => t(`categories.${category}Desc`) || 'Explore our collection of sanitary facilities.';

  return (
    <Layout>
      <NavBar />
      
      
      {/* Header Section */}
      <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Arrow */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 group"
            style={{ transform: 'translateX(-60px)' }}
            title={t('common.back')}
          >
            <img 
              src="/right-chevron.png" 
              alt="Späť" 
              className="h-12 scale-90 rotate-180 drop-shadow-lg brightness-[0.6] group-hover:brightness-100"
              style={{ 
                filter: 'brightness(0.6) invert(0.6)', 
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.filter = 'brightness(1) invert(1)'}
              onMouseLeave={(e) => e.target.style.filter = 'brightness(0.6) invert(0.6)'}
            />
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light text-gray-300 mb-6 tracking-wide">
              {getCategoryTitle()}
            </h1>
            <p className="text-lg text-gray-300 opacity-80 max-w-2xl mx-auto leading-relaxed">
              {getCategoryDescription()}
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid - Empty space for now */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Tiles removed - empty space ready for new content */}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryGallery;
