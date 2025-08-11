import axios from 'axios';
import API_BASE_URL, { getAuthHeaders } from '../config/api.js';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // Generic methods
  get: (url, config = {}) => api.get(url, config),
  post: (url, data, config = {}) => api.post(url, data, config),
  put: (url, data, config = {}) => api.put(url, data, config),
  patch: (url, data, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),

  // Authentication
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
    refreshToken: () => api.post('/auth/refresh'),
    getProfile: () => api.get('/auth/profile'),
  },

  // Users
  users: {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.put('/users/profile', data),
    uploadAvatar: (formData) => api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  },

  // Gigs
  gigs: {
    getAll: (params = {}) => api.get('/gigs', { params }),
    getById: (id) => api.get(`/gigs/${id}`),
    search: (query, filters = {}) => api.get('/gigs/search', { 
      params: { q: query, ...filters } 
    }),
    getCategories: () => api.get('/gigs/categories'),
    getFeatured: () => api.get('/gigs/featured'),
    getByUser: (userId) => api.get(`/gigs/user/${userId}`),
    create: (gigData) => api.post('/gigs', gigData),
    update: (id, gigData) => api.put(`/gigs/${id}`, gigData),
    delete: (id) => api.delete(`/gigs/${id}`),
    uploadImages: (gigId, formData) => api.post(`/gigs/${gigId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  },

  // Orders
  orders: {
    getAll: () => api.get('/orders'),
    getById: (id) => api.get(`/orders/${id}`),
    getByUser: () => api.get('/orders/user'),
    getBySeller: () => api.get('/orders/seller'),
    getByBuyer: () => api.get('/orders/buyer'),
    create: (orderData) => api.post('/orders', orderData),
    update: (id, updateData) => api.put(`/orders/${id}`, updateData),
    updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  },

  // Messages
  messages: {
    getConversation: (orderId) => api.get(`/messages/conversation/${orderId}`),
    send: (messageData) => api.post('/messages', messageData),
    markAsRead: (messageId) => api.patch(`/messages/${messageId}/read`),
    getUnreadCount: () => api.get('/messages/unread-count'),
  },

  // Reviews
  reviews: {
    getByGig: (gigId) => api.get(`/reviews/gig/${gigId}`),
    getByUser: (userId) => api.get(`/reviews/user/${userId}`),
    create: (reviewData) => api.post('/reviews', reviewData),
    update: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
    delete: (id) => api.delete(`/reviews/${id}`),
  },

  // File uploads
  uploads: {
    uploadImage: (formData) => api.post('/uploads/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    uploadDocument: (formData) => api.post('/uploads/document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  },

  // Payments (for future integration)
  payments: {
    createPaymentIntent: (orderData) => api.post('/payments/create-intent', orderData),
    confirmPayment: (paymentIntentId) => api.post('/payments/confirm', { paymentIntentId }),
  },
};

export default api;