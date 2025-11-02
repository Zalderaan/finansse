import prisma from "../db";
import { Prisma, PrismaClient } from '@prisma/client';



export class CategoryModel {
    static async addCategory() {

    }


    // READ
    static async findDefaultCategories() {
        return await prisma.defaultCategory.findMany({
            orderBy: {
                d_category_name: "asc" 
            }
        })
    }

    static async findUserCategories(userId: number) {
        return await prisma.userCategory.findMany({
            where: {
                user_id: userId
            },
            orderBy: {
                u_category_name: "asc"
            }
        })
    }
}