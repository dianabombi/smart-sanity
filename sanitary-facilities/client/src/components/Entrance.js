import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Navigation from './layout/Navigation';
import NavBar from './layout/NavBar';
import CategoryTile from './ui/CategoryTile';
import { BatteryIcon, TapIcon, SinkIcon, ToiletIcon, ShowerIcon, BathtubIcon } from './icons/CategoryIcons';

const Entrance = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'battery',
      title: 'BATTERY',
      IconComponent: BatteryIcon,
      path: '/category/battery'
    },
    {
      id: 'tap',
      title: 'TAP',
      IconComponent: TapIcon,
      path: '/category/tap'
    },
    {
      id: 'sink',
      title: 'SINK',
      IconComponent: SinkIcon,
      path: '/category/sink'
    },
    {
      id: 'toilet',
      title: 'TOILET',
      IconComponent: ToiletIcon,
      path: '/category/toilet'
    },
    {
      id: 'shower',
      title: 'SHOWER',
      IconComponent: ShowerIcon,
      path: '/category/shower'
    },
    {
      id: 'bathtub',
      title: 'BATHTUB',
      IconComponent: BathtubIcon,
      path: '/category/bathtub'
    }
  ];

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <Layout>
      <NavBar />
      
      {/* Header Section */}
      <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg text-white opacity-80 max-w-2xl mx-auto leading-relaxed">
            Select a category to explore our sanitary facilities and solutions
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category) => (
              <CategoryTile
                key={category.id}
                title={category.title}
                IconComponent={category.IconComponent}
                onClick={() => handleCategoryClick(category.path)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Back to Home Button - Moved to bottom */}
      <div className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Navigation showBackButton={true} />
        </div>
      </div>
    </Layout>
  );
};

export default Entrance;
