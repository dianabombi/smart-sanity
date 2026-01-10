import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const Navigation = ({ showBackButton = false, backTo = null }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (backTo) {
      // If specific route is provided, navigate there
      navigate(backTo);
    } else {
      // Otherwise, go back in browser history
      navigate(-1);
    }
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
