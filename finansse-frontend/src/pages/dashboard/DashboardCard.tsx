import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";

interface DashboardCardDetails {
    color: string;
    title: string;
    value: number;
}

export function DashboardCard({
    color, title, value
} : DashboardCardDetails) {
    return (
        <>
            <Card className={`bg-green-200 border-green-300 border-1 w-full`}>
                <CardHeader>
                    <CardDescription className="text-green-900">{title}</CardDescription>
                    <CardTitle className="flex flex-row text-3xl font-mono tabular-nums">
                        {value.toLocaleString("en-PH", {style: "currency", currency:"PHP"})}
                    </CardTitle>
                </CardHeader>
                <CardFooter className="flex flex-col items-start text-sm">
                    <div className="font-medium">Major downfall burat megamind</div>
                    <div>Some kind of analysis here by 20%</div>
                </CardFooter>
            </Card>
        </>
    );
}