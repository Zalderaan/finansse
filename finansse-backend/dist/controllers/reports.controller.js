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
exports.ReportsController = void 0;
const reports_model_1 = require("../models/reports.model");
class ReportsController {
    static getRunningBalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user.userId;
                const period = req.query.period;
                console.log("period: ", period);
                const trend = yield reports_model_1.BalanceModel.fetchUserBalanceTrend(user, period);
                console.log(trend);
                if (!trend) {
                    return res.status(404).json({
                        success: false,
                        message: "User balances not found"
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: trend,
                });
            }
            catch (error) {
                console.error("Error in balance controller: ", error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        });
    }
    static getUserSpendingByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
                const userSpendByCategory = yield reports_model_1.BalanceModel.fetchSpendingByCategory(user);
                if (!userSpendByCategory) {
                    return res.status(404).json({
                        success: false,
                        message: "User spending by category not found"
                    });
                }
                console.log("userSpendByCategory: ", userSpendByCategory);
                return res.status(200).json({
                    success: true,
                    data: userSpendByCategory
                });
            }
            catch (error) {
                console.error("Error getting user spend by category in reports.controller: ", error);
                return res.status(500).json({
                    success: false,
                    message: `Internal server error: ${error}`
                });
            }
        });
    }
    static getUserIncomeByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
                const userIncomeByCategory = yield reports_model_1.BalanceModel.fetchIncomeByCategory(user);
                if (!userIncomeByCategory) {
                    return res.status(404).json({
                        success: false,
                        message: "User income by category not found"
                    });
                }
                console.log("userIncomeByCategory: ", userIncomeByCategory);
                return res.status(200).json({
                    success: true,
                    data: userIncomeByCategory
                });
            }
            catch (error) {
                console.error("Error getting user spend by category in reports.controller: ", error);
                return res.status(500).json({
                    success: false,
                    message: `Internal server error: ${error}`
                });
            }
        });
    }
    static getUserBalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
                const data = yield reports_model_1.BalanceModel.fetchUserBalance(user);
                console.log("data: ", data);
                if (!data) {
                    return res.status(404).json({
                        success: false,
                        message: "No user balance calculated"
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: data
                });
            }
            catch (error) {
                console.error("Error getting user balance in controller: ", error);
                return res.status(500).json({
                    success: false,
                    message: `Internal server error: ${error}`
                });
            }
        });
    }
    // get userIncome
    static getUserIncome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user.userId;
                const userIncome = yield reports_model_1.BalanceModel.fetchUserTotalncome(user);
                console.log("userIncome: ", userIncome);
                res.status(200).json({
                    success: true,
                    data: userIncome
                });
            }
            catch (error) {
                console.error("Error in reports.controller, getUserIncome: ", error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        });
    }
    static getDashboardData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
                const [totalIncome, totalExpense, currentBalance] = yield Promise.all([
                    reports_model_1.BalanceModel.fetchUserTotalncome(userId),
                    reports_model_1.BalanceModel.fetchUserTotalExpense(userId),
                    reports_model_1.BalanceModel.fetchUserBalance(userId)
                ]);
                return res.status(200).json({
                    success: true,
                    data: {
                        totalIncome: Number(totalIncome),
                        totalExpense: Number(totalExpense),
                        currentBalance: Number(currentBalance),
                    }
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error: ', error
                });
            }
        });
    }
}
exports.ReportsController = ReportsController;
//# sourceMappingURL=reports.controller.js.map