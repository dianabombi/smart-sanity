import React from 'react';

// Battery Icon
export const BatteryIcon = ({ size = 64, className = "" }) => (
  <img 
    src="/icons/lighting.png" 
    alt="Battery" 
    className={className}
    style={{ width: size, height: size, filter: 'brightness(0) invert(1)' }}
  />
);

// Tap Icon
export const TapIcon = ({ size = 64, className = "" }) => (
  <img 
    src="/icons/tap.png" 
    alt="Tap" 
    className={className}
    style={{ width: size, height: size, filter: 'brightness(0) invert(1)' }}
  />
);

// Sink Icon
export const SinkIcon = ({ size = 64, className = "" }) => (
  <img 
    src="/icons/basin.png" 
    alt="Basin" 
    className={className}
    style={{ width: size, height: size, filter: 'brightness(0) invert(1)' }}
  />
);

// Toilet Icon
export const ToiletIcon = ({ size = 64, className = "" }) => (
  <img 
    src="/icons/construction.png" 
    alt="Construction" 
    className={className}
    style={{ width: size, height: size, filter: 'brightness(0) invert(1)' }}
  />
);

// Shower Icon
export const ShowerIcon = ({ size = 64, className = "" }) => (
  <img 
    src="/icons/shower.png" 
    alt="Shower" 
    className={className}
    style={{ width: size, height: size, filter: 'brightness(0) invert(1)' }}
  />
);

// Bathtub Icon
export const BathtubIcon = ({ size = 64, className = "" }) => (
  <img 
    src="/icons/bath-tub.png" 
    alt="Bathtub" 
    className={className}
    style={{ width: size, height: size, filter: 'brightness(0) invert(1)' }}
  />
);

// Bidet Icon
export const BidetIcon = ({ size = 64, className = "" }) => (
  <img 
    src="/icons/bidet.png" 
    alt="Bidet" 
    className={className}
    style={{ width: size, height: size, filter: 'brightness(0) invert(1)' }}
  />
);

// Tiles Icon (Obklady)
export const TilesIcon = ({ size = 64, className = "" }) => (
  <img 
    src="/icons/tiles.png" 
    alt="Tiles" 
    className={className}
    style={{ width: size, height: size, filter: 'brightness(0) invert(1)' }}
  />
);

// Lighting Icon (Osvetlenie)
export const LightingIcon = ({ size = 64, className = "" }) => (
  <img 
    src="/icons/idea.png" 
    alt="Lighting" 
    className={className}
    style={{ width: size, height: size, filter: 'brightness(0) invert(1)' }}
  />
);

export const getIconComponent = (iconName) => {
  const icons = {
    battery: BatteryIcon,
    tap: TapIcon,
    sink: SinkIcon,
    toilet: ToiletIcon,
    shower: ShowerIcon,
    bathtub: BathtubIcon,
    bidet: BidetIcon,
    tiles: TilesIcon,
    lighting: LightingIcon
  };
  return icons[iconName] || TapIcon;
};
