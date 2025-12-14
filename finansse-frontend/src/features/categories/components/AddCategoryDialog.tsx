import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const addCategoryFormSchema = z.object({
    category_name: z.string(),
    category_type: z.enum(["EXPENSE", "INCOME", "TRANSFER"]),
    category_icon: z.string().optional(),
    user_id: z.number()
})

export function AddCategoryDialog() {
    async function onSubmit(values: z.infer<typeof addCategoryFormSchema>) {
        console.log("onsubmit called1");
        console.log("values of add category form: ", values);
    }

    const addCategoryForm = useForm<z.infer<typeof addCategoryFormSchema>>({
        resolver: zodResolver(addCategoryFormSchema),
        defaultValues: {
            category_name: "",
            category_type: undefined,
            category_icon: "",
            user_id: undefined
        }
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Category</Button>
            </DialogTrigger>

            <DialogContent>
                <Form {...addCategoryForm}>
                    <form onSubmit={addCategoryForm.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Add Category</DialogTitle>
                            <DialogDescription>Add a user-made category</DialogDescription>
                        </DialogHeader>

                        <div>
                            <FormField
                                control={addCategoryForm.control}
                                name="category_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Category name' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addCategoryForm.control}
                                name="category_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Category name' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addCategoryForm.control}
                                name="category_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Category name' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button size={'sm'} variant={'outline'}>Clear</Button>
                            <Button size={'sm'} >Add Category</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}