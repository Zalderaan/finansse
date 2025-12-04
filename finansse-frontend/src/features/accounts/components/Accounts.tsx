import { AccountCard } from "./AccountCard";
import { useGetAccounts } from "../hooks/useGetAccounts";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { CreateAccountDialog } from "./CreateAccountDialog";
import {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import { Plus, PlusCircle, PlusCircleIcon, Wallet } from "lucide-react";

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
        <div className="flex flex-col flex-1 items-center justify-center gap-2 space-y-2">
            <div className="relative flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full"> {/* Gray circle background */}
                <Wallet className="w-8 h-8 text-gray-400" /> {/* Adjusted icon size for better fit */}
            </div>
            <div className="flex flex-col items-center space-y-0.5">
                <span className="font-bold text-md">No accounts found</span>
                <p className="w-2/3 text-gray-400 text-center text-sm">Create money-tracking accounts to start tracking transactions.</p>
            </div>
            <CreateAccountDialog>
                <Plus />
                <span>Create an account</span>
            </CreateAccountDialog>
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