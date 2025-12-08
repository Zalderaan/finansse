import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { useGetUserSpendingByCategory } from "@/features/reports/hooks/useGetUserSpendingByCategory";
import { useHasAccounts } from "@/features/accounts/hooks/useHasAccounts";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { AddTransactionDialog } from "@/features/transactions/components/AddTransactionDialog";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];


export function SpendingByCategory() {
    const { userSpendByCategory, isLoading, isError, error } = useGetUserSpendingByCategory();
    // console.log("userSpendByCategory: ", userSpendByCategory);
    const hasAccounts = useHasAccounts();

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
            {!userSpendByCategory || userSpendByCategory.length === 0 ? (
                <CardContent className="flex flex-col items-center justify-center h-64 space-y-4">
                    <DollarSign className="w-12 h-12 text-gray-400" />
                    <div className="text-center">
                        <p className="font-semibold text-gray-700">
                            {hasAccounts ? "No spending data yet" : "No accounts found"}
                        </p>
                        <p className="text-sm text-gray-500">
                            {hasAccounts
                                ? "Start adding expense entries to see your breakdown."
                                : "Create an account to start tracking spending."
                            }
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        {hasAccounts
                            ? (<AddTransactionDialog width="fit" className="">
                                Add Expense
                            </AddTransactionDialog>)
                            : (<Link to={"/dashboard/accounts"}>Create account</Link>)}
                    </Button>
                </CardContent>
            ) : (
                <CardContent>
                    <PieChart width={300} height={300}>
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
                </CardContent >
            )
            }
        </Card >
    )
}