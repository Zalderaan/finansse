import { axiosInstance } from "@/lib/axios";
import type { CategoriesResponse, CreateCategoryRequest, CreateCategoryResponse } from "@/features/categories/types/categories.types"

const prefix = 'categories';

// CRUD
export const categoriesApiService = {
    // CREATE
    createCategory: async (data: CreateCategoryRequest): Promise<CreateCategoryResponse> => {
        const response = await axiosInstance.post(`${prefix}/create`, data);
        return response.data;
    },

    // READ
    getCategories: async (): Promise<CategoriesResponse> => {
        const response = await axiosInstance.get(`${prefix}`);
        return response.data;
    },

    // TODO: Update

    // TODO: Delete
}