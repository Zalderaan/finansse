import { Response, Request } from "express";
import { CategoryModel } from "../models/categories.model";
import { AuthRequest } from "../utils/auth.middleware";


export class CategoriesController {
    // POST
    static async postCategory() {

    }

    // GET
    // static async getDefaultCategories(req: AuthRequest, res: Response) {
    //     try {
    //         const defaults = await CategoryModel.findDefaultCategories();

    //         if (!defaults) {
    //             return res.status(404).json({
    //                 success: false,
    //                 message: "No default categories found"
    //             })
    //         }

    //         return res.status(200).json({
    //             success: true,
    //             message: defaults.length > 0 ? 'Default categories successfully retrieved' : 'No default categories found',
    //             data: defaults,
    //             count: defaults.length
    //         });

    //     } catch (error) {
    //         console.error("Error geting default categories in controller: ", error);
    //         return res.status(500).json({
    //             success: false,
    //             message: "Internal server error"
    //         })
    //     }
    // }

    // static async getUserCategories(req: AuthRequest, res: Response) {
    //     try {
    //         const user = req.user!.userId;
    //         const user_categories = await CategoryModel.findUserCategories(user);

    //         return res.status(200).json({
    //             success: true,
    //             message: user_categories.length > 0 ? 'User categories successfully retrieved' : 'No user categories found',
    //             data: user_categories,
    //             count: user_categories.length
    //         });
    //     } catch (error) {
    //         console.error("Error getting user categories in controller: ", error);
    //         return res.status(500).json({
    //             success: false,
    //             message: "Internal server error"
    //         });
    //     }
    // }

    static async getCategories(req: AuthRequest, res: Response) {
        try {
            const user = req.user!.userId;
            const user_categories = await CategoryModel.findCategories(user);

            return res.status(200).json({
                success: true,
                message: user_categories.length > 0 ? 'Categories successfully retrieved' : 'No user categories found',
                data: user_categories,
                count: user_categories.length
            })
        } catch (error) {
            console.error("Error getting categories in controller: ", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
}