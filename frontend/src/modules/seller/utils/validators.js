/**
 * Seller Module — Form Validators
 * Validation rules for react-hook-form.
 */

export const validators = {
  required: (fieldName) => ({
    required: `${fieldName} is required`,
  }),

  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },

  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters',
    },
  },

  phone: {
    required: 'Phone number is required',
    pattern: {
      value: /^[6-9]\d{9}$/,
      message: 'Invalid phone number (10 digits starting with 6-9)',
    },
  },

  gst: {
    pattern: {
      value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      message: 'Invalid GST number format',
    },
  },

  pan: {
    pattern: {
      value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      message: 'Invalid PAN number format',
    },
  },

  pincode: {
    required: 'Pincode is required',
    pattern: {
      value: /^[1-9][0-9]{5}$/,
      message: 'Invalid pincode (6 digits)',
    },
  },

  ifsc: {
    pattern: {
      value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
      message: 'Invalid IFSC code',
    },
  },

  price: {
    required: 'Price is required',
    min: {
      value: 0,
      message: 'Price cannot be negative',
    },
  },

  stock: {
    required: 'Stock is required',
    min: {
      value: 0,
      message: 'Stock cannot be negative',
    },
  },

  sku: {
    required: 'SKU is required',
    pattern: {
      value: /^[A-Z0-9-]+$/i,
      message: 'SKU can only contain letters, numbers, and hyphens',
    },
  },

  url: {
    pattern: {
      value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      message: 'Invalid URL',
    },
  },

  couponCode: {
    required: 'Coupon code is required',
    pattern: {
      value: /^[A-Z0-9]+$/,
      message: 'Coupon code must be uppercase letters and numbers only',
    },
    minLength: {
      value: 4,
      message: 'Coupon code must be at least 4 characters',
    },
    maxLength: {
      value: 15,
      message: 'Coupon code must not exceed 15 characters',
    },
  },
};
