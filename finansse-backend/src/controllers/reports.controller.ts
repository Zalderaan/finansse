import { Response, Request } from 'express';
import { BalanceModel } from "../models/balance.model"
import { AuthRequest } from '../utils/auth.middleware';

export class ReportsController {
    static async getRunningBalance(req: AuthRequest, res: Response) {
        try {
            const user = req.user!.userId;
            const trend = await BalanceModel.getUserBalanceTrend(user);

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
}