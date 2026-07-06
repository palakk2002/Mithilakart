/**
 * Toggle Component
 * On/Off switch component.
 */
import React from 'react';
import { motion } from 'framer-motion';

const Toggle = ({ checked, onChange, label, description, disabled = false, className = '' }) => {
  return (
    <label className={`flex items-center justify-between gap-4 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      {(label || description) && (
        <div className="flex-1">
          {label && <span className="text-sm font-medium text-[var(--seller-text,#111827)]">{label}</span>}
          {description && <p className="text-xs text-[var(--seller-subtext,#6B7280)] mt-0.5">{description}</p>}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
          ${checked ? 'bg-[#2563EB]' : 'bg-gray-200'}
        `}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white shadow-sm
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </label>
  );
};

export default Toggle;
