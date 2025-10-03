import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Breadcrumbs from './ui/Breadcrumbs';
import NavBar from './layout/NavBar';
import CategoryTile from './ui/CategoryTile';
import { BatteryIcon, TapIcon, SinkIcon, ToiletIcon, ShowerIcon, BathtubIcon, BidetIcon, TilesIcon, LightingIcon } from './icons/CategoryIcons';

const Entrance = () => {
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState([]);

  // Animation for bullet points
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleItems([0, 1, 2, 3, 4, 5]);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
      <div className="pt-4 px-4 sm:px-6 lg:px-8 ml-0 tablet:ml-6 laptop:ml-14">
        <Breadcrumbs />
      </div>
      
      {/* Header Section */}
      <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-white space-y-4 text-xl tablet:text-2xl leading-relaxed text-left">
            <ul className="space-y-4">
              {[
                "Obchodujeme popredných svetových výrobcov v oblasti vybavenia kúpeľní, obkladov a dlažieb",
                "Podľa vašich požiadaviek vám vyskladáme kúpeľne z konkrétnych produktov od A po Z",
                "Spracujeme vám alternatívne riešenia s rôznymi cenovými hladinami",
                "Vyskladáme vám náročné sprchové, či vaňové zostavy batérií",
                "Zabezpečíme vám technickú podporu ku všetkým ponúkaným produktom",
                "Ponúkame vám dlhodobú spoluprácu založenú na odbornosti, spoľahlivosti a férovom prístupe"
              ].map((text, index) => (
                <li 
                  key={index}
                  className={`flex items-start gap-4 transform transition-all duration-500 ease-out ${
                    visibleItems.includes(index) 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-[-30px] opacity-0'
                  } hover:translate-x-1 cursor-default`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="mt-2 h-3.5 w-3.5 tablet:h-4 tablet:w-4 rounded-[4px] bg-blue-300 flex-shrink-0" />
                  <span className="hover:text-blue-100 transition-colors duration-200">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Categories Grid - Empty space for now */}
      <div className="pb-24 px-8 sm:px-12 lg:px-16 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Category tiles removed - empty space ready for new content */}
        </div>
      </div>
    </Layout>
  );
};

export default Entrance;
