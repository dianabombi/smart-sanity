import React from 'react';
import AdminCard from './AdminCard';

const StatsCard = ({ 
  title, 
  value, 
  color = 'blue',
  icon,
  className = ''
}) => {
  const colorClasses = {
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    red: 'text-red-400',
    gray: 'text-gray-400'
  };

  return (
    <AdminCard className={className}>
      <div className="text-center">
        {icon && (
          <div className={`text-2xl mb-2 ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
        <p className={`text-2xl font-bold ${colorClasses[color]}`}>
          {value || 0}
        </p>
        <p className="text-sm text-gray-300">{title}</p>
      </div>
    </AdminCard>
  );
};

export default StatsCard;
