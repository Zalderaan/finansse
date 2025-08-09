import axios from 'axios'
import { useAuthStore } from '@/features/auth/stores/auth.store';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/finansse-backend';

// create axios instance
export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// interceptor to add token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().getToken();
        console.log('token in req interceptor: ', token);
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// Response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized responses
        if (error.response?.status === 401) {
            // Clear auth state and redirect to login
            useAuthStore.getState().logout();
            window.location.href = '/login';
        }
        
        return Promise.reject(error);
    }
);