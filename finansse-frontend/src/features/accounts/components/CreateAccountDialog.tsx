import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

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
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateAccount } from '../hooks/useCreateAccount';
import type { CreateAccountRequest } from '../types/accounts.type';
import { useAccountUiStore } from '../stores/accounts.uiStore';

const createAccountFormSchema = z.object({
    account_name: z.string()
        .min(2, { message: "Account name must be at least 2 characters." })
        .max(32, { message: "Account name cannot exceed 32 characters." })
        .refine(val => val.trim().length > 0, "Account name cannot be empty or whitespace"),
    currency: z.string()
        .min(3, { message: "Invalid currency." }),
    type: z.enum(["SAVINGS", "CHECKING", "CASH", "CREDIT", "INVESTMENT", "E_WALLET"]),
    initial_bal: z.number()
        .min(0, "Balance cannot be less than 0")
        .optional(),
});

export function CreateAccountDialog() {
    const {createAccountDialogOpen, setCreateAccountDialogOpen} = useAccountUiStore(); 

    const createAccountForm = useForm<z.infer<typeof createAccountFormSchema>>({
        resolver: zodResolver(createAccountFormSchema),
        defaultValues: {
            account_name: "",
            type: undefined,
            initial_bal: undefined,
            currency: "PHP",
        }
    })

    const { createAccAsync, isCreating, isError } = useCreateAccount();
    async function onSubmit(values: z.infer<typeof createAccountFormSchema>) {
        console.log("onsubmit called!")
        console.log("Values in createAccountFormSchema: ", values);
        const finalValues: CreateAccountRequest = {
            name: values.account_name,
            acc_type: values.type,
            currency: values.currency,
            initial_bal: values.initial_bal ?? 0
        }

        try {
            await createAccAsync(finalValues);
            setCreateAccountDialogOpen(false);
        } catch (error) {
            console.error("Error creating account: ", error);
        }
        // await createAccAsync(finalValues)
        console.log("final vals: ", finalValues);
    }

    function handleNumberChange(value: string, onChange: (value: number | undefined) => void) {
        // handle empty inputs
        if (value === "" || value === undefined) {
            onChange(undefined);
            return;
        }
        // convert string to number
        const numValue = parseFloat(value)
        if (value) {
            if (!isNaN(numValue)) {
                onChange(numValue);
            }
        };
    };

    return (
        <>
            <Dialog open={createAccountDialogOpen} onOpenChange={setCreateAccountDialogOpen}>
                <DialogTrigger asChild>
                    <Button className='w-fit'>
                        <Plus />
                        Create
                    </Button>
                </DialogTrigger>
                <Form {...createAccountForm}>
                    <DialogContent>
                        <form onSubmit={createAccountForm.handleSubmit(onSubmit)} className='space-y-6'>
                            <DialogHeader>
                                <DialogTitle>Create Account</DialogTitle>
                                <DialogDescription>
                                    Create a money-tracking account
                                </DialogDescription>
                            </DialogHeader>

                            <div className='flex flex-col space-y-4'>
                                <FormField
                                    control={createAccountForm.control}
                                    name="account_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Account Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Account name' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={createAccountForm.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Account Type</FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className='w-full'>
                                                        <SelectValue placeholder="Choose account type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="CASH">Cash</SelectItem>
                                                        <SelectItem value="E_WALLET">E-Wallet</SelectItem>
                                                        <SelectItem value="SAVINGS">Savings</SelectItem>
                                                        <SelectItem value="CHECKING">Checking</SelectItem>
                                                        <SelectItem value="INVESTMENT">Investment</SelectItem>
                                                        <SelectItem value="CREDIT">Credit</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={createAccountForm.control}
                                    name="currency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Currency</FormLabel>
                                            <FormControl>
                                                <Input placeholder='ex. PHP' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={createAccountForm.control}
                                    name="initial_bal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Initial Balance</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="ex. 100, leave empty if none"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    onChange={(e) => handleNumberChange(e.target.value, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant={'outline'}>
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type='submit' disabled={isCreating}>
                                    {isCreating ? 'Creating account...' : 'Confirm' }
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Form>
            </Dialog >
        </>
    )
}