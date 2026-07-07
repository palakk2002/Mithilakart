import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, CheckCircle2, ShieldAlert, X } from 'lucide-react';

/**
 * Reusable ConfirmDialog for destructive actions
 * Types: delete, approve, reject, block, suspend, logout, generic
 */
const PRESETS = {
  delete: {
    icon: Trash2,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    confirmBg: 'bg-red-500 hover:bg-red-600 shadow-red-100',
    title: 'Delete Confirmation',
    message: 'This action cannot be undone. Are you sure you want to proceed?',
    confirmText: 'Delete',
  },
  approve: {
    icon: CheckCircle2,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
    confirmBg: 'bg-green-500 hover:bg-green-600 shadow-green-100',
    title: 'Approve Confirmation',
    message: 'Are you sure you want to approve this item?',
    confirmText: 'Approve',
  },
  reject: {
    icon: ShieldAlert,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    confirmBg: 'bg-red-500 hover:bg-red-600 shadow-red-100',
    title: 'Reject Confirmation',
    message: 'Are you sure you want to reject this item?',
    confirmText: 'Reject',
  },
  block: {
    icon: ShieldAlert,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    confirmBg: 'bg-red-500 hover:bg-red-600 shadow-red-100',
    title: 'Block Account',
    message: 'This will immediately block the account. Are you sure?',
    confirmText: 'Block',
  },
  suspend: {
    icon: AlertTriangle,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    confirmBg: 'bg-amber-500 hover:bg-amber-600 shadow-amber-100',
    title: 'Suspend Account',
    message: 'This will temporarily suspend the account. The user will not be able to access the platform.',
    confirmText: 'Suspend',
  },
  generic: {
    icon: AlertTriangle,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    confirmBg: 'bg-blue-500 hover:bg-blue-600 shadow-blue-100',
    title: 'Confirmation',
    message: 'Are you sure you want to proceed?',
    confirmText: 'Confirm',
  },
};

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  type = 'generic',
  title,
  message,
  confirmText,
  loading = false,
}) => {
  const preset = PRESETS[type] || PRESETS.generic;
  const Icon = preset.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-[28px] shadow-2xl w-full max-w-sm p-8 text-center"
          >
            <div className={`w-16 h-16 ${preset.iconBg} ${preset.iconColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
              <Icon size={28} />
            </div>

            <h3 className="text-lg font-black text-slate-900 font-montserrat uppercase tracking-tight mb-2">
              {title || preset.title}
            </h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
              {message || preset.message}
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-3.5 bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className={`flex-1 py-3.5 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95 disabled:opacity-50 ${preset.confirmBg}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  confirmText || preset.confirmText
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
