import { AuthModel } from "../models/auth.model";
import { TransactionsModel } from "../models/transactions.model";
import { CreateTransactionRequest, UpdateTransactionRequest } from "../types/transactions.types";
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

            if (error instanceof Error) {
                // Handle specific business logic errors
                if (error.message.includes('does not belong to user or does not exist')) {
                    return res.status(404).json({
                        success: false,
                        message: error.message
                    });
                }

                if (error.message === 'Insufficient funds in account') {
                    return res.status(400).json({
                        success: false,
                        message: error.message
                    });
                }

                if (error.message.includes('Transfer account ID is required') ||
                    error.message.includes('balance is not a valid number')) {
                    return res.status(400).json({
                        success: false,
                        message: error.message
                    });
                }
            }

            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // GET
    static async getTransactionsByAcc(req: AuthRequest, res: Response) {
        try {
            const user = req.user!.userId;
            const accountId = Number(req.params.accountId);

            const transactions = await TransactionsModel.findTransactionsByAcc(accountId, user);

            res.status(200).json({
                success: true,
                message: 'Transactions retrieved!',
                data: transactions
            });
        } catch (error) {
            console.error('Error getting transactions for account: ', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    static async getTransactionsByUser(req: AuthRequest, res: Response) {
        try {
            const user_id = req.user!.userId;
            const user_transactions = await TransactionsModel.findTransactionsByUser(user_id);

            res.status(200).json({
                success: true,
                message: 'User transactions retrieved!',
                data: user_transactions
            })
        } catch (error) {
            console.error('Error getting user\'s transactions: ', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }

    static async updateTransaction(req: AuthRequest, res: Response) {
        try {
            const user = req.user!.userId;
            const transaction_id = Number(req.params.id);
            const updateTransactionData: UpdateTransactionRequest = req.body;

            const updatedTransaction = await TransactionsModel.updateTransactionByID(updateTransactionData, user, transaction_id);
            return res.status(201).json({
                success: true,
                message: `Transaction ${updatedTransaction.transaction_name} updated successfully`,
                data: updatedTransaction
            });

        } catch (error: unknown) {
            console.error('Error updating transaction in controller: ', error);

            if (error instanceof Error) {
                // Handle specific business logic errors
                if (error.message.includes('does not belong to user or does not exist')) {
                    return res.status(404).json({
                        success: false,
                        message: error.message
                    });
                }

                if (error.message === 'Insufficient funds in account') {
                    return res.status(400).json({
                        success: false,
                        message: error.message
                    });
                }

                if (error.message.includes('Transfer account ID is required') ||
                    error.message.includes('balance is not a valid number')) {
                    return res.status(400).json({
                        success: false,
                        message: error.message
                    });
                }
            }

            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}