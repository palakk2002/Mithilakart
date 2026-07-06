/**
 * Spinner Component
 * Loading spinner in multiple sizes.
 */
import React from 'react';

const sizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-3',
  xl: 'w-16 h-16 border-4',
};

const Spinner = ({ size = 'md', color = 'border-blue-600', className = '' }) => {
  return (
    <div
      className={`
        ${sizes[size]}
        ${color}
        border-t-transparent rounded-full animate-spin
        ${className}
      `}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
