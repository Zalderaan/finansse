import { Response, Request } from 'express';
import { AccountsModel } from '../models/accounts.model'
import { AuthRequest } from '../utils/auth.middleware';
import { CreateAccountRequest } from '../types/accounts.types';

export class AccountsController {
    // POST
    static async postAccount(req: AuthRequest, res: Response) {
        try {
            const user = req.user!.userId;
            const accountData: CreateAccountRequest = req.body;

            // TODO: Add input validation here (e.g., using Zod) before calling the model

            const newAccount = await AccountsModel.createAccount(accountData, user);
            return res.status(201).json({
                success: true,
                message: `Account ${newAccount.account_name} created successfully`,
                data: newAccount
            });
        } catch (error: any) {
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
    }

    // GET
    static async getAccounts(req: AuthRequest, res: Response) {
        try {
            const user = req.user!.userId;

            const accounts = await AccountsModel.findAccountsByUserId(user);

            return res.status(200).json({
                success: true,
                message: accounts.length > 0 ? 'Accounts successfully retrieved' : 'No accounts found',
                data: accounts,
                count: accounts.length
            });
        } catch (error) {
            console.error('Error getting accounts in controller: ', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }

        // TODO: Consider adding paginations to the query
    }

    static async getAccountDetails(req: AuthRequest, res: Response) {
        try {
            const acc_id = Number(req.params.id);
            const user = req.user!.userId;

            const account = await AccountsModel.findAccountById(acc_id, user);
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
        } catch (error) {
            console.error('Error getting account details in controller: ', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }

    // UPDATE
    static async updateAccountDetails(req: AuthRequest, res: Response) {
        try {
            // NEED account id
            // NEED user id
            const acc_id = Number(req.params.id);
            const user = req.user!.userId;
            const updateData: CreateAccountRequest = req.body;
            const updatedAccount = await AccountsModel.changeAccountDetails(acc_id, user, updateData);

            if (!updatedAccount) {
                return res.status(404).json({
                    success: false,
                    message: ""
                }
                );
            }


        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }

    // DELETE
    static async deleteAccount(req: AuthRequest, res: Response) {
        try {
            const acc_id = Number(req.params.id);
            const user = req.user!.userId;

            const deleted = await AccountsModel.deleteAccountById(acc_id, user);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Account not found or unauthorized',
                });
            }

            return res.status(200).json({
                success: true,
                message: `Account ${deleted.account_name} deleted successfully`,
                data: {
                    account_id: deleted.account_id,
                    account_name: deleted.account_name
                }
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
}