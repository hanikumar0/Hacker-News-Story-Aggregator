import React from 'react';

const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse bg-surface-hover/50 rounded-lg ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
