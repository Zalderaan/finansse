import prisma from "../db";
import { CreateTransactionRequest } from "../types/transactions.types";
import { AccountsModel } from "./accounts.model";
export class TransactionsModel {

    // CREATE
    static async createTransaction(transactionData: CreateTransactionRequest, userId: number) {
        return await prisma.$transaction(async (tx) => {
            // Validate that the account belongs to the user
            const account = await tx.account.findFirst({
                where: {
                    account_id: transactionData.account_id,
                    user_id: userId
                }
            });

            if (!account) {
                throw new Error('Account does not belong to user or does not exist');
            }

            const created_transaction = await tx.transaction.create({
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

            // calculate new balance
            let newBalance = Number(account.account_current_balance);
            if (isNaN(newBalance)) throw new Error('Account balance is not a valid number');
            

            if (transactionData.type === 'EXPENSE') {
                newBalance = newBalance - transactionData.amount
            } else if (transactionData.type === 'INCOME') {
                newBalance = newBalance + transactionData.amount
            }

            // update account balance using tx client
            await AccountsModel.updateAccountBalanceInTransaction(transactionData.account_id, newBalance, tx);

            return created_transaction;
        });
    }
    // READ
    static async findTransactionsByAcc(account_id: number, userId: number) {
        // validate account
        const account = await prisma.account.findFirst({
            where: {
                account_id: account_id,
                user_id: userId
            }
        });

        if (!account) {
            throw new Error('Account does not belong to user or does not exist');
        }

        return await prisma.transaction.findMany({
            where: {
                account_id: account_id,
                user_id: userId
            },
            orderBy: { created_at: 'desc' }
        })

    }
    // UPDATE
    // DELETE

}