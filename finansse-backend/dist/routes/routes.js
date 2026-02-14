"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//* import controllers
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../utils/auth.middleware");
const accounts_controller_1 = require("../controllers/accounts.controller");
const transactions_controller_1 = require("../controllers/transactions.controller");
const categories_controller_1 = require("../controllers/categories.controller");
const reports_controller_1 = require("../controllers/reports.controller");
const router = express_1.default.Router();
// TEST
// Simple test route
router.get('/ping', (req, res) => {
    res.send('Pong! Router is working.');
});
// AUTH ROUTES
router.post('/auth/register', auth_controller_1.AuthController.register);
router.post('/auth/login', auth_controller_1.AuthController.login);
//* PROTECTED
// PROTECTED AUTH
router.get('/auth/me', auth_middleware_1.authenticateToken, auth_controller_1.AuthController.getMe);
router.post('/auth/logout', auth_middleware_1.authenticateToken, auth_controller_1.AuthController.logout);
router.post('/auth/refresh', auth_controller_1.AuthController.refresh); // no route protection here for now (the access token itself is expired)
// ACCOUNTS
router.post('/accounts/create', auth_middleware_1.authenticateToken, accounts_controller_1.AccountsController.postAccount);
router.get('/accounts/:id', auth_middleware_1.authenticateToken, accounts_controller_1.AccountsController.getAccountDetails);
router.get('/accounts', auth_middleware_1.authenticateToken, accounts_controller_1.AccountsController.getAccounts);
router.patch('/accounts/update', auth_middleware_1.authenticateToken, accounts_controller_1.AccountsController.updateAccountDetails);
router.delete('/accounts/:id', auth_middleware_1.authenticateToken, accounts_controller_1.AccountsController.deleteAccount);
// TRANSACTIONS
router.post('/transactions/create', auth_middleware_1.authenticateToken, transactions_controller_1.TransactionsController.postTransaction);
router.get(`/transactions/account/:accountId`, auth_middleware_1.authenticateToken, transactions_controller_1.TransactionsController.getTransactionsByAcc);
router.get(`/transactions`, auth_middleware_1.authenticateToken, transactions_controller_1.TransactionsController.getTransactionsByUser);
router.patch(`/transactions/update/:id`, auth_middleware_1.authenticateToken, transactions_controller_1.TransactionsController.updateTransaction);
// CATEGORIES
router.post('/categories/create', auth_middleware_1.authenticateToken, categories_controller_1.CategoriesController.postCategory);
router.get('/categories', auth_middleware_1.authenticateToken, categories_controller_1.CategoriesController.getCategories);
router.get('/categories/user', auth_middleware_1.authenticateToken, categories_controller_1.CategoriesController.getUserCategories);
// router.get('/categories/default', authenticateToken, CategoriesController.getDefaultCategories)
// RUNNING BALANCE
router.get('/reports/balance-trend', auth_middleware_1.authenticateToken, reports_controller_1.ReportsController.getRunningBalance);
router.get('/reports/curr-balance', auth_middleware_1.authenticateToken, reports_controller_1.ReportsController.getUserBalance);
router.get('/reports/user-income', auth_middleware_1.authenticateToken, reports_controller_1.ReportsController.getUserIncome);
router.get('/reports/dashboard-data', auth_middleware_1.authenticateToken, reports_controller_1.ReportsController.getDashboardData);
router.get('/reports/spending-by-category', auth_middleware_1.authenticateToken, reports_controller_1.ReportsController.getUserSpendingByCategory);
router.get('/reports/income-by-category', auth_middleware_1.authenticateToken, reports_controller_1.ReportsController.getUserIncomeByCategory);
exports.default = router;
//# sourceMappingURL=routes.js.map