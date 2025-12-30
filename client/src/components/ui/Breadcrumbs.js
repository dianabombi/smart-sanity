import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Breadcrumbs = () => {
  const location = useLocation();
  const { t } = useTranslation();
  let pathnames = location.pathname.split('/').filter((x) => x);
  
  const getBreadcrumbLabel = (pathname) => {
    const labelMap = {
      '': 'breadcrumbs.home',
      'what-we-offer': 'breadcrumbs.whatWeOffer',
      'who-we-are': 'breadcrumbs.whoWeAre',
      'contact': 'breadcrumbs.contact',
      'brands': 'breadcrumbs.brands',
      'references': 'breadcrumbs.references',
      'inspirations': 'breadcrumbs.inspirations',
      'category': 'breadcrumbs.category',
      'battery': 'breadcrumbs.battery',
      'tap': 'breadcrumbs.tap',
      'sink': 'breadcrumbs.sink',
      'toilet': 'breadcrumbs.toilet',
      'shower': 'breadcrumbs.shower',
      'bathtub': 'breadcrumbs.bathtub'
    };
    return t(labelMap[pathname] || pathname);
  };

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-gray-400 text-lg">
      {/* Home link */}
      <Link 
        to="/" 
        className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
      >
        {t('breadcrumbs.home')}
      </Link>
      
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = getBreadcrumbLabel(pathname);
        
        return (
          <React.Fragment key={pathname}>
            <span className="text-gray-500">{'>'}</span>
            {isLast ? (
              <span className="text-gray-300 font-medium">{label}</span>
            ) : (
              <Link 
                to={routeTo}
                className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
