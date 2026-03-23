import { Link, useParams } from "react-router-dom"
import { useGetAccDetails } from "@/features/accounts//hooks/useGetAccDetails";
import { useGetTransactionsByAcc } from "@/features/transactions/hooks/useGetTransactionsByAcc";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DeleteAccountDialog } from "@/features/accounts/components/DeleteAccountDialog";
import { TransactionList } from "@/features/transactions/components/TransactionList";
import { EditAccountDialog } from "@/features/accounts/components/EditAccountDialog";
import { TransactionSearchBar } from "@/features/accounts/components/TransactionSearchBar";
import { DashboardCard } from "@/features/reports/components/DashboardCard";
import { Spinner } from "@/components/ui/spinner";

export function AccountDetails() {
    const { accountId } = useParams();
    if (!accountId) return <span>Invalid account ID</span>;
    const { transactions, isLoading: isLoadingAccTransactions, isError: isErrorAccTransactions, error: errorAccTransactions } = useGetTransactionsByAcc(accountId);
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
        <div className="h-full flex flex-col space-y-2">
            {/* ── Back nav ── */}
            <Button asChild className="w-fit px-0" variant="ghost" size="sm">
                <Link to="/dashboard/accounts"><ArrowLeft className="h-4 w-4" />Back to accounts</Link>
            </Button>
            <main className="min-h-0 flex flex-col flex-1 space-y-4 px-2">
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
                <Card className="flex-1 min-h-0 flex flex-col gap-0 py-0 m-0 h-full">
                    <CardHeader className="grid grid-cols-1 md:grid-cols-2 justify-center items-center py-4 align-middle">
                        <div className="flex flex-col justify-center space-y-2">
                            <CardTitle>Transactions</CardTitle>
                            <CardDescription>{
                                isLoadingAccTransactions ? (
                                    <div className="flex items-center gap-2">
                                        <Spinner />
                                        <span>Loading transactions...</span>
                                    </div>
                                ) : (
                                    <span>Money transactions tracked in this account</span>
                                )
                            }
                            </CardDescription>
                        </div>
                        <TransactionSearchBar />
                    </CardHeader>
                    <Separator />
                    <CardContent className="flex-1 min-h-0 p-0 ">
                        <TransactionList
                            transactions={transactions}
                            isLoadingAccTransactions={isLoadingAccTransactions}
                            isErrorAccTransactions={isErrorAccTransactions}
                            errorAccTransactions={errorAccTransactions}
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

