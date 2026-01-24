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
exports.BalanceModel = void 0;
const db_1 = __importDefault(require("../db"));
class BalanceModel {
    static fetchUserBalanceTrend(userId, period) {
        return __awaiter(this, void 0, void 0, function* () {
            const periodDays = {
                week: 7,
                month: 30,
                quarter: 90,
                year: 365,
            };
            const days = periodDays[period] || 30;
            const trend = yield db_1.default.$queryRaw `
            WITH initial_balance AS (
                SELECT COALESCE(SUM(account_initial_balance), 0) AS init_bal
                FROM "Account"
                WHERE user_id = ${userId}
            ),
            date_filtered_transactions AS (
                SELECT *
                FROM "Transaction"
                WHERE user_id = ${userId} 
                    AND created_at >= CURRENT_DATE - INTERVAL '1 day' * ${days}
            ),
            transaction_summary AS (
                SELECT 
                    DATE(t.created_at) AS date,
                    SUM(CASE 
                            WHEN t.transaction_type = 'INCOME' THEN t.transaction_amount
                            WHEN t.transaction_type = 'EXPENSE' THEN -t.transaction_amount
                            ELSE 0
                        END) AS net_change,
                    ib.init_bal + SUM(SUM(CASE 
                            WHEN t.transaction_type = 'INCOME' THEN t.transaction_amount
                            WHEN t.transaction_type = 'EXPENSE' THEN -t.transaction_amount
                            ELSE 0
                        END)) OVER (ORDER BY DATE(t.created_at)) AS running_total
                FROM date_filtered_transactions t
                CROSS JOIN initial_balance ib
                GROUP BY DATE(t.created_at), ib.init_bal
            )
            SELECT date, net_change, running_total FROM transaction_summary
            UNION ALL
            SELECT 
                CURRENT_DATE AS date,
                0 AS net_change,
                init_bal AS running_total
            FROM initial_balance
            WHERE NOT EXISTS (
                SELECT 1 FROM "Transaction" 
                WHERE user_id = ${userId} 
                    AND created_at >= CURRENT_DATE - INTERVAL '1 day' * ${days}
            )
            ORDER BY date;
        `;
            return trend.map(t => ({
                date: t.date.toISOString(),
                total_balance: Number(t.running_total)
            }));
        });
    }
    ;
    static fetchSpendingByCategory(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const spending = yield db_1.default.transaction.groupBy({
                by: ['category_id'],
                _sum: {
                    transaction_amount: true
                },
                where: {
                    user_id: userId,
                    transaction_type: 'EXPENSE'
                }
            });
            // get category IDs
            const categoryIds = spending.map(i => i.category_id).filter(id => id !== null);
            const categories = yield db_1.default.category.findMany({
                where: {
                    category_id: {
                        in: categoryIds
                    }
                },
                select: {
                    category_id: true,
                    category_name: true
                }
            });
            // map categories to the items
            const categoryMap = new Map(categories.map(c => [c.category_id, c.category_name]));
            return spending.map(s => {
                var _a;
                return ({
                    category_id: s.category_id,
                    category_name: s.category_id ? categoryMap.get(s.category_id) : 'Uncategorized',
                    total_amount: Number((_a = s._sum.transaction_amount) !== null && _a !== void 0 ? _a : 0)
                });
            });
        });
    }
    ;
    static fetchIncomeByCategory(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // group transactions by category
            const income_flow = yield db_1.default.transaction.groupBy({
                by: ['category_id'],
                _sum: {
                    transaction_amount: true
                },
                where: {
                    user_id: userId,
                    transaction_type: 'INCOME'
                }
            });
            // get category details to match the category_id in previous query
            const categoryIds = income_flow.map(i => i.category_id).filter(id => id !== null);
            const categories = yield db_1.default.category.findMany({
                where: {
                    category_id: {
                        in: categoryIds
                    }
                },
                select: {
                    category_id: true,
                    category_name: true
                }
            });
            const categoryMap = new Map(categories.map(c => [c.category_id, c.category_name]));
            return income_flow.map(s => {
                var _a;
                return ({
                    category_id: s.category_id,
                    category_name: s.category_id ? categoryMap.get(s.category_id) : 'Uncategorized',
                    total_amount: Number((_a = s._sum.transaction_amount) !== null && _a !== void 0 ? _a : 0)
                });
            });
        });
    }
    ;
    // DASHBOARD DATA (CurrBalance, TotalExpense, TotalIncome)
    static fetchUserBalance(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const [initialBalance, transactionSum] = yield Promise.all([
                db_1.default.account.aggregate({
                    _sum: { account_initial_balance: true },
                    where: { user_id: userId }
                }),
                db_1.default.transaction.aggregate({
                    _sum: { transaction_amount: true },
                    where: {
                        user_id: userId,
                        OR: [
                            { transaction_type: 'INCOME' },
                            { transaction_type: 'EXPENSE' }
                        ]
                    },
                    _count: {
                        _all: true
                    }
                })
            ]);
            const initial = Number((_a = initialBalance._sum.account_initial_balance) !== null && _a !== void 0 ? _a : 0);
            const income = yield db_1.default.transaction.aggregate({
                _sum: { transaction_amount: true },
                where: { user_id: userId, transaction_type: 'INCOME' }
            });
            const expense = yield db_1.default.transaction.aggregate({
                _sum: { transaction_amount: true },
                where: { user_id: userId, transaction_type: 'EXPENSE' }
            });
            console.log("current balance: ", initial + Number((_b = income._sum.transaction_amount) !== null && _b !== void 0 ? _b : 0) - Number((_c = expense._sum.transaction_amount) !== null && _c !== void 0 ? _c : 0));
            return initial + Number((_d = income._sum.transaction_amount) !== null && _d !== void 0 ? _d : 0) - Number((_e = expense._sum.transaction_amount) !== null && _e !== void 0 ? _e : 0);
        });
    }
    static fetchUserTotalncome(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = yield db_1.default.transaction.aggregate({
                _sum: {
                    transaction_amount: true
                },
                where: {
                    user_id: userId,
                    transaction_type: 'INCOME'
                }
            });
            return (_a = query._sum.transaction_amount) !== null && _a !== void 0 ? _a : 0;
        });
    }
    static fetchUserTotalExpense(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = yield db_1.default.transaction.aggregate({
                _sum: {
                    transaction_amount: true
                },
                where: {
                    user_id: userId,
                    transaction_type: 'EXPENSE'
                }
            });
            return (_a = query._sum.transaction_amount) !== null && _a !== void 0 ? _a : 0;
        });
    }
}
exports.BalanceModel = BalanceModel;
//# sourceMappingURL=reports.model.js.map