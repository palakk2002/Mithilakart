/**
 * StatCard Component
 * Animated statistics card with icon, value, trend indicator.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = 'bg-blue-50',
  iconColor = 'text-blue-600',
  trend,
  trendValue,
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
      className={`
        bg-[var(--seller-card,#fff)] rounded-2xl border border-[var(--seller-border-light,#F3F4F6)]
        p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group
        ${className}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${iconBg} group-hover:scale-110 transition-transform duration-300`}>
          {Icon && <Icon size={22} className={iconColor} />}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${
            trend === 'up' ? 'text-green-600' : 'text-red-500'
          }`}>
            {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      <p className="text-xs font-medium text-[var(--seller-subtext,#6B7280)] uppercase tracking-wide mb-1">
        {title}
      </p>
      <h3 className="text-2xl font-bold text-[var(--seller-text,#111827)] tracking-tight">
        {value}
      </h3>
      {subtitle && (
        <p className="text-xs text-[var(--seller-subtext,#6B7280)] mt-1.5">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default StatCard;
