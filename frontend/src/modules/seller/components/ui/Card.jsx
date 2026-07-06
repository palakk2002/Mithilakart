/**
 * Card Component
 * Elevated card container with optional header, body, footer.
 */
import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  padding = true,
  hover = false,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        bg-[var(--seller-card,#fff)] rounded-2xl border border-[var(--seller-border-light,#F3F4F6)]
        shadow-[var(--seller-shadow)]
        ${hover ? 'hover:shadow-[var(--seller-shadow-lg)] hover:border-[var(--seller-border,#E5E7EB)] transition-shadow duration-300' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Card Header */}
      {(title || headerAction) && (
        <div className={`flex items-center justify-between ${padding ? 'px-6 pt-6 pb-0' : 'px-4 pt-4 pb-0'}`}>
          <div>
            {title && (
              <h3 className="text-[15px] font-semibold text-[var(--seller-text,#111827)]">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-[var(--seller-subtext,#6B7280)] mt-0.5">{subtitle}</p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      {/* Card Body */}
      <div className={padding ? 'p-6' : ''}>{children}</div>

      {/* Card Footer */}
      {footer && (
        <div className={`border-t border-[var(--seller-border-light,#F3F4F6)] ${padding ? 'px-6 py-4' : 'px-4 py-3'}`}>
          {footer}
        </div>
      )}
    </motion.div>
  );
};

export default Card;
