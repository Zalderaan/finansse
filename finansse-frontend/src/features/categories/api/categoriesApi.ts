import { axiosInstance } from "@/lib/axios";
import type { DefaultCategoriesResponse, UserCategoriesResponse } from "@/features/categories/types/categories.types"

const prefix = 'categories';

// CRUD
export const categoriesApiService = {
    // CREATE

    // READ
    getDefaultCategories: async (): Promise<DefaultCategoriesResponse> => {
        const response = await axiosInstance.get(`${prefix}/default`);
        return response.data;
    },

    getUserCategories: async (): Promise<UserCategoriesResponse> => {
        const response = await axiosInstance.get(`${prefix}/user`);
        return response.data;
    }
}