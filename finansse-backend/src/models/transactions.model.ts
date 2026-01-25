import prisma from "../db";
import { CreateTransactionRequest } from "../types/transactions.types";
import { AccountsModel } from "./accounts.model";
export class TransactionsModel {

    // CREATE
    static async createTransaction(transactionData: CreateTransactionRequest, userId: number) {
        console.log("transactionData in the model: ", transactionData);

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

            // check for transfer account (ONLY if TransactionType is transfer)
            let transfer_account = null;
            if (transactionData.type === 'TRANSFER') {
                transfer_account = await tx.account.findFirst({
                    where: {
                        account_id: transactionData.transfer_account_id,  // Assuming schema updated to transfer_to_account_id
                        user_id: userId
                    }
                });

                if (!transfer_account) {
                    throw new Error('Transfer account does not belong to user or does not exist');
                }
            }

            const created_transaction = await tx.transaction.create({
                data: {
                    transaction_name: transactionData.name ? transactionData.name : `${transactionData.type} - `,
                    transaction_type: transactionData.type,
                    transaction_amount: transactionData.amount,
                    user_id: userId,
                    account_id: transactionData.account_id,
                    transfer_account_id: transactionData.transfer_account_id || null,
                    category_id: transactionData.category_id
                },

                select: {
                    account_id: true,
                    transaction_id: true,
                    transaction_name: true,
                    transaction_amount: true,
                    transaction_type: true,
                    created_at: true,
                    category_id: true,
                    transfer_account_id: true,  // Include in select
                }
            });

            // calculate new balance
            let sourceNewBalance = Number(account.account_current_balance);
            if (isNaN(sourceNewBalance)) throw new Error('Account balance is not a valid number');


            if (transactionData.type === 'EXPENSE') {
                sourceNewBalance -= transactionData.amount
            } else if (transactionData.type === 'INCOME') {
                sourceNewBalance += transactionData.amount
            } else if (transactionData.type === 'TRANSFER') {

                sourceNewBalance -= transactionData.amount; // Subtract from source
                let destNewBalance = Number(transfer_account?.account_current_balance);
                if (isNaN(destNewBalance)) throw new Error('Destination account balance is not a valid number');
                destNewBalance += transactionData.amount; // Add to destination

                // ensures transfer_account_id always exists
                if (!transactionData.transfer_account_id) throw new Error('Transfer account ID is required for TRANSFER');

                // Create the reciprocal transaction for the destination account
                await tx.transaction.create({
                    data: {
                        transaction_name: `Transfer from ${account.account_name}`,
                        transaction_type: 'TRANSFER',
                        transaction_amount: transactionData.amount,
                        user_id: userId,
                        account_id: transactionData.transfer_account_id, // Destination is now the main account
                        transfer_account_id: transactionData.account_id, // Source becomes the transfer account
                        category_id: transactionData.category_id
                    }
                });

                await AccountsModel.updateAccountBalanceInTransaction(transactionData.transfer_account_id, destNewBalance, tx);
            }

            // update account balance using tx client
            await AccountsModel.updateAccountBalanceInTransaction(transactionData.account_id, sourceNewBalance, tx);

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
            },
        });

        if (!account) {
            throw new Error('Account does not belong to user or does not exist');
        }

        return await prisma.transaction.findMany({
            where: {
                account_id: account_id,
                user_id: userId
            },
            include: {
                category: {
                    select: {
                        category_name: true,
                    }
                }
            },
            orderBy: { created_at: 'desc' }
        })
    }

    // fetch user transactions
    static async findTransactionsByUser(userId: number) {
        return await prisma.transaction.findMany({
            where: { user_id: userId },
            include: {
                category: {
                    select: {
                        category_name: true,
                    }
                }
            },
            orderBy: { created_at: 'desc' },
            take: 10
        })
    }
    // UPDATE
    // DELETE

}