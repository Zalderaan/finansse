import prisma from "../db";
import { CreateTransactionRequest } from "../types/transactions.types";
export class TransactionsModel {

    // CREATE
    static async createTransaction(transactionData: CreateTransactionRequest, userId: number) {
        // Validate that the account belongs to the user
        const account = await prisma.account.findFirst({
            where: {
                account_id: transactionData.account_id,
                user_id: userId
            }
        });

        if (!account) {
            throw new Error('Account does not belong to user or does not exist');
        }
        
        const created_transaction = await prisma.transaction.create({
            data: {
                transaction_name: transactionData.name,
                transaction_type: transactionData.type,
                transaction_amount: transactionData.amount,
                user_id: userId,
                account_id: transactionData.account_id
            },

            select: {
                account_id: true,
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