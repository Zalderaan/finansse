import type { User, LoginRequest, RegisterRequest } from "../auth.types";
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/finansse-backend';

// create axios instance
const authApi = axios.create({
    baseURL: `${API_BASE_URL}/auth`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

authApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Don't manually clear cookies - let the server handle it
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API functions
export const authApiService = {
    login: async ( data: LoginRequest): Promise<{ user: User; token: string}> => {
        const response = await authApi.post('/login', data);
        return response.data;
    },

    register: async ( data: RegisterRequest): Promise<{user: User; token: string}> => {
        const response = await authApi.post('/register', data);
        return response.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await authApi.get('/me');
        return response.data;
    },

    logout: async (): Promise<void> => {
        await authApi.post('/logout');
    },
};