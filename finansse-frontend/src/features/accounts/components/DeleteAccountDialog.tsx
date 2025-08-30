import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { useParams } from "react-router-dom";



export function DeleteAccountDialog() {
    const { accountId } = useParams();
    const {deleteAccAsync, isDeleting, isError, error} = useDeleteAccount();
    const handleDelete = async () => {
        console.log('delete clicked')
        try {
            if (accountId) {
                await deleteAccAsync(accountId);
            } else {
                console.error('No account ID found in delete.')
            }
        } catch (error) {
            // error handling
        }
    }


    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'destructive'}><Trash /></Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>This action will remove this account from your user.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row items-center justify-end space-x-1">
                        <DialogClose>
                            <Button variant={'outline'}>Go back</Button>
                        </DialogClose>
                        <Button variant={'destructive'} onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}