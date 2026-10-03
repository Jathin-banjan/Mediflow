import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle global 401 Unauthorized
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register' && currentPath !== '/') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

// API Service Methods
export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data)
};

export const hospitalAPI = {
  getHospitals: (params) => API.get('/hospitals', { params }),
  getHospitalById: (id) => API.get(`/hospitals/${id}`),
  updateHospital: (id, data) => API.put(`/hospitals/${id}`, data)
};

export const doctorAPI = {
  getDoctors: (params) => API.get('/doctors', { params }),
  getDoctorById: (id) => API.get(`/doctors/${id}`),
  getDoctorSlots: (id, date) => API.get(`/doctors/${id}/slots`, { params: { date } })
};

export const departmentAPI = {
  getDepartments: (params) => API.get('/departments', { params }),
  getDepartmentPlanner: (id, date) => API.get(`/departments/${id}/planner`, { params: { date } })
};

export const appointmentAPI = {
  book: (data) => API.post('/appointments', data),
  getAppointments: () => API.get('/appointments'),
  getById: (id) => API.get(`/appointments/${id}`),
  checkIn: (id) => API.post(`/appointments/${id}/check-in`),
  cancel: (id) => API.put(`/appointments/${id}/cancel`),
  reschedule: (id, data) => API.put(`/appointments/${id}/reschedule`, data)
};

export const queueAPI = {
  getQueues: (params) => API.get('/queues', { params }),
  getById: (id) => API.get(`/queues/${id}`),
  handleAction: (id, data) => API.post(`/queues/${id}/action`, data)
};

export const reviewAPI = {
  create: (data) => API.post('/reviews', data),
  getReviews: (params) => API.get('/reviews', { params })
};

export const notificationAPI = {
  getNotifications: () => API.get('/notifications'),
  markAsRead: (id) => API.put(`/notifications/${id}/read`)
};

export const analyticsAPI = {
  getAnalytics: (range) => API.get('/analytics', { params: { range } })
};

export const adminAPI = {
  getSystemOverview: () => API.get('/admin/system'),
  toggleVerification: (id) => API.put(`/admin/hospitals/${id}/verify`)
};

export default API;
