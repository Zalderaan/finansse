import { CategoryType } from "../generated/prisma";



export interface CreateCategoryRequest {
    category_icon: string,
    category_name: string,
    category_type: CategoryType,
    user_id: number | null

}