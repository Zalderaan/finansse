import { Response } from 'express';
import { BalanceModel } from "../models/reports.model"
import { AuthRequest } from '../utils/auth.middleware';

export class ReportsController {
    static async getRunningBalance(req: AuthRequest, res: Response) {
        try {
            const user = req.user!.userId;
            const period = req.body;
            console.log(period);

            const trend = await BalanceModel.getUserBalanceTrend(user, period);

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

    static async getUserSpending() {
        
    }
}