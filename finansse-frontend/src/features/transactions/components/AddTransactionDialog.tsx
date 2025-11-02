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
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';


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

// hooks imports
import { useGetAccounts } from '@/features/accounts/hooks/useGetAccounts';
import { useCreateTransaction } from '@/features/transactions/hooks/useCreateTransaction';
import { useTransactionUiStore } from '@/features/transactions/stores/transactions.uiStore';

// types imports
import type { CreateTransactionRequest } from '@/features/transactions/types/transactions.types';

const createTransactionFormSchema = z.object({
    id: z.number(),
    amount: z
        .number({ invalid_type_error: "Amount is required" })
        .positive({ message: "Amount must be greater than 0" }),
    type: z.enum(['INCOME', 'EXPENSE', 'TRANSFER']),
})

export function AddTransactionDialog() {
    const createTransactionForm = useForm<z.infer<typeof createTransactionFormSchema>>({
        resolver: zodResolver(createTransactionFormSchema),
        defaultValues: {
            id: undefined,
            amount: undefined,
            type: undefined,
        },
        mode: "onChange"
    })

    async function onSubmit(values: z.infer<typeof createTransactionFormSchema>) {
        console.log('transaction onSubmit() called!');
        console.log('values in createTransaction formSchema: ', values);

        // format name
        const name = `${values.type} - on Account ID: ${values.id} - ${values.amount}`
        const finalTransactionValues: CreateTransactionRequest = {
            name: name,
            account_id: values.id,
            amount: values.amount,
            type: values.type,
        }

        console.log('final values in createTransaction formSchema: ', finalTransactionValues);
        try {
            await createTransactionAsync(finalTransactionValues);
            createTransactionForm.reset();
            setCreateTransactionDialogOpen(false);
        } catch (error) {
            console.error("Error creating transaction: ", error);
        }
    }

    const { accounts, isLoading: accountsIsLoading, isError: accountsIsError } = useGetAccounts();
    const { createTransactionDialogOpen, setCreateTransactionDialogOpen } = useTransactionUiStore();
    const { createTransactionAsync, isCreating: isCreatingTransaction, isError: isErrorTransaction, error } = useCreateTransaction();

    const isDisabled = !accounts || accounts.length === 0;
    console.log('This is accounts: ', accounts);

    return (
        <Dialog open={createTransactionDialogOpen} onOpenChange={setCreateTransactionDialogOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className='w-full'>
                        <DialogTrigger asChild disabled={isDisabled} className='w-full'>
                            <Button>
                                <PlusIcon /> Add Transaction
                            </Button>
                        </DialogTrigger>
                    </span>
                </TooltipTrigger>
                {isDisabled && (
                    <TooltipContent>
                        <p>No accounts available. Please add an account first</p>
                    </TooltipContent>
                )}
            </Tooltip>
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
                                                    {accountsIsLoading ? (
                                                        <SelectItem value="" disabled>Loading accounts</SelectItem>
                                                    ) : accountsIsError ? (
                                                        <SelectItem value="" disabled>Failed to load accounts</SelectItem>
                                                    ) : (
                                                        accounts?.map(
                                                            (acc) => (
                                                                <SelectItem key={acc.account_id} value={acc.account_id.toString()}>{acc.account_name}</SelectItem>
                                                            )
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
                                            <Input
                                                placeholder='Transaction Amount' {...field}
                                                type="number"
                                                {...createTransactionForm.register("amount", { valueAsNumber: true })}
                                                value={field.value ?? 0}
                                            />
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
                            <Button type='submit' disabled={isCreatingTransaction}>
                                {isCreatingTransaction ? 'Creating Transaction...' : 'Add Transaction'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}