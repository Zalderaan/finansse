import prisma from "../db";
import { type CreateAccountRequest } from "../types/accounts.types";

export class AccountsModel {
    // CREATE
    static async createAccount(accountData: CreateAccountRequest, userId: number) {
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

    // TODO: accounts summary (for dashboard)

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