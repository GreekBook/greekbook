'use client';

import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import React from "react";
import {useRouter} from "next/navigation";

export default function TopBarWithBackButton(
    {className="bg-card p-4 flex items-center space-x-4 border-b border-border", children}:
        {className?: string, children: React.ReactNode[] | React.ReactNode}) {
    const router = useRouter();
    return (
        <header className={className}>
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-6 w-6"/>
            </Button>
            {children}
        </header>
    )
}