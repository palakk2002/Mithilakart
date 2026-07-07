/**
 * Admin Panel — Centralized Dummy Data
 * =====================================
 * All mock data used across admin pages.
 * When backend is ready, replace with API calls.
 */

// ─── Dashboard Stats ────────────────────────────────────
export const DASHBOARD_STATS = {
  totalRevenue: 1250000,
  totalOrders: 4520,
  activeVendors: 125,
  platformCommission: 187500,
  totalUsers: 12450,
  pendingReturns: 18,
  pendingRefunds: 7,
  todaySales: 42500,
  monthlySales: 850000,
  visitors: 8920,
};

// ─── Reports Dummy Data ─────────────────────────────────
export const SALES_REPORT_DATA = [
  { month: 'Jan', revenue: 450000, orders: 1200, avgOrderValue: 375 },
  { month: 'Feb', revenue: 520000, orders: 1450, avgOrderValue: 358 },
  { month: 'Mar', revenue: 480000, orders: 1320, avgOrderValue: 363 },
  { month: 'Apr', revenue: 610000, orders: 1800, avgOrderValue: 339 },
  { month: 'May', revenue: 750000, orders: 2100, avgOrderValue: 357 },
  { month: 'Jun', revenue: 690000, orders: 1950, avgOrderValue: 354 },
];

export const SELLER_REPORT_DATA = [
  { id: 'V101', name: 'Fashion Hub', totalSales: '₹4,50,000', orders: 450, returns: 12, rating: 4.5, status: 'Active', commission: '₹45,000' },
  { id: 'V102', name: 'Elite Electronics', totalSales: '₹3,20,000', orders: 120, returns: 8, rating: 4.2, status: 'Active', commission: '₹32,000' },
  { id: 'V103', name: 'Glow Cosmetics', totalSales: '₹2,80,000', orders: 340, returns: 5, rating: 4.8, status: 'Active', commission: '₹28,000' },
  { id: 'V104', name: 'Modern Home', totalSales: '₹2,10,000', orders: 95, returns: 3, rating: 3.9, status: 'Warning', commission: '₹21,000' },
  { id: 'V105', name: 'Tech World', totalSales: '₹1,85,000', orders: 210, returns: 15, rating: 3.5, status: 'Under Review', commission: '₹18,500' },
];

export const USER_REPORT_DATA = [
  { month: 'Jan', newUsers: 420, activeUsers: 3200, returningUsers: 1800 },
  { month: 'Feb', newUsers: 510, activeUsers: 3600, returningUsers: 2100 },
  { month: 'Mar', newUsers: 380, activeUsers: 3400, returningUsers: 1950 },
  { month: 'Apr', newUsers: 620, activeUsers: 4100, returningUsers: 2400 },
  { month: 'May', newUsers: 780, activeUsers: 4800, returningUsers: 2800 },
  { month: 'Jun', newUsers: 650, activeUsers: 4500, returningUsers: 2600 },
];

export const ORDER_REPORT_DATA = [
  { month: 'Jan', total: 1200, completed: 1050, cancelled: 80, returned: 70 },
  { month: 'Feb', total: 1450, completed: 1280, cancelled: 95, returned: 75 },
  { month: 'Mar', total: 1320, completed: 1150, cancelled: 100, returned: 70 },
  { month: 'Apr', total: 1800, completed: 1600, cancelled: 110, returned: 90 },
  { month: 'May', total: 2100, completed: 1850, cancelled: 130, returned: 120 },
  { month: 'Jun', total: 1950, completed: 1720, cancelled: 120, returned: 110 },
];

export const INVENTORY_REPORT_DATA = [
  { category: 'Electronics', totalProducts: 245, inStock: 198, lowStock: 32, outOfStock: 15 },
  { category: 'Fashion', totalProducts: 520, inStock: 430, lowStock: 60, outOfStock: 30 },
  { category: 'Beauty', totalProducts: 180, inStock: 155, lowStock: 18, outOfStock: 7 },
  { category: 'Home', totalProducts: 310, inStock: 260, lowStock: 35, outOfStock: 15 },
  { category: 'Toys', totalProducts: 95, inStock: 80, lowStock: 10, outOfStock: 5 },
];

export const REFUND_REPORT_DATA = [
  { month: 'Jan', total: 70, wallet: 45, source: 25, amount: 125000 },
  { month: 'Feb', total: 75, wallet: 50, source: 25, amount: 140000 },
  { month: 'Mar', total: 70, wallet: 42, source: 28, amount: 118000 },
  { month: 'Apr', total: 90, wallet: 58, source: 32, amount: 165000 },
  { month: 'May', total: 120, wallet: 78, source: 42, amount: 210000 },
  { month: 'Jun', total: 110, wallet: 70, source: 40, amount: 195000 },
];

