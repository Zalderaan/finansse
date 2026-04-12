import { CreateAccountDialog } from '@/features/accounts/components/CreateAccountDialog'
import { Accounts } from '@/features/accounts/components/Accounts'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetDashboardData } from '@/features/reports/hooks/useGetDashboardData';
import { formatCurrency } from '@/lib/utils/format-currency';

export function AccountPage() {
    // const { dashboard_card_data, isLoading, isError, error } = useGetDashboardData();

    const { dashboard_card_data } = useGetDashboardData();
    return (
        <div className='flex flex-col h-full w-full space-y-4'>
            
            {/* Page title & main action */}
            <div className='flex flex-row w-full justify-between'>
                <span className='font-normal text-2xl'>Your accounts</span>
                <CreateAccountDialog />
            </div>
            
            {/* Current overall balance */}
            <Card>
                <CardHeader>  
                    <CardDescription className='text-xs'>
                        Total Balance
                    </CardDescription>
                    <CardTitle className='text-3xl'>
                        {formatCurrency(dashboard_card_data?.currentBalance ?? 0)}
                    </CardTitle>
                </CardHeader>
            </Card>

            {/* Accounts list */}
            <Accounts />
        </div>
        
    )
}