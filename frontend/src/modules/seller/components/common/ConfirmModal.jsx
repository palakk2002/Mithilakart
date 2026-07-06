/**
 * ConfirmModal Component
 * Reusable confirmation dialog for delete, cancel, logout, etc.
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Trash2, LogOut, Save } from 'lucide-react';
import Button from '../ui/Button';

const iconMap = {
  delete: { icon: Trash2, color: 'text-red-500', bg: 'bg-red-50' },
  cancel: { icon: X, color: 'text-amber-500', bg: 'bg-amber-50' },
  logout: { icon: LogOut, color: 'text-red-500', bg: 'bg-red-50' },
  save: { icon: Save, color: 'text-blue-500', bg: 'bg-blue-50' },
  warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
};

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  type = 'delete',
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
}) => {
  const config = iconMap[type] || iconMap.warning;
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <div className={`w-14 h-14 ${config.bg} rounded-2xl flex items-center justify-center mb-5`}>
              <Icon size={28} className={config.color} />
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">{message}</p>

            {/* Actions */}
            <div className="flex items-center gap-3 justify-end">
              <Button variant="secondary" onClick={onClose} disabled={loading}>
                {cancelLabel}
              </Button>
              <Button
                variant={type === 'delete' || type === 'logout' ? 'danger' : 'primary'}
                onClick={onConfirm}
                loading={loading}
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
