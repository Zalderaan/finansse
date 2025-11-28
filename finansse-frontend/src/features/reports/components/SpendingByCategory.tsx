import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { PieChart, Pie, Label, Tooltip, Legend, Cell } from "recharts";
import { useGetUserSpendingByCategory } from "@/features/reports/hooks/useGetUserSpendingByCategory";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];


export function SpendingByCategory() {
    const { userSpendByCategory, isLoading, isError, error } = useGetUserSpendingByCategory();
    // console.log("userSpendByCategory: ", userSpendByCategory);
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
                </PieChart>
            </CardContent>
        </Card>
    )
}