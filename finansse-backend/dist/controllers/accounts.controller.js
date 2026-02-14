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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsController = void 0;
const accounts_model_1 = require("../models/accounts.model");
class AccountsController {
    // POST
    static postAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user.userId;
                const accountData = req.body;
                // TODO: Add input validation here (e.g., using Zod) before calling the model
                const newAccount = yield accounts_model_1.AccountsModel.createAccount(accountData, user);
                return res.status(201).json({
                    success: true,
                    message: `${newAccount.account_type} account \"${newAccount.account_name}\" has been created.`,
                    data: newAccount
                });
            }
            catch (error) {
                console.error('Error creating account in controller:', error);
                // Handle specific model errors
                // if (error.message.includes('unique')) {
                //     return res.status(409).json({
                //         success: false,
                //         message: 'Account name must be unique for this user.'
                //     });
                // }
                if (error.message.includes('Invalid user')) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid user or related data provided.'
                    });
                }
                if (error.message.includes('Invalid data')) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid data provided (e.g., unsupported account type or currency).'
                    });
                }
                if (error.message.includes('Database connection')) {
                    return res.status(503).json({
                        success: false,
                        message: 'Service temporarily unavailable. Please try again later.'
                    });
                }
                // Default to internal server error
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        });
    }
    // GET
    static getAccounts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user.userId;
                const accounts = yield accounts_model_1.AccountsModel.findAccountsByUserId(user);
                return res.status(200).json({
                    success: true,
                    message: accounts.length > 0 ? 'Accounts successfully retrieved' : 'No accounts found',
                    data: accounts,
                    count: accounts.length
                });
            }
            catch (error) {
                console.error('Error getting accounts in controller: ', error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
            // TODO: Consider adding paginations to the query
        });
    }
    static getAccountDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const acc_id = Number(req.params.id);
                const user = req.user.userId;
                const account = yield accounts_model_1.AccountsModel.findAccountById(acc_id, user);
                // console.log('account fetched in controller: ', account)
                if (!account) {
                    return res.status(404).json({
                        success: false,
                        message: 'Account not found'
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Account details retrieved',
                    data: account
                });
                // TODO: Return account
            }
            catch (error) {
                console.error('Error getting account details in controller: ', error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        });
    }
    // UPDATE
    static updateAccountDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // NEED account id
                // NEED user id
                const acc_id = Number(req.params.id);
                const user = req.user.userId;
                const updateData = req.body;
                const updatedAccount = yield accounts_model_1.AccountsModel.changeAccountDetails(acc_id, user, updateData);
                if (!updatedAccount) {
                    return res.status(404).json({
                        success: false,
                        message: ""
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        });
    }
    // DELETE
    static deleteAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const acc_id = Number(req.params.id);
                const user = req.user.userId;
                const deleted = yield accounts_model_1.AccountsModel.deleteAccountById(acc_id, user);
                if (!deleted) {
                    return res.status(404).json({
                        success: false,
                        message: 'Account not found or unauthorized',
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: `${deleted.account_type} account \"${deleted.account_name}\" deleted successfully`,
                    data: {
                        account_id: deleted.account_id,
                        account_name: deleted.account_name,
                        account_type: deleted.account_type
                    }
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        });
    }
}
exports.AccountsController = AccountsController;
//# sourceMappingURL=accounts.controller.js.map