import React from 'react';

const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
  padding = 'default'
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8'
  };

  const baseClasses = `bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg transition-all duration-500 ${paddingClasses[padding]}`;
  
  const hoverClasses = hover 
    ? 'hover:bg-white/10 hover:border-blue-500/50 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer'
    : '';

  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
