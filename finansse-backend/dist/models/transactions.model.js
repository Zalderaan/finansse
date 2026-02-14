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
exports.TransactionsModel = void 0;
const db_1 = __importDefault(require("../db"));
const accounts_model_1 = require("./accounts.model");
class TransactionsModel {
    // CREATE
    static createTransaction(transactionData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("transactionData in the model: ", transactionData);
            return yield db_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                // Validate that the account belongs to the user
                const account = yield tx.account.findFirst({
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
                    transfer_account = yield tx.account.findFirst({
                        where: {
                            account_id: transactionData.transfer_account_id, // Assuming schema updated to transfer_to_account_id
                            user_id: userId
                        }
                    });
                    if (!transfer_account) {
                        throw new Error('Transfer account does not belong to user or does not exist');
                    }
                }
                const created_transaction = yield tx.transaction.create({
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
                        transfer_account_id: true, // Include in select
                    }
                });
                // calculate new balance
                let sourceNewBalance = Number(account.account_current_balance);
                if (isNaN(sourceNewBalance))
                    throw new Error('Account balance is not a valid number');
                if (transactionData.type === 'EXPENSE') {
                    sourceNewBalance -= transactionData.amount;
                }
                else if (transactionData.type === 'INCOME') {
                    sourceNewBalance += transactionData.amount;
                }
                else if (transactionData.type === 'TRANSFER') {
                    sourceNewBalance -= transactionData.amount; // Subtract from source
                    let destNewBalance = Number(transfer_account === null || transfer_account === void 0 ? void 0 : transfer_account.account_current_balance);
                    if (isNaN(destNewBalance))
                        throw new Error('Destination account balance is not a valid number');
                    destNewBalance += transactionData.amount; // Add to destination
                    // ensures transfer_account_id always exists
                    if (!transactionData.transfer_account_id)
                        throw new Error('Transfer account ID is required for TRANSFER');
                    // Create the reciprocal transaction for the destination account
                    yield tx.transaction.create({
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
                    yield accounts_model_1.AccountsModel.updateAccountBalanceInTransaction(transactionData.transfer_account_id, destNewBalance, tx);
                }
                // update account balance using tx client
                yield accounts_model_1.AccountsModel.updateAccountBalanceInTransaction(transactionData.account_id, sourceNewBalance, tx);
                return created_transaction;
            }));
        });
    }
    // READ
    static findTransactionsByAcc(account_id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate account
            const account = yield db_1.default.account.findFirst({
                where: {
                    account_id: account_id,
                    user_id: userId
                },
            });
            if (!account) {
                throw new Error('Account does not belong to user or does not exist');
            }
            return yield db_1.default.transaction.findMany({
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
            });
        });
    }
    // fetch user transactions
    static findTransactionsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.transaction.findMany({
                where: { user_id: userId },
                include: {
                    account: {
                        select: {
                            account_name: true,
                        }
                    },
                    category: {
                        select: {
                            category_name: true,
                        }
                    }
                },
                orderBy: { created_at: 'desc' },
                take: 10
            });
        });
    }
    // UPDATE
    static updateTransactionByID(updateTransactionData, userId, transaction_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                // verify account belongs to user
                const account = yield tx.account.findFirst({
                    where: {
                        account_id: updateTransactionData.account_id,
                        user_id: userId
                    }
                });
                if (!account) {
                    throw new Error('Account does not belong to user or does not exist');
                }
                // check for transfer account (ONLY if TransactionType is transfer)
                let transfer_account = null;
                if (updateTransactionData.type === 'TRANSFER') {
                    transfer_account = yield tx.account.findFirst({
                        where: {
                            account_id: updateTransactionData.transfer_account_id, // Assuming schema updated to transfer_to_account_id
                            user_id: userId
                        }
                    });
                    if (!transfer_account) {
                        throw new Error('Transfer account does not belong to user or does not exist');
                    }
                }
                // 1. get original transaction
                const originalTransaction = yield tx.transaction.findUnique({
                    where: { transaction_id },
                    include: { account: true, transfer_account: true }
                });
                const updated_transaction = yield tx.transaction.update({
                    where: {
                        transaction_id: transaction_id
                    },
                    data: {
                        transaction_name: updateTransactionData.name ? updateTransactionData.name : `${updateTransactionData.type} - `,
                        transaction_type: updateTransactionData.type,
                        transaction_amount: updateTransactionData.amount,
                        user_id: userId,
                        account_id: updateTransactionData.account_id,
                        transfer_account_id: updateTransactionData.transfer_account_id || null,
                        category_id: updateTransactionData.category_id
                    },
                    select: {
                        account_id: true,
                        transaction_id: true,
                        transaction_name: true,
                        transaction_amount: true,
                        transaction_type: true,
                        created_at: true,
                        category_id: true,
                        transfer_account_id: true, // Include in select
                    }
                });
                // TODO: Proper recalculation of balance after update
                /**
                 * scenario:
                 * 100 + 1000 = 1100 curr_balance...
                 * update 1000 INCOME --> 50 EXPENSE...
                 *
                 * current behavior: account_curr_bal = P1,050.00
                 * required behavior: account_curr_bal = P50.00
                 */
                // 2. reverse orig transaction
                let currentBalance = Number(originalTransaction === null || originalTransaction === void 0 ? void 0 : originalTransaction.account.account_current_balance);
                let transferCurrentBalance = Number((_a = originalTransaction === null || originalTransaction === void 0 ? void 0 : originalTransaction.transfer_account) === null || _a === void 0 ? void 0 : _a.account_current_balance);
                switch (originalTransaction === null || originalTransaction === void 0 ? void 0 : originalTransaction.transaction_type) {
                    case 'EXPENSE':
                        currentBalance += Number(originalTransaction.transaction_amount);
                        break;
                    case 'INCOME':
                        currentBalance -= Number(originalTransaction.transaction_amount);
                        break;
                    case 'TRANSFER':
                        currentBalance += Number(originalTransaction.transaction_amount);
                        transferCurrentBalance -= Number(originalTransaction.transaction_amount);
                        break;
                }
                let updateSourceNewBalance = currentBalance;
                if (isNaN(updateSourceNewBalance))
                    throw new Error('Account balance is not a valid number');
                if (updateTransactionData.type === 'EXPENSE') {
                    updateSourceNewBalance -= updateTransactionData.amount;
                }
                else if (updateTransactionData.type === 'INCOME') {
                    updateSourceNewBalance += updateTransactionData.amount;
                }
                else if (updateTransactionData.type === 'TRANSFER') {
                    updateSourceNewBalance -= updateTransactionData.amount; // Subtract from source
                    let updateDestNewBalance = transferCurrentBalance;
                    if (isNaN(updateDestNewBalance))
                        throw new Error('Destination account balance is not a valid number');
                    updateDestNewBalance += updateTransactionData.amount; // Add to destination
                    // ensures transfer_account_id always exists
                    if (!updateTransactionData.transfer_account_id)
                        throw new Error('Transfer account ID is required for TRANSFER');
                    // Create the reciprocal transaction for the destination account
                    yield tx.transaction.create({
                        data: {
                            transaction_name: `Transfer from ${account.account_name}`,
                            transaction_type: 'TRANSFER',
                            transaction_amount: updateTransactionData.amount,
                            user_id: userId,
                            account_id: updateTransactionData.transfer_account_id, // Destination is now the main account
                            transfer_account_id: updateTransactionData.account_id, // Source becomes the transfer account
                            category_id: updateTransactionData.category_id
                        }
                    });
                    yield accounts_model_1.AccountsModel.updateAccountBalanceInTransaction(updateTransactionData.transfer_account_id, updateDestNewBalance, tx);
                }
                // update account balance using tx client
                yield accounts_model_1.AccountsModel.updateAccountBalanceInTransaction(updateTransactionData.account_id, updateSourceNewBalance, tx);
                return updated_transaction;
            }));
        });
    }
}
exports.TransactionsModel = TransactionsModel;
//# sourceMappingURL=transactions.model.js.map