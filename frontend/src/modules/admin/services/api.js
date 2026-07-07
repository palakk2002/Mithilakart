/**
 * Admin API Service Layer
 * ========================
 * Centralized API service with placeholder functions.
 * Replace base URL and endpoints when backend is ready.
 * All functions use async/await and return { data, error, loading } pattern.
 */

import axios from 'axios';

const API_BASE = '/api/v1/admin';

// Create axios instance with defaults
const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (attach auth token when backend is ready)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject({ message, status: error.response?.status });
  }
);

/**
 * Generic async handler wrapping API calls
 * Returns { data, error } for consistent handling
 */
const asyncHandler = async (apiCall) => {
  try {
    const data = await apiCall();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || 'Request failed' };
  }
};

// ─── Auth ────────────────────────────────────────────────
export const authApi = {
  login: (credentials) => asyncHandler(() => api.post('/auth/login', credentials)),
  logout: () => asyncHandler(() => api.post('/auth/logout')),
  getProfile: () => asyncHandler(() => api.get('/auth/profile')),
  changePassword: (data) => asyncHandler(() => api.put('/auth/password', data)),
};

// ─── Dashboard ───────────────────────────────────────────
export const dashboardApi = {
  getStats: () => asyncHandler(() => api.get('/dashboard/stats')),
  getRevenueChart: (period) => asyncHandler(() => api.get(`/dashboard/revenue?period=${period}`)),
  getRecentOrders: () => asyncHandler(() => api.get('/dashboard/recent-orders')),
  getRecentActivities: () => asyncHandler(() => api.get('/dashboard/activities')),
};

// ─── Users ───────────────────────────────────────────────
export const usersApi = {
  getAll: (params) => asyncHandler(() => api.get('/users', { params })),
  getById: (id) => asyncHandler(() => api.get(`/users/${id}`)),
  create: (data) => asyncHandler(() => api.post('/users', data)),
  update: (id, data) => asyncHandler(() => api.put(`/users/${id}`, data)),
  block: (id) => asyncHandler(() => api.patch(`/users/${id}/block`)),
  unblock: (id) => asyncHandler(() => api.patch(`/users/${id}/unblock`)),
  suspend: (id) => asyncHandler(() => api.patch(`/users/${id}/suspend`)),
  delete: (id) => asyncHandler(() => api.delete(`/users/${id}`)),
  getOrders: (id) => asyncHandler(() => api.get(`/users/${id}/orders`)),
  getWallet: (id) => asyncHandler(() => api.get(`/users/${id}/wallet`)),
  export: (params) => asyncHandler(() => api.get('/users/export', { params, responseType: 'blob' })),
};

// ─── Sellers / Vendors ───────────────────────────────────
export const sellersApi = {
  getAll: (params) => asyncHandler(() => api.get('/sellers', { params })),
  getById: (id) => asyncHandler(() => api.get(`/sellers/${id}`)),
  approve: (id) => asyncHandler(() => api.patch(`/sellers/${id}/approve`)),
  reject: (id, reason) => asyncHandler(() => api.patch(`/sellers/${id}/reject`, { reason })),
  suspend: (id) => asyncHandler(() => api.patch(`/sellers/${id}/suspend`)),
  activate: (id) => asyncHandler(() => api.patch(`/sellers/${id}/activate`)),
  getProducts: (id) => asyncHandler(() => api.get(`/sellers/${id}/products`)),
  getOrders: (id) => asyncHandler(() => api.get(`/sellers/${id}/orders`)),
  getEarnings: (id) => asyncHandler(() => api.get(`/sellers/${id}/earnings`)),
  getDocuments: (id) => asyncHandler(() => api.get(`/sellers/${id}/documents`)),
};

// ─── Products ────────────────────────────────────────────
export const productsApi = {
  getAll: (params) => asyncHandler(() => api.get('/products', { params })),
  getById: (id) => asyncHandler(() => api.get(`/products/${id}`)),
  approve: (id) => asyncHandler(() => api.patch(`/products/${id}/approve`)),
  reject: (id, reason) => asyncHandler(() => api.patch(`/products/${id}/reject`, { reason })),
  delete: (id) => asyncHandler(() => api.delete(`/products/${id}`)),
  bulkAction: (ids, action) => asyncHandler(() => api.post('/products/bulk', { ids, action })),
};

// ─── Orders ──────────────────────────────────────────────
export const ordersApi = {
  getAll: (params) => asyncHandler(() => api.get('/orders', { params })),
  getById: (id) => asyncHandler(() => api.get(`/orders/${id}`)),
  updateStatus: (id, status) => asyncHandler(() => api.patch(`/orders/${id}/status`, { status })),
  getInvoice: (id) => asyncHandler(() => api.get(`/orders/${id}/invoice`, { responseType: 'blob' })),
};

// ─── Returns ─────────────────────────────────────────────
export const returnsApi = {
  getAll: (params) => asyncHandler(() => api.get('/returns', { params })),
  getById: (id) => asyncHandler(() => api.get(`/returns/${id}`)),
  approve: (id) => asyncHandler(() => api.patch(`/returns/${id}/approve`)),
  reject: (id, reason) => asyncHandler(() => api.patch(`/returns/${id}/reject`, { reason })),
};

