import React from 'react';

const CategoryTile = ({ 
  title, 
  IconComponent, 
  onClick, 
  className = '' 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative bg-white/5 backdrop-blur-sm text-white 
        p-8 rounded-lg cursor-pointer 
        transition-all duration-300 
        hover:bg-white/15
        hover:backdrop-blur-md
        hover:scale-105 transform hover:-translate-y-2
        flex flex-col items-center justify-center
        min-h-[200px] aspect-square
        group
        ${className}
      `}
      style={{
        boxShadow: `
          0 40px 80px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -10px rgba(0, 0, 0, 0.7),
          0 8px 16px -4px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(255, 255, 255, 0.08),
          inset 0 2px 4px rgba(255, 255, 255, 0.15),
          inset 0 -2px 4px rgba(0, 0, 0, 0.3)
        `,
        filter: 'drop-shadow(0 30px 40px rgba(0, 0, 0, 0.8))',
        transition: 'all 0.3s ease',
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `
          0 60px 120px -20px rgba(0, 0, 0, 0.95),
          0 30px 60px -10px rgba(0, 0, 0, 0.8),
          0 12px 24px -4px rgba(0, 0, 0, 0.6),
          0 0 0 1px rgba(255, 255, 255, 0.12),
          inset 0 3px 6px rgba(255, 255, 255, 0.2),
          inset 0 -3px 6px rgba(0, 0, 0, 0.4)
        `;
        e.currentTarget.style.filter = 'drop-shadow(0 40px 60px rgba(0, 0, 0, 0.9))';
        e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `
          0 40px 80px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -10px rgba(0, 0, 0, 0.7),
          0 8px 16px -4px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(255, 255, 255, 0.08),
          inset 0 2px 4px rgba(255, 255, 255, 0.15),
          inset 0 -2px 4px rgba(0, 0, 0, 0.3)
        `;
        e.currentTarget.style.filter = 'drop-shadow(0 30px 40px rgba(0, 0, 0, 0.8))';
        e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))';
      }}
      >
        {/* Icon */}
        <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
          {IconComponent && <IconComponent size={64} className="text-white group-hover:text-blue-200 transition-colors duration-300" />}
        </div>
        
        {/* Title */}
        <h3 className="text-lg md:text-xl font-medium tracking-wide uppercase text-center group-hover:text-blue-100 transition-colors duration-300">
          {title}
        </h3>
    </div>
  );
};

export default CategoryTile;
