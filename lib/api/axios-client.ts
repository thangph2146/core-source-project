import axios from 'axios';
import { logger } from '@/lib/logger';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5678';

// Tạo axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor để thêm token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      logger.debug(`Token from localStorage: ${token ? 'Found' : 'Not found'}`);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        logger.debug(`Authorization header set: Bearer ${token.substring(0, 20)}...`);
      } else {
        logger.warn('No token found in localStorage');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - chỉ clear data, không redirect
      logger.error('Unauthorized request detected');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        // Để AuthGuard handle redirect thay vì redirect ở đây
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;