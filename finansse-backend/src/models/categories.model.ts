// import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

// import { Prisma } from '../generated/prisma/client'
import { Prisma } from '../generated/prisma/client'
import prisma from "../db";
import { CreateCategoryRequest } from "../types/categories.types";


export class CategoryModel {
    static async addCategory(categoryData: CreateCategoryRequest, userId: number) {
        console.log('categoryData received:', categoryData);  // Debug log
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
            // Add this detailed logging
            console.error("Full error object:", error);
            // console.error("Error name:", error?.name);
            // console.error("Error message:", error?.message);

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.error("Prisma error code:", error.code);
                if (error.code === "P2003") {
                    throw new Error(`Invalid user ID provided`);
                }
            }

            if (error instanceof Prisma.PrismaClientValidationError) {
                console.error("Validation error details:", error);
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
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // P2025: Record not found
                if (error.code === "P2025") {
                    throw new Error('Categories not found');
                }
                // P2024: Connection timeout
                if (error.code === "P2024") {
                    throw new Error('Database connection timeout');
                }
            }

            if (error instanceof Prisma.PrismaClientValidationError) {
                throw new Error('Invalid query parameters');
            }

            throw new Error('Failed to fetch categories');
        }
    }
}