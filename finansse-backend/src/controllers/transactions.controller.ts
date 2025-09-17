import { TransactionsModel } from "../models/transactions.model";
import { CreateTransactionRequest } from "../types/transactions.types";
import { AuthRequest } from "../utils/auth.middleware";
import { Response } from "express";

export class TransactionsController {
    // POST
    static async postTransaction(req: AuthRequest, res: Response) {
        try {
            const user = req.user!.userId;
            const transactionData: CreateTransactionRequest = req.body;

            const newTransaction = await TransactionsModel.createTransaction(transactionData, user);
            return res.status(201).json({
                success: true,
                message: `Transaction ${newTransaction.transaction_name} created successfully`,
                data: newTransaction
            })
        } catch (error: unknown) {
            console.error('Error creating transaction in controller: ', error);
            
            if (error instanceof Error && error.message === 'Account does not belong to user or does not exist') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                })
            }
            
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}