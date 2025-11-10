import prisma from "../db";

export class BalanceModel {
    static async getUserBalanceTrend(userId: number) {
        const trend = await prisma.$queryRaw<{ date: string; net_change: number; running_total: number }[]>
        `
            SELECT 
                DATE(created_at) AS date,
                SUM(CASE 
                        WHEN transaction_type = 'INCOME' THEN transaction_amount
                        WHEN transaction_type = 'EXPENSE' THEN -transaction_amount
                        ELSE 0
                    END) AS net_change,
                    SUM(SUM(CASE 
                        WHEN transaction_type = 'INCOME' THEN transaction_amount
                        WHEN transaction_type = 'EXPENSE' THEN -transaction_amount
                        ELSE 0
                    END)) OVER (ORDER BY DATE(created_at)) AS running_total
            FROM "Transaction"
            WHERE user_id = ${userId}
            GROUP BY DATE(created_at)
            ORDER BY DATE(created_at);
        `;

        return trend.map(t => ({
            date: t.date,
            total_balance: Number(t.running_total)
        }));
    }
}