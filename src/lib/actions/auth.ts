'use server';

import { signIn, signOut as internalSignOut } from "@/auth";
import { AuthError } from "next-auth";

export async function signInWithGoogle() {
    try {
        await signIn('google');
    } catch (error) {
        if (error instanceof AuthError) {
            return 'Login failed';
        }
        throw error;
    }
}

export async function signOut() {
    await internalSignOut();
}