// ─── Refunds Management ─────────────────────────────────
export const MOCK_REFUNDS = [
  { id: 'REF001', orderId: 'OD87459', user: 'Rahul Sharma', amount: '₹4,500', method: 'Wallet', reason: 'Damaged Product', status: 'Pending', date: '2026-05-10', returnId: 'RET1024' },
  { id: 'REF002', orderId: 'OD87460', user: 'Priyanka Das', amount: '₹1,250', method: 'Source', reason: 'Wrong Item Sent', status: 'Approved', date: '2026-05-09', returnId: 'RET1025' },
  { id: 'REF003', orderId: 'OD87461', user: 'Amit Verma', amount: '₹8,900', method: 'Wallet', reason: 'Defective Unit', status: 'Processing', date: '2026-05-08', returnId: 'RET1026' },
  { id: 'REF004', orderId: 'OD87455', user: 'Sneha Kapur', amount: '₹2,300', method: 'Source', reason: 'Size Mismatch', status: 'Completed', date: '2026-05-07', returnId: 'RET1020' },
  { id: 'REF005', orderId: 'OD87450', user: 'Vikram Singh', amount: '₹15,600', method: 'Wallet', reason: 'Not as described', status: 'Rejected', date: '2026-05-06', returnId: 'RET1018' },
];

// ─── Audit Logs ──────────────────────────────────────────
export const MOCK_AUDIT_LOGS = [
  { id: 1, admin: 'Prachi Gupta', action: 'Approved Vendor', target: 'Fashion Hub (V101)', ip: '192.168.1.45', timestamp: '2026-05-10 14:30:00', type: 'vendor' },
  { id: 2, admin: 'John Miller', action: 'Updated Product', target: 'Apple iPhone 15 (PRD002)', ip: '192.168.1.52', timestamp: '2026-05-10 13:15:00', type: 'product' },
  { id: 3, admin: 'Prachi Gupta', action: 'Processed Refund', target: 'REF001 — ₹4,500', ip: '192.168.1.45', timestamp: '2026-05-10 12:00:00', type: 'refund' },
  { id: 4, admin: 'Sarah Lee', action: 'Resolved Ticket', target: 'TIC-9842 — Payment Issue', ip: '192.168.1.67', timestamp: '2026-05-10 11:30:00', type: 'support' },
  { id: 5, admin: 'Michael Chen', action: 'Updated Tax Config', target: 'GST Rate: 18% → 12%', ip: '192.168.1.80', timestamp: '2026-05-09 16:45:00', type: 'settings' },
  { id: 6, admin: 'Prachi Gupta', action: 'Blocked User', target: 'Sneha Kapur (USR004)', ip: '192.168.1.45', timestamp: '2026-05-09 15:20:00', type: 'user' },
  { id: 7, admin: 'John Miller', action: 'Created Coupon', target: 'WELCOME50 — 50% off', ip: '192.168.1.52', timestamp: '2026-05-09 14:00:00', type: 'coupon' },
  { id: 8, admin: 'Prachi Gupta', action: 'Login', target: 'Dashboard Access', ip: '192.168.1.45', timestamp: '2026-05-09 09:00:00', type: 'auth' },
];

export const MOCK_LOGIN_HISTORY = [
  { id: 1, admin: 'Prachi Gupta', ip: '192.168.1.45', device: 'Chrome / Windows 11', location: 'Mumbai, IN', timestamp: '2026-05-10 09:00:00', status: 'Success' },
  { id: 2, admin: 'John Miller', ip: '192.168.1.52', device: 'Firefox / macOS', location: 'Delhi, IN', timestamp: '2026-05-10 09:15:00', status: 'Success' },
  { id: 3, admin: 'Unknown', ip: '203.45.67.89', device: 'Chrome / Linux', location: 'Unknown', timestamp: '2026-05-09 23:45:00', status: 'Failed' },
  { id: 4, admin: 'Sarah Lee', ip: '192.168.1.67', device: 'Safari / macOS', location: 'Bangalore, IN', timestamp: '2026-05-09 10:30:00', status: 'Success' },
  { id: 5, admin: 'Michael Chen', ip: '192.168.1.80', device: 'Edge / Windows 11', location: 'Pune, IN', timestamp: '2026-05-08 08:45:00', status: 'Success' },
];

