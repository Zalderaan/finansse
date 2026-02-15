import prisma from "../db";
import { Prisma } from '../generated/prisma/client';

export class BalanceModel {
    static async fetchUserBalanceTrend(userId: number, period: string) {
        const periodDays: Record<string, number> = {
            week: 7,
            month: 30,
            quarter: 90,
            year: 365,
        };
        const days = periodDays[period] || 30;

        const trend = await prisma.$queryRaw<{ date: Date; net_change: number; running_total: number }[]>`
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
    };

    static async fetchSpendingByCategory(userId: number) {
        const spending = await prisma.transaction.groupBy({
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
        const categories = await prisma.category.findMany({
            where: {
                category_id: {
                    in: categoryIds as number[]
                }
            },
            select: {
                category_id: true,
                category_name: true
            }
        })

        // map categories to the items
        const categoryMap = new Map(categories.map(c => [c.category_id, c.category_name]));

        return spending.map(s => ({
            category_id: s.category_id,
            category_name: s.category_id ? categoryMap.get(s.category_id) : 'Uncategorized',
            total_amount: Number(s._sum.transaction_amount ?? 0)
        }));
    };

    static async fetchIncomeByCategory(userId: number) {
        // group transactions by category
        const income_flow = await prisma.transaction.groupBy({
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
        const categories = await prisma.category.findMany({
            where: {
                category_id: {
                    in: categoryIds as number[]
                }
            },
            select: {
                category_id: true,
                category_name: true
            }
        });

        const categoryMap = new Map(categories.map(c => [c.category_id, c.category_name]));

        return income_flow.map(s => ({
            category_id: s.category_id,
            category_name: s.category_id ? categoryMap.get(s.category_id) : 'Uncategorized',
            total_amount: Number(s._sum.transaction_amount ?? 0)
        }));
    };

    // DASHBOARD DATA (CurrBalance, TotalExpense, TotalIncome)
    static async fetchUserBalance(userId: number) {
        const [initialBalance, transactionSum] = await Promise.all([
            prisma.account.aggregate({
                _sum: { account_initial_balance: true },
                where: { user_id: userId }
            }),
            prisma.transaction.aggregate({
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

        const initial = Number(initialBalance._sum.account_initial_balance ?? 0);
        const income = await prisma.transaction.aggregate({
            _sum: { transaction_amount: true },
            where: { user_id: userId, transaction_type: 'INCOME' }
        });

        const expense = await prisma.transaction.aggregate({
            _sum: { transaction_amount: true },
            where: { user_id: userId, transaction_type: 'EXPENSE' }
        });

        console.log("current balance: ", initial + Number(income._sum.transaction_amount ?? 0) - Number(expense._sum.transaction_amount ?? 0));

        return initial + Number(income._sum.transaction_amount ?? 0) - Number(expense._sum.transaction_amount ?? 0);
    }

    static async fetchUserTotalncome(userId: number) {
        const query = await prisma.transaction.aggregate({
            _sum: {
                transaction_amount: true
            },
            where: {
                user_id: userId,
                transaction_type: 'INCOME'
            }
        })

        return query._sum.transaction_amount ?? 0;
    }

    static async fetchUserTotalExpense(userId: number) {
        const query = await prisma.transaction.aggregate({
            _sum: {
                transaction_amount: true
            },
            where: {
                user_id: userId,
                transaction_type: 'EXPENSE'
            }
        });

        return query._sum.transaction_amount ?? 0;
    }
}