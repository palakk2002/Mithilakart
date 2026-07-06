/**
 * Button Component
 * Professional button with multiple variants, sizes, and loading state.
 */
import React from 'react';
import { motion } from 'framer-motion';
import Spinner from './Spinner';

const variants = {
  primary: 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm shadow-blue-200',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm',
  danger: 'bg-[#DC2626] hover:bg-red-700 text-white shadow-sm shadow-red-200',
  success: 'bg-[#16A34A] hover:bg-green-700 text-white shadow-sm shadow-green-200',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-600',
  outline: 'bg-transparent hover:bg-blue-50 text-[#2563EB] border border-[#2563EB]',
};

const sizes = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold rounded-xl
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {!loading && Icon && iconPosition === 'left' && <Icon size={size === 'xs' ? 14 : 16} />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon size={size === 'xs' ? 14 : 16} />}
    </motion.button>
  );
};

export default Button;
