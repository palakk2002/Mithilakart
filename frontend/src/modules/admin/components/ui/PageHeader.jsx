import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable PageHeader component
 * Matches the admin panel's premium design language
 */
const PageHeader = ({ title, description, children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4"
    >
      <div>
        <h1 className="text-4xl font-semibold text-slate-900 tracking-tight font-montserrat uppercase">
          {title}
        </h1>
        {description && (
          <p className="text-slate-500 font-medium mt-1 font-raleway">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex gap-3 flex-shrink-0">
          {children}
        </div>
      )}
    </motion.div>
  );
};

export default PageHeader;
