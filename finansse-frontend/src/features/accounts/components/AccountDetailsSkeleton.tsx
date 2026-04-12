import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function AccountDetailsSkeleton() {
    return (
        <div className="h-full flex flex-col space-y-2">
            {/* Header Skeleton */}
            <header className="flex items-center justify-between sticky z-10 bg-sidebar border-b backdrop-blur-sm -m-4 h-(--header-height) top-0 px-4">
                <div className="flex flex-row items-center space-x-2">
                    <Skeleton className="w-10 h-10 rounded" />
                    <Skeleton className="w-48 h-8 rounded" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="w-10 h-10 rounded" />
                    <Skeleton className="w-10 h-10 rounded" />
                </div>
            </header>

            <main className="min-h-0 flex flex-col flex-1 space-y-4 px-4 mt-(--header-height)">
                {/* Stat Cards Skeleton */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="p-4">
                            <Skeleton className="w-full h-6 rounded mb-2" />
                            <Skeleton className="w-full h-10 rounded" />
                        </Card>
                    ))}
                </section>

                {/* Transactions Table Skeleton */}
                <Card className="flex-1 min-h-0 flex flex-col gap-0 py-0 m-0 h-full">
                    <CardHeader className="py-4">
                        <Skeleton className="w-24 h-6 rounded mb-2" />
                        <Skeleton className="w-64 h-4 rounded" />
                    </CardHeader>
                    <Separator />
                    <CardContent className="flex-1 min-h-0 p-0 space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="w-full h-12 rounded m-2" />
                        ))}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}