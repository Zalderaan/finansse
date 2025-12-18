export interface Category {
    category_id: number;
    category_name: string;
    category_icon?: string;
    category_type: string;
    category_isDefault: boolean;
    user_id: number;
}

export interface CreateCategoryRequest {
    category_name: string,
    category_type: string,
    category_icon?: string | null,
}

export interface CreateCategoryResponse {
    success: string,
    message: string,
    data: {
        category_id: number,
        category_name: string,
        category_type: string
    }
}

export interface CategoriesResponse {
    success: string;
    message: string;
    data: Category[];
    count: number;
}

