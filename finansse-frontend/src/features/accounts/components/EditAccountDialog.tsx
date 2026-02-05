import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    // DialogDescription,
    // DialogOverlay,
    // DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";

// form imports
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";

const editAccountFormSchema = z.object({
    account_name: z.string({ message: "Wallet name cannot be empty" }),
    type: z.enum(["SAVINGS", "CHECKING", "CASH", "CREDIT", "INVESTMENT", "E_WALLET"]),
});

export function EditAccountDialog() {

    // TODO: add hook here

    const editAccountForm = useForm<z.infer<typeof editAccountFormSchema>>({
        resolver: zodResolver(editAccountFormSchema),
        defaultValues: {
            account_name: "",
            type: undefined
        }
    });

    async function onSubmit(values: z.infer<typeof editAccountFormSchema>) {
        console.log(values);
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <Pencil />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Edit Dialog
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...editAccountForm}>
                        <form onSubmit={editAccountForm.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={editAccountForm.control}
                                name="account_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editAccountForm.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Type</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={'outline'}>
                                Cancel
                            </Button>
                        </DialogClose>
                        {/**
                         * TODO: use isEditing from hook (to be created)   
                         */}
                        <Button type='submit'>
                            Confirm
                        </Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </>
    )
}