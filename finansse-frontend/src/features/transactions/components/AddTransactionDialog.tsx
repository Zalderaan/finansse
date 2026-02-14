// UI imports
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
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
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { DatePickerSimple } from "@/components/ui/date-picker";

// forms imports
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormField,
    FormDescription,
} from '@/components/ui/form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// hooks imports
import { useGetAccounts } from '@/features/accounts/hooks/useGetAccounts';
import { useCreateTransaction } from '@/features/transactions/hooks/useCreateTransaction';
import { useTransactionUiStore } from '@/features/transactions/stores/transactions.uiStore';
import { useGetCategories } from '@/features/categories/hooks/useGetCategories';

// types imports
import type { CreateTransactionRequest } from '@/features/transactions/types/transactions.types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// const createTransactionFormSchema = z.object({
//     transaction_name: z.string().optional(),
//     account_id: z.number(),
//     transfer_account_id: z.number().optional(),
//     amount: z
//         .number({ invalid_type_error: "Amount is required" })
//         .positive({ message: "Amount must be greater than 0" }),
//     type: z.enum(['INCOME', 'EXPENSE', 'TRANSFER']),
//     category_id: z.number(),
// }).superRefine((data, ctx) => {

// })

export function AddTransactionDialog() {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    const createTransactionFormSchema = z.object({
        transaction_name: z.string().optional(),
        transaction_date: z.coerce.date().optional(),
        account_id: z.number(),
        transfer_account_id: z.number().optional(),
        amount: z
            .number({ invalid_type_error: "Amount is required" })
            .positive({ message: "Amount must be greater than 0" }),
        type: z.enum(['INCOME', 'EXPENSE', 'TRANSFER']),
        category_id: z.number(),
    })
    // .superRefine((data, ctx) => {
    //     // Only check for EXPENSE or TRANSFER
    //     if (data.type === 'EXPENSE' || data.type === 'TRANSFER') {
    //         // Find the selected account
    //         const selectedAccount = accounts?.find(acc => acc.account_id === data.account_id);
    //         const accountBalance = selectedAccount?.account_current_balance ?? 0;

    //         // Check if amount exceeds balance
    //         if (data.amount > accountBalance) {
    //             ctx.addIssue({
    //                 code: z.ZodIssueCode.custom,
    //                 message: `Amount exceeds available balance of ₱${accountBalance.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    //                 path: ['amount'], // Attach error to the 'amount' field
    //             });
    //         }
    //     }
    // });

    const createTransactionForm = useForm<z.infer<typeof createTransactionFormSchema>>({
        resolver: zodResolver(createTransactionFormSchema),
        defaultValues: {
            transaction_name: "",
            transaction_date: undefined,
            account_id: undefined,
            amount: undefined,
            transfer_account_id: undefined,
            type: undefined,
            category_id: undefined
        },
        mode: "onChange"
    });

    async function onSubmit(values: z.infer<typeof createTransactionFormSchema>) {
        console.log('transaction onSubmit() called!');
        console.log('values in createTransaction formSchema: ', values);

        // format name
        const formattedAmount = `₱${values.amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        const accountName = selectedAccount?.account_name || `Account ${values.account_id}`;
        const name = `${values.type} of ${formattedAmount} on ${accountName}`;

        console.log("Auto name: ", name);
        console.log("Actual name: ", values.transaction_name);

        const finalTransactionValues: CreateTransactionRequest = {
            name: values.transaction_name || name,
            account_id: values.account_id,
            date: values.transaction_date || new Date(),  // Assign Date object directly (no .toISOString())
            transfer_account_id: values.transfer_account_id,
            amount: values.amount,
            type: values.type,
            category_id: values.category_id,
        }

        console.log('final values in createTransaction formSchema: ', finalTransactionValues);
        try {
            await createTransactionAsync(finalTransactionValues);
            createTransactionForm.reset();
            setCreateTransactionDialogOpen(false);
        } catch (error) {
            console.error("Error creating transaction: ", error);
        }
    };

    function handleReset() {
        createTransactionForm.reset(); // Reset to default values
        createTransactionForm.clearErrors(); // Clear any validation errors to prevent immediate display
    }
    const { accounts, isLoading: accountsIsLoading, isError: accountsIsError } = useGetAccounts();
    const { createTransactionDialogOpen, setCreateTransactionDialogOpen } = useTransactionUiStore();
    const { createTransactionAsync, isCreating: isCreatingTransaction, isError: isErrorTransaction, error: transactionError } = useCreateTransaction();
    const { categories, isLoading: categoriesIsLoading, isError: categoriesIsError } = useGetCategories();


    const isDisabled = !accounts || accounts.length === 0;
    // console.log('This is accounts: ', accounts);

    const watchedAccountId = createTransactionForm.watch("account_id");
    const watchedTransactionType = createTransactionForm.watch("type");
    // const watchedAmount = createTransactionForm.watch("amount");


    const selectedAccount = accounts?.find(acc => acc.account_id === watchedAccountId);
    const accountBalance = selectedAccount?.account_current_balance ?? 0;

    // const wouldExceedBalance = watchedTransactionType === 'EXPENSE' || watchedTransactionType === 'TRANSFER'
    //     ? watchedAmount > accountBalance
    //     : false;

    return (
        <Dialog open={createTransactionDialogOpen} onOpenChange={setCreateTransactionDialogOpen}>

            <DialogTrigger asChild disabled={isDisabled} className='w-full'>
                <SidebarMenuButton tooltip="Add Transaction" className="font-bold flex justify-center items-center border">
                    <PlusIcon />
                    {!isCollapsed && <span className="ml-2">Add Transaction</span>}
                </SidebarMenuButton>
            </DialogTrigger>

            <DialogContent>
                <Form {...createTransactionForm}>
                    <form onSubmit={createTransactionForm.handleSubmit(onSubmit)} className='space-y-4'>
                        <DialogHeader>
                            <DialogTitle>Add Transaction</DialogTitle>
                            <DialogDescription>Testing</DialogDescription>
                        </DialogHeader>

                        <div className='flex flex-col space-y-4'>
                            <FormField
                                control={createTransactionForm.control}
                                name="account_id"
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
                                            <Select
                                                value={field.value ?? ""}
                                                onValueChange={(val) => {
                                                    field.onChange(val);
                                                    createTransactionForm.setValue("category_id", undefined as unknown as number);
                                                    // reset transfer_account_id when transfer type changes
                                                    if (val !== "TRANSFER") {
                                                        createTransactionForm.setValue("transfer_account_id", undefined);
                                                    }
                                                }}
                                                disabled={!watchedAccountId}
                                            >
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder={!watchedAccountId ? "Pick an account first" : "Choose transaction type"} />
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
                                name="transaction_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Transaction Name <span className='text-xs text-gray-600'>(Optional)</span></FormLabel>
                                        <FormDescription className='text-xs'>
                                            Leave blank for auto-generated name.
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="e.g., Coffee at Starbucks"
                                                disabled={!watchedAccountId}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={createTransactionForm.control}
                                name="transaction_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Transaction Date <span className='text-xs text-gray-600'>(Optional)</span></FormLabel>
                                        <FormDescription className='text-xs'>
                                            Leaving this blank will default to now
                                        </FormDescription>
                                        <FormControl>
                                            <DatePickerSimple
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={!watchedAccountId}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {watchedTransactionType === "TRANSFER" && (
                                <FormField
                                    control={createTransactionForm.control}
                                    name="transfer_account_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Transfer To</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={field.value ? field.value.toString() : ""}
                                                    onValueChange={val => field.onChange(Number(val))}
                                                >
                                                    <SelectTrigger className='w-full'>
                                                        <SelectValue placeholder="Choose account to transfer to" />
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
                            )}

                            <FormField
                                control={createTransactionForm.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        {selectedAccount && (watchedTransactionType === 'EXPENSE' || watchedTransactionType === 'TRANSFER') && (
                                            <FormDescription className='text-xs'>
                                                Available balance: ₱{accountBalance.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </FormDescription>
                                        )}
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={!watchedAccountId ? "Pick an account first" : "Transaction Amount"}
                                                type="number"
                                                {...createTransactionForm.register("amount", {
                                                    valueAsNumber: true,
                                                    onChange: () => createTransactionForm.trigger()  // Trigger re-validation on amount change
                                                })}
                                                value={field.value ?? 0}
                                                disabled={!watchedAccountId}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={createTransactionForm.control}
                                name="category_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category Name</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value ? field.value.toString() : ""}
                                                onValueChange={val => field.onChange(Number(val))}
                                                disabled={!watchedAccountId || !watchedTransactionType}
                                            >
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder={
                                                        !watchedAccountId ? "Pick an account first"
                                                            : !watchedTransactionType ? "Pick a transaction type first"
                                                                : "Choose category"
                                                    } />
                                                </SelectTrigger>
                                                {/* <SelectContent>
                                                    {accountsIsLoading ? (
                                                        <SelectItem value="" disabled>Loading accounts</SelectItem>
                                                    ) : accountsIsError ? (
                                                        <SelectItem value="" disabled>Failed to load accounts</SelectItem>
                                                    ) : (
                                                        categories?.filter((i) => i.category_type === watchedTransactionType).map(
                                                            (category) => (
                                                                <SelectItem key={category.category_id} value={category.category_id.toString()}>{category.category_name}</SelectItem>
                                                            )
                                                        )
                                                    )}
                                                </SelectContent> */}

                                                <SelectContent side='top'>
                                                    <Tabs defaultValue='default'>
                                                        <TabsList>
                                                            <TabsTrigger value="user">User-made</TabsTrigger>
                                                            <TabsTrigger value="default">Default</TabsTrigger>
                                                        </TabsList>

                                                        <TabsContent value="user">
                                                            {categoriesIsLoading ? (
                                                                <SelectItem value="" disabled>Loading categories</SelectItem>
                                                            ) : categoriesIsError ? (
                                                                <SelectItem value="" disabled>Failed to load categories</SelectItem>
                                                            ) : (
                                                                categories?.filter(cat => cat.category_type === watchedTransactionType && cat.category_isDefault === false).map(
                                                                    (category) => (
                                                                        <SelectItem key={category.category_id} value={category.category_id.toString()}>{category.category_name}</SelectItem>
                                                                    )
                                                                )
                                                            )}
                                                        </TabsContent>

                                                        <TabsContent value="default">
                                                            {categoriesIsLoading ? (
                                                                <SelectItem value="" disabled>Loading categories</SelectItem>
                                                            ) : categoriesIsError ? (
                                                                <SelectItem value="" disabled>Failed to load categories</SelectItem>
                                                            ) : (
                                                                categories?.filter(cat => cat.category_type === watchedTransactionType && cat.category_isDefault === true).map(
                                                                    (category) => (
                                                                        <SelectItem key={category.category_id} value={category.category_id.toString()}>{category.category_name}</SelectItem>
                                                                    )
                                                                )
                                                            )}
                                                        </TabsContent>
                                                    </Tabs>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Add error display here */}
                        {isErrorTransaction && (
                            <div className="p-4 border border-red-300 bg-red-50 rounded-md">
                                <p className="text-red-700 text-sm">
                                    {transactionError?.response?.data?.message || transactionError?.message || "Invalid email or password"}
                                </p>
                            </div>
                        )}

                        <DialogFooter>
                            {/* <DialogClose asChild>
                                <Button variant={'outline'}>Cancel</Button>
                            </DialogClose> */}
                            <Button type="button" variant={'outline'} onClick={handleReset}>
                                Reset
                            </Button>
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

export function AddTransactionSidebarTrigger() {
    return (
        <SidebarMenuButton className='bg-black text-white'>
            <PlusIcon />
            Add Transaction
        </SidebarMenuButton>
    )
}