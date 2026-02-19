import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { useGetUserSpendingByCategory } from "@/features/reports/hooks/useGetUserSpendingByCategory";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useTransactionUiStore } from "@/features/transactions/stores/transactions.uiStore";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];


export function SpendingByCategory() {
    const { userSpendByCategory, isLoading, isError, error } = useGetUserSpendingByCategory();
    const { setCreateTransactionDialogOpen } = useTransactionUiStore();

    // console.log("userSpendByCategory: ", userSpendByCategory);
    // const hasAccounts = useHasAccounts();

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    Spending by Category
                </CardTitle>
                <CardDescription>
                    Your spending
                </CardDescription>
            </CardHeader>

            {/* TODO: Empty state */}


            {
                userSpendByCategory?.length === 0 ? (
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <PlusCircle />
                            </EmptyMedia>
                            <EmptyTitle>No Expenses Yet</EmptyTitle>
                            <EmptyDescription>
                                You haven&apos;t logged any expenses yet. Get started by creating
                                your first expense.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent className="flex-row justify-center gap-2">
                            <Button onClick={() => setCreateTransactionDialogOpen(true)}>Add Expense</Button>
                        </EmptyContent>
                    </Empty>
                ) : (
                    <CardContent>
                        {
                            isLoading ? (
                                <p>Loading spending data...</p>
                            ) : isError ? (
                                <p>Error loading data: {error?.message || "Unknown error"}</p>
                            ) : (
                                <ResponsiveContainer width={"100%"} height={400}>
                                    <PieChart>
                                        <Pie
                                            data={userSpendByCategory}
                                            dataKey="total_amount"
                                            nameKey="category_name"
                                            innerRadius={60}
                                            outerRadius={80}
                                            cornerRadius={5}
                                            paddingAngle={5}
                                        >
                                            {userSpendByCategory?.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => `${value.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}`} />
                                        <Legend />
                                    </PieChart >
                                </ResponsiveContainer>
                            )
                        }
                    </CardContent >
                )
            }
        </Card >
    )
}