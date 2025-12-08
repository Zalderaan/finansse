import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { useGetUserIncomeByCategory } from "@/features/reports/hooks/useGetUserIncomeByCategory";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export function IncomeByCategory() {
    const { userIncomeByCategory, isLoading, isError, error } = useGetUserIncomeByCategory();
    // console.log("userIncomeByCategory: ", userIncomeByCategory)

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    Income by Category
                </CardTitle>
                <CardDescription>
                    Your income
                </CardDescription>
            </CardHeader>
            {
                !userIncomeByCategory || userIncomeByCategory.length === 0 ? (
                    <CardContent className="flex flex-col items-center justify-center h-64 space-y-4">
                        <TrendingUp className="w-12 h-12 text-gray-400" />
                        <div className="text-center">
                            <p className="font-semibold text-gray-700">No income data yet</p>
                            <p className="text-sm text-gray-500">Start adding income entries to see your breakdown.</p>
                        </div>
                        <Button variant="outline">Add Income</Button> {/* Link to add income page */}
                    </CardContent>
                ) : (
                    <CardContent>
                        <PieChart width={300} height={300}>
                            <Pie
                                data={userIncomeByCategory}
                                dataKey="total_amount"
                                nameKey="category_name"
                                innerRadius={60}
                                outerRadius={80}
                                cornerRadius={5}
                                paddingAngle={5}
                            >

                                {userIncomeByCategory?.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `${value.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}`} />
                            <Legend />
                        </PieChart>
                    </CardContent>
                )
            }
        </Card>
    )
}