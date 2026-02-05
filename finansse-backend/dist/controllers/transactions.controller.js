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
exports.TransactionsController = void 0;
const transactions_model_1 = require("../models/transactions.model");
class TransactionsController {
    // POST
    static postTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user.userId;
                const transactionData = req.body;
                const newTransaction = yield transactions_model_1.TransactionsModel.createTransaction(transactionData, user);
                return res.status(201).json({
                    success: true,
                    message: `Transaction ${newTransaction.transaction_name} created successfully`,
                    data: newTransaction
                });
            }
            catch (error) {
                console.error('Error creating transaction in controller: ', error);
                if (error instanceof Error && error.message === 'Account does not belong to user or does not exist') {
                    return res.status(404).json({
                        success: false,
                        message: error.message
                    });
                }
                res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        });
    }
    // GET
    static getTransactionsByAcc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user.userId;
                const accountId = Number(req.params.accountId);
                const transactions = yield transactions_model_1.TransactionsModel.findTransactionsByAcc(accountId, user);
                res.status(200).json({
                    success: true,
                    message: 'Transactions retrieved!',
                    data: transactions
                });
            }
            catch (error) {
                console.error('Error getting transactions for account: ', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        });
    }
}
exports.TransactionsController = TransactionsController;
//# sourceMappingURL=transactions.controller.js.map