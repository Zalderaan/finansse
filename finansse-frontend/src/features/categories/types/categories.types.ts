
export interface DefaultCategory {
    d_category_id: number;
    d_category_name: string;
    d_category_type: string;
    d_category_icon?: string;
}

export interface DefaultCategoriesResponse {
    success: string;
    message: string;
    data: DefaultCategory[];
    count: number;
}

export interface UserCategory {
    u_category_id: number;
    u_category_name: string;
    u_category_type: string;
    u_category_icon?: string;
    user_id: number;
}

export interface UserCategoriesResponse {
    success: string;
    message: string;
    data: UserCategory[];
    count: number;
}
