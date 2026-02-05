import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TRANSACTION_TYPES, type TransactionType } from "@/features/transactions/types/transactions.types";

interface TransactionCardProps {
    name: string,
    type: TransactionType,
    amount: number,
    date: string | Date,
    category?: string
}

export function TransactionCard(
    { name, type, amount, date, category }: TransactionCardProps
) {
    const isExpense = type === TRANSACTION_TYPES.EXPENSE;
    const isIncome = type === TRANSACTION_TYPES.INCOME;
    const isTransfer = type === TRANSACTION_TYPES.TRANSFER;

    const formattedAmount = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
    }).format(Number(amount));

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <Card className='rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200 mb-4'>
            <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                        <CardTitle className='text-lg font-semibold'>{name}</CardTitle>
                        <CardDescription className='flex flex-col gap-1 mt-2'>
                            <div className='flex items-center gap-2'>
                                <span className={cn(
                                    'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                                    isExpense && 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400',
                                    isIncome && 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
                                    isTransfer && 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
                                    !isExpense && !isIncome && !isTransfer && 'bg-muted text-black'
                                )}>
                                    {isExpense ? <ArrowDownRight className='w-3 h-3' /> : <ArrowUpRight className='w-3 h-3' />}
                                    {type}
                                </span>
                                <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                                    {category || "Uncategorized"}
                                </span>
                            </div>
                            <span className='text-xs text-muted-foreground mt-1'>
                                {formattedDate}
                            </span>
                        </CardDescription>
                    </div>
                    <div className='flex flex-col items-end'>
                        <span className='text-xs text-muted-foreground mb-1'>Amount</span>
                        <span className={cn('text-xl font-bold',
                            isExpense && 'text-red-600 dark:text-red-400',
                            isIncome && 'text-green-600 dark:text-green-400',
                            isTransfer && 'text-yellow-600 dark:text-yellow-400'
                        )}>
                            {type === "EXPENSE" ? "-" : type === "INCOME" ? "+" : ""}
                            {formattedAmount}
                        </span>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}