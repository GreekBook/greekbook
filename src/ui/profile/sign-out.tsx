'use client';

import {signOut} from "@/lib/actions";
import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";

export default function SignOut() {
    return (
        <Button variant="outline" className="w-full justify-start" onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4"/>
            Sign Out
        </Button>
    )
}