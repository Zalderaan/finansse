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
import { useAccountUiStore } from '@/features/accounts/stores/accounts.uiStore';
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";


export function DeleteAccountDialog() {
    const { accountId } = useParams();
    const { deleteAccountDialogOpen, setDeleteAccountDialogOpen } = useAccountUiStore();
    const navigate = useNavigate();
    const { deleteAccAsync, isDeleting, isError, error } = useDeleteAccount();
    const handleDelete = async () => {
        try {
            if (accountId) {
                await deleteAccAsync(accountId);
                setDeleteAccountDialogOpen(false); // close dialog
                navigate("/dashboard/accounts"); // navigate after deletion
            } else {
                console.error('No account ID found in delete.')
            }
        } catch (error) {
            // error handling
            console.error('Failed to delete account: ', error);
        }
    }

    return (
        <>
            <Dialog open={deleteAccountDialogOpen} onOpenChange={setDeleteAccountDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant={'destructive'}><Trash /></Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>This action will remove this account from your user.</DialogDescription>
                    </DialogHeader>

                    {isError && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                Failed to delete account: {error?.message || "Please try again."}
                            </AlertDescription>
                        </Alert>
                    )}
                    <DialogFooter className="flex flex-row items-center justify-end space-x-1">
                        <DialogClose asChild>
                            <Button variant={'outline'}>Go back</Button>
                        </DialogClose>
                        <Button variant={'destructive'} onClick={handleDelete} disabled={isDeleting}>
                            {
                                isDeleting ? 'Deleting account...' : 'Delete'
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}