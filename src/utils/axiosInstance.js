import axios from 'axios';
import API_BASE_URL from '@/config/api';
import { storage } from './helpers';
import { STORAGE_KEYS } from './constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const skipAuthRoutes = ['/auth/login', '/auth/register'];
    const isPublic = skipAuthRoutes.some(path => config.url?.includes(path));

    const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('🔴 Axios Request Error:', error.message);
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      console.warn('⚠️ Unauthorized - Token may be missing or expired.');
    }

    const message = error?.response?.data?.message || error.message;
    console.error('🔴 API Response Error:', message);

    return Promise.reject(error);
  }
);

export default axiosInstance;
