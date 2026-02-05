"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const categories_model_1 = require("../models/categories.model");
class CategoriesController {
    // POST
    static postCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.userId;
                const categoryData = req.body;
                const newCategory = yield categories_model_1.CategoryModel.addCategory(categoryData, userId);
                return res.status(201).json({
                    success: true,
                    message: "Category successfully created",
                    data: newCategory
                });
            }
            catch (error) {
                console.error("Error creating category:", error);
                // Return specific error message from model layer
                const errorMessage = error instanceof Error ? error.message : "Error creating category";
                return res.status(400).json({
                    success: false,
                    message: errorMessage
                });
            }
        });
    }
    static getUserCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("test");
            return res.status(200).json({
                success: true,
                message: "test"
            });
        });
    }
    // GET
    static getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.userId;
                const categories = yield categories_model_1.CategoryModel.findCategories(userId);
                return res.status(200).json({
                    success: true,
                    message: categories.length > 0
                        ? 'Categories successfully retrieved'
                        : 'No categories found',
                    data: categories,
                    count: categories.length
                });
            }
            catch (error) {
                console.error("Error fetching categories:", error);
                const errorMessage = error instanceof Error ? error.message : "Failed to fetch categories";
                return res.status(500).json({
                    success: false,
                    message: errorMessage
                });
            }
        });
    }
}
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map