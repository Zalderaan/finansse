import prisma from "../db";

export class BalanceModel {
    static async getUserBalanceTrend(userId: number, period: string) {
        const trend = await prisma.$queryRaw<{ date: Date; net_change: number; running_total: number }[]>`
            WITH initial_balance AS (
                SELECT COALESCE(SUM(account_initial_balance), 0) AS init_bal
                FROM "Account"
                WHERE user_id = ${userId}
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
                FROM "Transaction" t
                CROSS JOIN initial_balance ib
                WHERE t.user_id = ${userId}
                GROUP BY DATE(t.created_at), ib.init_bal
            )
            SELECT date, net_change, running_total FROM transaction_summary
            UNION ALL
            SELECT 
                CURRENT_DATE AS date,
                0 AS net_change,
                init_bal AS running_total
            FROM initial_balance
            WHERE NOT EXISTS (SELECT 1 FROM "Transaction" WHERE user_id = ${userId})
            ORDER BY date;
        `;

        return trend.map(t => ({
            date: t.date.toISOString(),
            total_balance: Number(t.running_total)
        }));
    }

    static async getSpendingByCategory() {
        
    }
}