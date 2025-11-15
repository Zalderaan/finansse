import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGetRunningBalance } from '@/features/reports/hooks/useGetRunningBalance';

type Period = 'week' | 'month' | 'quarter' | 'year';

export function BalanceChart() {
    const [period, setPeriod] = useState<Period>('month');

    const { balance_trend, isLoading, isError, error } = useGetRunningBalance(period);

    if (isLoading) {
        return <div>Loading balance data...</div>;
    }

    if (isError) {
        return <div>Error loading balance: {error?.message || 'Unknown Error'}</div>;
    }

    const latestBalance = balance_trend && balance_trend.length > 0 ? balance_trend[balance_trend.length - 1].total_balance : 0;
    return (
        <div className='w-full'>
            <div>
                <h2>Balance</h2>
                <p>{latestBalance}</p>
            </div>

            <div className='flex flex-row gap-2'>
                {
                    (['week', 'month', 'quarter', 'year'] as Period[]).map((p) => (
                        <Button
                            onClick={() => setPeriod(p)}
                            variant={period === p ? 'default' : 'outline'}
                        >
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                        </Button>
                    ))
                }
            </div>

            <AreaChart
                responsive
                style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                data={balance_trend}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={"date"} />
                <YAxis width={"auto"} />
                <Tooltip />
                <Area type={"monotone"} dataKey={"total_balance"} stroke="#8884d8" fill="8884d8" />
            </AreaChart>
        </div>
    )
}