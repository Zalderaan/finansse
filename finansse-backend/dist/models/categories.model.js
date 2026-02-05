"use strict";
// import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
// import { Prisma } from '../generated/prisma/client'
const client_1 = require("../generated/prisma/client");
const db_1 = __importDefault(require("../db"));
class CategoryModel {
    static addCategory(categoryData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log('categoryData received:', categoryData); // Debug log
            try {
                const new_category = yield db_1.default.category.create({
                    data: {
                        category_icon: (_a = categoryData.category_icon) !== null && _a !== void 0 ? _a : null,
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
            }
            catch (error) {
                // Add this detailed logging
                console.error("Full error object:", error);
                // console.error("Error name:", error?.name);
                // console.error("Error message:", error?.message);
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    console.error("Prisma error code:", error.code);
                    if (error.code === "P2003") {
                        throw new Error(`Invalid user ID provided`);
                    }
                }
                if (error instanceof client_1.Prisma.PrismaClientValidationError) {
                    console.error("Validation error details:", error);
                    throw new Error('Invalid category data provided');
                }
                // Re-throw unknown errors
                console.error("Error creating category from model:", error);
                throw error;
            }
        });
    }
    static findCategories(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [default_categories, user_categories] = yield Promise.all([
                    db_1.default.category.findMany({
                        where: { category_isDefault: true },
                        orderBy: { category_name: "asc" }
                    }),
                    db_1.default.category.findMany({
                        where: { user_id: userId },
                        orderBy: { category_name: "asc" }
                    })
                ]);
                return [...default_categories, ...user_categories];
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    // P2025: Record not found
                    if (error.code === "P2025") {
                        throw new Error('Categories not found');
                    }
                    // P2024: Connection timeout
                    if (error.code === "P2024") {
                        throw new Error('Database connection timeout');
                    }
                }
                if (error instanceof client_1.Prisma.PrismaClientValidationError) {
                    throw new Error('Invalid query parameters');
                }
                throw new Error('Failed to fetch categories');
            }
        });
    }
}
exports.CategoryModel = CategoryModel;
//# sourceMappingURL=categories.model.js.map