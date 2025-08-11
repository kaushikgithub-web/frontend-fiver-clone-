
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://server-fever-clone.onrender.com/';
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
    AVATAR: '/users/avatar',
  },
  GIGS: {
    BASE: '/gigs',
    SEARCH: '/gigs/search',
    CATEGORIES: '/gigs/categories',
    FEATURED: '/gigs/featured',
    BY_USER: '/gigs/user',
    CREATE: '/gigs/create',
    UPDATE: '/gigs/update',
    DELETE: '/gigs/delete',
  },
  ORDERS: {
    BASE: '/orders',
    CREATE: '/orders/create',
    UPDATE: '/orders/update',
    BY_USER: '/orders/user',
    BY_SELLER: '/orders/seller',
    BY_BUYER: '/orders/buyer',
  },
  MESSAGES: {
    BASE: '/messages',
    CONVERSATION: '/messages/conversation',
    SEND: '/messages/send',
    MARK_READ: '/messages/mark-read',
  },
  REVIEWS: {
    BASE: '/reviews',
    CREATE: '/reviews/create',
    BY_GIG: '/reviews/gig',
    BY_USER: '/reviews/user',
  },
  UPLOADS: {
    IMAGE: '/uploads/image',
    DOCUMENT: '/uploads/document',
  },
  PAYMENTS: {
    CREATE_INTENT: '/payments/create-intent',
    CONFIRM: '/payments/confirm',
    WEBHOOKS: '/payments/webhooks',
  },
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const getAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
});

export const getMultipartHeaders = (token) => ({
  'Authorization': `Bearer ${token}`,
});

export default API_BASE_URL;