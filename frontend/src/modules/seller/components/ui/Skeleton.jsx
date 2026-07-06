/**
 * Skeleton Component
 * Content placeholder loaders for loading states.
 */
import React from 'react';

const Skeleton = ({ className = '', variant = 'rectangular', width, height, count = 1 }) => {
  const baseClass = 'animate-pulse bg-gray-200 rounded';
  const variantClass = variant === 'circular' ? 'rounded-full' : variant === 'text' ? 'rounded h-4' : 'rounded-xl';

  const style = {
    width: width || (variant === 'circular' ? '40px' : '100%'),
    height: height || (variant === 'circular' ? '40px' : variant === 'text' ? '16px' : '20px'),
  };

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`${baseClass} ${variantClass} ${className}`} style={style} />
        ))}
      </div>
    );
  }

  return <div className={`${baseClass} ${variantClass} ${className}`} style={style} />;
};

// Pre-built skeleton patterns
export const TableSkeleton = ({ rows = 5, cols = 5 }) => (
  <div className="space-y-4 p-6">
    <div className="flex items-center gap-4">
      <Skeleton width="200px" height="40px" />
      <Skeleton width="300px" height="40px" />
    </div>
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} height="20px" className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const CardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton variant="circular" width="48px" height="48px" />
      <Skeleton width="60px" height="24px" />
    </div>
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="40%" height="28px" />
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Skeleton height="350px" className="rounded-2xl" />
      </div>
      <Skeleton height="350px" className="rounded-2xl" />
    </div>
  </div>
);

export default Skeleton;
