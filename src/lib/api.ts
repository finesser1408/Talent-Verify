import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (error) {
        // Handle refresh token failure (e.g., redirect to login)
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const auth = {
  login: (username: string, password: string) =>
    api.post('/token/', { username, password }),
  register: (data: any) => api.post('/register/', data),
};

export const companies = {
  list: () => api.get('/companies/'),
  create: (data: any) => api.post('/companies/', data),
  update: (id: number, data: any) => api.put(`/companies/${id}/`, data),
  delete: (id: number) => api.delete(`/companies/${id}/`),
  bulkUpload: (id: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/companies/${id}/bulk_upload_employees/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export const departments = {
  list: (companyId?: number) =>
    api.get('/departments/', { params: { company_id: companyId } }),
  create: (data: any) => api.post('/departments/', data),
  update: (id: number, data: any) => api.put(`/departments/${id}/`, data),
  delete: (id: number) => api.delete(`/departments/${id}/`),
};

export const employees = {
  list: (params?: any) => api.get('/employees/', { params }),
  create: (data: any) => api.post('/employees/', data),
  update: (id: number, data: any) => api.put(`/employees/${id}/`, data),
  delete: (id: number) => api.delete(`/employees/${id}/`),
};

export default api; 