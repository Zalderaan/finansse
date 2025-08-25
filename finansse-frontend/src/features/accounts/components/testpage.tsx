import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Define the schema with various number validations
const formSchema = z.object({
    age: z
        .number({
            required_error: "Age is required",
            invalid_type_error: "Age must be a number",
        })
        .int("Age must be a whole number")
        .min(0, "Age must be positive")
        .max(120, "Age must be realistic"),

    price: z
        .number({
            required_error: "Price is required",
            invalid_type_error: "Price must be a number",
        })
        .positive("Price must be positive")
        .max(10000, "Price cannot exceed $10,000"),

    discount: z
        .number({
            invalid_type_error: "Discount must be a number",
        })
        .min(0, "Discount cannot be negative")
        .max(100, "Discount cannot exceed 100%")
        .optional(),

    quantity: z
        .number({
            required_error: "Quantity is required",
            invalid_type_error: "Quantity must be a number",
        })
        .int("Quantity must be a whole number")
        .min(1, "Minimum quantity is 1")
        .max(999, "Maximum quantity is 999"),
});

type FormData = z.infer<typeof formSchema>;

export default function TestPage() {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            age: undefined,
            price: undefined,
            discount: undefined,
            quantity: undefined,
        },
    });

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data);
        alert(`Form submitted successfully! Check console for data.`);
    };

    // Helper function to convert string input to number
    const handleNumberChange = (value: string, onChange: (value: number | undefined) => void) => {
        if (value === '' || value === undefined) {
            onChange(undefined);
            return;
        }

        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            onChange(numValue);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Number Input Form with Zod Validation</CardTitle>
                        <CardDescription>
                            This form demonstrates various number input validations using Zod schema validation
                            and shadcn/ui components.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                {/* Age Field - Integer validation */}
                                <FormField
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Age</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter your age"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    onChange={(e) => handleNumberChange(e.target.value, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Must be a whole number between 0 and 120
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Price Field - Decimal validation */}
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price ($)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0.00"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    onChange={(e) => handleNumberChange(e.target.value, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Must be a positive number, max $10,000
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Discount Field - Optional with percentage validation */}
                                <FormField
                                    control={form.control}
                                    name="discount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Discount (%)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    placeholder="Optional discount percentage"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    onChange={(e) => handleNumberChange(e.target.value, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Optional field. If provided, must be between 0 and 100
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Quantity Field - Integer with range */}
                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantity</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter quantity"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    onChange={(e) => handleNumberChange(e.target.value, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Whole number between 1 and 999
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex gap-4">
                                    <Button type="submit" className="flex-1">
                                        Submit Form
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => form.reset()}
                                        className="flex-1"
                                    >
                                        Reset Form
                                    </Button>
                                </div>
                            </form>
                        </Form>

                        {/* Form State Display */}
                        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                            <h3 className="text-sm font-medium mb-2">Current Form Values:</h3>
                            <pre className="text-xs text-gray-600 overflow-x-auto">
                                {JSON.stringify(form.watch(), null, 2)}
                            </pre>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}