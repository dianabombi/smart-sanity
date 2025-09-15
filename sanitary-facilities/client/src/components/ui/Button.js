import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-medium tracking-wide uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-2xl hover:shadow-[0_20px_50px_rgba(255,255,255,0.4)] rounded-lg';
  
  const variants = {
    primary: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black shadow-[0_10px_30px_rgba(255,255,255,0.3)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.5)]',
    secondary: 'bg-transparent border border-white text-white hover:bg-white hover:text-black shadow-[0_8px_25px_rgba(255,255,255,0.25)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)]',
    ghost: 'text-white hover:text-gray-300 shadow-[0_8px_25px_rgba(156,163,175,0.3)] hover:shadow-[0_15px_40px_rgba(156,163,175,0.4)]'
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
