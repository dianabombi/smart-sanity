import React from 'react';

const AdminCard = ({
  children,
  className = '',
  padding = 'default'
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8'
  };

  return (
    <div className={`bg-gray-800 rounded-lg shadow border border-gray-700 ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default AdminCard;
