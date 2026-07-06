/**
 * Seller Module — API Service Layer
 * All API functions with placeholder URLs.
 * Currently returns dummy data; swap with real API calls when backend is ready.
 *
 * Pattern for backend integration:
 *   1. Uncomment the axiosInstance import
 *   2. Replace the dummy data return with axiosInstance.get/post/put/delete
 *   3. Remove the dummy data imports
 */

// import axiosInstance from './axiosInstance'; // Uncomment for real API
import {
  sellerProfile, dashboardStats, products, orders, returns,
  customers, reviews, coupons, notifications, earningsData,
  transactions, settlements, monthlySalesData, weeklySalesData,
  categorySalesData, revenueData, inventoryAlerts, stockHistory,
} from '../utils/dummyData';

// ─── Helper: Simulate API delay ──────────────────────────────────
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// ═══════════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════════

export const loginSeller = async (credentials) => {
  await delay(800);
  // TODO: return axiosInstance.post('/auth/login', credentials);
  return { token: 'dummy_seller_token_12345', seller: sellerProfile };
};

export const logoutSeller = async () => {
  await delay(300);
  // TODO: return axiosInstance.post('/auth/logout');
  return { success: true };
};

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════

export const getDashboard = async () => {
  await delay(600);
  // TODO: return axiosInstance.get('/dashboard');
  return dashboardStats;
};

export const getDashboardStats = async () => {
  await delay(400);
  // TODO: return axiosInstance.get('/dashboard/stats');
  return dashboardStats;
};

// ═══════════════════════════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════════════════════════

export const getProducts = async (params) => {
  await delay(500);
  // TODO: return axiosInstance.get('/products', { params });
  return { products, total: products.length };
};

export const getProduct = async (id) => {
  await delay(400);
  // TODO: return axiosInstance.get(`/products/${id}`);
  return products.find((p) => p.id === id) || null;
};

export const createProduct = async (data) => {
  await delay(800);
  // TODO: return axiosInstance.post('/products', data);
  return { ...data, id: `PRD${Date.now()}`, createdAt: new Date().toISOString() };
};

export const updateProduct = async (id, data) => {
  await delay(600);
  // TODO: return axiosInstance.put(`/products/${id}`, data);
  return { ...data, id, updatedAt: new Date().toISOString() };
};

export const deleteProduct = async (id) => {
  await delay(500);
  // TODO: return axiosInstance.delete(`/products/${id}`);
  return { success: true, id };
};

export const duplicateProduct = async (id) => {
  await delay(600);
  // TODO: return axiosInstance.post(`/products/${id}/duplicate`);
  const original = products.find((p) => p.id === id);
  return { ...original, id: `PRD${Date.now()}`, title: `${original?.title} (Copy)` };
};

export const toggleProductStatus = async (id, status) => {
  await delay(400);
  // TODO: return axiosInstance.patch(`/products/${id}/status`, { status });
  return { id, status };
};

// ═══════════════════════════════════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════════════════════════════════

export const getOrders = async (params) => {
  await delay(500);
  // TODO: return axiosInstance.get('/orders', { params });
  let filtered = [...orders];
  if (params?.status && params.status !== 'all') {
    filtered = filtered.filter((o) => o.status === params.status);
  }
  return { orders: filtered, total: filtered.length };
};

export const getOrder = async (id) => {
  await delay(400);
  // TODO: return axiosInstance.get(`/orders/${id}`);
  return orders.find((o) => o.id === id) || null;
};

export const updateOrderStatus = async (id, status) => {
  await delay(500);
  // TODO: return axiosInstance.patch(`/orders/${id}/status`, { status });
  return { id, status, updatedAt: new Date().toISOString() };
};

// ═══════════════════════════════════════════════════════════════════
// RETURNS
// ═══════════════════════════════════════════════════════════════════

export const getReturns = async (params) => {
  await delay(500);
  // TODO: return axiosInstance.get('/returns', { params });
  let filtered = [...returns];
  if (params?.status && params.status !== 'all') {
    filtered = filtered.filter((r) => r.status === params.status);
  }
  return { returns: filtered, total: filtered.length };
};

export const approveReturn = async (id) => {
  await delay(600);
  // TODO: return axiosInstance.patch(`/returns/${id}/approve`);
  return { id, status: 'approved' };
};

export const rejectReturn = async (id) => {
  await delay(600);
  // TODO: return axiosInstance.patch(`/returns/${id}/reject`);
  return { id, status: 'rejected' };
};

// ═══════════════════════════════════════════════════════════════════
// CUSTOMERS
// ═══════════════════════════════════════════════════════════════════

export const getCustomers = async (params) => {
  await delay(500);
  // TODO: return axiosInstance.get('/customers', { params });
  return { customers, total: customers.length };
};

export const getCustomer = async (id) => {
  await delay(400);
  // TODO: return axiosInstance.get(`/customers/${id}`);
  return customers.find((c) => c.id === id) || null;
};

// ═══════════════════════════════════════════════════════════════════
// INVENTORY
// ═══════════════════════════════════════════════════════════════════

export const getInventory = async () => {
  await delay(500);
  // TODO: return axiosInstance.get('/inventory');
  return { products, alerts: inventoryAlerts, history: stockHistory };
};