// ─── Refunds ─────────────────────────────────────────────
export const refundsApi = {
  getAll: (params) => asyncHandler(() => api.get('/refunds', { params })),
  getById: (id) => asyncHandler(() => api.get(`/refunds/${id}`)),
  process: (id, method) => asyncHandler(() => api.patch(`/refunds/${id}/process`, { method })),
  approve: (id) => asyncHandler(() => api.patch(`/refunds/${id}/approve`)),
  reject: (id, reason) => asyncHandler(() => api.patch(`/refunds/${id}/reject`, { reason })),
};

// ─── Coupons ─────────────────────────────────────────────
export const couponsApi = {
  getAll: (params) => asyncHandler(() => api.get('/coupons', { params })),
  create: (data) => asyncHandler(() => api.post('/coupons', data)),
  update: (id, data) => asyncHandler(() => api.put(`/coupons/${id}`, data)),
  delete: (id) => asyncHandler(() => api.delete(`/coupons/${id}`)),
};

// ─── Banners ─────────────────────────────────────────────
export const bannersApi = {
  getAll: () => asyncHandler(() => api.get('/banners')),
  create: (formData) => asyncHandler(() => api.post('/banners', formData, { headers: { 'Content-Type': 'multipart/form-data' } })),
  update: (id, formData) => asyncHandler(() => api.put(`/banners/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })),
  delete: (id) => asyncHandler(() => api.delete(`/banners/${id}`)),
};

// ─── Notifications ───────────────────────────────────────
export const notificationsApi = {
  getAll: (params) => asyncHandler(() => api.get('/notifications', { params })),
  send: (data) => asyncHandler(() => api.post('/notifications/send', data)),
  getTemplates: () => asyncHandler(() => api.get('/notifications/templates')),
};

// ─── Reports ─────────────────────────────────────────────
export const reportsApi = {
  getSalesReport: (params) => asyncHandler(() => api.get('/reports/sales', { params })),
  getSellerReport: (params) => asyncHandler(() => api.get('/reports/sellers', { params })),
  getUserReport: (params) => asyncHandler(() => api.get('/reports/users', { params })),
  getOrderReport: (params) => asyncHandler(() => api.get('/reports/orders', { params })),
  getInventoryReport: (params) => asyncHandler(() => api.get('/reports/inventory', { params })),
  getRefundReport: (params) => asyncHandler(() => api.get('/reports/refunds', { params })),
  exportReport: (type, params) => asyncHandler(() => api.get(`/reports/${type}/export`, { params, responseType: 'blob' })),
};

// ─── Analytics ───────────────────────────────────────────
export const analyticsApi = {
  getSalesAnalytics: (params) => asyncHandler(() => api.get('/analytics/sales', { params })),
  getRevenueAnalytics: (params) => asyncHandler(() => api.get('/analytics/revenue', { params })),
  getUserAnalytics: (params) => asyncHandler(() => api.get('/analytics/users', { params })),
  getProductAnalytics: (params) => asyncHandler(() => api.get('/analytics/products', { params })),
};

// ─── Settings ────────────────────────────────────────────
export const settingsApi = {
  getAll: () => asyncHandler(() => api.get('/settings')),
  update: (data) => asyncHandler(() => api.put('/settings', data)),
  getCommission: () => asyncHandler(() => api.get('/settings/commission')),
  updateCommission: (data) => asyncHandler(() => api.put('/settings/commission', data)),
};

// ─── Roles & Permissions ─────────────────────────────────
export const rolesApi = {
  getAll: () => asyncHandler(() => api.get('/roles')),
  create: (data) => asyncHandler(() => api.post('/roles', data)),
  update: (id, data) => asyncHandler(() => api.put(`/roles/${id}`, data)),
  delete: (id) => asyncHandler(() => api.delete(`/roles/${id}`)),
  getPermissions: () => asyncHandler(() => api.get('/roles/permissions')),
};

// ─── Audit Logs ──────────────────────────────────────────
export const auditApi = {
  getLogs: (params) => asyncHandler(() => api.get('/audit/logs', { params })),
  getLoginHistory: (params) => asyncHandler(() => api.get('/audit/logins', { params })),
};

// ─── CMS ─────────────────────────────────────────────────
export const cmsApi = {
  getPage: (slug) => asyncHandler(() => api.get(`/cms/${slug}`)),
  updatePage: (slug, data) => asyncHandler(() => api.put(`/cms/${slug}`, data)),
};

// Default export for convenience
const adminApi = {
  auth: authApi,
  dashboard: dashboardApi,
  users: usersApi,
  sellers: sellersApi,
  products: productsApi,
  orders: ordersApi,
  returns: returnsApi,
  refunds: refundsApi,
  coupons: couponsApi,
  banners: bannersApi,
  notifications: notificationsApi,
  reports: reportsApi,
  analytics: analyticsApi,
  settings: settingsApi,
  roles: rolesApi,
  audit: auditApi,
  cms: cmsApi,
};

export default adminApi;
