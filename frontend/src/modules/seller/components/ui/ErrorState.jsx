/**
 * ErrorState Component
 * Professional error display with retry button.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

const ErrorState = ({
  title = 'Something went wrong',
  message = 'We encountered an error while loading this page. Please try again.',
  onRetry,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-6">
        <AlertTriangle size={36} className="text-red-400" strokeWidth={1.5} />
      </div>

      <h3 className="text-lg font-semibold text-[var(--seller-text,#111827)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--seller-subtext,#6B7280)] max-w-sm mb-6">{message}</p>

      {onRetry && (
        <Button onClick={onRetry} variant="secondary" icon={RefreshCw}>
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorState;
