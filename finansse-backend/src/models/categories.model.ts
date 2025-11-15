import prisma from "../db";
import { Prisma, PrismaClient } from '@prisma/client';



export class CategoryModel {
    static async addCategory() {

    }


    // // READ
    // static async findDefaultCategories() {
    //     return await prisma.defaultCategory.findMany({
    //         orderBy: {
    //             d_category_name: "asc" 
    //         }
    //     })
    // }

    // static async findUserCategories(userId: number) {
    //     return await prisma.userCategory.findMany({
    //         where: {
    //             user_id: userId
    //         },
    //         orderBy: {
    //             u_category_name: "asc"
    //         }
    //     })
    // }

    // READ
    static async findCategories(userId: number) {
        const [default_categories, user_categories] = await Promise.all([
            prisma.category.findMany({
                where: { category_isDefault: true },
                orderBy: { category_name: "asc" }
            }),

            prisma.category.findMany({
                where: { user_id: userId },
                orderBy: { category_name: "asc" }

            })
        ])
        return [...default_categories, ...user_categories]
    }
}