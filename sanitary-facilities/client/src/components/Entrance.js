import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Breadcrumbs from './ui/Breadcrumbs';
import NavBar from './layout/NavBar';
import CategoryTile from './ui/CategoryTile';
import { BatteryIcon, TapIcon, SinkIcon, ToiletIcon, ShowerIcon, BathtubIcon, BidetIcon, TilesIcon, LightingIcon } from './icons/CategoryIcons';

const Entrance = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'battery',
      title: 'BATÉRIE',
      IconComponent: BatteryIcon,
      path: '/components/category/battery'
    },
    {
      id: 'tap',
      title: 'KOHÚTIKY',
      IconComponent: TapIcon,
      path: '/components/category/tap'
    },
    {
      id: 'sink',
      title: 'UMÝVADLÁ',
      IconComponent: SinkIcon,
      path: '/components/category/sink'
    },
    {
      id: 'toilet',
      title: 'TOALETY',
      IconComponent: ToiletIcon,
      path: '/components/category/toilet'
    },
    {
      id: 'shower',
      title: 'SPRCHOVACIE KÚTY',
      IconComponent: ShowerIcon,
      path: '/components/category/shower'
    },
    {
      id: 'bathtub',
      title: 'VANE',
      IconComponent: BathtubIcon,
      path: '/components/category/bathtub'
    },
    {
      id: 'bidet',
      title: 'BIDETY',
      IconComponent: BidetIcon,
      path: '/components/category/bidet'
    },
    {
      id: 'tiles',
      title: 'OBKLADY',
      IconComponent: TilesIcon,
      path: '/components/category/tiles'
    },
    {
      id: 'lighting',
      title: 'OSVETLENIE',
      IconComponent: LightingIcon,
      path: '/components/category/lighting'
    }
  ];

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <Layout>
      <NavBar />
      
      {/* Breadcrumbs */}
      <div className="pt-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>
      
      {/* Header Section */}
      <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
        </div>
      </div>

      {/* Categories Grid */}
      <div className="pb-24 px-8 sm:px-12 lg:px-16 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
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
    </Layout>
  );
};

export default Entrance;
