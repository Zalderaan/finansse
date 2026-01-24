"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsModel = void 0;
const db_1 = __importDefault(require("../db"));
const client_1 = require("../generated/prisma/client");
class AccountsModel {
    // CREATE
    static createAccount(accountData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const created_account = yield db_1.default.account.create({
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
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
                // re-throw unknown
                console.error('Error creating account in model:', error);
                throw error;
            }
        });
    }
    // READ
    static findAccountById(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.account.findFirst({
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
        });
    }
    static findAccountsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.account.findMany({
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
            });
        });
    }
    static changeAccountDetails(accountId, userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            // initial balance can't be updatable
            try {
                return yield db_1.default.account.update({
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
                });
            }
            catch (error) {
                console.error('Error updating account details in model: ', error);
                throw error;
            }
        });
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
    static updateAccountBalanceInTransaction(accountId, newBalance, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tx.account.update({
                where: { account_id: accountId },
                data: { account_current_balance: newBalance }
            });
        });
    }
    // DELETE
    static deleteAccountById(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield db_1.default.account.findFirst({
                    where: {
                        account_id: id,
                        user_id: userId,
                    }
                });
                if (!account)
                    return null; // return null if account not found / does not belong to the user
                return yield db_1.default.account.delete({
                    where: { account_id: id },
                });
            }
            catch (error) {
                console.error('Error deleting account in model: ', error);
                throw error;
            }
        });
    }
}
exports.AccountsModel = AccountsModel;
//# sourceMappingURL=accounts.model.js.map