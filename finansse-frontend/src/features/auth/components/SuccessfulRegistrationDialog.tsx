import { Link } from "react-router-dom";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessfulRegistrationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SuccessfulRegistrationDialog({ open, onOpenChange }: SuccessfulRegistrationDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registration Successful!</DialogTitle>
                    <DialogDescription>
                        Congratulations! Your account has been created. Click below to proceed to the login page.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Link to="/login">
                            <Button>Go to Login</Button>
                        </Link>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}