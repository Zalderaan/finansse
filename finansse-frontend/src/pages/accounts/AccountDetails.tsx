import { Link, useParams } from "react-router-dom"
import { useGetAccDetails } from "@/features/accounts//hooks/useGetAccDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PencilLine, Trash } from "lucide-react";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DeleteAccountDialog } from "@/features/accounts/components/DeleteAccountDialog";
import { TransactionList } from "@/features/transactions/components/TransactionList";

export function AccountDetails() {
    const { accountId } = useParams();
    if (!accountId) return <span>Invalid account ID</span>;
    const { account, isLoading, isError, error } = useGetAccDetails(accountId);
    // console.log('account details: ', account);

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
            <Card className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between space-x-4">
                    <div className="flex flex-row items-center space-x-4">
                        <Button asChild className='w-fit' variant={'ghost'} size={'icon'}>
                            <Link to='/dashboard/accounts'><ArrowLeft></ArrowLeft></Link>
                        </Button>
                        <div className="flex flex-col">
                            <CardTitle className="text-3xl font-semibold">{account?.account_name}</CardTitle>
                            <CardDescription className="text-gray-400">{account?.account_type}</CardDescription>
                        </div>
                    </div>
                    <div className="space-x-2">
                        <Button><PencilLine /></Button>
                        <DeleteAccountDialog />
                    </div>
                </CardHeader>
                <Separator />
                <CardContent className="flex flex-col">
                    <span>Details: </span>
                    <span>Current Balance: {account?.account_current_balance}</span>
                    <span>Modified: {account?.updated_at.toLocaleString()}</span>
                    <span>Created At: {account?.created_at.toLocaleString()}</span>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>Money transactions made in this account</CardDescription>
                </CardHeader>
                <Separator />
                <TransactionList />
                {/* <CardContent className="flex flex-col">
                </CardContent> */}
            </Card>
        </>
    )
}