// ─── Roles & Permissions ─────────────────────────────────
export const MOCK_ROLES = [
  { id: 1, name: 'Super Admin', description: 'Full platform access with all permissions', members: 1, permissions: ['all'], color: 'blue', createdAt: '2026-01-01' },
  { id: 2, name: 'Catalog Manager', description: 'Manage products, categories, and storefront', members: 2, permissions: ['products.view', 'products.edit', 'categories.view', 'categories.edit', 'banners.view', 'banners.edit'], color: 'green', createdAt: '2026-01-15' },
  { id: 3, name: 'Finance Manager', description: 'Access earnings, payouts, tax, and reports', members: 1, permissions: ['finance.view', 'finance.edit', 'reports.view', 'reports.export'], color: 'amber', createdAt: '2026-02-01' },
  { id: 4, name: 'Support Agent', description: 'Handle tickets, returns, and customer issues', members: 3, permissions: ['tickets.view', 'tickets.edit', 'returns.view', 'returns.edit', 'users.view'], color: 'indigo', createdAt: '2026-02-15' },
];

export const ALL_PERMISSIONS = [
  { group: 'Dashboard', items: ['dashboard.view', 'dashboard.analytics'] },
  { group: 'Users', items: ['users.view', 'users.edit', 'users.block', 'users.delete'] },
  { group: 'Products', items: ['products.view', 'products.edit', 'products.approve', 'products.delete'] },
  { group: 'Orders', items: ['orders.view', 'orders.edit', 'orders.cancel'] },
  { group: 'Finance', items: ['finance.view', 'finance.edit', 'finance.payout'] },
  { group: 'Sellers', items: ['sellers.view', 'sellers.edit', 'sellers.approve', 'sellers.suspend'] },
  { group: 'Categories', items: ['categories.view', 'categories.edit', 'categories.delete'] },
  { group: 'Banners', items: ['banners.view', 'banners.edit', 'banners.delete'] },
  { group: 'Reports', items: ['reports.view', 'reports.export'] },
  { group: 'Settings', items: ['settings.view', 'settings.edit'] },
  { group: 'Tickets', items: ['tickets.view', 'tickets.edit', 'tickets.close'] },
  { group: 'Returns', items: ['returns.view', 'returns.edit', 'returns.approve'] },
  { group: 'Coupons', items: ['coupons.view', 'coupons.edit', 'coupons.delete'] },
  { group: 'Notifications', items: ['notifications.view', 'notifications.send'] },
  { group: 'System', items: ['system.admins', 'system.roles', 'system.audit', 'system.settings'] },
];

// ─── Seller Detail ───────────────────────────────────────
export const MOCK_SELLER_DETAIL = {
  id: 'V101',
  storeName: 'Fashion Hub',
  owner: 'Jane Smith',
  email: 'jane@fashionhub.com',
  phone: '+91 98765 43210',
  address: '42, MG Road, Bangalore, Karnataka 560001',
  status: 'Approved',
  kycStatus: 'Verified',
  joinedDate: '2026-01-15',
  bankAccount: 'HDFC Bank — XXXX4521',
  gst: '29AAACF1234A1Z5',
  pan: 'AAACF1234A',
  totalSales: '₹4,50,000',
  totalOrders: 450,
  totalProducts: 85,
  avgRating: 4.5,
  commission: 10,
  pendingPayout: '₹42,000',
  documents: [
    { name: 'GST Certificate', status: 'Verified', uploadedAt: '2026-01-15' },
    { name: 'PAN Card', status: 'Verified', uploadedAt: '2026-01-15' },
    { name: 'Bank Statement', status: 'Verified', uploadedAt: '2026-01-16' },
    { name: 'Address Proof', status: 'Pending', uploadedAt: '2026-01-18' },
  ],
  recentOrders: [
    { id: 'OD87459', amount: '₹4,500', status: 'Delivered', date: '2026-05-10' },
    { id: 'OD87445', amount: '₹2,800', status: 'Shipped', date: '2026-05-09' },
    { id: 'OD87430', amount: '₹1,200', status: 'Pending', date: '2026-05-08' },
  ],
  topProducts: [
    { name: 'Cotton Kurti Set', sales: 120, revenue: '₹1,20,000' },
    { name: 'Silk Saree', sales: 85, revenue: '₹2,55,000' },
    { name: 'Leather Satchel', sales: 45, revenue: '₹67,500' },
  ],
  monthlyEarnings: [
    { month: 'Jan', earnings: 45000 },
    { month: 'Feb', earnings: 52000 },
    { month: 'Mar', earnings: 48000 },
    { month: 'Apr', earnings: 61000 },
    { month: 'May', earnings: 75000 },
    { month: 'Jun', earnings: 69000 },
  ],
};
