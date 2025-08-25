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
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet'
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
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const createAccountFormSchema = z.object({
    account_name: z.string()
        .min(2, { message: "Account name must be at least 2 characters." })
        .max(32, { message: "Account name cannot exceed 32 characters." })
        .refine(val => val.trim().length > 0, "Account name cannot be empty or whitespace"),
    currency: z.string()
        .min(3, { message: "Invalid currency." }),
    type: z.enum(["Savings", "Checking", "Cash", "Credit", "Investment", "E-Wallet"]),
    initial_bal: z.number()
        .min(0, "Balance cannot be less than 0"),
});

export function CreateAccountModal() {
    const createAccountForm = useForm<z.infer<typeof createAccountFormSchema>>({
        resolver: zodResolver(createAccountFormSchema),
        defaultValues: {
            account_name: "",
            type: undefined,
            initial_bal: 0,
            currency: "PHP",
        }
    })

    function onSubmit(values: z.infer<typeof createAccountFormSchema>) {
        console.log("onsubmit called!")
        console.log("Values in createAccountFormSchema: ", values);
    }

    return (
        <>
            <Dialog>
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
                                                <Input placeholder='Account Name' {...field} />
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
                                                        <SelectValue placeholder="Account Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Cash">Cash</SelectItem>
                                                        <SelectItem value="E-Wallet">E-Wallet</SelectItem>
                                                        <SelectItem value="Savings">Savings</SelectItem>
                                                        <SelectItem value="Checking">Checking</SelectItem>
                                                        <SelectItem value="Investment">Investment</SelectItem>
                                                        <SelectItem value="Credit">Credit</SelectItem>
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
                                                    placeholder='0' {...field}
                                                    type='number'
                                                    value={field.value}
                                                    onChange={e => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
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
                                <Button type='submit'>
                                    Confirm
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Form>
            </Dialog >
        </>
    )
}