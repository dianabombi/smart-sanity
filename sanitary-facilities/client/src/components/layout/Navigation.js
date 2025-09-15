import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const Navigation = ({ showBackButton = false, backTo = '/' }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(backTo);
  };

  if (!showBackButton) return null;

  return (
    <div className="flex justify-start">
      <Button
        variant="secondary"
        size="small"
        onClick={handleBackClick}
      >
SPÄŤ
      </Button>
    </div>
  );
};

export default Navigation;
