import React from 'react';

const StatusBadge = ({ status, type = 'message' }) => {
  const getStatusConfig = (status, type) => {
    if (type === 'message') {
      switch (status) {
        case 'new': return { color: 'bg-blue-500', text: 'Nová' };
        case 'read': return { color: 'bg-yellow-500', text: 'Prečítaná' };
        case 'replied': return { color: 'bg-green-500', text: 'Odpovedaná' };
        case 'archived': return { color: 'bg-gray-500', text: 'Archivovaná' };
        default: return { color: 'bg-gray-500', text: status };
      }
    } else if (type === 'banner') {
      switch (status) {
        case true: 
        case 'active': return { color: 'bg-green-600', text: 'Aktívny' };
        case false:
        case 'inactive': return { color: 'bg-gray-600', text: 'Neaktívny' };
        default: return { color: 'bg-gray-600', text: 'Neznámy' };
      }
    }
    return { color: 'bg-gray-500', text: status };
  };

  const { color, text } = getStatusConfig(status, type);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${color}`}>
      {text}
    </span>
  );
};

export default StatusBadge;
