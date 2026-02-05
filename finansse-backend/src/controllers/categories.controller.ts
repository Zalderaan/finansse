import { Response, Request } from "express";
import { CategoryModel } from "../models/categories.model";
import { AuthRequest } from "../utils/auth.middleware";
import { CreateCategoryRequest } from "../types/categories.types";


export class CategoriesController {
    // POST
    static async postCategory(req: AuthRequest, res: Response) {
        try {
            const userId = req.user!.userId;
            const categoryData: CreateCategoryRequest = req.body;
            
            const newCategory = await CategoryModel.addCategory(categoryData, userId);

            return res.status(201).json({
                success: true,
                message: "Category successfully created",
                data: newCategory
            });

        } catch (error) {
            console.error("Error creating category:", error);
            
            // Return specific error message from model layer
            const errorMessage = error instanceof Error ? error.message : "Error creating category";
            
            return res.status(400).json({
                success: false,
                message: errorMessage
            });
        }
    }

    static async getUserCategories(req: AuthRequest, res: Response) {
        console.log("test");
        return res.status(200).json({
            success: true,
            message: "test"
        })
    }
    // GET
    static async getCategories(req: AuthRequest, res: Response) {
        try {
            const userId = req.user!.userId;
            const categories = await CategoryModel.findCategories(userId);

            return res.status(200).json({
                success: true,
                message: categories.length > 0 
                    ? 'Categories successfully retrieved' 
                    : 'No categories found',
                data: categories,
                count: categories.length
            });

        } catch (error) {
            console.error("Error fetching categories:", error);
            
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch categories";
            
            return res.status(500).json({
                success: false,
                message: errorMessage
            });
        }
    }
}