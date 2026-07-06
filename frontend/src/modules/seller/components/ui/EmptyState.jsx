/**
 * EmptyState Component
 * Beautiful empty state with SVG illustration, message, and optional CTA.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Search, ShoppingCart, Star, Bell, FileText } from 'lucide-react';
import Button from './Button';

const iconMap = {
  products: Package,
  search: Search,
  orders: ShoppingCart,
  reviews: Star,
  notifications: Bell,
  default: FileText,
};

const EmptyState = ({
  icon = 'default',
  title = 'No data found',
  description = 'There are no items to display right now.',
  actionLabel,
  onAction,
  className = '',
}) => {
  const Icon = iconMap[icon] || iconMap.default;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      {/* Illustration */}
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl flex items-center justify-center">
          <Icon size={40} className="text-blue-300" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-400 text-xs font-bold">0</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[var(--seller-text,#111827)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--seller-subtext,#6B7280)] max-w-sm mb-6">{description}</p>

      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
