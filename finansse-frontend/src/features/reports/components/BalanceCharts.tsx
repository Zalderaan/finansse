import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { useGetRunningBalance, usePrefetchRunningBalance } from '@/features/reports/hooks/useGetRunningBalance';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ButtonGroup } from '@/components/ui/button-group';
import { useSearchParams } from 'react-router-dom';

type Period = 'week' | 'month' | 'quarter' | 'year';

export function BalanceChart() {
    const [searchParams, setSearchParams] = useSearchParams();

    const allowedPeriods: Period[] = ['week', 'month', 'quarter', 'year'];
    const rawPeriod = searchParams.get('period');
    const period: Period = allowedPeriods.includes(rawPeriod as Period) ? (rawPeriod as Period) : 'month';

    const { balance_trend, isLoading, isError, error } = useGetRunningBalance(period);

    const handlePeriodChange = (newPeriod: Period) => {
        setSearchParams({ period: newPeriod });
    }

    const prefetchBalance = usePrefetchRunningBalance();
    const handlePeriodHover = (p: Period) => {
        console.log("handlePeriodHover() called!")
        if (p !== period) {
            prefetchBalance(p);
        }
    }

    if (isLoading) {
        return <div>Loading balance data...</div>;
    }

    if (isError) {
        return <div>Error loading balance: {error?.message || 'Unknown Error'}</div>;
    }

    const latestBalance = balance_trend && balance_trend.length > 0 ? balance_trend[balance_trend.length - 1].total_balance : 0;
    return (
        <Card className='w-full px-5 py-6'>
            <CardHeader className='flex flex-row items-center justify-between w-full px-1'>
                <div className=''>
                    <CardTitle>Balance over time</CardTitle>
                    <CardDescription className='text-xs'>A trend of your total balance: {latestBalance}</CardDescription>
                </div>

                <ButtonGroup>
                    {
                        (['week', 'month', 'quarter', 'year'] as Period[]).map((p) => (
                            <Button
                                key={p}
                                onMouseEnter={() => handlePeriodHover(p)}
                                onClick={() => handlePeriodChange(p)}
                                variant={period === p ? 'default' : 'outline'}
                            >
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                            </Button>
                        ))
                    }
                </ButtonGroup>
            </CardHeader>

            <AreaChart
                responsive
                style={{ width: '100%', maxWidth: '100%', maxHeight: '30vh', aspectRatio: 1.618 }}
                data={balance_trend}
                className='w-full'
            >
                <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={1.0} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.15} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeOpacity={0.35} vertical={false} />
                <XAxis dataKey={"date"} tick={{ fontSize: 12 }} tickFormatter={(value) => new Date(value).toLocaleDateString('en-PH', { weekday: 'short', day: '2-digit' })} />
                <YAxis tick={{ fontSize: 12 }} width={"auto"} />
                <Tooltip />
                <Area type={"monotone"} dataKey={"total_balance"} stroke="#8884d8" fill="url(#colorBalance)" />
            </AreaChart>
        </Card>
    )
}