// UI imports
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';


// forms imports
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormField,
} from '@/components/ui/form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useGetAccounts } from '@/features/accounts/hooks/useGetAccounts';

const createTransactionFormSchema = z.object({
    id: z.number(),
    amount: z.number(),
    type: z.enum(['INCOME', 'EXPENSE', 'TRANSFER']),
})

export function AddTransactionDialog() {
    const createTransactionForm = useForm<z.infer<typeof createTransactionFormSchema>>({
        resolver: zodResolver(createTransactionFormSchema),
        defaultValues: {
            id: undefined,
            amount: 1,
            type: undefined,
        }
    })

    async function onSubmit(values: z.infer<typeof createTransactionFormSchema>) {
        console.log('transaction onSubmit() called!');
        console.log('values in createTransaction formSchema: ', values);
        // const finalTransactionValues: CreateTransactionRequest = {

        // }
    }

    const { accounts, isLoading, isError } = useGetAccounts();

    console.log('This is accounts: ', accounts);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon /> Add Transaction
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...createTransactionForm}>
                    <form onSubmit={createTransactionForm.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Add Transaction</DialogTitle>
                            <DialogDescription>Testing</DialogDescription>
                        </DialogHeader>

                        <div className='flex flex-col space-y-4'>
                            <FormField
                                control={createTransactionForm.control}
                                name="id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Name</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value ? field.value.toString() : ""}
                                                onValueChange={val => field.onChange(Number(val))}
                                            >
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="Choose account" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {accounts?.map(
                                                        (acc) => (
                                                            <SelectItem key={acc.account_id} value={acc.account_id.toString()}>{acc.account_name}</SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={createTransactionForm.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Transaction Type
                                        </FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="Choose transaction type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='EXPENSE'>Expense</SelectItem>
                                                    <SelectItem value='INCOME'>Income</SelectItem>
                                                    <SelectItem value='TRANSFER'>Transfer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={createTransactionForm.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Transaction Amount' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant={'outline'}>Cancel</Button>
                            </DialogClose>
                            <Button type='submit'>Submit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}