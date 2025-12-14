import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import prisma from "../db";
import { CreateCategoryRequest } from "../types/categories.types";


export class CategoryModel {
    static async addCategory(categoryData: CreateCategoryRequest, userId: number) {
        try {
            const new_category = await prisma.category.create({
                data: {
                    category_icon: categoryData.category_icon ?? null,
                    category_name: categoryData.category_name,
                    category_type: categoryData.category_type,
                    category_isDefault: false,
                    user_id: userId
                },
                select: {
                    category_id: true,
                    category_name: true,
                    category_type: true
                }
            });
            return new_category;

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2003") {
                    throw new Error(`Invalid user ID provided`);
                }
            }

            if (error instanceof PrismaClientValidationError) {
                throw new Error('Invalid category data provided');
            }

            // Re-throw unknown errors
            console.error("Error creating category from model:", error);
            throw error;
        }
    }

    static async findCategories(userId: number) {
        try {
            const [default_categories, user_categories] = await Promise.all([
                prisma.category.findMany({
                    where: { category_isDefault: true },
                    orderBy: { category_name: "asc" }
                }),

                prisma.category.findMany({
                    where: { user_id: userId },
                    orderBy: { category_name: "asc" }
                })
            ]);

            return [...default_categories, ...user_categories];

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // P2025: Record not found
                if (error.code === "P2025") {
                    throw new Error('Categories not found');
                }
                // P2024: Connection timeout
                if (error.code === "P2024") {
                    throw new Error('Database connection timeout');
                }
            }

            if (error instanceof PrismaClientValidationError) {
                throw new Error('Invalid query parameters');
            }

            throw new Error('Failed to fetch categories');
        }
    }
}