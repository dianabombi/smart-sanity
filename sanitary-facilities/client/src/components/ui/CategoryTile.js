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
        bg-transparent border-2 border-white text-white 
        p-8 rounded-lg cursor-pointer 
        transition-all duration-300 
        hover:bg-white hover:text-black 
        shadow-[0_10px_30px_rgba(255,255,255,0.2)] 
        hover:shadow-[0_20px_50px_rgba(255,255,255,0.4)]
        hover:scale-105 transform
        flex flex-col items-center justify-center
        min-h-[200px] aspect-square
        ${className}
      `}
    >
      {/* Icon */}
      <div className="mb-4">
        {IconComponent && <IconComponent size={64} className="text-white" />}
      </div>
      
      {/* Title */}
      <h3 className="text-lg md:text-xl font-medium tracking-wide uppercase text-center">
        {title}
      </h3>
    </div>
  );
};

export default CategoryTile;
