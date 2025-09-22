import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-medium tracking-wide uppercase transition-all duration-300 focus:outline-none rounded-lg';
  
  const variants = {
    primary: 'bg-black border-2 border-white text-white hover:bg-gray-900 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.1),inset_2px_2px_6px_rgba(0,0,0,0.8)] hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.1),inset_1px_1px_3px_rgba(0,0,0,0.8)]',
    secondary: 'bg-black border border-white text-white hover:bg-gray-900 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.1),inset_2px_2px_6px_rgba(0,0,0,0.8)] hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.1),inset_1px_1px_3px_rgba(0,0,0,0.8)]',
    ghost: 'text-white hover:text-gray-300 bg-black shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.1),inset_2px_2px_6px_rgba(0,0,0,0.8)]'
  };
  
  const sizes = {
    small: 'px-6 py-2 text-sm',
    medium: 'px-8 py-3 text-base',
    large: 'px-12 py-4 text-lg min-w-[200px]'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button 
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
