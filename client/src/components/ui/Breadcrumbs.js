import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  let pathnames = location.pathname.split('/').filter((x) => x);
  
  // Add 'components' as middle step for About Us, Brands, and Contact pages
  if (['who-we-are', 'contact', 'brands'].includes(pathnames[0])) {
    pathnames = ['components', ...pathnames];
  }

  // Define breadcrumb labels in Slovak
  const breadcrumbLabels = {
    '': 'Domov',
    'components': 'Komponenty',
    'who-we-are': 'O nás',
    'contact': 'Kontakt',
    'brands': 'Značky',
    'category': 'Kategória',
    'battery': 'Batérie',
    'tap': 'Kohútik',
    'sink': 'Umývadlo',
    'toilet': 'Toaleta',
    'shower': 'Sprcha',
    'bathtub': 'Vaňa'
  };

  const getBreadcrumbLabel = (pathname) => {
    return breadcrumbLabels[pathname] || pathname;
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
        Domov
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
