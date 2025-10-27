import React from 'react';

const ActionButton = ({ 
  children, 
  onClick, 
  className = '', 
  size = 'large',
  variant = 'primary',
  ...props 
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50';
  
  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-6 py-4 text-lg',
    xl: 'px-1 py-3 text-2xl'
  };

  const variantStyles = {
    primary: 'text-gray-400 border-2 border-gray-400 bg-transparent hover:text-white hover:border-white',
    secondary: 'text-white border-2 border-white bg-transparent'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;
