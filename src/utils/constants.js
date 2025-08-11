// Application constants
export const APP_NAME = 'FreelanceHub';
export const APP_DESCRIPTION = 'Find the perfect freelance services for your business';

// User roles
export const USER_ROLES = {
  CLIENT: 'client',
  FREELANCER: 'freelancer',
  ADMIN: 'admin',
};

// Order statuses
export const ORDER_STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  DELIVERED: 'Delivered',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  DISPUTED: 'Disputed',
};

// Gig categories
export const GIG_CATEGORIES = [
  { id: 1, name: 'Web Development', slug: 'web-development', icon: '💻' },
  { id: 2, name: 'Graphic Design', slug: 'graphic-design', icon: '🎨' },
  { id: 3, name: 'Digital Marketing', slug: 'digital-marketing', icon: '📱' },
  { id: 4, name: 'Writing & Translation', slug: 'writing-translation', icon: '✍️' },
  { id: 5, name: 'Video & Animation', slug: 'video-animation', icon: '🎥' },
  { id: 6, name: 'Music & Audio', slug: 'music-audio', icon: '🎵' },
  { id: 7, name: 'Programming', slug: 'programming', icon: '⚡' },
  { id: 8, name: 'Business', slug: 'business', icon: '💼' },
];

// File upload limits
export const FILE_LIMITS = {
  IMAGE: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    MAX_COUNT: 5,
  },
  DOCUMENT: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    MAX_COUNT: 3,
  },
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// API response codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Form validation rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
  TITLE_MIN_LENGTH: 10,
  DESCRIPTION_MIN_LENGTH: 50,
  MIN_PRICE: 5,
  MAX_PRICE: 10000,
  MIN_DELIVERY_DAYS: 1,
  MAX_DELIVERY_DAYS: 365,
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  FILE_TOO_LARGE: 'File size is too large.',
  INVALID_FILE_TYPE: 'Invalid file type.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in!',
  REGISTER: 'Account created successfully!',
  LOGOUT: 'Successfully logged out!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  GIG_CREATED: 'Gig created successfully!',
  GIG_UPDATED: 'Gig updated successfully!',
  ORDER_PLACED: 'Order placed successfully!',
  MESSAGE_SENT: 'Message sent successfully!',
  REVIEW_SUBMITTED: 'Review submitted successfully!',
};

// Theme colors (matching Tailwind config)
export const THEME_COLORS = {
  PRIMARY: '#3b82f6',
  ACCENT: '#10b981',
  BACKGROUND: '#f9fafb',
  TEXT: '#1f2937',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
};

export default {
  APP_NAME,
  APP_DESCRIPTION,
  USER_ROLES,
  ORDER_STATUS,
  GIG_CATEGORIES,
  FILE_LIMITS,
  PAGINATION,
  STORAGE_KEYS,
  HTTP_STATUS,
  VALIDATION_RULES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  THEME_COLORS,
};