/**
 * Safe price parsing and formatting utilities
 */

/**
 * Safely parses any value (string, number, null, undefined) into a valid number.
 * Defaults to 0 if parsing fails.
 * @param {any} value The value to parse
 * @returns {number} The parsed number, safe from NaN
 */
export const parsePrice = (value) => {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') {
    return isNaN(value) ? 0 : value;
  }
  // Remove currency symbol, spaces, commas
  const cleanStr = String(value).replace(/[₹\s,]/g, '');
  const parsed = parseFloat(cleanStr);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Safely formats any price value into Indian numbering format (₹XX,XX,XXX.XX or ₹XX,XX,XXX).
 * If the value is invalid or null/undefined, it safely returns ₹0.
 * @param {any} value The price value
 * @param {boolean} forceDecimals Whether to force decimal digits
 * @returns {string} Formatted price string starting with ₹
 */
export const formatPrice = (value, forceDecimals = false) => {
  const parsed = parsePrice(value);
  
  // Decide whether to show decimal places.
  // If the parsed number is a float (has decimal part) or if forceDecimals is true, show 2 decimal places.
  const hasDecimal = parsed % 1 !== 0 || forceDecimals;
  
  try {
    return '₹' + parsed.toLocaleString('en-IN', {
      minimumFractionDigits: hasDecimal ? 2 : 0,
      maximumFractionDigits: hasDecimal ? 2 : 0,
    });
  } catch (e) {
    // Safe fallback if toLocaleString fails or is not supported
    return '₹' + parsed.toFixed(hasDecimal ? 2 : 0);
  }
};
