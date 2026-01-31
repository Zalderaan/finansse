import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { useGetUserSpendingByCategory } from "@/features/reports/hooks/useGetUserSpendingByCategory";
// import { useHasAccounts } from "@/features/accounts/hooks/useHasAccounts";
// import { Button } from "@/components/ui/button";
// import { DollarSign } from "lucide-react";
// import { Link } from "react-router-dom";
// import { AddTransactionDialog } from "@/features/transactions/components/AddTransactionDialog";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];


export function SpendingByCategory() {
    const { userSpendByCategory, isLoading, isError, error } = useGetUserSpendingByCategory();
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

            <CardContent>
                {
                    isLoading ? (
                        <p>Loading spending data...</p>
                    ) : isError ? (
                        <p>Error loading data: {error?.message || "Unknown error"}</p>
                    ) : (
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
                    )
                }
            </CardContent >
        </Card >
    )
}