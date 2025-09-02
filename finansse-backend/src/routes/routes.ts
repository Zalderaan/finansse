import express from "express";
//* import controllers
import { AuthController } from "../controllers/auth.controller";
import { authenticateToken } from "../utils/auth.middleware";
import { AccountsController } from "../controllers/accounts.controller";
import { TransactionsController } from "../controllers/transactions.controller";


const router = express.Router();

// AUTH ROUTES
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

//* PROTECTED
// PROTECTED AUTH
router.get('/auth/me', authenticateToken, AuthController.getMe);
router.post('/auth/logout', authenticateToken, AuthController.logout);
router.post('/auth/refresh', AuthController.refresh); // no route protection here for now (the access token itself is expired)

// ACCOUNTS
router.post('/accounts/create', authenticateToken, AccountsController.postAccount);
router.get('/accounts/:id', authenticateToken, AccountsController.getAccountDetails);
router.get('/accounts', authenticateToken, AccountsController.getAccounts);
router.delete('/accounts/:id', authenticateToken, AccountsController.deleteAccount);

// TRANSACTIONS
router.post('/transactions/create', authenticateToken, TransactionsController.postTransaction);

export default router;