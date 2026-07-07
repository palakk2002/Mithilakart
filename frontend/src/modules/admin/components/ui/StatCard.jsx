import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable StatCard component
 * Matches the admin panel's stat card design across Dashboard, Analytics, Users, etc.
 */
const StatCard = ({ label, value, icon: Icon, color = 'text-blue-500', bg = 'bg-blue-50', change, isPositive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group"
    >
      <div className={`w-11 h-11 ${bg} ${color} rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
        <Icon size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <p className="text-xl font-black text-slate-900 font-roboto leading-none truncate">
            {value}
          </p>
          {change && (
            <span className={`text-[10px] font-black ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
