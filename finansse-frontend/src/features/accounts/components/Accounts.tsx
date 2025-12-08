import { AccountCard } from "./AccountCard";
import { useGetAccounts } from "../hooks/useGetAccounts";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { CreateAccountDialog } from "@/features/accounts/components/CreateAccountDialog";
import {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import { Wallet } from "lucide-react";

export function Accounts() {
    const { accounts, isLoading, isError, error } = useGetAccounts();
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
        return <div>Error: {error?.message}</div>
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
            <div className="flex flex-col flex-1 space-y-4 bg-red-200">
                {accounts?.map(account => (
                    <AccountCard key={account.account_id} {...account} />
                ))}
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious to={`./?page=${1}`} />
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink to="#">1</PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink to="#">2</PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink to="#">3</PaginationLink>
                        </PaginationItem>

                        <PaginationEllipsis />
                        <PaginationNext to="#" />

                    </PaginationContent>
                </Pagination>
            </div>
        </>
    )
}