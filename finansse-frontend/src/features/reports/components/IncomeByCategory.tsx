import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { useGetUserIncomeByCategory } from "@/features/reports/hooks/useGetUserIncomeByCategory";
import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export function IncomeByCategory() {
    const { userIncomeByCategory, isError, isLoading, error } = useGetUserIncomeByCategory();
    console.log("userIncomeByCategory in the component: ", userIncomeByCategory);
    // console.log("userIncomeByCategory: ", userIncomeByCategory)
    // const isLoading = true;

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

            {/* TODO: Empty state */}

            <CardContent>
                {
                    isLoading ? (
                        <p>Loading income data...</p>
                    ) : isError ? (
                        <p>Error loading data: {error?.message || "Unknown error"}</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
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
                        </ResponsiveContainer>

                    )
                }
            </CardContent>
        </Card>
    )
}