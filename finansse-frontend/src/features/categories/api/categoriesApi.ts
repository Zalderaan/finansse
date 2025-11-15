import { axiosInstance } from "@/lib/axios";
import type { CategoriesResponse } from "@/features/categories/types/categories.types"

const prefix = 'categories';

// CRUD
export const categoriesApiService = {
    // CREATE

    // READ
    getCategories: async (): Promise<CategoriesResponse> => {
        const response = await axiosInstance.get(`${prefix}`);
        return response.data;
    }
}