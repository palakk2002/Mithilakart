import React from 'react';

/**
 * Reusable StatusBadge component
 * Provides consistent status tag styling across admin pages
 */
const STATUS_STYLES = {
  // General
  'Active': 'bg-green-50 text-green-600 border-green-100',
  'Inactive': 'bg-slate-100 text-slate-400 border-slate-200',
  'Pending': 'bg-amber-50 text-amber-600 border-amber-100',
  'Approved': 'bg-blue-50 text-blue-600 border-blue-100',
  'Rejected': 'bg-red-50 text-red-600 border-red-100',
  'Suspended': 'bg-orange-50 text-orange-600 border-orange-100',
  'Blocked': 'bg-red-50 text-red-600 border-red-100',
  'VIP': 'bg-amber-50 text-amber-600 border-amber-100',
  'Verified': 'bg-green-50 text-green-600 border-green-100',

  // Orders
  'Confirmed': 'bg-blue-50 text-blue-600 border-blue-100',
  'Packed': 'bg-indigo-50 text-indigo-600 border-indigo-100',
  'Shipped': 'bg-violet-50 text-violet-600 border-violet-100',
  'Out for Delivery': 'bg-purple-50 text-purple-600 border-purple-100',
  'Delivered': 'bg-green-50 text-green-600 border-green-100',
  'Cancelled': 'bg-red-50 text-red-600 border-red-100',
  'Returned': 'bg-orange-50 text-orange-600 border-orange-100',
  'Refunded': 'bg-teal-50 text-teal-600 border-teal-100',
  'Processing': 'bg-blue-50 text-blue-600 border-blue-100',

  // Refunds
  'Completed': 'bg-green-50 text-green-600 border-green-100',
  'Wallet': 'bg-indigo-50 text-indigo-600 border-indigo-100',
  'Source': 'bg-violet-50 text-violet-600 border-violet-100',

  // Support
  'Open': 'bg-red-50 text-red-600 border-red-100',
  'In-Progress': 'bg-blue-50 text-blue-600 border-blue-100',
  'Closed': 'bg-green-50 text-green-600 border-green-100',

  // Payouts
  'Settled': 'bg-green-50 text-green-600 border-green-100',

  // Other
  'Draft': 'bg-slate-50 text-slate-400 border-slate-100',
  'Paused': 'bg-slate-50 text-slate-400 border-slate-100',
  'Expiring': 'bg-amber-50 text-amber-600 border-amber-100',
  'Warning': 'bg-amber-50 text-amber-600 border-amber-100',
  'Under Review': 'bg-indigo-50 text-indigo-600 border-indigo-100',

  // Auth/Audit
  'Success': 'bg-green-50 text-green-600 border-green-100',
  'Failed': 'bg-red-50 text-red-600 border-red-100',

  // KYC
  'Not Submitted': 'bg-slate-50 text-slate-400 border-slate-100',

  // Products
  'In Stock': 'bg-green-50 text-green-600 border-green-100',
  'Low Stock': 'bg-amber-50 text-amber-600 border-amber-100',
  'Out of Stock': 'bg-red-50 text-red-600 border-red-100',
};

const StatusBadge = ({ status, className = '' }) => {
  const style = STATUS_STYLES[status] || 'bg-slate-50 text-slate-400 border-slate-100';
  
  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${style} ${className}`}
      role="status"
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
