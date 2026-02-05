import axios from 'axios'
import { setupInterceptors } from './axios.interceptors';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/finansse-backend';

// create axios instance
export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

setupInterceptors();