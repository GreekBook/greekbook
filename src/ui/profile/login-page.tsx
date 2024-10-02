'use client';

import {Button} from "@/components/ui/button";
import React from "react";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { signInWithGoogle } from "@/lib/actions";

export default function LoginPage({header}: { header: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {header}
            <main className="flex flex-grow p-4 flex-col justify-center">
                <Card className="w-full max-w-sm items-center">
                    <CardHeader>
                        <CardTitle>Settle there, let&#39;s sign in first!</CardTitle>
                        <CardDescription>
                            You must be signed in to access this feature. <br/><br/>
                            Don&#39;t have an account? Sign in anyway watch the magic happen!
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-center items-center">
                        <Button variant='default' className='w-full' onClick={() => signInWithGoogle()}>Sign in</Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}