import type { User, LoginRequest, LoginResponse, RegisterRequest, RefreshTokenResponse } from "../auth.types";
import { axiosInstance } from "@/lib/axios";

// API functions
const prefix = 'auth';

export const authApiService = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await axiosInstance.post(`${prefix}/login`, data);
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<{ user: User; token: string }> => {
        const response = await axiosInstance.post(`${prefix}/register`, data);
        return response.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await axiosInstance.get(`${prefix}/me`);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await axiosInstance.post(`${prefix}/logout`);
    },

    refreshToken: async (): Promise<RefreshTokenResponse> => {
        console.log("refreshToken called")
        const response = await axiosInstance.post(`${prefix}/refresh`);
        console.log("refreshToken response: ", response);
        return response.data;
    }
};