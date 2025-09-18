import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';

interface TransactionCardProps {
    name: string,
    type: string,
    amount: number,
    date: Date
}

export function TransactionCard(
    { name, type, amount, date }: TransactionCardProps
) {
    return (
        <>
            <div className='rounded-none border-y-1 py-8'>
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription className='flex flex-col items-start'>
                        <span>{type}</span>
                        <span>{date.toLocaleString()}</span>
                    </CardDescription>
                </CardHeader>
                <CardFooter className='flex flex-row justify-between items-start'>
                    <span className='text-sm text-gray-400'>Amount</span>
                    <span className='font-bold'>{Number(amount).toFixed(2)}</span>
                </CardFooter>
            </div>
        </>
    )
}