import { Response } from 'express';
import { BalanceModel } from "../models/reports.model"
import { AuthRequest } from '../utils/auth.middleware';

export class ReportsController {
    static async getRunningBalance(req: AuthRequest, res: Response) {
        try {
            const user = req.user!.userId;
            const period = req.query.period as string;
            console.log("period: ", period);

            const trend = await BalanceModel.fetchUserBalanceTrend(user, period);

            console.log(trend);

            if (!trend) {
                return res.status(404).json({
                    success: false,
                    message: "User balances not found"
                })
            }

            return res.status(200).json({
                success: true,
                data: trend,
            });

        } catch (error) {
            console.error("Error in balance controller: ", error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }

    static async getUserSpendingByCategory(req: AuthRequest, res: Response) {
        try {
            const user = Number(req.user?.userId);
            const userSpendByCategory = await BalanceModel.fetchSpendingByCategory(user);

            if (!userSpendByCategory) {
                return res.status(404).json({
                    success: false,
                    message: "User spending by category not found"
                })
            }

            console.log("userSpendByCategory: ", userSpendByCategory);

            return res.status(200).json({
                success: true,
                data: userSpendByCategory
            })
        } catch (error) {
            console.error("Error getting user spend by category in reports.controller: ", error);
            return res.status(500).json({
                success: false,
                message: `Internal server error: ${error}`
            })
        }
    }

        static async getUserIncomeByCategory(req: AuthRequest, res: Response) {
        try {
            const user = Number(req.user?.userId);
            const userIncomeByCategory = await BalanceModel.fetchIncomeByCategory(user);

            if (!userIncomeByCategory) {
                return res.status(404).json({
                    success: false,
                    message: "User income by category not found"
                })
            }

            console.log("userIncomeByCategory: ", userIncomeByCategory);

            return res.status(200).json({
                success: true,
                data: userIncomeByCategory
            })
        } catch (error) {
            console.error("Error getting user spend by category in reports.controller: ", error);
            return res.status(500).json({
                success: false,
                message: `Internal server error: ${error}`
            })
        }
    }

    static async getUserBalance(req: AuthRequest, res: Response) {
        try {
            const user = Number(req.user?.userId);
            const data = await BalanceModel.fetchUserBalance(user);

            console.log("data: ", data);
            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "No user balance calculated"
                })
            }
            return res.status(200).json({
                success: true,
                data: data
            })

        } catch (error) {
            console.error("Error getting user balance in controller: ", error);
            return res.status(500).json({
                success: false,
                message: `Internal server error: ${error}`
            })
        }
    }


    // get userIncome
    static async getUserIncome(req: AuthRequest, res: Response) {
        try {
            const user = req.user!.userId;
            const userIncome = await BalanceModel.fetchUserTotalncome(user)

            console.log("userIncome: ", userIncome);

            res.status(200).json({
                success: true,
                data: userIncome
            })
        } catch (error) {
            console.error("Error in reports.controller, getUserIncome: ", error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    static async getDashboardData(req: AuthRequest, res: Response) {
        try {
            const userId = Number(req.user?.userId);

            const [totalIncome, totalExpense, currentBalance] = await Promise.all([
                BalanceModel.fetchUserTotalncome(userId),
                BalanceModel.fetchUserTotalExpense(userId),
                BalanceModel.fetchUserBalance(userId)
            ]);

            return res.status(200).json({
                success: true,
                data: {
                    totalIncome: Number(totalIncome),
                    totalExpense: Number(totalExpense),
                    currentBalance: Number(currentBalance),
                }
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error: ', error
            })
        }
    }
}