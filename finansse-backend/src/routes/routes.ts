import express from "express";
//* import controllers
import { AuthController } from "../controllers/auth.controller";
import { authenticateToken } from "../utils/auth.middleware";
import { AccountsController } from "../controllers/accounts.controller";
import { TransactionsController } from "../controllers/transactions.controller";
import { CategoriesController } from "../controllers/categories.controller";
import { ReportsController } from "../controllers/reports.controller";


const router = express.Router();

// TEST
// Simple test route
router.get('/ping', (req, res) => {
    res.send('Pong! Router is working.');
});

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
router.patch('/accounts/update', authenticateToken, AccountsController.updateAccountDetails);
router.delete('/accounts/:id', authenticateToken, AccountsController.deleteAccount);

// TRANSACTIONS
router.post('/transactions/create', authenticateToken, TransactionsController.postTransaction);
router.get(`/transactions/account/:accountId`, authenticateToken, TransactionsController.getTransactionsByAcc);

// CATEGORIES
router.post('/categories/create', authenticateToken, CategoriesController.postCategory);
router.get('/categories', authenticateToken, CategoriesController.getCategories);
router.get('/categories/user', authenticateToken, CategoriesController.getUserCategories)
// router.get('/categories/default', authenticateToken, CategoriesController.getDefaultCategories)


// RUNNING BALANCE
router.get('/reports/balance-trend', authenticateToken, ReportsController.getRunningBalance);
router.get('/reports/curr-balance', authenticateToken, ReportsController.getUserBalance);
router.get('/reports/user-income', authenticateToken, ReportsController.getUserIncome);
router.get('/reports/dashboard-data', authenticateToken, ReportsController.getDashboardData);
router.get('/reports/spending-by-category', authenticateToken, ReportsController.getUserSpendingByCategory);
router.get('/reports/income-by-category', authenticateToken, ReportsController.getUserIncomeByCategory);


export default router;