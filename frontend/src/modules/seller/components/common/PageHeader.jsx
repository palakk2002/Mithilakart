/**
 * PageHeader Component
 * Reusable page title with subtitle and action buttons.
 */
import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 ${className}`}
    >
      <div>
        <h1 className="text-2xl font-bold text-[var(--seller-text,#111827)] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-[var(--seller-subtext,#6B7280)] mt-1">{subtitle}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-3 flex-wrap">{children}</div>}
    </motion.div>
  );
};

export default PageHeader;