export const updateStock = async (id, quantity) => {
  await delay(400);
  // TODO: return axiosInstance.patch(`/inventory/${id}/stock`, { quantity });
  return { id, stock: quantity };
};

export const getStockHistory = async (id) => {
  await delay(400);
  // TODO: return axiosInstance.get(`/inventory/${id}/history`);
  return stockHistory.filter((h) => h.productId === id);
};

// ═══════════════════════════════════════════════════════════════════
// REVIEWS
// ═══════════════════════════════════════════════════════════════════

export const getReviews = async (params) => {
  await delay(500);
  // TODO: return axiosInstance.get('/reviews', { params });
  return { reviews, total: reviews.length };
};

export const replyToReview = async (id, reply) => {
  await delay(500);
  // TODO: return axiosInstance.post(`/reviews/${id}/reply`, { reply });
  return { id, reply };
};

export const reportReview = async (id, reason) => {
  await delay(400);
  // TODO: return axiosInstance.post(`/reviews/${id}/report`, { reason });
  return { id, reported: true };
};

// ═══════════════════════════════════════════════════════════════════
// COUPONS
// ═══════════════════════════════════════════════════════════════════

export const getCoupons = async () => {
  await delay(500);
  // TODO: return axiosInstance.get('/coupons');
  return { coupons, total: coupons.length };
};

export const createCoupon = async (data) => {
  await delay(600);
  // TODO: return axiosInstance.post('/coupons', data);
  return { ...data, id: `CPN${Date.now()}`, usageCount: 0, createdAt: new Date().toISOString() };
};

export const updateCoupon = async (id, data) => {
  await delay(500);
  // TODO: return axiosInstance.put(`/coupons/${id}`, data);
  return { ...data, id };
};

export const deleteCoupon = async (id) => {
  await delay(400);
  // TODO: return axiosInstance.delete(`/coupons/${id}`);
  return { success: true, id };
};

// ═══════════════════════════════════════════════════════════════════
// ANALYTICS
// ═══════════════════════════════════════════════════════════════════

export const getSalesAnalytics = async (range) => {
  await delay(600);
  // TODO: return axiosInstance.get('/analytics/sales', { params: { range } });
  return { monthly: monthlySalesData, weekly: weeklySalesData };
};

export const getRevenueAnalytics = async () => {
  await delay(500);
  // TODO: return axiosInstance.get('/analytics/revenue');
  return revenueData;
};

export const getProductAnalytics = async () => {
  await delay(500);
  // TODO: return axiosInstance.get('/analytics/products');
  return { categoryBreakdown: categorySalesData, topProducts: products.slice(0, 5) };
};

export const getCategoryAnalytics = async () => {
  await delay(400);
  // TODO: return axiosInstance.get('/analytics/categories');
  return categorySalesData;
};

export const getCustomerAnalytics = async () => {
  await delay(500);
  // TODO: return axiosInstance.get('/analytics/customers');
  return {
    totalCustomers: customers.length,
    newThisMonth: 3,
    returningRate: 68,
    avgLifetimeValue: 15000,
  };
};

// ═══════════════════════════════════════════════════════════════════
// EARNINGS
// ═══════════════════════════════════════════════════════════════════

export const getEarnings = async () => {
  await delay(500);
  // TODO: return axiosInstance.get('/earnings');
  return earningsData;
};

export const getTransactions = async (params) => {
  await delay(500);
  // TODO: return axiosInstance.get('/earnings/transactions', { params });
  return { transactions, total: transactions.length };
};

export const getSettlements = async () => {
  await delay(500);
  // TODO: return axiosInstance.get('/earnings/settlements');
  return { settlements, total: settlements.length };
};

export const requestPayout = async (amount) => {
  await delay(800);
  // TODO: return axiosInstance.post('/earnings/payout', { amount });
  return { success: true, message: 'Payout request submitted', amount };
};

// ═══════════════════════════════════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════════════════════════════════

export const getNotifications = async () => {
  await delay(400);
  // TODO: return axiosInstance.get('/notifications');
  return { notifications, unreadCount: notifications.filter((n) => !n.read).length };
};

export const markAsRead = async (id) => {
  await delay(300);
  // TODO: return axiosInstance.patch(`/notifications/${id}/read`);
  return { id, read: true };
};

export const markAllRead = async () => {
  await delay(400);
  // TODO: return axiosInstance.patch('/notifications/read-all');
  return { success: true };
};

// ═══════════════════════════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════════════════════════

export const getProfile = async () => {
  await delay(400);
  // TODO: return axiosInstance.get('/settings/profile');
  return sellerProfile;
};

export const updateProfile = async (data) => {
  await delay(600);
  // TODO: return axiosInstance.put('/settings/profile', data);
  return { ...sellerProfile, ...data };
};

export const updateBankDetails = async (data) => {
  await delay(600);
  // TODO: return axiosInstance.put('/settings/bank', data);
  return data;
};

export const changePassword = async (data) => {
  await delay(600);
  // TODO: return axiosInstance.put('/settings/password', data);
  return { success: true, message: 'Password changed successfully' };
};

export const updateNotificationPrefs = async (data) => {
  await delay(400);
  // TODO: return axiosInstance.put('/settings/notifications', data);
  return data;
};
