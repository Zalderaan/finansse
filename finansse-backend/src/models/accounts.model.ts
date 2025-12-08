import prisma from "../db";
import { Prisma, PrismaClient } from '@prisma/client';
import { type CreateAccountRequest } from "../types/accounts.types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class AccountsModel {
    // CREATE
    static async createAccount(accountData: CreateAccountRequest, userId: number) {
        try {
            const created_account = await prisma.account.create({
                data: {
                    account_name: accountData.name,
                    account_current_balance: accountData.initial_bal,
                    account_initial_balance: accountData.initial_bal,
                    account_currency: accountData.currency,
                    account_type: accountData.acc_type,
                    user_id: userId
                },
                select: {
                    account_id: true,
                    account_name: true,
                    account_type: true,
                    account_current_balance: true,
                    account_initial_balance: true,
                    account_currency: true,
                    created_at: true,
                }
            });
            return created_account;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // if (error.code === 'P2002') {
                //     throw new Error('Account name must be unique for this user.');
                // }
                if (error.code === 'P2003') {
                    throw new Error('Invalid user or related data provided.');
                }
                if (error.code === 'P2014') {
                    throw new Error('Invalid data provided (e.g., unsupported account type or currency).');
                }
                if (error.code === 'P1001') {
                    throw new Error('Database connection failed. Please try again later.');
                }
                // Handle other codes as needed, e.g., P2000 for value too long
            }
            console.error('Error creating account in model:', error);
            throw new Error('Failed to create account. Please try again.');
        }
    }

    // READ
    static async findAccountById(id: number, userId: number) {
        return await prisma.account.findFirst({
            where: {
                account_id: id,
                user_id: userId,
            },
            select: {
                account_id: true,
                account_name: true,
                account_type: true,
                account_current_balance: true,
                account_initial_balance: true,
                account_currency: true,
                created_at: true,
                updated_at: true
            }
        });
    }

    static async findAccountsByUserId(userId: number) {
        return await prisma.account.findMany({
            where: { user_id: userId },
            select: {
                account_id: true,
                account_name: true,
                account_type: true,
                account_current_balance: true,
                account_currency: true,
                created_at: true
            },
            orderBy: {
                created_at: 'desc'
            }
        })
    }

    static async changeAccountDetails(accountId: number, userId: number, updateData: Partial<CreateAccountRequest>) {
        // initial balance can't be updatable
        try {
            return await prisma.account.update({
                where: {
                    account_id: accountId,
                    user_id: userId
                },
                data: {
                    account_name: updateData.name,
                    account_currency: updateData.currency,
                    account_type: updateData.acc_type
                },
                select: {
                    account_id: true,
                    account_name: true,
                    account_type: true,
                    account_current_balance: true,
                    account_initial_balance: true,
                    account_currency: true,
                    updated_at: true,
                },
            })
        } catch (error) {
            console.error('Error updating account details in model: ', error);
            throw error;
        }
    }

    // static async updateAccountDetails(accountId: number, updateData: Partial<CreateAccountRequest>, userId: number) {
    //     return await prisma.account.update({
    //         where: {
    //             account_id: accountId,
    //             user_id: userId, // Ensure user owns the account
    //         },
    //         data: {
    //             account_name: updateData.name,
    //             account_currency: updateData.currency,
    //             account_type: updateData.acc_type,
    //             // Note: initial_bal might not be updatable after creation; adjust as needed
    //         },
    //         select: {
    //             account_id: true,
    //             account_name: true,
    //             account_type: true,
    //             account_current_balance: true,
    //             account_initial_balance: true,
    //             account_currency: true,
    //             updated_at: true,
    //         },
    //     });
    // }

    // UPDATE
    static async updateAccountBalanceInTransaction(accountId: number, newBalance: number, tx: Prisma.TransactionClient) {
        return await tx.account.update({
            where: { account_id: accountId },
            data: { account_current_balance: newBalance }
        });
    }

    // DELETE
    static async deleteAccountById(id: number, userId: number) {
        try {
            const account = await prisma.account.findFirst({
                where: {
                    account_id: id,
                    user_id: userId,
                }
            });
            if (!account) return null; // return null if account not found / does not belong to the user
            return await prisma.account.delete({
                where: { account_id: id },
            });
        } catch (error) {
            console.error('Error deleting account in model: ', error);
            throw error;
        }
    }
}