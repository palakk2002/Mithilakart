import React from 'react';

/**
 * SkeletonLoader — Multiple variants for different content types
 * Provides professional loading placeholders
 */

const shimmer = 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export const SkeletonCard = ({ count = 4 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className={`w-11 h-11 bg-slate-100 rounded-xl ${shimmer}`} />
        <div className="flex-1 space-y-2">
          <div className={`h-2.5 bg-slate-100 rounded-full w-20 ${shimmer}`} />
          <div className={`h-5 bg-slate-100 rounded-full w-16 ${shimmer}`} />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 6 }) => (
  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
    {/* Header */}
    <div className="p-6 border-b border-slate-50 flex gap-4">
      <div className={`h-[52px] flex-1 bg-slate-50 rounded-xl ${shimmer}`} />
      <div className={`h-[52px] w-32 bg-slate-50 rounded-xl ${shimmer}`} />
    </div>
    {/* Table head */}
    <div className="px-6 py-4 bg-slate-50/50 flex gap-4">
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className={`h-3 bg-slate-100 rounded-full flex-1 ${shimmer}`} />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="px-6 py-5 border-b border-slate-50 flex items-center gap-4">
        <div className={`w-10 h-10 bg-slate-100 rounded-full ${shimmer}`} />
        <div className="flex-1 flex gap-4">
          {Array.from({ length: cols - 1 }).map((_, j) => (
            <div key={j} className={`h-4 bg-slate-50 rounded-full flex-1 ${shimmer}`} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonChart = () => (
  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
    <div className="flex justify-between items-center mb-8">
      <div className={`h-5 bg-slate-100 rounded-full w-48 ${shimmer}`} />
      <div className={`h-8 bg-slate-50 rounded-xl w-28 ${shimmer}`} />
    </div>
    <div className={`h-[350px] bg-slate-50 rounded-2xl ${shimmer}`} />
  </div>
);

export const SkeletonPage = () => (
  <div className="space-y-6 animate-pulse">
    {/* Header */}
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <div className={`h-8 bg-slate-100 rounded-full w-72 ${shimmer}`} />
        <div className={`h-4 bg-slate-50 rounded-full w-96 ${shimmer}`} />
      </div>
      <div className="flex gap-3">
        <div className={`h-11 w-32 bg-slate-50 rounded-xl ${shimmer}`} />
        <div className={`h-11 w-36 bg-slate-100 rounded-xl ${shimmer}`} />
      </div>
    </div>
    <SkeletonCard />
    <SkeletonTable />
  </div>
);

const SkeletonLoader = { SkeletonCard, SkeletonTable, SkeletonChart, SkeletonPage };
export default SkeletonLoader;
