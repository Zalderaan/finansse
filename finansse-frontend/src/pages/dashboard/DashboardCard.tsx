import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardCardDetails {
    color: 'green' | 'red' | 'blue' | 'yellow';
    title: string;
    value: number;
    isLoading: boolean;
    footerText?: string;
    changePercent?: number;
}

export function DashboardCard({
    color, title, value, isLoading, footerText = "No analysis available", changePercent
}: DashboardCardDetails) {
    const colorClasses = {
        green: 'bg-green-200 border-green-300 text-green-900',
        red: 'bg-red-200 border-red-300 text-red-900',
        blue: 'bg-blue-200 border-blue-300 text-blue-900',
        yellow: 'bg-yellow-200 border-yellow-300 text-yellow-900',
    };

    return (
        <Card className={`${colorClasses[color]} border-1 w-full`}>
            <CardHeader>
                <CardDescription className={`text-${color}-900`}>{title}</CardDescription>
                <CardTitle className="flex flex-row text-3xl font-mono tabular-nums">
                    {isLoading ? (
                        <Skeleton className="h-9 w-32 opacity-50" />
                    ) : (
                        value.toLocaleString("en-PH", { style: "currency", currency: "PHP" })
                    )}
                </CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-col items-start text-sm gap-1">
                {isLoading ? (
                    <>
                        <Skeleton className="h-4 w-40 opacity-50" />
                        <Skeleton className="h-4 w-24 opacity-50" />
                    </>
                ) : (
                    <>
                        <div className="font-medium">{footerText}</div>
                        {changePercent !== undefined && (
                            <div>{changePercent > 0 ? '+' : ''}{changePercent}% change</div>
                        )}
                    </>
                )}
            </CardFooter>
        </Card>
    );
}