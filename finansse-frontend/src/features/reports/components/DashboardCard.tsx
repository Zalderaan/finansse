import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface DashboardCardDetails {
    color: "green" | "red" | "blue" | "yellow";
    title: string;
    value: number;
    isLoading: boolean;
    footerText?: string;
    changePercent?: number;
}

const currencyFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
});

const toneStyles = {
    green: {
        card: "border-border bg-card",
        accent: "bg-emerald-500/70 dark:bg-emerald-400/70",
        value: "text-foreground",
    },
    red: {
        card: "border-border bg-card",
        accent: "bg-rose-500/70 dark:bg-rose-400/70",
        value: "text-foreground",
    },
    blue: {
        card: "border-border bg-card",
        accent: "bg-slate-500/60 dark:bg-slate-400/60",
        value: "text-foreground",
    },
    yellow: {
        card: "border-border bg-card",
        accent: "bg-amber-500/70 dark:bg-amber-400/70",
        value: "text-foreground",
    },
};

export function DashboardCard({
    color,
    title,
    value,
    isLoading,
    footerText = "No analysis available",
    changePercent,
}: DashboardCardDetails) {
    const tone = toneStyles[color];
    const changeClass =
        changePercent === undefined
            ? "text-muted-foreground"
            : changePercent >= 0
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-rose-700 dark:text-rose-300";

    return (
        <Card
            className={cn(
                "relative w-full overflow-hidden border shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                tone.card
            )}
        >
            <div className={cn("absolute inset-x-0 top-0 h-1", tone.accent)} />
            <CardHeader className="gap-2 pb-3">
                <CardDescription className="text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                    {title}
                </CardDescription>

                <CardTitle className={cn("text-3xl font-mono tabular-nums", tone.value)}>
                    {isLoading ? (
                        <Skeleton className="h-9 w-32 opacity-60" />
                    ) : (
                        currencyFormatter.format(value)
                    )}
                </CardTitle>
            </CardHeader>

            <CardFooter className="flex flex-col items-start gap-1 pt-0 text-sm">
                {isLoading ? (
                    <>
                        <Skeleton className="h-4 w-40 opacity-50" />
                        <Skeleton className="h-4 w-24 opacity-50" />
                    </>
                ) : (
                    <>
                        <div className="font-medium text-foreground/90">{footerText}</div>
                        {changePercent !== undefined && (
                            <div className={cn("font-medium", changeClass)}>
                                {changePercent > 0 ? "+" : ""}
                                {changePercent.toFixed(1)}% change
                            </div>
                        )}
                    </>
                )}
            </CardFooter>
        </Card>
    );
}