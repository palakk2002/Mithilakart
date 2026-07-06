/**
 * Seller Module — Utility Formatters
 * Currency, date, number, and string formatting helpers.
 */

/**
 * Format a number as Indian Rupees (₹)
 * @param {number} amount
 * @param {boolean} showDecimal
 * @returns {string}
 */
export const formatCurrency = (amount, showDecimal = false) => {
  if (amount === null || amount === undefined) return '₹0';
  const options = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showDecimal ? 2 : 0,
    maximumFractionDigits: showDecimal ? 2 : 0,
  };
  return new Intl.NumberFormat('en-IN', options).format(amount);
};

/**
 * Format a number with Indian locale separators (1,23,456)
 * @param {number} num
 * @returns {string}
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Format date to readable string
 * @param {string|Date} date
 * @param {string} format - 'short' | 'long' | 'relative'
 * @returns {string}
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return '—';
  const d = new Date(date);

  if (format === 'relative') {
    return getRelativeTime(d);
  }

  const options =
    format === 'long'
      ? { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      : { year: 'numeric', month: 'short', day: 'numeric' };

  return d.toLocaleDateString('en-IN', options);
};

/**
 * Get relative time string (e.g., "5 minutes ago")
 * @param {Date} date
 * @returns {string}
 */
export const getRelativeTime = (date) => {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date, 'short');
};

/**
 * Truncate text to a specified length
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate order ID
 * @param {number} num
 * @returns {string}
 */
export const generateOrderId = (num) => {
  return `MK${String(num).padStart(6, '0')}`;
};

/**
 * Calculate percentage change
 * @param {number} current
 * @param {number} previous
 * @returns {{ value: number, isPositive: boolean }}
 */
export const calculateChange = (current, previous) => {
  if (!previous) return { value: 0, isPositive: true };
  const change = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(Math.round(change * 10) / 10),
    isPositive: change >= 0,
  };
};

/**
 * Get initials from name
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Generate a slug from text
 * @param {string} text
 * @returns {string}
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Format file size
 * @param {number} bytes
 * @returns {string}
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

/**
 * Format percentage
 * @param {number} value
 * @param {number} total
 * @returns {string}
 */
export const formatPercentage = (value, total) => {
  if (!total) return '0%';
  return Math.round((value / total) * 100) + '%';
};
