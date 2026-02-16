import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useAddCategory } from "@/features/categories/hooks/useAddCategory";
import { useCategoryUiStore } from "@/features/categories/stores/categories.uiStore";
import { Spinner } from "@/components/ui/spinner";


const addCategoryFormSchema = z.object({
    category_name: z.string().min(1, "Please provide a category name"),
    category_type: z.enum(["EXPENSE", "INCOME", "TRANSFER"]),
    category_icon: z.string().optional(),
})


interface AddCategoryDialogProps {
    showTrigger?: boolean;
}


export function AddCategoryDialog({ showTrigger = false }: AddCategoryDialogProps) {
    const { createCategoryDialogOpen, setCreateCategoryDialogOpen } = useCategoryUiStore();
    // const [open, setOpen] = useState(false);
    const { createCategoryAsync, isCreating, isError, error } = useAddCategory();

    async function onSubmit(values: z.infer<typeof addCategoryFormSchema>) {
        console.log("onsubmit called1");
        console.log("values of add category form: ", values);

        try {
            await createCategoryAsync({ ...values, category_icon: values.category_icon === "" ? null : values.category_icon });
            setCreateCategoryDialogOpen(false);
        } catch (error) {
            console.error("Error creating category: ", error);
        }
    }

    function handleReset() {
        console.log("handle reset called!")
        addCategoryForm.reset(); // Reset to default values
        addCategoryForm.clearErrors(); // Clear any validation errors to prevent immediate display
    }

    const addCategoryForm = useForm<z.infer<typeof addCategoryFormSchema>>({
        resolver: zodResolver(addCategoryFormSchema),
        defaultValues: {
            category_name: "",
            category_type: undefined,
            category_icon: "",
        },
        mode: "onSubmit"
    });

    return (
        <Dialog open={createCategoryDialogOpen} onOpenChange={setCreateCategoryDialogOpen}>
            {
                showTrigger && (
                    <DialogTrigger asChild>
                        <Button>Add Category</Button>
                    </DialogTrigger>

                )
            }

            <DialogContent>
                <Form {...addCategoryForm}>
                    <form className="space-y-4" onSubmit={addCategoryForm.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Add Category</DialogTitle>
                            <DialogDescription>Add a user-made category</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                            <FormField
                                control={addCategoryForm.control}
                                name="category_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='House Savings' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-4 gap-4">
                                <FormField
                                    control={addCategoryForm.control}
                                    name="category_type"
                                    render={({ field }) => (
                                        <FormItem
                                            className="col-start-1 col-span-2"
                                        >
                                            <FormLabel>Category Type</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={field.value ? field.value.toString() : ""}
                                                    onValueChange={(val) => { field.onChange(val) }}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Choose transaction type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="EXPENSE">Expense</SelectItem>
                                                        <SelectItem value="INCOME">Income</SelectItem>
                                                        <SelectItem value="TRANSFER">Transfer</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={addCategoryForm.control}
                                    name="category_icon"
                                    render={({ field }) => (
                                        <FormItem
                                            className="col-span-2"
                                        >
                                            <FormLabel>Category Icon</FormLabel>
                                            <FormControl>
                                                <Input placeholder='🏠' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {isError && (
                            <div className="text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <DialogFooter>
                            <Button type="button" size={'sm'} variant={'outline'} onClick={handleReset}>Clear</Button>
                            <Button type="submit" size={'sm'} disabled={isCreating}>{isCreating ? (
                                <>
                                    <Spinner />
                                    <span>Adding Category</span>
                                </>
                            ) : (
                                "Add Category"
                            )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}