import React from 'react';

// Battery Icon
export const BatteryIcon = ({ size = 64, className = "" }) => (
  <div className={`text-white ${className}`} style={{ fontSize: size }}>
    🔋
  </div>
);

// Tap Icon
export const TapIcon = ({ size = 64, className = "" }) => (
  <div className={`text-white ${className}`} style={{ fontSize: size }}>
    🚿
  </div>
);

// Sink Icon
export const SinkIcon = ({ size = 64, className = "" }) => (
  <div className={`text-white ${className}`} style={{ fontSize: size }}>
    🚰
  </div>
);

// Toilet Icon
export const ToiletIcon = ({ size = 64, className = "" }) => (
  <div className={`text-white ${className}`} style={{ fontSize: size }}>
    🚽
  </div>
);

// Shower Icon
export const ShowerIcon = ({ size = 64, className = "" }) => (
  <div className={`text-white ${className}`} style={{ fontSize: size }}>
    🚿
  </div>
);

// Bathtub Icon
export const BathtubIcon = ({ size = 64, className = "" }) => (
  <div className={`text-white ${className}`} style={{ fontSize: size }}>
    🛁
  </div>
);

export const getIconComponent = (iconName) => {
  const icons = {
    battery: BatteryIcon,
    tap: TapIcon,
    sink: SinkIcon,
    toilet: ToiletIcon,
    shower: ShowerIcon,
    bathtub: BathtubIcon
  };
  return icons[iconName] || TapIcon;
};
