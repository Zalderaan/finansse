// import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";

// interface DashboardCardDetails {
//     color: string;
//     title: string;
//     value: number;
// }

// export function DashboardCard({
//     color, title, value
// } : DashboardCardDetails) {
//     return (
//         <>
//             <Card className={`bg-green-200 border-green-300 border-1 w-full`}>
//                 <CardHeader>
//                     <CardDescription className="text-green-900">{title}</CardDescription>
//                     <CardTitle className="flex flex-row text-3xl font-mono tabular-nums">
//                         {value.toLocaleString("en-PH", {style: "currency", currency:"PHP"})}
//                     </CardTitle>
//                 </CardHeader>
//                 <CardFooter className="flex flex-col items-start text-sm">
//                     <div className="font-medium">Major downfall burat megamind</div>
//                     <div>Some kind of analysis here by 20%</div>
//                 </CardFooter>
//             </Card>
//         </>
//     );
// }

import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";

interface DashboardCardDetails {
    color: 'green' | 'red' | 'blue' | 'yellow'; // Add more as needed
    title: string;
    value: number;
    footerText?: string; // Optional for analysis
    changePercent?: number; // Optional for percentage
}

export function DashboardCard({
    color, title, value, footerText = "No analysis available", changePercent
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
                    {value.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}
                </CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-col items-start text-sm">
                <div className="font-medium">{footerText}</div>
                {changePercent !== undefined && (
                    <div>{changePercent > 0 ? '+' : ''}{changePercent}% change</div>
                )}
            </CardFooter>
        </Card>
    );
}