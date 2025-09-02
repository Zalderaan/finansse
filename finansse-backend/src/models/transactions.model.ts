import prisma from "../db";
import { CreateTransactionRequest } from "../types/transactions.types";
export class TransactionsModel {
    // CREATE
    static async createTransaction(transactionData: CreateTransactionRequest, userId: number) {
        const created_transaction = await prisma.transaction.create({
            data: {
                transaction_name: transactionData.name,
                transaction_type: transactionData.type,
                transaction_amount: transactionData.amount,
                user_id: userId,
                account_id: transactionData.account_id
            },

            select: {
                transaction_id: true,
                transaction_name: true,
                transaction_amount: true,
                transaction_type: true,
                created_at: true,
            }
        });
        return created_transaction;
    }
    // READ
    // UPDATE
    // DELETE

}