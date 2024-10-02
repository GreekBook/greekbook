import Link from 'next/link'
import {ArrowLeft, Camera, CheckCircle, CreditCard, Trash2, UserCog, XCircle} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {Separator} from "@/components/ui/separator";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {auth} from "@/auth";
import React from "react";
import LoginPage from "@/ui/profile/login-page";
import TopBarWithBackButton from "@/ui/top-bar-with-back-button";
import {fetchProfile} from "@/lib/db/data";
import SignOut from "@/ui/profile/sign-out";

export default async function ProfilePage() {
    const session = await auth();
    if (!session) {
        return (
            <LoginPage header={
                <header className="bg-card p-4 flex items-center space-x-4 border-b border-border">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6"/>
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-teal-600 font-museo ml-4">My Profile</h1>
                </header>
            }/>
        )
    }
    const user = await fetchProfile();
    if (!user) {
        return (
            <LoginPage header={
                <header className="bg-card p-4 flex items-center space-x-4 border-b border-border">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6"/>
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-teal-600 font-museo ml-4">My Profile</h1>
                </header>
            }/>
        )
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <TopBarWithBackButton>
                <h1 className="text-2xl font-bold text-teal-600 font-museo ml-4">My Profile</h1>
            </TopBarWithBackButton>
            <main className="flex-grow p-4">
            <Card className="mb-6">
                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={user.image || ''} alt={user.name || ''}/>
                            <AvatarFallback>{(user.name || '').charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{user.name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full mt-2">
                            <Camera className="w-4 h-4 mr-2"/>
                            Change Profile Picture
                        </Button>
                    </CardContent>
                </Card>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {user.dateOfBirth && <div className="flex justify-between">
                            <span className="text-sm font-medium">Date of Birth:</span>
                            <span className="text-sm">{formatDate(user.dateOfBirth)}</span>
                        </div>}
                        <div className="flex justify-between">
                            <span className="text-sm font-medium">Role:</span>
                            <Badge variant={user.role === 'admin' ? 'destructive' : 'default'}>
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Account Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <div className="text-sm font-medium">Onboarded</div>
                                <div className="text-sm text-muted-foreground">
                                    Your account setup is complete
                                </div>
                            </div>
                            {user.onboarded ? (
                                <CheckCircle className="h-5 w-5 text-green-500"/>
                            ) : (
                                <XCircle className="h-5 w-5 text-red-500"/>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <div className="text-sm font-medium">KYC Verification</div>
                                <div className="text-sm text-muted-foreground">
                                    Your identity has been verified
                                </div>
                            </div>
                            {user.kycVerified ? (
                                <CheckCircle className="h-5 w-5 text-green-500"/>
                            ) : (
                                <XCircle className="h-5 w-5 text-red-500"/>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2.5">
                        {!user.onboarded &&
                            <Button variant="outline" className="w-full">
                                Complete Account Setup
                            </Button>
                        }
                        <Button variant="outline" className="w-full">
                            {user.kycVerified ? 'Update KYC Information' : 'Complete KYC Verification'}
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Account Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <SignOut />
                        <Button variant="outline" className="w-full justify-start">
                            <CreditCard className="mr-2 h-4 w-4"/>
                            Manage Billing
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                            <UserCog className="mr-2 h-4 w-4"/>
                            Edit Account Information
                        </Button>
                        <Separator/>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="w-full justify-start">
                                    <Trash2 className="mr-2 h-4 w-4"/>
                                    Delete Account
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete
                                        Account</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}