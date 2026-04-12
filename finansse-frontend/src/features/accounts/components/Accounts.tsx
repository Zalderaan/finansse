import { AccountCard } from "./AccountCard";
import { useGetAccounts } from "../hooks/useGetAccounts";
import { Loader } from "@/components/loader";
import { CreateAccountDialog } from "@/features/accounts/components/CreateAccountDialog";
import { PlusIcon, Wallet } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { useAccountUiStore } from "@/features/accounts/stores/accounts.uistore";

export function Accounts() {
    const { accounts, isLoading, isError, error } = useGetAccounts();
    const { setCreateAccountDialogOpen } = useAccountUiStore();
    console.log(accounts);

    if (isLoading) {
        return (

            <div className="flex flex-col items-center justify-center h-full w-full">
                <Loader />
                <span>Loading accounts...</span>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full">
                <Alert variant="destructive">
                    <AlertDescription>
                        Failed to load accounts: {error?.message || "Please try again."}
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    if (accounts?.length === 0) {
        return (
            <div className="flex flex-col flex-1 items-center justify-center space-y-4">
                <span className="bg-gray-300 p-5 rounded-full">
                    <Wallet />
                </span>
                <div className="flex flex-col items-center justify-center w-[50%]">
                    <span className="font-medium">No accounts found</span>
                    <p className="text-xs text-center text-gray-500">Create an account to start tracking your spending.</p>
                </div>
                <CreateAccountDialog>Create an account</CreateAccountDialog>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                {
                    accounts?.map((acc) => (
                        <div className="col-span-1">
                            <AccountCard key={acc.account_id} {...acc} />
                        </div>
                    ))
                }

                <div className="col-span-1" onClick={() => setCreateAccountDialogOpen(true)}>
                    <Card className="w-full h-full justify-center items-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                        <PlusIcon />
                    </Card>
                </div>
            </div>
        </>
    )
}