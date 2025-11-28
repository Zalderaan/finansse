import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { useGetUserIncomeByCategory } from "@/features/reports/hooks/useGetUserIncomeByCategory";
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
        </Card>
    )
}