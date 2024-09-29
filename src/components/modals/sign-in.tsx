import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from "react";
import {Button} from "@/components/ui/button";
import {signIn} from "@/auth";


export default function SignInModal({trigger}: {trigger: React.ReactNode}) {
    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settle there, let&#39;s sign in first.</DialogTitle>
                    <DialogDescription>
                        You must be signed in to access this feature. <br/>
                        Don&#39;t have an account? Sign in anyway watch the magic happen!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="ghost" type="submit" onClick={() => signIn('google')}>Sign in</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}