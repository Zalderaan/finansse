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
import { Plus } from 'lucide-react'

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

const createAccountFormSchema = z.object({
    account_name: z.string()
        .min(2, { message: "Account name must be at least 2 characters." })
        .max(32, { message: "Account name cannot exceed 32 characters." })
        .refine(val => val.trim().length > 0, "Account name cannot be empty or whitespace"),
    currency: z.string()
        .min(3, { message: "Invalid currency." }),
    type: z.enum(["Savings", "Checking", "Cash", "Credit", "Investment", "E-Wallet"], {
        errorMap: () => ({ message: "Please select a valid account type." })
    }),
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
            currency: "",
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
                        <form onSubmit={createAccountForm.handleSubmit(onSubmit)} className='space-y-8'>
                            <DialogHeader>
                                <DialogTitle>Create Account</DialogTitle>
                                <DialogDescription>
                                    Create a money-tracking account
                                </DialogDescription>
                            </DialogHeader>

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
                                            <Input placeholder='Account name' {...field} />
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
                                            <Input placeholder='Account name' {...field} />
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
                                            <Input placeholder='Account name' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
            </Dialog>
        </>
    )
}