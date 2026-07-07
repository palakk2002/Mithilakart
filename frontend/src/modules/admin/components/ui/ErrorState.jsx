import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Professional Error State with retry button
 */
const ErrorState = ({
  title = 'Something went wrong',
  message = 'We encountered an unexpected error. Please try again.',
  onRetry,
  retryLabel = 'Try Again',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-400 mb-6">
        <AlertCircle size={40} />
      </div>
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2 font-montserrat">
        {title}
      </h3>
      <p className="text-xs text-slate-500 font-medium max-w-sm leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <RefreshCw size={14} />
          {retryLabel}
        </button>
      )}
    </motion.div>
  );
};

export default ErrorState;
