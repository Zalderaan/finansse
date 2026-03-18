import { Link, useParams } from "react-router-dom"
import { useGetAccDetails } from "@/features/accounts//hooks/useGetAccDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DeleteAccountDialog } from "@/features/accounts/components/DeleteAccountDialog";
import { TransactionList } from "@/features/transactions/components/TransactionList";
import { EditAccountDialog } from "@/features/accounts/components/EditAccountDialog";
import { TransactionSearchBar } from "@/features/accounts/components/TransactionSearchBar";
import { DashboardCard } from "@/features/reports/components/DashboardCard";

export function AccountDetails() {
    const { accountId } = useParams();
    if (!accountId) return <span>Invalid account ID</span>;
    const { account, isLoading, isError, error } = useGetAccDetails(accountId);
    // console.log('account details: ', account);
    const totalIncome = 1000;
    const totalExpenses = 1000;
    const netFlow = 0;
    if (isLoading) {
        return (
            <div>
                Loading details...
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                Error loading! {error?.message}
            </div>
        )
    }

    return (
        <>
            {/* ── Back nav ── */}
            <Button asChild className="w-fit" variant="ghost" size="sm">
                <Link to="/dashboard/accounts"><ArrowLeft className="mr-1 h-4 w-4" />Back to accounts</Link>
            </Button>
            <main className="space-y-4 px-4 py-4">
                {/* ── Account header ── */}
                <section className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold">{account?.account_name}</h1>
                        {/* <p className="text-sm text-muted-foreground">{account?.account_type} · {account?.account_currency} · Created {new Date(account?.created_at).toLocaleDateString()}</p> */}
                    </div>
                    <div className="flex gap-2">
                        <EditAccountDialog />
                        <DeleteAccountDialog />
                    </div>
                </section>

                {/* ── Stat cards: 4-column grid, stacks on mobile ── */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <DashboardCard color="blue" title="Current Balance" value={account?.account_current_balance ?? 0} isLoading={false} />
                    <DashboardCard color="green" title="Total Income" value={totalIncome} isLoading={isLoading} />
                    <DashboardCard color="red" title="Total Expenses" value={totalExpenses} isLoading={isLoading} />
                    <DashboardCard color={netFlow >= 0 ? "green" : "red"} title="Net Flow" value={netFlow} isLoading={isLoading} />
                </section>

                {/* ── Transactions table ── */}
                <Card>
                    <CardHeader className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div>
                            <CardTitle>Transactions</CardTitle>
                            <CardDescription>Money transactions made in this account</CardDescription>
                        </div>
                        <TransactionSearchBar />
                    </CardHeader>
                    <Separator />
                    <TransactionList />
                </Card>

            </main>
        </>
    )
}

