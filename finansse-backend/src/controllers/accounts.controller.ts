import { Response, Request } from 'express';
import { AccountsModel } from '../models/accounts.model'
import { AuthRequest } from '../utils/auth.middleware';
import { CreateAccountRequest } from '../types/accounts.types';

export class AccountsController {
    // POST
    static async postAccount(req: AuthRequest, res: Response) {
        try {
            // validate user auth
            const user = req.user!.userId;
            const accountData: CreateAccountRequest = req.body;

            // TODO: validate user input

            // call model to create account
            const newAccount = await AccountsModel.createAccount(accountData, user);
            return res.status(201).json({
                success: true,
                message: `Account ${newAccount.account_name} created successfully`,
                data: newAccount
            });
        } catch (error) {
            console.error('Error creating account in controller: ', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
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
    static async updateAccount() {

    }

    // DELETE
    static async deleteAccount() {

    }
}