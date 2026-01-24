// import { CategoryType } from "../generated/prisma";
import { CategoryType } from "../generated/prisma/enums"


export interface CreateCategoryRequest {
    category_icon: string,
    category_name: string,
    category_type: CategoryType,
    user_id: number | null

}