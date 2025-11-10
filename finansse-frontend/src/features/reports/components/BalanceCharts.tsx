import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGetRunningBalance } from '@/features/reports/hooks/useGetRunningBalance';

type Period = 'week' | 'month' | 'quarter' | 'year';

export function BalanceChart() {
    const [period, setPeriod] = useState<Period>('month');

    const { balance_trend, isLoading, isError, error } = useGetRunningBalance();

    return (
        <div className='w-full'>
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
                <YAxis dataKey={"tota_balance"} width={"auto"}/>
                <Tooltip />
                <Area type="monotone" dataKey={"uv"} stroke="#8884d8" fill="8884d8" />
            </AreaChart>
        </div>
    )
}