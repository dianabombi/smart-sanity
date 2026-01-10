import React from 'react';

const LoadingSpinner = ({ 
  size = 'default', 
  text = 'Načítavam...', 
  className = '',
  color = 'blue'
}) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    default: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  return (
    <div className={`text-center ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 mx-auto mb-4 ${sizeClasses[size]} ${colorClasses[color]}`}></div>
      {text && (
        <p className="text-white">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
