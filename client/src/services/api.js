import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  create: (name) => api.post('/categories', { name }),
  update: (id, name) => api.patch(`/categories/${id}`, { name }),
  delete: (id) => api.delete(`/categories/${id}`),
};

// Questions API
export const questionsAPI = {
  getByCategory: (categoryId) => api.get(`/questions/category/${categoryId}`),
  getById: (id) => api.get(`/questions/${id}`),
  create: (categoryId, questionText) => api.post(`/questions/category/${categoryId}`, { questionText }),
  update: (id, data) => api.patch(`/questions/${id}`, data),
  delete: (id) => api.delete(`/questions/${id}`),
  reorder: (questions) => api.patch('/questions/reorder', { questions }),
  getFavorites: () => api.get('/questions/favorites'),
};

// Notes API
export const notesAPI = {
  get: (userId = 'default-user') => api.get(`/notes?userId=${userId}`),
  update: (content, userId = 'default-user') => api.put(`/notes?userId=${userId}`, { content }),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;
