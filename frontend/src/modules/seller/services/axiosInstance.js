/**
 * Seller Module — Axios Instance
 * Pre-configured Axios instance for seller API calls.
 * When backend is ready, update the baseURL and add real auth token.
 */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/seller', // TODO: Update with actual API base URL
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ─────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    // TODO: Get token from auth context/storage
    const token = localStorage.getItem('seller_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token expired — redirect to login
          localStorage.removeItem('seller_token');
          localStorage.removeItem('seller_data');
          window.location.href = '/seller/login';
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
